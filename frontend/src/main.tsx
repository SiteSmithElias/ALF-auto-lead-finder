import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "./context/ThemeContext";
import './index.css'
import App from './app/App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime:1000 * 60 * 5,
            retry:1
        }
    }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
