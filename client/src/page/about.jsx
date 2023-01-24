import {
    useColorMode,
    useDisclosure,
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { IoIosAnalytics } from "react-icons/io";
  import React from "react";
  import { Navbar } from ".";
  import img11 from "../images/px-img-11.jpg";
  import img7 from "../images/px-img-7.jpg";
  import img1 from "../images/px-img-1.jpg";

  import Footer from "../component/footer.component";

  function About() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const Feature = ({ text, icon, iconBg }) => {
      return (
        <Stack direction={"row"} align={"center"}>
          <Flex
            w={8}
            h={8}
            align={"center"}
            justify={"center"}
            rounded={"full"}
            bg={iconBg}
          >
            {icon}
          </Flex>
          <Text fontWeight={600}>{text}</Text>
        </Stack>
      );
    };

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

        <Container maxW={"6xl"} py={12} mt={"10"}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Stack spacing={4}>
              <Text
                textTransform={"uppercase"}
                color={"blue.400"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("blue.50", "blue.900")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Product
              </Text>
              <Heading>Why choose CABTOM?</Heading>
              <Text color={"gray.500"} fontSize={"lg"}>
                If you're looking for top-quality corn that is fresh, flavorful,
                and sustainably grown, look no further! Our company is dedicated
                to providing the best possible corn products to our customers.
                <br />
                <br />
                Our farmers use sustainable farming practices to ensure that the
                land is well cared for, and our strict quality control measures
                ensure that every ear of corn meets our high standards. We offer a
                wide range of corn varieties, including sweet corn, popcorn, and
                cornmeal, so you can choose the best option for your needs.
                <br />
                <br />
                In addition to the superior quality of our products, we also offer
                convenient online ordering and home delivery options. Our
                dedicated customer service team is always ready to assist you with
                any questions or concerns you might have.
                <br />
                <br />
                We believe that our corn is the best you'll find anywhere, and
                we're confident that once you try it, you'll agree. So why wait?
                Place your order today and taste the difference for yourself!
              </Text>
              <Stack
                spacing={4}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  />
                }
              >
                <Feature
                  icon={
                    <Icon as={IoIosAnalytics} color={"yellow.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Quality"}
                />
              </Stack>
            </Stack>
            <Flex>
              <Image
                rounded={"2xl"}
                alt={"feature image"}
                src={img11}
                objectFit={"cover"}
              />
            </Flex>
          </SimpleGrid>
        </Container>

        <Container maxW={"6xl"} py={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Flex>
              <Image
                rounded={"2xl"}
                alt={"feature image"}
                src={img7}
                objectFit={"cover"}
              />
            </Flex>

            <Stack spacing={4}>
              <Text
                textTransform={"uppercase"}
                color={"blue.400"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("blue.50", "blue.900")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Our Story
              </Text>
              <Heading>About CabTom Crops Services</Heading>
              <Text color={"gray.500"} fontSize={"lg"}>
                At our company, we take the quality and legitimacy of our corn
                very seriously. We source our corn from only the best farms, and
                our farmers use sustainable practices to ensure that the land is
                well cared for.
                <br />
                <br />
                In addition to using top-quality ingredients, we also have strict
                quality control measures in place to ensure that every ear of corn
                meets our high standards. Our corn is fresh, flavorful, and free
                from pests and diseases, so you can trust that you're getting a
                product that is not only delicious, but also safe and healthy to
                eat.
                <br />
                <br />
                We understand that when it comes to purchasing food, you want to
                be sure that you're getting a legitimate product that you can
                trust. That's why we take such great care to ensure that our corn
                is of the highest quality and legitimacy. We're confident that
                once you try our corn, you'll agree that it's the best you'll find
                anywhere.
              </Text>
              <Stack
                spacing={4}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  />
                }
              >
                <Feature
                  icon={
                    <Icon as={IoIosAnalytics} color={"yellow.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Legitimacy "}
                />
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>

        <Container maxW={"6xl"} py={12} mb={"10"}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Stack spacing={4}>
              <Text
                textTransform={"uppercase"}
                color={"blue.400"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("blue.50", "blue.900")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Product
              </Text>
              <Heading>Why CABTOM is the best?</Heading>
              <Text color={"gray.500"} fontSize={"lg"}>
                Our company is dedicated to providing top-quality corn that is
                fresh, flavorful, and sustainably grown.
                <br />
                <br />
                Our corn is grown on the finest farms, using sustainable practices
                that are kind to the land and the environment. We have strict
                quality control measures in place to ensure that every ear of corn
                meets our high standards.
                <br />
                <br />
                In addition to the superior quality of our corn, we also offer a
                wide range of varieties, including sweet corn, popcorn, and
                cornmeal. This allows you to choose the best option for your
                needs, whether you're looking for a tasty snack, a healthy
                ingredient for a recipe, or something else entirely.
                <br />
                <br />
                We believe that our corn is the best you'll find anywhere, and
                we're confident that once you try it, you'll agree. So why wait?
                Place your order today and taste the difference for yourself!
              </Text>
              <Stack
                spacing={4}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  />
                }
              >
                <Feature
                  icon={
                    <Icon as={IoIosAnalytics} color={"yellow.500"} w={5} h={5} />
                  }
                  iconBg={useColorModeValue("yellow.100", "yellow.900")}
                  text={"Dedication"}
                />
              </Stack>
            </Stack>
            <Flex>
              <Image
                rounded={"2xl"}
                alt={"feature image"}
                src={img1}
                objectFit={"cover"}
              />
            </Flex>
          </SimpleGrid>
        </Container>

        <Footer />
      </>
    );
  }

  export default About;
