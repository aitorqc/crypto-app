import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btc from '../assets/btc.png'
import Footer from '../components/Footer'

export default function Home() {

  return (
    <>
      <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
        <Image w={"full"} h={"full"} objectFit={"contain"} src={btc} />
        <Text fontSize={"6xl"}
          textAlign={"center"}
          fontWeight={"thin"}
          color={"whiteAlpha.700"}
          mt={"-20"}>Xcrypto</Text>
      </Box>
      <Footer />
    </>
  )
}
