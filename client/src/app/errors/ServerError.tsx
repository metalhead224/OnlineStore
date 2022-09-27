import { Button, Divider, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const ServerError = () => {

  const history = useHistory();
  const { state } = useLocation<any>();
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
      <Button onClick={() => history.push('/catalog')}>Go back to store</Button>
    </Container>
  )
}

export default ServerError