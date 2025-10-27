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
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LeadDetailsDialog from './LeadDetailsDialog';

const LeadTable = ({ leads, onRefresh, onDeleteLead }) => {
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

  // ✅ Delete now calls parent handler
  const handleDelete = async () => {
    const leadToDelete = leads.find((l) => l.id === selectedLeadId);
    if (!leadToDelete) {
      console.warn('⚠️ Lead not found for deletion');
      handleClose();
      return;
    }

    console.log('🗑️ Deleting lead:', leadToDelete);

    await onDeleteLead(leadToDelete); // calls the function from LeadManagement.jsx
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

  const handleWhatsApp = () => {
    // TODO: implement WhatsApp integration
    handleClose();
  };

  const handleEmail = () => {
    // TODO: implement email functionality
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
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
            {leads.map((lead, index) => (
              <TableRow key={lead.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box>
                    <strong>{lead.name}</strong>
                    <br />
                    {lead.email}
                    <br />
                    {lead.mobile}
                  </Box>
                </TableCell>
                <TableCell>{lead.destination_type}</TableCell>
                <TableCell>{lead.trip_type}</TableCell>
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
                <TableCell>
                  {lead.follow_up_date
                    ? new Date(lead.follow_up_date).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell>
                  {lead.created_at
                    ? new Date(lead.created_at).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleActionClick(e, lead.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() =>
            handleView(leads.find((l) => l.id === selectedLeadId))
          }
        >
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} /> View
        </MenuItem>
        <MenuItem onClick={() => handleEdit(selectedLeadId)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
        <MenuItem onClick={() => handleCreateQuotation(selectedLeadId)}>
          Create Quotation
        </MenuItem>
        <MenuItem onClick={() => handleCreateInvoice(selectedLeadId)}>
          Create Invoice
        </MenuItem>
        <MenuItem onClick={() => handleWhatsApp(selectedLeadId)}>
          <WhatsAppIcon fontSize="small" sx={{ mr: 1 }} /> Send WhatsApp
        </MenuItem>
        <MenuItem onClick={() => handleEmail(selectedLeadId)}>
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
