import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Input, InputGroup, InputLeftElement, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import { useCookie } from 'react-use';
import OwnerNavbar from '../../component/owner-nav.component'
import OwnerSMSNotifStripedTable from '../../component/owner-sms-notif-striped-table.component';
import { ROLES } from '../../const/roles.const'
import { setHeaders } from '../../utils/http-headers.utils';
import { axiosHttp, HttpMethods } from '../../_core/http/axios.http';

function MainOwner() {
  const [authToken, setAuthToken, deleteAuthToken] = useCookie("authToken");
  const toast = useToast();
  const searchRecipientRef = useRef(null);

  const [state, setState] = useState({
    messages: [],
    immutableMessages: []
  })
  const getSMSNotifications = async (data) => {
    await axiosHttp({
        url: "/sms/semaphore/messages",
        method: HttpMethods.GET,
        onErrorPaths: {
          "UnauthorizedException": "/user/owner/login"
        },
        payload:{
          limit: 100,
          page: 1,
        },
        ...setHeaders({ authToken }),
      })
      .then((v) => {
        setState(prev => ({
          ...prev,
          messages: v.data,
          immutableMessages: v.data
        }))
      })
      .catch((err) => {
         toast({
            status: "error",
            description: "There is an error while retrieving messages"
         });
      });
};

  useEffect(() => {
    getSMSNotifications();
    window.document.title = `CABTOM | ${ROLES.ADMIN.toLocaleUpperCase()}`;
    return () => {}
  }, [])

  return <>
    <OwnerNavbar />


    <Flex justifyContent={"center"} mt={"20"}>
      <StatGroup gap={32}>
        <Stat>
          <StatLabel>SMS Total</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Pending</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Globe Telco</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Smart Telco</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>DITO Telco</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Flex>

    <Box p={"10"}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="search"
          ref={searchRecipientRef}
          placeholder="Recipient No."
          onChange={({ target: { value }}) => {
            setState(prev => ({
              ...prev,
              messages: value === ""
                ? state.immutableMessages
                : state.messages.filter(e => e
                  .recipient
                  .includes(value))
            }))
          }}/>
      </InputGroup>
    </Box>

    <Box px={"10"}>
      <OwnerSMSNotifStripedTable
        column={[
          "#",
          "account",
          "recipient",
          "message",
          "network",
          "type",
          "created_at",
          "updated_at",
          "status",
        ]}
        data={state.messages.reverse()}/>
    </Box>

  </>
}

export default MainOwner
