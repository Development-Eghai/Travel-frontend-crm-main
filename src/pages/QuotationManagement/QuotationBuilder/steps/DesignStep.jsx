import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const designs = [
  { id: 'modern', title: 'Modern Professional', desc: 'Clean blue theme' },
  { id: 'luxury', title: 'Luxury Gold', desc: 'Elegant gold theme' },
  { id: 'basic', title: 'Basic', desc: 'Simple template' },
];

const DesignStep = ({ next, data }) => {
  const [selected, setSelected] = React.useState(data.design || 'modern');

  return (
    <Box>
      <Typography variant="h6">Choose Template Design</Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {designs.map(d => (
          <Grid item key={d.id} xs={12} md={4}>
            <Card variant={selected === d.id ? 'elevation' : 'outlined'} sx={{ borderColor: selected === d.id ? 'primary.main' : undefined }} onClick={() => setSelected(d.id)}>
              <CardContent>
                <Typography variant="subtitle1">{d.title}</Typography>
                <Typography variant="body2" color="textSecondary">{d.desc}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant={selected === d.id ? 'contained' : 'outlined'} onClick={() => setSelected(d.id)}>Select</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => next({ design: selected })}>Next</Button>
      </Box>
    </Box>
  );
};

export default DesignStep;