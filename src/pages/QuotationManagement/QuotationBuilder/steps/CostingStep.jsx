import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CostingStep = ({ next, back, data }) => {
  const [items, setItems] = useState(data.costing || [{ item: 'Hotel', qty: 1, price: 0 }]);

  const addItem = () => setItems(prev => [...prev, { item: '', qty: 1, price: 0 }]);
  const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx));
  const updateItem = (idx, key, value) => setItems(prev => prev.map((it, i) => i === idx ? { ...it, [key]: value } : it));

  const total = items.reduce((s, it) => s + (Number(it.qty) * Number(it.price || 0)), 0);

  return (
    <Box>
      <h3>Price Breakdown</h3>
      {items.map((it, i) => (
        <Card sx={{ mb: 2 }} key={i}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6} md={6}>
                <TextField fullWidth label="Item" value={it.item} onChange={(e) => updateItem(i, 'item', e.target.value)} />
              </Grid>
              <Grid item xs={3} md={3}>
                <TextField fullWidth label="Quantity" type="number" value={it.qty} onChange={(e) => updateItem(i, 'qty', e.target.value)} />
              </Grid>
              <Grid item xs={2} md={2}>
                <TextField fullWidth label="Unit Price" type="number" value={it.price} onChange={(e) => updateItem(i, 'price', e.target.value)} />
              </Grid>
              <Grid item xs={1} md={1}>
                <IconButton onClick={() => removeItem(i)}><DeleteIcon /></IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button onClick={addItem}>+ Add Item</Button>
        <div><strong>Total: {total}</strong></div>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={back}>Back</Button>
        <Button variant="contained" onClick={() => next({ costing: items, amount: total })}>Next</Button>
      </Box>
    </Box>
  );
};

export default CostingStep;