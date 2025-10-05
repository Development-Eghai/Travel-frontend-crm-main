import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import LeadDetailsDialog from './LeadDetailsDialog';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const STATUSES = ['New', 'Contacted', 'Quotation Sent', 'Awaiting Payment', 'Booked', 'Failed'];

const LeadKanban = ({ leads, onRefresh }) => {
  const [selectedLead, setSelectedLead] = useState(null);

  const groupedLeads = STATUSES.reduce((acc, status) => {
    acc[status] = leads?.filter(lead => lead.status === status);
    return acc;
  }, {});

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = STATUSES[destination.droppableId];
    
    try {
      await fetch(`/api/leads/${draggableId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      onRefresh();
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box sx={{ display: 'flex', gap: 2, overflow: 'auto', p: 2 }}>
        {STATUSES.map((status, columnIndex) => (
          <Droppable droppableId={columnIndex.toString()} key={status}>
            {(provided) => (
              <Paper
                sx={{
                  width: 300,
                  minHeight: 500,
                  p: 2,
                  backgroundColor: '#f5f5f5',
                }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Typography variant="h6" gutterBottom>
                  {status} ({groupedLeads[status]?.length || 0})
                </Typography>
                {groupedLeads[status]?.map((lead, index) => (
                  <Draggable
                    key={lead.id}
                    draggableId={lead.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ mb: 2 }}
                      >
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom>
                            {lead.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {lead.email}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {lead.mobile}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip
                              label={lead.priority}
                              size="small"
                              color={getPriorityColor(lead.priority)}
                              sx={{ mr: 1 }}
                            />
                            <Chip
                              label={lead.destination_type}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton
                              size="small"
                              onClick={() => setSelectedLead(lead)}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        ))}
      </Box>

      {selectedLead && (
        <LeadDetailsDialog
          lead={selectedLead}
          open={Boolean(selectedLead)}
          onClose={() => setSelectedLead(null)}
          onRefresh={onRefresh}
        />
      )}
    </DragDropContext>
  );
};

export default LeadKanban;