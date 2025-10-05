import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, FormControl, Select, MenuItem, Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LeadTable from './LeadTable';
import LeadKanban from './LeadKanban';
import AddLeadDialog from './AddLeadDialog';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [viewType, setViewType] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [openAddLead, setOpenAddLead] = useState(false);

  // Fetch leads from API
  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddNewLead = () => {
    setOpenAddLead(true);
  };

  const handleCloseAddLead = () => {
    setOpenAddLead(false);
    fetchLeads(); // Refresh leads after adding new one
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className='section-padding'>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Lead Management</h1>
          <Button variant="contained" color="primary" onClick={handleAddNewLead}>
            Add New Lead
          </Button>
        </Box>

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
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
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
              <Select
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
              >
                <MenuItem value="list">List View</MenuItem>
                <MenuItem value="kanban">Kanban View</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {viewType === 'list' ? (
          <LeadTable leads={filteredLeads} onRefresh={fetchLeads} />
        ) : (
          <LeadKanban leads={filteredLeads} onRefresh={fetchLeads} />
        )}

        <AddLeadDialog open={openAddLead} onClose={handleCloseAddLead} />
      </Container>
    </div>
  );
};

export default LeadManagement;