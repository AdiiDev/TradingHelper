import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import ReactHookFormMultiSelect from '../common/ReactHookFormMultiSelect';

const NewChartsDialog = ({ setOptions, singleMode, onCancel, onConfirm }) => {
  const {
    register,
    handleSubmit,
    control
  } = useForm({
    defaultValues: { selectedNumbers: [2, 3] }
  })
  const options = [{ id: 1, label: 'Test1', val: 1 }, { id: 2, label: 'Test2', val: 2 }, { id: 3, label: 'Test3', val: 3 }, { id: 4, label: 'Test4', val: 4 },]
  return (
    <div>
      <Dialog open={true} onClose={() => onCancel()}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <ReactHookFormMultiSelect control={control} name="selectedNumbers" label="Test multiselect" options={options} optionsKeyProp="id" optionsValueProp="val" optionsLabelProp="label" />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onCancel()}>Cancel</Button>
          <Button onClick={() => { }}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewChartsDialog