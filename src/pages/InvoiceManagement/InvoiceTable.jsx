import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const InvoiceTable = ({ invoices, onRefresh }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenMenu = (e, id) => { setAnchorEl(e.currentTarget); setSelectedId(id); };
  const handleCloseMenu = () => { setAnchorEl(null); setSelectedId(null); };

  const handleDelete = async (id) => {
    try { await fetch(`/api/invoices/${id}`, { method: 'DELETE' }); onRefresh(); } catch (err) { console.error(err); }
    handleCloseMenu();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Invoice No</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Issue Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((inv, i) => (
            <TableRow key={inv.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{inv.invoice_no}</TableCell>
              <TableCell>{inv.customer_name}</TableCell>
              <TableCell>{new Date(inv.issue_date).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(inv.due_date).toLocaleDateString()}</TableCell>
              <TableCell>{inv.total}</TableCell>
              <TableCell>{inv.status}</TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleOpenMenu(e, inv.id)}><MoreVertIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => { /* view */ handleCloseMenu(); }}><VisibilityIcon sx={{ mr: 1 }} /> View</MenuItem>
        <MenuItem onClick={() => { /* edit */ handleCloseMenu(); }}><EditIcon sx={{ mr: 1 }} /> Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(selectedId)}><DeleteIcon sx={{ mr: 1 }} /> Delete</MenuItem>
        <MenuItem onClick={() => { /* whatsapp */ handleCloseMenu(); }}><WhatsAppIcon sx={{ mr: 1 }} /> Send Whatsapp</MenuItem>
        <MenuItem onClick={() => { /* email */ handleCloseMenu(); }}><EmailIcon sx={{ mr: 1 }} /> Send Email</MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default InvoiceTable;