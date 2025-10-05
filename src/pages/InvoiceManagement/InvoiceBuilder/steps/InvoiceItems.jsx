import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Card, CardContent, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const GST_OPTIONS = [0, 5, 12, 18, 28];

const InvoiceItems = ({ next, back, data }) => {
  const [items, setItems] = useState(data.items || [{ name: '', desc: '', hsn: '', qty: 1, unit: 0, discount: 0, gst: 18 }]);

  const addItem = () => setItems(prev => [...prev, { name: '', desc: '', hsn: '', qty: 1, unit: 0, discount: 0, gst: 18 }]);
  const removeItem = (i) => setItems(prev => prev.filter((_, idx) => idx !== i));
  const update = (i, key, val) => setItems(prev => prev.map((it, idx) => idx === i ? { ...it, [key]: val } : it));

  const subtotal = items.reduce((s, it) => s + (it.qty * it.unit), 0);
  const discount = items.reduce((s, it) => s + (it.qty * it.unit * (it.discount/100 || 0)), 0);
  const taxable = subtotal - discount;

  let cgst = 0, sgst = 0, igst = 0;
  const isInterstate = data.isInterstate;
  items.forEach(it => {
    const taxBase = (it.qty * it.unit) - (it.qty * it.unit * (it.discount/100 || 0));
    if (isInterstate) igst += taxBase * (it.gst/100 || 0);
    else { cgst += taxBase * (it.gst/200 || 0); sgst += taxBase * (it.gst/200 || 0); }
  });

  const total = taxable + cgst + sgst + igst;

  return (
    <Box>
      <h3>Invoice Items</h3>
      {items.map((it, i) => (
        <Card sx={{ mb: 2 }} key={i}><CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}><TextField fullWidth label="Item Name" value={it.name} onChange={(e) => update(i, 'name', e.target.value)} /></Grid>
            <Grid item xs={12} md={3}><TextField fullWidth label="Description" value={it.desc} onChange={(e) => update(i, 'desc', e.target.value)} /></Grid>
            <Grid item xs={12} md={2}><TextField fullWidth label="HSN Code" value={it.hsn} onChange={(e) => update(i, 'hsn', e.target.value)} /></Grid>
            <Grid item xs={12} md={1}><TextField fullWidth label="Qty" type="number" value={it.qty} onChange={(e) => update(i, 'qty', Number(e.target.value))} /></Grid>
            <Grid item xs={12} md={1}><TextField fullWidth label="Unit Price" type="number" value={it.unit} onChange={(e) => update(i, 'unit', Number(e.target.value))} /></Grid>
            <Grid item xs={12} md={1}><TextField fullWidth label="Discount %" type="number" value={it.discount} onChange={(e) => update(i, 'discount', Number(e.target.value))} /></Grid>
            <Grid item xs={12} md={1}><FormControl fullWidth><InputLabel>GST %</InputLabel><Select value={it.gst} label="GST %" onChange={(e) => update(i, 'gst', Number(e.target.value))}>{GST_OPTIONS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}</Select></FormControl></Grid>
            <Grid item xs={12} md={12} sx={{ textAlign: 'right' }}>
              <IconButton onClick={() => removeItem(i)}><DeleteIcon /></IconButton>
            </Grid>
          </Grid>
        </CardContent></Card>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button onClick={addItem}>+ Add Item</Button>
        <div>
          <div>Taxable: {taxable.toFixed(2)}</div>
          <div>CGST: {cgst.toFixed(2)}</div>
          <div>SGST: {sgst.toFixed(2)}</div>
          <div>IGST: {igst.toFixed(2)}</div>
          <div><strong>Total: {total.toFixed(2)}</strong></div>
        </div>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={back}>Back</Button>
        <Button variant="contained" onClick={() => next({ items, subtotal, discount, taxable, cgst, sgst, igst, total })}>Next</Button>
      </Box>
    </Box>
  );
};

export default InvoiceItems;