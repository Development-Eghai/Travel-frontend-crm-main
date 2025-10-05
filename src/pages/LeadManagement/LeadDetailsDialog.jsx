import React, { useState, useEffect, useCallback } from 'react';
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
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const LeadDetailsDialog = ({ lead, open, onClose, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead || {});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // sync editedLead when prop changes
    setEditedLead(lead || {});
  }, [lead]);

  const fetchComments = useCallback(async () => {
    if (!lead || !lead.id) return;
    try {
      const response = await fetch(`/api/leads/${lead.id}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [lead]);

  const fetchDocuments = useCallback(async () => {
    if (!lead || !lead.id) return;
    try {
      const response = await fetch(`/api/leads/${lead.id}/documents`);
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }, [lead]);

  useEffect(() => {
    // sync editedLead when prop changes
    setEditedLead(lead || {});
  }, [lead]);

  useEffect(() => {
    if (!lead || !lead.id) return;
    fetchComments();
    fetchDocuments();
  }, [lead, fetchComments, fetchDocuments]);

  // fetchComments and fetchDocuments are defined above with useCallback

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
    try {
    if (!lead || !lead.id) return;
    const response = await fetch(`/api/leads/${lead.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedLead),
      });
      
      if (response.ok) {
        setIsEditing(false);
        onRefresh();
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const handleAddComment = async () => {
    if (!lead || !lead.id) return;
    try {
      await fetch(`/api/leads/${lead.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleFileUpload = async (event) => {
  if (!lead || !lead.id) return;
  const file = event.target.files[0];
  if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploaded_by', 1); // Replace with actual user ID

    try {
      await fetch(`/api/leads/${lead.id}/documents`, {
        method: 'POST',
        body: formData,
      });
      fetchDocuments();
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Lead Details</Typography>
          <Box>
            {!isEditing && (
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
                      value={editedLead.status}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      <MenuItem value="New">New</MenuItem>
                      <MenuItem value="Contacted">Contacted</MenuItem>
                      <MenuItem value="Quotation Sent">Quotation Sent</MenuItem>
                      <MenuItem value="Awaiting Payment">Awaiting Payment</MenuItem>
                      <MenuItem value="Failed">Failed</MenuItem>
                      <MenuItem value="Booked">Booked</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={editedLead.priority}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Assigned To</InputLabel>
                    <Select
                      name="assigned_to"
                      value={editedLead.assigned_to}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      {/* Add your user list here */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Follow-up Date"
                      value={editedLead.follow_up_date}
                      onChange={(value) => handleDateChange('follow_up_date', value)}
                      disabled={!isEditing}
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
                    value={editedLead.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={editedLead.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={editedLead.mobile}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Comments Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Comments</Typography>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleAddComment}
                  sx={{ mt: 1 }}
                >
                  Add Comment
                </Button>
              </Box>
              <List>
                {comments.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem>
                      <ListItemText
                        primary={comment.user_name}
                        secondary={comment.comment}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Quick Actions Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary">Create Quotation</Button>
                <Button variant="contained" color="primary">Create Invoice</Button>
                <Button variant="contained" color="success">Send WhatsApp</Button>
                <Button variant="contained">Send Email</Button>
              </Box>
            </Paper>
          </Grid>

          {/* Travel Preferences Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Travel Preferences</Typography>
              <Grid container spacing={2}>
                {/* Add your travel preferences fields here */}
              </Grid>
            </Paper>
          </Grid>

          {/* Linked Documents Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Linked Documents</Typography>
              <Box sx={{ mb: 2 }}>
                <input
                  type="file"
                  id="document-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <label htmlFor="document-upload">
                  <Button variant="contained" component="span">
                    Add Document
                  </Button>
                </label>
              </Box>
              <List>
                {documents.map((doc) => (
                  <ListItem key={doc.id}>
                    <ListItemText primary={doc.file_name} />
                    <Button size="small">Download</Button>
                  </ListItem>
                ))}
              </List>
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