import { CheckIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Fade,
  Flex,
  Heading,
  Icon,
  ScaleFade,
  SlideFade,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Timeline, TimelineEvent } from "react-event-timeline";
import { IoIosExpand } from "react-icons/io";
import { TiArrowMinimiseOutline } from "react-icons/ti";
import { v5 as uuidv5 } from 'uuid';

function ClientStripedTable({ column, data }) {
  const [expand, setExpand] = useState(false);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <TableContainer>
      <Flex justifyContent={"space-between"}>
        <Heading fontWeight={"medium"} mb={"5"}>
          Recent Transactions ({data.length})
        </Heading>
        <Icon
          as={expand ? TiArrowMinimiseOutline : IoIosExpand}
          h={25}
          w={25}
          cursor={"pointer"}
          onClick={() => setExpand(!expand)}
        />
      </Flex>
      <Table variant="striped" colorScheme="gray" size={"md"}>
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            {column?.map((value, index) => {
              return <Th key={value}>
              <Fade
                in={true}
                style={{
                  transitionDuration: "2s",
                  transitionDelay: `${index/2}s`,
                }}>
                {value}
              </Fade>
            </Th>
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((value, index) => {
            return <React.Fragment key={value.hash}>
            <Tr>
              <Td>
                <Fade in={true}
                style={{
                  transitionDuration: "1s",
                  transitionDelay: `${index/5}s`,
                }}>
                {value.hash}
                </Fade>
              </Td>
              <Td>
                <Fade in={true}
                style={{
                  transitionDuration: "1s",
                  transitionDelay: `${index/5}s`,
                }}>
                {value.unit}
                </Fade>
              </Td>
              <Td>
                <Fade in={true}
                style={{
                  transitionDuration: "1s",
                  transitionDelay: `${index/5}s`,
                }}>
                {value.price}
                </Fade>
              </Td>
              <Td>
                <Fade in={true}
                style={{
                  transitionDuration: "1s",
                  transitionDelay: `${index/5}s`,
                }}>
                {value.total}
                </Fade>
              </Td>
              <Td>
                <Fade in={true}
                style={{
                  transitionDuration: "1s",
                  transitionDelay: `${index/5}s`,
                }}>
                {value.date}
                </Fade>
              </Td>
              <Td>
                <Fade in={true}
                style={{
                  transitionDuration: "1s",
                  transitionDelay: `${index/5}s`,
                }}>
                {value.orderStatus}
                </Fade>
              </Td>
              <Td>
                <Fade in={true}
                style={{
                  transitionDuration: "1s",
                  transitionDelay: `${index/5}s`,
                }}>
                {value.paymentStatus.toUpperCase()}
                </Fade>
              </Td>
              </Tr>
            {expand && (
              <Tr>
                <Td colSpan={7}>
                  <SlideFade
                    offsetX={"-100px"}
                    in={expand}
                    style={{
                      transitionDuration: "1s",
                    }}
                  >
                    <Timeline>
                      {value.status
                        .slice(0)
                        .reverse()
                        ?.map((value, index) => {
                          return <Fade
                          in={expand}
                          style={{ transitionDuration: "1s", transitionDelay: `${index/2}s` }}
                          key={value.uid}>
                            <TimelineEvent
                              key={value._id}
                              iconColor={"teal"}
                              title={`Reference ${value.uid.substring(0, 8)}`}
                              icon={<CheckIcon color={"teal"} />}
                            >

                                <Text
                                  fontWeight={"medium"}
                                  color={"gray.600"}
                                  fontSize={"medium"}
                                >
                                  {value.title}
                                </Text>
                                <Text fontWeight={"normal"}>
                                  {value.description}
                                </Text>
                            </TimelineEvent>
                            </Fade>
                        })}
                    </Timeline>
                    <Wrap spacing={"40px"}>
                      {value.participants?.map((value, index) => {
                        return (
                          <WrapItem key={value._id} p={"7"} >
                            <Fade
                              in={expand}
                              style={{
                                transitionDuration: "2s",
                                transitionDelay: `${index}s`,
                              }}
                            >
                              <Flex>
                                <Avatar  name={value.name.full} />
                                <Box ml="3">
                                  <Text fontWeight="bold">
                                    {value.name.full}
                                  </Text>
                                  <Text
                                    fontSize={"small"}
                                    fontWeight={"medium"}
                                    color={"gray.600"}
                                  >
                                    {value.role.toUpperCase()}
                                  </Text>
                                </Box>
                              </Flex>
                            </Fade>
                          </WrapItem>
                        );
                      })}
                    </Wrap>
                  </SlideFade>
                </Td>
              </Tr>
            )}
          </React.Fragment>;
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ClientStripedTable;
