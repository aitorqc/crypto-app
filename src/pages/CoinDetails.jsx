import { Box, Container, RadioGroup, VStack, HStack, Radio, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Loader from '../components/Loader';
import ErrorComponent from '../components/ErrorComponent';
import Chart from '../components/Chart';
import { server } from '..';
import Footer from '../components/Footer';

export default function CoinDetails() {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol = currency === "usd" ? "$" : currency === "eur" ? "€" : "¥";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const params = useParams();

  const switchChartStats = (val) => {
    setDays(val);
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const chartData = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);

        setCoin(data);
        setChartArray(chartData.data.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id, days]);

  if (error) return <ErrorComponent message={"Error fetching data"} />;

  return (
    <>
      <Container maxW={"full"}>
        {
          loading ? <Loader /> :
            <>
              <Box width={"full"} borderWidth={1}>
                <Chart arr={chartArray} currency={currencySymbol} days={days} />
              </Box>

              <HStack p={"4"} overflow={"auto"}>
                {
                  btns.map((i) => (
                    <Button key={i} onClick={() => switchChartStats(i)}>{i}</Button>
                  ))
                }
              </HStack>

              <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"} color={"black"}>
                  <Radio value={"usd"}>USD</Radio>
                  <Radio value={"eur"}>EUR</Radio>
                  <Radio value={"jpy"}>YEN</Radio>
                </HStack>
              </RadioGroup>

              <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
                <Text fontSize={"medium"} alignItems="center" opacity={"0.7"}>
                  Last Update On {Date(coin.market_data.last_updated).split("G")[0]}
                </Text>

                <Image src={coin.image.large} w={"16"} h={"16"}
                  objectFit={"contain"} />

                <Stat>
                  <StatLabel>{coin.name}</StatLabel>
                  <StatNumber>
                    {currencySymbol}
                    {coin.market_data.current_price[currency]}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type={`${coin.market_data.price_change_percentage_24h < 0 ? "decrease" : "increase"}`} />
                    {coin.market_data.price_change_percentage_24h}%
                  </StatHelpText>
                </Stat>

                <Badge fontSize={"2xl"}
                  bgColor={"blackAlpha.800"}
                  color={"white"}>{`#${coin.market_cap_rank}`}</Badge>

                <CustomBar high={`${coin.market_data.high_24h[currency]}`}
                  low={`${coin.market_data.low_24h[currency]}`}
                  current={coin.market_data.current_price[currency]} />

                <Box w={"full"} p="4">
                  <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                  <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
                  <Item title={"Market Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                  <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                  <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
                </Box>
              </VStack>
            </>
        }
      </Container>
      <Footer />
    </>
  )
}

const CustomBar = ({ high, low, current }) => (
  <VStack w={"full"}>
    <Progress value={(current - low) * 100 / (high - low)} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"} textTransform={"uppercase"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
)
