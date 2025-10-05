import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import InvoiceCustomer from './steps/InvoiceCustomer';
import InvoiceDetails from './steps/InvoiceDetails';
import InvoiceItems from './steps/InvoiceItems';
import InvoiceTerms from './steps/InvoiceTerms';
import InvoiceSummary from './steps/InvoiceSummary';
import RecordPaymentDialog from './steps/RecordPaymentDialog';

const InvoiceBuilder = ({ open, onClose }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [openPayment, setOpenPayment] = useState(false);

  useEffect(() => { if (!open) { setStep(0); setData({}); } }, [open]);

  const next = (d) => { setData(prev => ({ ...prev, ...d })); setStep(s => s + 1); };
  const back = () => setStep(s => Math.max(0, s - 1));

  const handleSave = async () => {
    try { await fetch('/api/invoices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); onClose(); } catch (err) { console.error(err); }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div>Invoice Builder</div>
          <Box>
            <Button>Preview</Button>
            <Button>Save Invoice</Button>
            <Button variant="contained" onClick={handleSave}>Send Invoice</Button>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {step === 0 && <InvoiceCustomer next={next} data={data} />}
        {step === 1 && <InvoiceDetails next={next} back={back} data={data} />}
        {step === 2 && <InvoiceItems next={next} back={back} data={data} />}
        {step === 3 && <InvoiceTerms next={next} back={back} data={data} />}
        {step === 4 && <InvoiceSummary data={data} onRecordPayment={() => setOpenPayment(true)} />}

        <RecordPaymentDialog open={openPayment} onClose={() => setOpenPayment(false)} invoice={data} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {step > 0 && <Button onClick={back}>Back</Button>}
        {step < 4 && <Button variant="contained" onClick={() => setStep(s => s + 1)}>Next</Button>}
        {step === 4 && <Button variant="contained" onClick={handleSave}>Save & Send</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceBuilder;