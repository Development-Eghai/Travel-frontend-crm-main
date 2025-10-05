import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const methods = ['Cash', 'Bank Transfer', 'UPI', 'Card'];

const RecordPaymentDialog = ({ open, onClose, invoice }) => {
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState('Cash');
  const [ref, setRef] = useState('');
  const [notes, setNotes] = useState('');

  const handleRecord = async () => {
    try {
      await fetch(`/api/invoices/${invoice?.id}/payments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount, method, ref, notes }) });
      onClose();
    } catch (err) { console.error(err); }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Record Payment</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Payment Amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} sx={{ mb: 2 }} />
        <TextField fullWidth select label="Payment Method" value={method} onChange={(e) => setMethod(e.target.value)} sx={{ mb: 2 }}>
          {methods.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
        </TextField>
        <TextField fullWidth label="Reference Number" value={ref} onChange={(e) => setRef(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth multiline rows={3} label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleRecord}>Record Payment</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordPaymentDialog;