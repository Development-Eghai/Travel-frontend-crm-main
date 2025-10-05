import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

const InvoiceSummary = ({ data, onRecordPayment }) => {
  const { subtotal = 0, discount = 0, taxable = 0, cgst = 0, sgst = 0, igst = 0, total = 0 } = data;
  const amountPaid = data.amountPaid || 0;
  const due = total - amountPaid;

  return (
    <Box>
      <Typography variant="h6">Invoice Summary</Typography>
      <Paper sx={{ p: 2, my: 2 }}>
        <div>Subtotal: {subtotal}</div>
        <div>Discount: {discount}</div>
        <div>Taxable Amount: {taxable}</div>
        <div>CGST: {cgst}</div>
        <div>SGST: {sgst}</div>
        <div>IGST: {igst}</div>
        <div><strong>Grand Total: {total}</strong></div>
        <div>Amount Paid: {amountPaid}</div>
        <div><strong>Balance Due: {due}</strong></div>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => window.print()}>Preview</Button>
        <Box>
          <Button onClick={onRecordPayment}>Record Payment</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InvoiceSummary;