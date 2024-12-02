import {SessionProvider } from 'next-auth/react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PortProvider } from '@/context/PortCompatibilityContex';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { MessageProvider } from '@/context/MessageContext';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Aos.init()
  }, [])
  return (
  <SessionProvider session={pageProps.session}>
    
    <MessageProvider>
      
        <Component {...pageProps} />
      
    </MessageProvider>

  </SessionProvider>
  )
}
