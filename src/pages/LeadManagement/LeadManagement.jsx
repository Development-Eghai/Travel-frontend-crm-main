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
  Alert,
  CircularProgress,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [openAddLead, setOpenAddLead] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [dataStats, setDataStats] = useState({
    bookingRequests: 0,
    enquiries: 0,
    manualLeads: 0,
  });

  // Fetch all leads from multiple sources
  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch Booking Requests
      const bookingRequestsPromise = fetch('https://api.yaadigo.com/secure/api/booking_request/', {
        headers: { 'x-api-key': API_KEY },
      }).then(res => res.json());

      // Fetch Enquiries
      const enquiriesPromise = fetch('https://api.yaadigo.com/secure/api/enquires/', {
        headers: { 'x-api-key': API_KEY },
      }).then(res => res.json());

      // Fetch Manual Leads
      const manualLeadsPromise = fetch('https://api.yaadigo.com/secure/api/leads/', {
        headers: { 'x-api-key': API_KEY },
      }).then(res => res.json());

      const [bookingRequestsData, enquiriesData, manualLeadsData] = await Promise.all([
        bookingRequestsPromise,
        enquiriesPromise,
        manualLeadsPromise,
      ]);

      // Process Booking Requests
      const bookingRequestsList = Array.isArray(bookingRequestsData) 
        ? bookingRequestsData 
        : bookingRequestsData?.data || [];

      const formattedBookingRequests = bookingRequestsList.map((item, index) => ({
        id: `BR-${item.id ?? index}`,
        source_id: item.id ?? index,
        name: item.full_name || '-',
        email: item.email || '-',
        mobile: item.phone_number || '-',
        destination_type: item.domain_name || 'Indian Mountain Rovers',
        trip_type: `${item.adults} Adults, ${item.children} Children`,
        status: 'new',
        priority: 'high',
        assigned_to: 'Unassigned',
        follow_up_date: null,
        created_at: item.created_at || new Date().toISOString(),
        source: 'Booking Request',
        type: 'booking_request',
        additional_info: {
          departure_date: item.departure_date,
          sharing_option: item.sharing_option,
          price_per_person: item.price_per_person,
          estimated_total_price: item.estimated_total_price,
          adults: item.adults,
          children: item.children,
        }
      }));

      // Process Enquiries
      const enquiriesList = Array.isArray(enquiriesData) 
        ? enquiriesData 
        : enquiriesData?.data || [];

      const formattedEnquiries = enquiriesList.map((item, index) => ({
        id: `ENQ-${item.id ?? index}`,
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
        created_at: item.created_at || new Date().toISOString(),
        source: 'Website Enquiry',
        type: 'enquiry',
        additional_info: {
          departure_city: item.departure_city,
          travel_date: item.travel_date,
          adults: item.adults,
          children: item.children,
          infants: item.infants,
          additional_comments: item.additional_comments,
          domain_name: item.domain_name,
        }
      }));

      // Process Manual Leads
      const manualLeadsList = Array.isArray(manualLeadsData) 
        ? manualLeadsData 
        : manualLeadsData?.data || [];

      const formattedManualLeads = manualLeadsList.map((item, index) => ({
        id: `L-${item.id ?? index}`,
        source_id: Number(item.id ?? index),
        name: item.name || '-',
        email: item.email || '-',
        mobile: item.mobile || '-',
        destination_type: item.destination_type || '-',
        trip_type: item.trip_type || '-',
        status: item.status || 'new',
        priority: item.priority || 'medium',
        assigned_to: item.assigned_to || 'Unassigned',
        follow_up_date: item.follow_up_date || null,
        created_at: item.created_at || new Date().toISOString(),
        source: 'Manual Entry',
        type: 'lead',
      }));

      // Combine all leads and sort by created date
      const combined = [
        ...formattedBookingRequests,
        ...formattedEnquiries,
        ...formattedManualLeads,
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setLeads(combined);
      setDataStats({
        bookingRequests: formattedBookingRequests.length,
        enquiries: formattedEnquiries.length,
        manualLeads: formattedManualLeads.length,
      });
      setSelectedLeads([]);
    } catch (error) {
      console.error('❌ Error fetching leads:', error);
      setError('Failed to fetch leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a single lead
  const handleDeleteLead = async (lead) => {
    if (lead.type !== 'lead') {
      alert('❌ Only manual leads can be deleted. Booking requests and enquiries are read-only.');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${lead.name}"?`)) return;

    try {
      const endpoint = `https://api.yaadigo.com/secure/api/leads/${lead.source_id}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY },
      });

      if (response.ok) {
        setLeads((prev) => prev.filter((item) => item.id !== lead.id));
        setSelectedLeads((prev) => prev.filter((id) => id !== lead.id));
        alert('✅ Lead deleted successfully.');
      } else {
        const result = await response.json();
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
      alert('❌ Only manual leads can be deleted.');
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
        if (!response.ok) {
          const result = await response.json();
          console.error('Failed to delete lead:', lead, result);
        }
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
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectLead = (leadId) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]
    );
  };

  const selectAll = () => {
    const manualLeads = filteredLeads.filter((lead) => lead.type === 'lead').map((l) => l.id);
    setSelectedLeads(manualLeads);
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

        {/* Data Source Stats */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Alert severity="info" sx={{ flex: 1 }}>
            <strong>Booking Requests:</strong> {dataStats.bookingRequests}
          </Alert>
          <Alert severity="success" sx={{ flex: 1 }}>
            <strong>Enquiries:</strong> {dataStats.enquiries}
          </Alert>
          <Alert severity="warning" sx={{ flex: 1 }}>
            <strong>Manual Leads:</strong> {dataStats.manualLeads}
          </Alert>
          <Alert severity="secondary" sx={{ flex: 1 }}>
            <strong>Total:</strong> {leads.length}
          </Alert>
        </Box>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

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
            Select All Manual Leads
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
          <Button variant="outlined" onClick={fetchLeads} disabled={loading}>
            Refresh Data
          </Button>
        </Box>

        {/* Lead Views */}
        {!loading && (
          <>
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
          </>
        )}

        {/* Add Lead Dialog */}
        <AddLeadDialog
          open={openAddLead}
          onClose={(shouldRefresh) => {
            setOpenAddLead(false);
            if (shouldRefresh) fetchLeads();
          }}
        />
      </Container>
    </div>
  );
};

export default LeadManagement;