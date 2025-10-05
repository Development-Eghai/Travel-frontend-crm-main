import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel, Box } from '@mui/material';
import DesignStep from './steps/DesignStep';
import CustomerStep from './steps/CustomerStep';
import TripStep from './steps/TripStep';
import ItineraryStep from './steps/ItineraryStep';
import CostingStep from './steps/CostingStep';
import PoliciesStep from './steps/PoliciesStep';
import PaymentStep from './steps/PaymentStep';

const steps = ['Design', 'Customer', 'Trip Details', 'Itinerary', 'Costing', 'Policies', 'Payment'];

const QuotationBuilder = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!open) {
      setActiveStep(0);
      setFormData({});
    }
  }, [open]);

  const next = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setActiveStep(s => s + 1);
  };
  const back = () => setActiveStep(s => Math.max(0, s - 1));

  const handleSaveAndClose = async () => {
    try {
      await fetch('/api/quotations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Quotation Builder</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', px: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(s => (
              <Step key={s}><StepLabel>{s}</StepLabel></Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 3 }}>
            {activeStep === 0 && <DesignStep next={next} data={formData} />}
            {activeStep === 1 && <CustomerStep next={next} back={back} data={formData} />}
            {activeStep === 2 && <TripStep next={next} back={back} data={formData} />}
            {activeStep === 3 && <ItineraryStep next={next} back={back} data={formData} />}
            {activeStep === 4 && <CostingStep next={next} back={back} data={formData} />}
            {activeStep === 5 && <PoliciesStep next={next} back={back} data={formData} />}
            {activeStep === 6 && <PaymentStep next={next} back={back} data={formData} />}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {activeStep < steps.length - 1 && <Button onClick={() => setActiveStep(s => s + 1)}>Next</Button>}
        {activeStep === steps.length - 1 && <Button variant="contained" onClick={handleSaveAndClose}>Save & Send</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default QuotationBuilder;