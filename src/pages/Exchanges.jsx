import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '..'
import { Container, HStack } from '@chakra-ui/react';

import Loader from '../components/Loader';
import ExchangeCard from '../components/ExchangeCard';
import ErrorComponent from '../components/ErrorComponent';

export default function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchExchanges();
  }, [])

  if (error) return <ErrorComponent message={"Error fetching data"} />;

  return (
    <Container maxW={"full"} bgColor={"#333"}>
      {
        loading
          ? <Loader /> :
          <>
            <HStack wrap={"wrap"} justifyContent={"center"}>
              {exchanges.map((i) => {
                return <ExchangeCard key={i.id}
                  name={i.name}
                  img={i.image}
                  rank={i.trust_score_rank}
                  url={i.url} />
              })}
            </HStack>
          </>
      }
    </Container>
  )
}
