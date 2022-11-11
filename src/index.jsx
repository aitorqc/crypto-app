import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, theme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>

);

export const server = "https://api.coingecko.com/api/v3";