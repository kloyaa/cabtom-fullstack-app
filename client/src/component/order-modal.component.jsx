import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Image,
    InputGroup,
    InputLeftElement,
    Input,
    FormHelperText,
    FormControl,
    Text,
    RadioGroup,
    Radio,
    Stack,
    Heading,
    Flex,
    Divider,
    Box,
  } from "@chakra-ui/react";
  import { useEffect, useRef, useState } from "react";
  import { GiWeight } from "react-icons/gi";
  import img from "../images/px-img-11.jpg";
  import { CabtomClient } from "../http/instance.http";
  import { useCookie } from "react-use";
  import { currency } from "../utils/formatter";
  import { useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
import { AlertMessage } from "./alert.component";
import { setHeaders } from "../utils/http-headers.utils";

  const unitArray = ["100", "200", "350", "500"];

  function ModalOrder({ isOpen, onOpen, onClose }) {
    const {
      register,
      handleSubmit,
      watch,
      getValues,
      reset,
      setValue,
      formState: { isSubmitting },
    } = useForm();
    const [selectedUnit, setSelectedUnit] = useState("100");

    const [product, setProduct] = useState(null);
    const [authToken, setAuthToken, deleteAuthToken] = useCookie("authToken");
    const navigate = useNavigate();
    const getProduct = async () => {
      await CabtomClient.get("/product", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
        .then((value) => setProduct(value.data))
        .catch((err) => console.log(err));
    };

    const Total = ({ price, quantity }) => {
      return (
        <Heading size={"sm"} color={"gray.500"}>
          {currency.format(price * quantity)}
        </Heading>
      );
    };

    const onOrder = async ({ unit }) => {
      await CabtomClient.post("/transaction", {
          "order": {
              "product": product.uid,
              "deliveryAddress": "Xavier Estates Phase 4"
          },
          "unit": unit !== ""
            ? parseInt(unit)
            : parseInt(selectedUnit)
      }, setHeaders({ authToken }))
      .then((value) => {
        onClose();
        navigate("/order/successfull");
      })
      .catch((err) => {
        if(err.response?.status === 401) {
          return navigate("/user/client/login", {
            replace: true
          });
        }
      })
    }

    useEffect(() => {
      getProduct();
      const subscription = watch((value, { name, type }) => {
        if (value.unit === "") setSelectedUnit("100");
        else setSelectedUnit("");
      });
      return () => {
        subscription.unsubscribe();
      };
    }, [watch, reset]);

    return (
      <>
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          size={"6xl"}
        >
          <ModalOverlay />
          <ModalContent p={{ base: 0, md: "12" }} mt={{ base: 0, md: "10" }}>
            <ModalHeader></ModalHeader>
            <Flex flexDir={{ base: "column-reverse", md: "row" }}>
              <form  onSubmit={handleSubmit(onOrder)}>
                <Box>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Image
                      src={img}
                      alt="Crops"
                      borderRadius={"md"}
                      height={"xs"}
                      width={"full"}
                      objectFit={"cover"}
                    />
                    <Heading mt={"5"} color={"teal"}>
                      {currency.format(product?.price)}
                    </Heading>
                    <Flex
                      alignSelf={"center"}
                      mt={"5"}
                      justifyContent={"space-between"}
                    >
                      <Flex opacity={getValues("unit") === "" ? 1 : 0.5}>
                        <Text
                          fontSize={"smaller"}
                          mr={"2"}
                          alignSelf={"center"}
                          justifyContent="center"
                          display={{ base: "none", md: "block" }}
                        >
                          UNITS
                        </Text>
                        <RadioGroup
                          onChange={setSelectedUnit}
                          value={selectedUnit}
                          isDisabled={watch("unit")?.length >= 1}
                        >
                          <Stack direction="row">
                              {unitArray?.map((v) => <Radio
                                value={v}
                                colorScheme={"teal"}
                                key={v}> {v} </Radio>)}
                              </Stack>
                        </RadioGroup>
                      </Flex>

                      <Text color={"gray.500"} fontSize={"smaller"}>
                        AVAILABLE x{product?.unit}
                      </Text>
                    </Flex>
                    <InputGroup mt={"2"}>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<GiWeight color="gray.300" />}
                      />
                      <Input
                        type="number"
                        placeholder="Custom Unit/Kg"
                        {...register("unit")}
                      />
                    </InputGroup>
                      {parseInt(watch("unit")) > product?.unit && <Box mt={"2"}>
                      <AlertMessage
                          type={"warning"}
                          message={"It is not possible for you to enter a number that exceeds the number of units that are currently available."}/>
                      </Box>}
                      <Text fontSize={"smaller"} color={"gray.500"} mt={"2"}>
                      Please enter or select the quantity of your order in units,
                      and we promise to provide you with the exact total weight in
                      kilograms, accurate to the nearest gram
                    </Text>
                  </ModalBody>
                  <ModalFooter justifyContent={"start"}>
                    <Button
                      colorScheme={"teal"}
                      mr={3}
                      type={"submit"}
                      isLoading={isSubmitting}>
                      Submit
                    </Button>
                    <Button type={"button"} onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </Box>
              </form>
              <Box width={"lg"} p={"10"}>
                <Heading size={"lg"}>Order summary</Heading>
                <Divider variant={"dashed"} mt={"5"} />

                <Text fontSize={"smaller"} color={"gray.500"} mt={"5"}>
                  NAME
                </Text>
                <Heading size={"sm"} color={"gray.500"}>
                  {product?.name}{" "}
                </Heading>

                <Text fontSize={"smaller"} color={"gray.500"} mt={"5"}>
                  PRICE
                </Text>
                <Heading size={"sm"} color={"gray.500"}>
                  {currency.format(product?.price)}
                </Heading>

                <Text fontSize={"smaller"} color={"gray.500"} mt={"5"}>
                  UNIT
                </Text>
                <Heading size={"sm"} color={"gray.500"}>
                  {watch("unit") === "" ? selectedUnit : watch("unit")}
                </Heading>

                <Text fontSize={"smaller"} color={"gray.500"} mt={"5"}>
                  AMOUNT TO PAY
                </Text>
                <Total
                  price={product?.price}
                  quantity={!watch("unit") ? selectedUnit : watch("unit")}
                />

                <Divider variant={"dashed"} mt={"5"} />
                <Text
                  fontSize={"smaller"}
                  color={"gray.500"}
                  mt={"5"}
                  display={{ base: "none", md: "block" }}
                >
                  The following information is a comprehensive summary of the
                  items that you have selected to purchase, including the
                  quantities and prices for each item, as well as any applicable
                  shipping and handling charges, taxes, and discounts or
                  promotions that have been applied. This will serve as a
                  reference for your review and understanding of your order
                  details.
                </Text>
              </Box>
            </Flex>
          </ModalContent>
        </Modal>
      </>
    );
  }

  export default ModalOrder;
