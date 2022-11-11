import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

export default function Loader() {
  return (
    <VStack h={"90vh"} justifyContent={"center"}>
      <Box transform={"scale(3)"}>
        <Spinner size={"xl"} thickness={"5px"}/>
      </Box>
    </VStack>
  )
}
