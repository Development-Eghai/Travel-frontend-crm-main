import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid, Button, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ItineraryStep = ({ next, back, data }) => {
  const [days, setDays] = useState(data.itinerary || [{ day: 1, title: '', desc: '' }]);

  const addDay = () => setDays(prev => [...prev, { day: prev.length + 1, title: '', desc: '' }]);
  const removeDay = (idx) => setDays(prev => prev.filter((_, i) => i !== idx));

  const updateDay = (idx, key, value) => setDays(prev => prev.map((d, i) => i === idx ? { ...d, [key]: value } : d));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <h3>Day-wise Itinerary</h3>
        <Button variant="contained" onClick={addDay}>+ Add Day</Button>
      </Box>

      {days.map((d, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label={`Day ${i + 1} Title`} value={d.title} onChange={(e) => updateDay(i, 'title', e.target.value)} />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField fullWidth label={`Day ${i + 1} Description`} value={d.desc} onChange={(e) => updateDay(i, 'desc', e.target.value)} multiline rows={3} />
              </Grid>
              <Grid item xs={12} md={1}>
                <IconButton onClick={() => removeDay(i)}><DeleteIcon /></IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={back}>Back</Button>
        <Button variant="contained" onClick={() => next({ itinerary: days })}>Next</Button>
      </Box>
    </Box>
  );
};

export default ItineraryStep;