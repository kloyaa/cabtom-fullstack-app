import {
  Fade,
  Flex,
  Heading,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosExpand } from "react-icons/io";
import { TiArrowMinimiseOutline } from "react-icons/ti";
import dayjs from "dayjs";

function OwnerSMSNotifStripedTable({ column, data }) {
  const [expand, setExpand] = useState(false);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <TableContainer>
      <Flex justifyContent={"space-between"}>
        <Heading fontWeight={"medium"} mb={"5"}>
          Recent Transactions ({data?.length})
        </Heading>
      </Flex>
      <Table variant="striped" colorScheme="gray" size={"sm"}>
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
            return  <Tr key={value.message_id}>
            <Td>
              <Fade
                in={true}
                style={{ transitionDuration: "1s",  transitionDelay: `${index/5}s`}}>{value.message_id}
              </Fade>
            </Td>

            <Td>
              <Fade
                in={true}
                style={{ transitionDuration: "1s",  transitionDelay: `${index/5}s`}}>{value.account}
              </Fade>
            </Td>

            <Td>
              <Fade
                in={true}
                style={{ transitionDuration: "1s",  transitionDelay: `${index/5}s`}}>{value.recipient}
              </Fade>
            </Td>

            <Td>
              <Fade
                in={true}
                style={{ transitionDuration: "1s",  transitionDelay: `${index/5}s`}}>
                    <Text style={{
                        width: "250px",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        maxHeight: "80px",
                        overflow: "hidden"
                        // text-overflow: ellipsis;
                        // white-space: nowrap;
                    }}>
                        {value.message}
                    </Text>
              </Fade>
            </Td>

            <Td>
              <Fade
                in={true}
                style={{ transitionDuration: "1s",  transitionDelay: `${index/5}s`}}>{value.network}
              </Fade>
            </Td>

            <Td>
              <Fade
                in={true}
                style={{ transitionDuration: "1s",  transitionDelay: `${index/5}s`}}>{value.type}
              </Fade>
            </Td>

            <Td>
              <Fade
                in={true}
                style={{ transitionDuration: "1s",  transitionDelay: `${index/5}s`}}>{dayjs(value.created_at).format("MMM D, YYYY h:m A")}
              </Fade>
            </Td>

            <Td>
              <Fade
                in={true}
                style={{ transitionDuration: "1s",  transitionDelay: `${index/5}s`}}>{dayjs(value.updated_at).format("MMM D, YYYY h:m A")}
              </Fade>
            </Td>

            <Td>
              <Fade
                in={true}
                style={{ transitionDuration: "1s",  transitionDelay: `${index/5}s`}}>{value.status}
              </Fade>
            </Td>

          </Tr>
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default OwnerSMSNotifStripedTable;
