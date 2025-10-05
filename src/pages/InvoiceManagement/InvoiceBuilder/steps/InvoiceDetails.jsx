import React, { useState } from 'react';
import { Box, Grid, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

const InvoiceDetails = ({ next, back, data }) => {
  const [invoiceNo, setInvoiceNo] = useState(data.invoice_no || `INV-${Date.now()}`);
  const [issueDate, setIssueDate] = useState(data.issue_date || new Date().toISOString().slice(0,10));
  const [dueDate, setDueDate] = useState(data.due_date || new Date().toISOString().slice(0,10));
  const [isInterstate, setIsInterstate] = useState(data.isInterstate || false);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}><TextField fullWidth label="Invoice Number" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} /></Grid>
        <Grid item xs={12} md={4}><TextField fullWidth type="date" label="Invoice Date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
        <Grid item xs={12} md={4}><TextField fullWidth type="date" label="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
        <Grid item xs={12}><FormControlLabel control={<Checkbox checked={isInterstate} onChange={(e) => setIsInterstate(e.target.checked)} />} label="Interstate Transaction (IGST applicable)" /></Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={back}>Back</Button>
        <Button variant="contained" onClick={() => next({ invoice_no: invoiceNo, issue_date: issueDate, due_date: dueDate, isInterstate })}>Next</Button>
      </Box>
    </Box>
  );
};

export default InvoiceDetails;