import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Checkbox,
  Fade,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import ClientNavbar from "../../component/client-nav.component";
import ClientStripedTable from "../../component/client-striped-table.component";
import { ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";
import ModalOrder from "../../component/order-modal.component";
import { CabtomClient } from "../../http/instance.http";
import { setHeaders } from "../../utils/http-headers.utils";
import { useCookie } from "react-use";
import dayjs from "dayjs";
import { currency } from "../../utils/formatter";
import { IoIosExpand } from "react-icons/io";
import { TiArrowMinimiseOutline } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

function ClientMain() {
  const [authToken, setAuthToken, deleteAuthToken] = useCookie("authToken");
  const trackingNoRef = useRef();

  const location = useLocation();
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const [transactions, setTransactions] = useState({
    value: [],
    status: "pending",
    expanded: false,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const onOpenOrderModal = () => onOpen();
  const getTransactions = async () => {
    await CabtomClient.get("/transaction/all/filter/by-user", {
      params: { status: transactions.status },
      ...setHeaders({ authToken }),
    })
      .then((value) =>
        setTransactions((prev) => ({
          ...prev,
          value: value.data,
        }))
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTransactions();
    return () => {};
  }, [location.pathname]);

  return (
    <>
      <ClientNavbar orderBtnFunction={() => onOpenOrderModal()} />

      <Box p={"10"}>
        <Flex width={"full"} mt={"10"}>
          <Box width={"lg"}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="text"
                ref={trackingNoRef}
                placeholder="Tracking #"
                onChange={async (e) => {
                  const result = transactions.value.filter((value) => {
                    return (
                      value._id.toUpperCase().trim().substring(0, 15) ===
                      e.target.value.toUpperCase().trim()
                    );
                  });
                  if (result.length) {
                    setTransactions((prev) => ({
                      ...prev,
                      value: result,
                    }));
                  }
                  if (e.target.value.length < 15) {
                    await getTransactions();
                  }
                }}
              />
            </InputGroup>

            <Button
              mt={"5"}
              width={"full"}
              colorScheme={"teal"}
              fontWeight={"medium"}
              fontSize={"small"}
            >
              GENERATE SOA
            </Button>
            <Button
              width={"full"}
              mt={"2"}
              fontWeight={"medium"}
              fontSize={"small"}
              onClick={async () => {
                trackingNoRef.current.value = "";
                await getTransactions();
              }}
            >
              CLEAR
            </Button>
            <Checkbox
              disabled={true}
              mt={"10"}
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={(e) =>
                setCheckedItems([
                  e.target.checked,
                  e.target.checked,
                  e.target.checked,
                  e.target.checked,
                  e.target.checked,
                  e.target.checked,
                ])
              }
            >
              Check All
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
              <Checkbox
                disabled={true}
                isChecked={checkedItems[0]}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, checkedItems[1]])
                }
              >
                Preparing
              </Checkbox>
              <Checkbox
                disabled={true}
                isChecked={checkedItems[1]}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, checkedItems[1]])
                }
              >
                Delayed
              </Checkbox>
              <Checkbox
                disabled={true}
                isChecked={checkedItems[2]}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, checkedItems[1]])
                }
              >
                Pending Payment
              </Checkbox>
              <Checkbox
                disabled={true}
                isChecked={checkedItems[3]}
                onChange={(e) =>
                  setCheckedItems([checkedItems[0], e.target.checked[1]])
                }
              >
                Packed
              </Checkbox>
              <Checkbox
                disabled={true}
                isChecked={checkedItems[4]}
                onChange={(e) =>
                  setCheckedItems([checkedItems[0], e.target.checked[1]])
                }
              >
                To deliver
              </Checkbox>
              <Checkbox
                isChecked={checkedItems[5]}
                onChange={(e) =>
                  setCheckedItems([checkedItems[0], e.target.checked[1]])
                }
              >
                Delivered
              </Checkbox>
            </Stack>
          </Box>
          <Box width={"20"}></Box>
          <Box width={"full"}>
            <Fade
              in={true}
              style={{
                transitionDuration: "1s",
                transitionDelay: `1s`,
              }}
            >
              <ClientStripedTable
                column={[
                  "Tracking #",
                  "Unit",
                  "Price",
                  "Total",
                  "Date",
                  "Status",
                  "Payment",
                ]}
                data={transactions.value?.map((v) => {
                  return {
                    hash: v._id.substring(0, 15).toUpperCase(),
                    unit: v.unit,
                    price: currency.format(v.product.price),
                    total: currency.format(v.payment.amount),
                    date: dayjs(v.createdAt).format("MMM D, YYYY h:m A"),
                    orderStatus: v.status[0].title,
                    status: v.status,
                    participants: v.participants,
                    paymentStatus: v.payment.status,
                  };
                })}
              />
            </Fade>
          </Box>
        </Flex>
      </Box>

      <ModalOrder isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

export default ClientMain;
