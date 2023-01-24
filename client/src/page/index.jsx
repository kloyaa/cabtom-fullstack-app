import React from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  SimpleGrid,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  Icon,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Carousel from "../component/carousel.component";
import { useNavigate } from "react-router-dom";
import img1 from "../images/px-img-1.jpg";
import img2 from "../images/px-img-2.jpg";
import img3 from "../images/px-img-3.jpg";
import img4 from "../images/px-img-4.jpg";
import img5 from "../images/px-img-5.jpg";
import img6 from "../images/px-img-6.jpg";
import img7 from "../images/px-img-7.jpg";
import img8 from "../images/px-img-8.jpg";
import img9 from "../images/px-img-9.jpg";
import img10 from "../images/px-img-10.jpg";
import img11 from "../images/px-img-11.jpg";
import Testimonial from "../component/testimonial.component";
import Footer from "../component/footer.component";
import { MdCheckCircle } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export const Navbar = ({
  colorMode,
  toggleColorMode,
  isOpen,
  onOpen,
  onClose,
  title,
}) => {
  const navigate = useNavigate();
  return (
    <Box bg={useColorModeValue("white", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box
          fontWeight={"black"}
          color={useColorModeValue("teal", "gray.300")}
          cursor={"pointer"}
          onClick={() => navigate("/")}
        >
          {title}
        </Box>

        <Flex alignItems={"center"}>
          <Box
            color={useColorModeValue("teal", "gray.300")}
            fontSize={{ base: "smaller", md: "small" }}
            fontWeight={{ base: "medium", md: "normal" }}
            mr={{ base: "5", md: "10" }}
            cursor={"pointer"}
            onClick={() => navigate("/user/login")}
          >
            ACCOUNT
          </Box>
          <Box
            color={useColorModeValue("teal", "gray.300")}
            fontSize={{ base: "smaller", md: "small" }}
            fontWeight={{ base: "medium", md: "normal" }}
            mr={{ base: "5", md: "10" }}
            cursor={"pointer"}
            onClick={() => navigate("/about")}
          >
            ABOUT US
          </Box>
          <Button
            bg={useColorModeValue("teal", "gray.800")}
            onClick={toggleColorMode}
          >
            {" "}
            {colorMode === "light" ? (
              <MoonIcon color={"white"} />
            ) : (
              <SunIcon />
            )}{" "}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

const cards = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
];

function Main() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toggleBanner, setToggleBanner] = useState(true);

  const navigate = useNavigate();

  return (
    <>
      <Navbar
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={"CABTOM"}
      />
      {toggleBanner && <Flex
        p={"7"}
        bg={"yellow"}
        justify={"space-between"}
        alignContent={"start"}
        px={{ base: "10", md: "28" }}
      >
        <Box>
          <Heading color={"black"}>2023 SALE!</Heading>
          <Text
            color={"black"}
            fontSize={{ base: "small", md: "medium" }}
            maxW={"5xl"}
          >
            Get ready for the biggest corn sale of the year! Starting January
            1st, 2023, all corn products will be discounted by 50%! Don't miss
            out on this amazing opportunity to stock up on your favorite corn
            products. Offer valid while supplies last.
          </Text>
        </Box>
        <Icon
          as={IoIosClose}
          h={20}
          w={20}
          color={"black"}
          cursor={"pointer"}
          onClick={() => setToggleBanner(!toggleBanner)}/>
      </Flex>}

      <SimpleGrid columns={{ base: 0, md: 2 }}>
        <Carousel cards={cards} />
        <Box px={{ base: "16", md: "28" }} pt={{ base: 0, md: "16" }} pb={{base: "28", md: 0}}>
          <Heading
            mt={{ base: "12", md: 0 }}
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "20%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "teal",
                zIndex: -1,
              }}
            >
              Why choose us as your
            </Text>
            <br />
            <Text
              as={"span"}
              fontWeight={"bold"}
              color={useColorModeValue("teal", "gray.300")}
            >
              preferred provider of corn products?
            </Text>
          </Heading>

          <List spacing={5} mt={"10"}>
            <ListItem
              fontSize={"large"}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              <ListIcon as={MdCheckCircle} color="teal" />
              Quality: We take pride in providing top-quality corn that is
              fresh, flavorful, and free from pests and diseases.
            </ListItem>
            <ListItem
              fontSize={"large"}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              <ListIcon as={MdCheckCircle} color="teal" />
              Variety: We offer a wide range of corn varieties, including sweet
              corn, popcorn, and cornmeal, so you can choose the best option for
              your needs.
            </ListItem>
            <ListItem
              fontSize={"large"}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              <ListIcon as={MdCheckCircle} color="teal" />
              Sustainability: Our farming practices are sustainable and
              environmentally friendly, so you can feel good about supporting
              our company.
            </ListItem>
            <ListItem
              fontSize={"large"}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              <ListIcon as={MdCheckCircle} color="teal" />
              Convenience: We offer convenient online ordering and home delivery
              options, making it easy for you to get the corn you need.
            </ListItem>
            <ListItem
              fontSize={"large"}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              <ListIcon as={MdCheckCircle} color="teal" />
              Customer service: We have a dedicated customer service team that
              is always ready to help you with any questions or concerns you
              might have.
            </ListItem>
            <ListItem
              fontSize={"large"}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              <ListIcon as={MdCheckCircle} color="teal" />
              Competitive pricing: We strive to offer competitive pricing on all
              of our products, so you can get a great deal on high-quality corn.
            </ListItem>
          </List>

          <Button
            colorScheme="teal"
            size="lg"
            mt={"12"}
            onClick={() => navigate("/user/login")}
          >
            Getting started
          </Button>
        </Box>
      </SimpleGrid>

      <Box py={"36"} bg={useColorModeValue("gray.100", "gray.700")}>
        <Testimonial />
      </Box>
      <Footer />
    </>
  );
}

export default Main;
