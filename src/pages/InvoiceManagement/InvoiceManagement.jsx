import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Grid, TextField, FormControl, Select, MenuItem } from '@mui/material';
import InvoiceTable from './InvoiceTable';
import InvoiceBuilder from './InvoiceBuilder/InvoiceBuilder';

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [openBuilder, setOpenBuilder] = useState(false);

  const fetchInvoices = async () => {
    try {
      const res = await fetch('/api/invoices');
      const data = await res.json();
      setInvoices(data);
    } catch (err) {
      console.error('Failed fetching invoices', err);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

  return (

    <div className='mt-4'>
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Invoicing</h3>
        <Box>
          <Button variant="contained" color="primary" onClick={() => setOpenBuilder(true)}>Create New Invoice</Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth placeholder="Search by invoice # or customer..." value={search} onChange={(e) => setSearch(e.target.value)} />
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

      <InvoiceTable invoices={invoices.filter(inv => {
        if (!search) return true;
        const s = search.toLowerCase();
        return (inv.invoice_no?.toLowerCase().includes(s) || inv.customer_name?.toLowerCase().includes(s) || inv.customer_email?.toLowerCase().includes(s));
      })} onRefresh={fetchInvoices} />

      <InvoiceBuilder open={openBuilder} onClose={() => { setOpenBuilder(false); fetchInvoices(); }} />
    </Container>
    </div>
  );
};

export default InvoiceManagement;