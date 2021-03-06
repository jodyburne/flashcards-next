import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Container maxW={{ base: "container.xl" }}>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
