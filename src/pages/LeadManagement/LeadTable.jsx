import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Menu,
  MenuItem,
  Checkbox,
  Tooltip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import LeadDetailsDialog from './LeadDetailsDialog';

const LeadTable = ({ leads, selectedLeads, toggleSelectLead, onRefresh, onDeleteLead }) => {
  const [selectedLead, setSelectedLead] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLeadId, setSelectedLeadId] = React.useState(null);

  const handleActionClick = (event, leadId) => {
    setAnchorEl(event.currentTarget);
    setSelectedLeadId(leadId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedLeadId(null);
  };

  const handleView = (lead) => {
    setSelectedLead(lead);
    handleClose();
  };

  const handleEdit = async () => {
    // TODO: implement edit functionality
    handleClose();
  };

  const handleDelete = async () => {
    const leadToDelete = leads.find((l) => l.id === selectedLeadId);
    if (!leadToDelete) {
      console.warn('⚠️ Lead not found for deletion');
      handleClose();
      return;
    }

    await onDeleteLead(leadToDelete);
    handleClose();
  };

  const handleCreateQuotation = () => {
    // TODO: implement quotation creation
    handleClose();
  };

  const handleCreateInvoice = () => {
    // TODO: implement invoice creation
    handleClose();
  };

  const handleWhatsApp = (lead) => {
    const phoneNumber = lead.mobile.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${lead.name}, Thank you for your interest in our travel packages!`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    handleClose();
  };

  const handleEmail = (lead) => {
    const subject = encodeURIComponent('Regarding Your Travel Enquiry');
    const body = encodeURIComponent(`Dear ${lead.name},\n\nThank you for contacting us.\n\nBest regards,\nIndian Mountain Rovers`);
    window.open(`mailto:${lead.email}?subject=${subject}&body=${body}`, '_blank');
    handleClose();
  };

  const getPriorityColor = (priority) => {
    const p = (priority || '').toLowerCase();
    switch (p) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'new':
        return 'info';
      case 'contacted':
        return 'warning';
      case 'quoted':
        return 'secondary';
      case 'booked':
        return 'success';
      default:
        return 'default';
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'Booking Request':
        return 'primary';
      case 'Website Enquiry':
        return 'success';
      case 'Manual Entry':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '-';
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 400px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox disabled />
              </TableCell>
              <TableCell>S.No</TableCell>
              <TableCell>Lead Info</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Trip Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Follow-up Date</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <Box sx={{ py: 4 }}>
                    <InfoIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Box>No leads found. Try adjusting your filters.</Box>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead, index) => (
                <TableRow 
                  key={lead.id}
                  sx={{ 
                    backgroundColor: lead.type !== 'lead' ? 'rgba(0, 0, 0, 0.02)' : 'inherit',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => toggleSelectLead(lead.id)}
                      disabled={lead.type !== 'lead'}
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Box className="lead-info-cell">
                      <strong>{lead.name}</strong>
                      <small>{lead.email}</small>
                      <small>{lead.mobile}</small>
                    </Box>
                  </TableCell>
                  <TableCell>{lead.destination_type}</TableCell>
                  <TableCell>
                    <Tooltip title={lead.additional_info ? JSON.stringify(lead.additional_info, null, 2) : ''}>
                      <span>{lead.trip_type}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={lead.status}
                      color={getStatusColor(lead.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={lead.priority}
                      color={getPriorityColor(lead.priority)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{lead.assigned_to}</TableCell>
                  <TableCell>{formatDate(lead.follow_up_date)}</TableCell>
                  <TableCell>{formatDate(lead.created_at)}</TableCell>
                  <TableCell>
                    <Chip
                      label={lead.source}
                      color={getSourceColor(lead.source)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleActionClick(e, lead.id)} size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            const lead = leads.find((l) => l.id === selectedLeadId);
            handleView(lead);
          }}
        >
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} /> View Details
        </MenuItem>
        {leads.find((l) => l.id === selectedLeadId)?.type === 'lead' && (
          <>
            <MenuItem onClick={() => handleEdit(selectedLeadId)}>
              <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </>
        )}
        <MenuItem onClick={() => handleCreateQuotation(selectedLeadId)}>
          Create Quotation
        </MenuItem>
        <MenuItem onClick={() => handleCreateInvoice(selectedLeadId)}>
          Create Invoice
        </MenuItem>
        <MenuItem 
          onClick={() => {
            const lead = leads.find((l) => l.id === selectedLeadId);
            handleWhatsApp(lead);
          }}
        >
          <WhatsAppIcon fontSize="small" sx={{ mr: 1 }} /> Send WhatsApp
        </MenuItem>
        <MenuItem 
          onClick={() => {
            const lead = leads.find((l) => l.id === selectedLeadId);
            handleEmail(lead);
          }}
        >
          <EmailIcon fontSize="small" sx={{ mr: 1 }} /> Send Email
        </MenuItem>
      </Menu>

      {/* Lead Details Dialog */}
      {selectedLead && (
        <LeadDetailsDialog
          lead={selectedLead}
          open={Boolean(selectedLead)}
          onClose={() => setSelectedLead(null)}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

export default LeadTable;