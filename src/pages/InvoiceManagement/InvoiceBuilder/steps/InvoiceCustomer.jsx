import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Autocomplete, Button } from '@mui/material';

const InvoiceCustomer = ({ next, data }) => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [quotationOptions, setQuotationOptions] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', gst: '', address: '' });

  useEffect(() => {
    const fetchLeads = async () => { try { const res = await fetch('/api/leads'); const j = await res.json(); setLeads(j); } catch (err) { console.error(err); } };
    const fetchQuotes = async () => { try { const res = await fetch('/api/quotations'); const j = await res.json(); setQuotationOptions(j); } catch (err) { console.error(err); } };
    fetchLeads(); fetchQuotes();
  }, []);

  useEffect(() => {
    if (selectedLead) setCustomer({ name: selectedLead.name, email: selectedLead.email, phone: selectedLead.mobile, gst: selectedLead.gst || '', address: selectedLead.address || '' });
  }, [selectedLead]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete options={leads} getOptionLabel={(o) => o.name + ' (' + o.email + ')'} value={selectedLead} onChange={(e, v) => setSelectedLead(v)} renderInput={(params) => <TextField {...params} label="Select Lead" />} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete options={quotationOptions} getOptionLabel={(o) => o.quote_id + ' - ' + (o.customer_name || '')} value={selectedQuotation} onChange={(e, v) => setSelectedQuotation(v)} renderInput={(params) => <TextField {...params} label="Select Quotation (optional)" />} />
        </Grid>

        <Grid item xs={12} md={6}><TextField fullWidth label="Customer Name" value={customer.name} onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Email" value={customer.email} onChange={(e) => setCustomer(prev => ({ ...prev, email: e.target.value }))} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Phone" value={customer.phone} onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="GSTIN" value={customer.gst} onChange={(e) => setCustomer(prev => ({ ...prev, gst: e.target.value }))} /></Grid>
        <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Address" value={customer.address} onChange={(e) => setCustomer(prev => ({ ...prev, address: e.target.value }))} /></Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => next({ customer, quotation_id: selectedQuotation?.id })}>Next</Button>
      </Box>
    </Box>
  );
};

export default InvoiceCustomer;