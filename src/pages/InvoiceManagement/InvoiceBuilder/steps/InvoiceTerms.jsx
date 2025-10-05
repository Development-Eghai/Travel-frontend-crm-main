import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const InvoiceTerms = ({ next, back, data }) => {
  const [paymentTerms, setPaymentTerms] = React.useState(data.paymentTerms || 'Payment due within 30 days');
  const [notes, setNotes] = React.useState(data.notes || '');
  const [tnc, setTnc] = React.useState(data.tnc || 'All disputes subject to Mumbai jurisdiction only.');

  return (
    <Box>
      <h3>Terms & Notes</h3>
      <TextField fullWidth multiline rows={3} label="Payment Terms" value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth multiline rows={3} label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth multiline rows={4} label="Terms & Conditions" value={tnc} onChange={(e) => setTnc(e.target.value)} sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={back}>Back</Button>
        <Button variant="contained" onClick={() => next({ paymentTerms, notes, tnc })}>Next</Button>
      </Box>
    </Box>
  );
};

export default InvoiceTerms;