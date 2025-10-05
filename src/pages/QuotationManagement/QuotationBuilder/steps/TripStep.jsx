import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid, Autocomplete, Button } from '@mui/material';

const TripStep = ({ next, back, data }) => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [title, setTitle] = useState(data.title || '');
  const [overview, setOverview] = useState(data.overview || '');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch('/api/trips');
        const json = await res.json();
        setTrips(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    if (data.trip_id) {
      const t = trips.find(x => x.id === data.trip_id);
      if (t) setSelectedTrip(t);
    }
  }, [trips]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={trips}
            getOptionLabel={(opt) => opt.title || ''}
            value={selectedTrip}
            onChange={(e, v) => { setSelectedTrip(v); setTitle(v?.title || ''); setOverview(v?.overview || ''); }}
            renderInput={(params) => <TextField {...params} label="Select Published Trip (optional)" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Display Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={4} label="Overview" value={overview} onChange={(e) => setOverview(e.target.value)} />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={back}>Back</Button>
        <Button variant="contained" onClick={() => next({ trip_id: selectedTrip?.id, title, overview, trip: selectedTrip })}>Next</Button>
      </Box>
    </Box>
  );
};

export default TripStep;