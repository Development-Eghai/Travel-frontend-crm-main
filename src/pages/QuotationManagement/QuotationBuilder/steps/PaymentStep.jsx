import React, { useState } from 'react';
import { Box, TextField, Grid, Button } from '@mui/material';

const PaymentStep = ({ next, back, data }) => {
  const [bankName, setBankName] = useState(data.bankName || '');
  const [acNo, setAcNo] = useState(data.acNo || '');
  const [ifsc, setIfsc] = useState(data.ifsc || '');
  const [branch, setBranch] = useState(data.branch || '');
  const [gst, setGst] = useState(data.gst || '');
  const [upi, setUpi] = useState(data.upi || '');

  return (
    <Box>
      <h3>Payment Details</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><TextField fullWidth label="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Account No" value={acNo} onChange={(e) => setAcNo(e.target.value)} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="IFSC" value={ifsc} onChange={(e) => setIfsc(e.target.value)} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="GST No" value={gst} onChange={(e) => setGst(e.target.value)} /></Grid>
        <Grid item xs={12} md={6}><TextField fullWidth label="UPI ID" value={upi} onChange={(e) => setUpi(e.target.value)} /></Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={back}>Back</Button>
        <Button variant="contained" onClick={() => next({ bankName, acNo, ifsc, branch, gst, upi })}>Finish</Button>
      </Box>
    </Box>
  );
};

export default PaymentStep;