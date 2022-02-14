import { Center, Heading, Flex, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import GameOverMessage from "../../components/GameOverMessage";
import japanese from "../../japanese.json";
import french from "../../french.json";
import { NextPage } from "next";
import Link from "next/link";

type FlashCard = {
  en: string;
  word: string;
};

const Game: NextPage = () => {
  const router = useRouter();
  const { language } = router.query;
  const [shuffledCards, setShuffledCards] = useState<FlashCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [failedCards, setFailedCards] = useState<FlashCard[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFalse, setIsFalse] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const getLanguage = () => {
        switch (language) {
          case "japanese":
            return japanese;
          case "french":
            return french;
          default:
            router.push("/404");
            return [];
        }
      };
      setShuffledCards(getLanguage().sort(() => Math.random() - 0.5));
    }
  }, [language, router]);

  const getNewCard = () => {
    currentCardIndex < shuffledCards.length - 1
      ? setCurrentCardIndex(currentCardIndex + 1)
      : setIsGameOver(true);
  };
  const getFailedCards = () => {
    setCurrentCardIndex(0);
    setIsGameOver(false);
    setShuffledCards(failedCards);
    setFailedCards([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    const handleCardSwitch = (setState: (value: boolean) => void) =>
      setTimeout(() => {
        setState(false);
        setGuess("");
        getNewCard();
      }, 900);

    e.preventDefault();
    const isCorrectGuess =
      guess.toLowerCase() === shuffledCards[currentCardIndex].en;
    if (isCorrectGuess) {
      setIsCorrect(true);
      handleCardSwitch(setIsCorrect);
    }
    if (!isCorrectGuess) {
      setIsFalse(true);
      setFailedCards([...failedCards, shuffledCards[currentCardIndex]]);
      handleCardSwitch(setIsFalse);
    }
  };
  return (
    <>
      <Center h="95vh" justifyContent="space-around" flexDir="column">
        {!isGameOver && (
          <Card>
            <Heading>{shuffledCards[currentCardIndex]?.word}</Heading>
          </Card>
        )}

        <Card>
          {!isGameOver && (
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="enter the english"
                _focus={{ _placeholder: { color: "transparent" } }}
                textAlign="center"
                border="none"
                size="lg"
                fontSize="2xl"
                color={isCorrect ? "green" : isFalse ? "red" : "inherit"}
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                focusBorderColor="green"
                cursor="pointer"
              />
            </form>
          )}

          {isGameOver && (
            <GameOverMessage
              failedCards={failedCards.length}
              getFailedCards={getFailedCards}
            />
          )}
        </Card>
      </Center>
      {isGameOver && (
        <Link passHref href="/">
          <Text
            textAlign="center"
            _hover={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Restart Game
          </Text>
        </Link>
      )}
    </>
  );
};

export default Game;
