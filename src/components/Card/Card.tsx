import { Box } from "@chakra-ui/react";

const Card: React.FC = ({ children }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    w={{ base: "2xs", md: "sm" }}
    h={{ base: "2xs", md: "xs" }}
    bg="white"
    borderRadius="xl"
    m="10"
  >
    {children}
  </Box>
);

export default Card;
