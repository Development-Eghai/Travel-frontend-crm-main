import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Grid, TextField, FormControl, Select, MenuItem } from '@mui/material';
import QuotationTable from './QuotationTable';
import QuotationBuilder from './QuotationBuilder/QuotationBuilder';

const QuotationManagement = () => {
  const [quotations, setQuotations] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [openBuilder, setOpenBuilder] = useState(false);

  const fetchQuotations = async () => {
    try {
      const res = await fetch('/api/quotations');
      const data = await res.json();
      setQuotations(data);
    } catch (err) {
      console.error('Failed fetching quotations', err);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  return (
    <div className='mt-4'>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Quotation Management</h3>
          <Box>
            <Button variant="contained" color="primary" onClick={() => setOpenBuilder(true)}>
              Create New Quotation
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search quotations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="sent">Sent</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="accepted">Accepted</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="invoiced">Invoiced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <Select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                <MenuItem value="all">All Dates</MenuItem>
                <MenuItem value="last7">Last 7 days</MenuItem>
                <MenuItem value="last30">Last 30 days</MenuItem>
                <MenuItem value="thisyear">This Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <QuotationTable
          quotations={quotations.filter(q => {
            if (statusFilter !== 'all' && q.status?.toLowerCase() !== statusFilter) return false;
            if (search) {
              const s = search.toLowerCase();
              return q.quote_id?.toLowerCase().includes(s) || q.customer_name?.toLowerCase().includes(s) || q.customer_email?.toLowerCase().includes(s);
            }
            return true;
          })}
          onRefresh={fetchQuotations}
        />

        <QuotationBuilder open={openBuilder} onClose={() => { setOpenBuilder(false); fetchQuotations(); }} />
      </Container>
    </div>
  );
};

export default QuotationManagement;