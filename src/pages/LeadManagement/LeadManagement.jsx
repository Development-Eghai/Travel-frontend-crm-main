import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LeadTable from './LeadTable';
import LeadKanban from './LeadKanban';
import AddLeadDialog from './AddLeadDialog';
import './LeadMangment.css';

const API_KEY = 'bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [viewType, setViewType] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [openAddLead, setOpenAddLead] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const publicRes = await fetch('https://api.yaadigo.com/public/api/enquires/');
      const publicData = await publicRes.json();
      const publicList = Array.isArray(publicData) ? publicData : publicData?.data || [];

      const formattedPublic = publicList.map((item, index) => ({
        id: `E-${item.id ?? index}`,
        source_id: item.id ?? index,
        name: item.full_name || '-',
        email: item.email || '-',
        mobile: item.contact_number || '-',
        destination_type: item.destination || '-',
        trip_type: item.hotel_category || '-',
        status: 'new',
        priority: 'medium',
        assigned_to: 'Unassigned',
        follow_up_date: null,
        created_at: item.created_at || new Date(),
        source: 'Website Enquiry',
        type: 'enquiry',
      }));

      const secureRes = await fetch('https://api.yaadigo.com/secure/api/leads/', {
        headers: { 'x-api-key': API_KEY },
      });
      const secureData = await secureRes.json();
      const secureList = Array.isArray(secureData) ? secureData : secureData?.data || [];

      const formattedSecure = secureList.map((item, index) => ({
        id: `L-${item.id ?? index}`,
        source_id: Number(item.id ?? index),
        name: item.name || '-',
        email: item.email || '-',
        mobile: item.mobile || '-',
        destination_type: item.destination_type || '-',
        trip_type: item.trip_type || '-',
        status: item.status || 'new',
        priority: 'medium',
        assigned_to: 'Unassigned',
        follow_up_date: item.follow_up_date || null,
        created_at: item.created_at || new Date(),
        source: 'Added via Dashboard',
        type: 'lead',
      }));

      const combined = [...formattedSecure, ...formattedPublic].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setLeads(combined);
      setSelectedLeads([]); // reset selection on refresh
    } catch (error) {
      console.error('❌ Error fetching leads:', error);
    }
  };

  // Delete a single lead
  const handleDeleteLead = async (lead) => {
    if (lead.type !== 'lead') {
      alert('❌ Only dashboard leads can be deleted.');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${lead.name}"?`)) return;

    try {
      const endpoint = `https://api.yaadigo.com/secure/api/leads/${lead.source_id}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY },
      });
      const result = await response.json();

      if (response.ok) {
        setLeads((prev) => prev.filter((item) => item.id !== lead.id));
        setSelectedLeads((prev) => prev.filter((id) => id !== lead.id));
        alert('✅ Lead deleted successfully.');
      } else {
        alert(`❌ Failed to delete lead: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error deleting lead:', error);
      alert('❌ Error deleting lead.');
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedLeads.length === 0) {
      alert('❌ No leads selected.');
      return;
    }

    const leadsToDelete = leads.filter(
      (lead) => selectedLeads.includes(lead.id) && lead.type === 'lead'
    );

    if (leadsToDelete.length === 0) {
      alert('❌ Only dashboard leads can be deleted.');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${leadsToDelete.length} lead(s)?`))
      return;

    for (const lead of leadsToDelete) {
      try {
        const endpoint = `https://api.yaadigo.com/secure/api/leads/${lead.source_id}`;
        const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: { 'x-api-key': API_KEY },
        });
        const result = await response.json();
        if (!response.ok) console.error('Failed to delete lead:', lead, result);
      } catch (error) {
        console.error('Error deleting lead:', lead, error);
      }
    }

    alert(`✅ ${leadsToDelete.length} lead(s) deleted.`);
    fetchLeads();
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filters
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectLead = (leadId) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]
    );
  };

  const selectAll = () => {
    const dashboardLeads = filteredLeads.filter((lead) => lead.type === 'lead').map((l) => l.id);
    setSelectedLeads(dashboardLeads);
  };

  const deselectAll = () => setSelectedLeads([]);

  return (
    <div className="mt-4">
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Lead Management</h3>
          <Button variant="contained" color="primary" onClick={() => setOpenAddLead(true)}>
            Add New Lead
          </Button>
        </Box>

        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Search leads..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="contacted">Contacted</MenuItem>
                <MenuItem value="quoted">Quoted</MenuItem>
                <MenuItem value="booked">Booked</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <DatePicker
                  label="From Date"
                  value={dateRange[0]}
                  onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
                />
                <DatePicker
                  label="To Date"
                  value={dateRange[1]}
                  onChange={(newValue) => setDateRange([dateRange[0], newValue])}
                />
              </Box>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <Select value={viewType} onChange={(e) => setViewType(e.target.value)}>
                <MenuItem value="list">List View</MenuItem>
                <MenuItem value="kanban">Kanban View</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Bulk Actions */}
        <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button variant="outlined" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="outlined" onClick={deselectAll}>
            Deselect All
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleBulkDelete}
            disabled={selectedLeads.length === 0}
          >
            Delete Selected ({selectedLeads.length})
          </Button>
        </Box>

        {/* Lead Views */}
        {viewType === 'list' ? (
          <LeadTable
            leads={filteredLeads}
            selectedLeads={selectedLeads}
            toggleSelectLead={toggleSelectLead}
            onDeleteLead={handleDeleteLead}
            onRefresh={fetchLeads}
          />
        ) : (
          <LeadKanban
            leads={filteredLeads}
            selectedLeads={selectedLeads}
            toggleSelectLead={toggleSelectLead}
            onDeleteLead={handleDeleteLead}
            onRefresh={fetchLeads}
          />
        )}

        {/* Add Lead Dialog */}
        <AddLeadDialog
          open={openAddLead}
          onClose={() => {
            setOpenAddLead(false);
            fetchLeads();
          }}
        />
      </Container>
    </div>
  );
};

export default LeadManagement;
