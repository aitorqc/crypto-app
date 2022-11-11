import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

export default function ErrorComponent({ message }) {
  return (
    <Alert status='error'
      w={"full"}>
      <AlertIcon />
      {message}
    </Alert>
  )
}
