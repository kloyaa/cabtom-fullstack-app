import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import successImg from "../images/success.gif";

function OrderSuccess() {
    const navigate = useNavigate();
  return<>
    <Flex
    width={"full"}
    justifyContent={"center"}
    justifyItems={"center"}
 >
        <Box mt={"40"}>
            <img src={successImg} alt={"Successfull order"}/>
           <Box mt={"20"}>
            <center>
                    <Heading size={"4xl"} color={"teal"}>SUCCESS!</Heading>
                    <Button size={"sm"} mt={"5"} colorScheme={"teal"} onClick={() => navigate("/dashboard")}>Go back</Button>
                </center>
            </Box>
        </Box>
    </Flex>
  </>
}

export default OrderSuccess
