import { Button, Divider, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ServerError = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant='h5' gutterBottom color='error'>{state.error.title}</Typography>
          <Divider />
          <Typography>{state.error.detail || 'internal server error'}</Typography>
        </>
      ) : (
        <Typography variant='h5' gutterBottom>Server error</Typography>
      )}
      <Button onClick={() => navigate('/catalog')}>Go back to store</Button>
    </Container>
  )
}

export default ServerError