import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '..'
import { Container, HStack, Button } from '@chakra-ui/react';

import Loader from '../components/Loader';
import ExchangeCard from '../components/ExchangeCard';
import ErrorComponent from '../components/ErrorComponent';

export default function Exchanges() {
  let numberPages = 100;
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [btns, setBtns] = useState(new Array(Math.floor(542 / numberPages)).fill(1));

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  useEffect(() => {
    calcPageNumber(window.innerWidth);

    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?per_page=${numberPages}&page=${page}`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchExchanges();
  }, [page]);

  function calcPageNumber(pw) {
    if (pw <= 648) {
      numberPages = 50;
      setBtns(new Array(Math.floor(542 / numberPages)).fill(1));
    } else {
      numberPages = 100;
      setBtns(new Array(Math.floor(542 / numberPages)).fill(1));
    }
  }

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
      <HStack w={"full"} overflow={"auto"} p={"8"}>
        {
          btns.map((item, index) => (
            <Button key={index}
              bgColor={(index + 1) === page ? "blackAlpha.300" : "blackAlpha.900"} color={"white"}
              onClick={() => changePage(index + 1)}>{index + 1}</Button>
          ))
        }
      </HStack>
    </Container>
  )
}
