import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const QuotationTable = ({ quotations, onRefresh }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenMenu = (e, id) => {
    setAnchorEl(e.currentTarget);
    setSelectedId(id);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/quotations/${id}`, { method: 'DELETE' });
      onRefresh();
    } catch (err) { console.error(err); }
    handleCloseMenu();
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await fetch(`/api/quotations/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      onRefresh();
    } catch (err) { console.error(err); }
    handleCloseMenu();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Quote ID</TableCell>
            <TableCell>Lead Info</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quotations.map((q, i) => (
            <TableRow key={q.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{q.quote_id}</TableCell>
              <TableCell>
                <div>{q.customer_name}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{q.customer_email}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{q.customer_phone}</div>
              </TableCell>
              <TableCell>{new Date(q.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{q.amount}</TableCell>
              <TableCell>{q.status}</TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleOpenMenu(e, q.id)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => { /* view */ handleCloseMenu(); }}><VisibilityIcon sx={{ mr: 1 }} /> View</MenuItem>
        <MenuItem onClick={() => { /* edit */ handleCloseMenu(); }}><EditIcon sx={{ mr: 1 }} /> Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(selectedId)}><DeleteIcon sx={{ mr: 1 }} /> Delete</MenuItem>
        <MenuItem onClick={() => handleUpdateStatus(selectedId, 'Sent')}>Update Status: Sent</MenuItem>
        <MenuItem onClick={() => handleUpdateStatus(selectedId, 'Accepted')}>Update Status: Accepted</MenuItem>
        <MenuItem onClick={() => handleUpdateStatus(selectedId, 'Rejected')}>Update Status: Rejected</MenuItem>
        <MenuItem onClick={() => handleUpdateStatus(selectedId, 'Invoiced')}>Update Status: Invoiced</MenuItem>
        <MenuItem onClick={() => { /* whatsapp */ handleCloseMenu(); }}><WhatsAppIcon sx={{ mr: 1 }} /> Send to WhatsApp</MenuItem>
        <MenuItem onClick={() => { /* email */ handleCloseMenu(); }}><EmailIcon sx={{ mr: 1 }} /> Send to Email</MenuItem>
        <MenuItem onClick={() => { /* create invoice */ handleCloseMenu(); }}>Create Invoice</MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default QuotationTable;