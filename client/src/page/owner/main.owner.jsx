import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useCookie } from 'react-use';
import OwnerNavbar from '../../component/owner-nav.component'
import OwnerSMSNotifStripedTable from '../../component/owner-sms-notif-striped-table.component';
import { ROLES } from '../../const/roles.const'
import { setHeaders } from '../../utils/http-headers.utils';
import { axiosHttp, HttpMethods } from '../../_core/http/axios.http';

function MainOwner() {
  const [authToken, setAuthToken, deleteAuthToken] = useCookie("authToken");
  const toast = useToast();
  const [state, setState] = useState({
    messages: []
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
          messages: v.data
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
  </>
}

export default MainOwner
