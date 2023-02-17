import React from "react";
import { Center } from "@chakra-ui/react";

const MainDisplay = (props) => {
  return (
    <Center bg="blue.50" h={{ base: "auto", lg: "95%" }}>
      {props.children}
    </Center>
  );
};

export default MainDisplay;
