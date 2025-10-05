import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const PoliciesStep = ({ next, back, data }) => {
  const [paymentTerms, setPaymentTerms] = useState(data.paymentTerms || '50% advance to confirm, balance 30 days before travel.');
  const [cancellation, setCancellation] = useState(data.cancellation || 'Cancellation charges apply as per policy.');
  const [tnc, setTnc] = useState(data.tnc || 'All disputes subject to Mumbai jurisdiction.');

  return (
    <Box>
      <h3>Policies</h3>
      <TextField fullWidth multiline rows={3} label="Payment Terms" value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth multiline rows={3} label="Cancellation Policy" value={cancellation} onChange={(e) => setCancellation(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth multiline rows={3} label="Terms & Conditions" value={tnc} onChange={(e) => setTnc(e.target.value)} sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={back}>Back</Button>
        <Button variant="contained" onClick={() => next({ paymentTerms, cancellation, tnc })}>Next</Button>
      </Box>
    </Box>
  );
};

export default PoliciesStep;