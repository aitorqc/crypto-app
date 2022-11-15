import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '..'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';

import Loader from '../components/Loader';
import ErrorComponent from '../components/ErrorComponent';
import CoinCard from '../components/CoinCard';

export default function Coins() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("usd");

    const currencySymbol = currency === "usd" ? "$" : currency === "eur" ? "€" : "¥";

    const btns = new Array(132).fill(1);

    const changePage = (page) => {
        setPage(page);
        setLoading(true);
    }

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                setCoins(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchCoins();
    }, [currency, page])

    if (error) return <ErrorComponent message={"Error fetching data"} />;

    return (
        <Container maxW={"full"} bgColor={"#333"}>
            {
                loading
                    ? <Loader /> :
                    <>
                        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                            <HStack spacing={"4"} color={"white"}>
                                <Radio value={"usd"}>USD</Radio>
                                <Radio value={"eur"}>EUR</Radio>
                                <Radio value={"jpy"}>YEN</Radio>
                            </HStack>
                        </RadioGroup>

                        <HStack wrap={"wrap"} justifyContent={"center"}>
                            {coins.map((i) => {
                                return <CoinCard key={i.id}
                                    id={i.id}
                                    name={i.name}
                                    img={i.image}
                                    symbol={i.symbol}
                                    price={i.current_price}
                                    currencySymbol={currencySymbol} />
                            })}
                        </HStack>

                        <HStack w={"full"} overflow={"auto"} p={"8"}>
                            {
                                btns.map((item, index) => (
                                    <Button key={index}
                                        bgColor={(index + 1) === page ? "blackAlpha.300" : "blackAlpha.900"} color={"white"}
                                        onClick={() => changePage(index + 1)}>{index + 1}</Button>
                                ))
                            }
                        </HStack>
                    </>
            }
        </Container>
    )
}
