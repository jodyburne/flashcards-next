import { Button, Heading } from "@chakra-ui/react";

const GameOverMessage: React.VFC<{
  failedCards: number;
  getFailedCards: () => void;
}> = ({ failedCards, getFailedCards }) => {
  return failedCards ? (
    <Button onClick={() => getFailedCards()}>Redo failed cards?</Button>
  ) : (
    <Heading animation={"success 2s infinite"}>Yay!</Heading>
  );
};

export default GameOverMessage;
