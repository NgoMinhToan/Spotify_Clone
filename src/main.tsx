import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppContextProvider from './contexts/AppContext';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
