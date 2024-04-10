import React from 'react';
import Card from '@mui/material/Card';
import { Grid, Stack, TextField } from '@mui/material';

export default function AddReportCardTwo({ formRef, onSubmit, formData, setFormData }) {
  function handleSubmit(event, formData) {
    event.preventDefault();
    onSubmit(formData);
  }

  function handleInputChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <>
      <Card sx={{ position: 'relative', margin: 0, gap: 4, mb: 1, ml: -2, width: '103%' }}>
        <form ref={formRef} onSubmit={(event) => handleSubmit(event, formData)}>
          <Stack spacing={3} sx={{ position: 'relative', margin: 5, gap: 4, ml: 5, width: '90%' }}>
            <Grid container item xs={10} sm={10} md={10} spacing={3}>
              <TextField
                fullWidth
                label="Diagnosis"
                variant="outlined"
                name="diagnosis"
                required
                value={formData?.diagnosis || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid container item xs={10} sm={10} md={10} spacing={3}>
              <TextField
                fullWidth
                label="Prescription"
                variant="outlined"
                name="prescription"
                required
                value={formData?.prescription || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid container item xs={10} sm={10} md={10} spacing={3}>
              <TextField
                fullWidth
                label="Routine Advice"
                variant="outlined"
                name="routine_advice"
                required
                multiline
                rows={4}
                value={formData?.routine_advice || ''}
                onChange={handleInputChange}
              />
            </Grid>
          </Stack>
        </form>
      </Card>
    </>
  );
}
