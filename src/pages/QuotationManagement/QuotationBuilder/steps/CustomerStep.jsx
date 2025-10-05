import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid, Button, Autocomplete } from '@mui/material';

const CustomerStep = ({ next, back, data }) => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [agent, setAgent] = useState(data.agent || null);
  const [company, setCompany] = useState(data.company || {});

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads');
        const json = await res.json();
        setLeads(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    if (data.customer_id) {
      const l = leads.find(x => x.id === data.customer_id);
      if (l) setSelectedLead(l);
    }
  }, [leads]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={leads}
            getOptionLabel={(opt) => opt.name + ' (' + opt.email + ')'}
            value={selectedLead}
            onChange={(e, v) => setSelectedLead(v)}
            renderInput={(params) => <TextField {...params} label="Select Lead (searchable)" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Client Name" value={selectedLead?.name || ''} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Client Email" value={selectedLead?.email || ''} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Client Mobile" value={selectedLead?.mobile || ''} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Agent Name" value={agent?.name || ''} onChange={(e) => setAgent(prev => ({ ...(prev || {}), name: e.target.value }))} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Agent Email" value={agent?.email || ''} onChange={(e) => setAgent(prev => ({ ...(prev || {}), email: e.target.value }))} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Company Name" value={company?.name || ''} onChange={(e) => setCompany(prev => ({ ...(prev || {}), name: e.target.value }))} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Company Email" value={company?.email || ''} onChange={(e) => setCompany(prev => ({ ...(prev || {}), email: e.target.value }))} />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={back}>Back</Button>
        <Button variant="contained" onClick={() => next({ customer_id: selectedLead?.id, customer: selectedLead, agent, company })}>Next</Button>
      </Box>
    </Box>
  );
};

export default CustomerStep;