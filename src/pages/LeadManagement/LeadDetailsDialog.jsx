import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  Chip,
  Alert,
} from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const LeadDetailsDialog = ({ lead, open, onClose, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead || {});

  useEffect(() => {
    setEditedLead(lead || {});
  }, [lead]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLead(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, value) => {
    setEditedLead(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!lead || !lead.id || lead.type !== 'lead') {
      alert('Only manual leads can be edited.');
      return;
    }

    try {
      const API_KEY = 'bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M';
      const response = await fetch(`https://api.yaadigo.com/secure/api/leads/${lead.source_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(editedLead),
      });
      
      if (response.ok) {
        setIsEditing(false);
        onRefresh();
        alert('✅ Lead updated successfully!');
      } else {
        alert('❌ Failed to update lead.');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      alert('❌ Error updating lead.');
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = lead.mobile.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${lead.name}, Thank you for your interest!`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('Regarding Your Travel Enquiry');
    const body = encodeURIComponent(`Dear ${lead.name},\n\nThank you for contacting us.\n\nBest regards,\nIndian Mountain Rovers`);
    window.open(`mailto:${lead.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const canEdit = lead?.type === 'lead';
  const isReadOnly = !canEdit || !isEditing;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Lead Details</Typography>
          <Box>
            {canEdit && !isEditing && (
              <IconButton onClick={() => setIsEditing(true)} sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Source Information */}
          <Grid item xs={12}>
            <Alert severity="info">
              <strong>Source:</strong> {lead.source} | <strong>Type:</strong> {lead.type.toUpperCase()}
              {!canEdit && ' (Read-only)'}
            </Alert>
          </Grid>

          {/* Lead Management Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Lead Management</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={editedLead.status || 'new'}
                      onChange={handleInputChange}
                      disabled={isReadOnly}
                    >
                      <MenuItem value="new">New</MenuItem>
                      <MenuItem value="contacted">Contacted</MenuItem>
                      <MenuItem value="quoted">Quotation Sent</MenuItem>
                      <MenuItem value="awaiting">Awaiting Payment</MenuItem>
                      <MenuItem value="failed">Failed</MenuItem>
                      <MenuItem value="booked">Booked</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={editedLead.priority || 'medium'}
                      onChange={handleInputChange}
                      disabled={isReadOnly}
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Assigned To"
                    name="assigned_to"
                    value={editedLead.assigned_to || 'Unassigned'}
                    onChange={handleInputChange}
                    disabled={isReadOnly}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Follow-up Date"
                      value={editedLead.follow_up_date}
                      onChange={(value) => handleDateChange('follow_up_date', value)}
                      disabled={isReadOnly}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Contact Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={editedLead.name || ''}
                    onChange={handleInputChange}
                    disabled={isReadOnly}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={editedLead.email || ''}
                    onChange={handleInputChange}
                    disabled={isReadOnly}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={editedLead.mobile || ''}
                    onChange={handleInputChange}
                    disabled={isReadOnly}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Travel Information */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Travel Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Destination Type"
                    value={editedLead.destination_type || '-'}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Trip Type"
                    value={editedLead.trip_type || '-'}
                    disabled
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Additional Information */}
          {lead.additional_info && (
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Additional Information</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {Object.entries(lead.additional_info).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        {key.replace(/_/g, ' ').toUpperCase()}:
                      </Typography>
                      <Typography variant="body2">
                        {value || '-'}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          )}

          {/* Quick Actions Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" color="primary">Create Quotation</Button>
                <Button variant="contained" color="primary">Create Invoice</Button>
                <Button variant="contained" color="success" onClick={handleWhatsApp}>
                  Send WhatsApp
                </Button>
                <Button variant="contained" onClick={handleEmail}>
                  Send Email
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {isEditing && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsDialog;