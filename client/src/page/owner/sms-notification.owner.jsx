import { Box, Button, Flex, Heading, Text, Textarea, useToast } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { MdSend } from 'react-icons/md'
import { useCookie } from 'react-use'
import OwnerNavbar from '../../component/owner-nav.component'
import { SMS_TEMPLATES } from '../../const/text.const'
import { setHeaders } from '../../utils/http-headers.utils'
import { axiosHttp, HttpMethods } from '../../_core/http/axios.http'

function OwnerSMSNotification() {
    const PAGE_TITLE = "SMS Notifications";
    const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm();
    const [authToken, setAuthToken, deleteAuthToken] = useCookie("authToken");
    const toast = useToast();

    window.document.title = `CABTOM | ${PAGE_TITLE}`;
    const onSendSms = async (data) => {
        await axiosHttp({
            url: "/sms/semaphore/messages",
            method: HttpMethods.POST,
            onErrorPaths: {
              "UnauthorizedException": "/user/owner/login"
            },
            payload:{
                "sendername": "CabTom",
                "number": "09277522772",
                "message": data.message
            },
            ...setHeaders({ authToken }),
          })
          .then((v) => {
            toast({
                status: "success",
                description: "The bulk SMS was delivered to the designated recipients successfully"
             });
          })
          .catch((err) => {
             toast({
                status: "error",
                description: "Message sending failed. Please check your internet connection and try again later."
             });
          });
    };

  return <>
    <OwnerNavbar />
    <Box p={'2'}>
      <Flex>
        <Box w={{ base: "full", md: "70%"}}>
            <form onSubmit={handleSubmit(onSendSms)}>
                <Textarea
                    mt={'5'}
                    placeholder='Write a message...'
                    minH="calc(100vh - 210px)"
                    maxH="calc(100vh - 210px)"
                    fontSize={"2xl"}
                    maxLength={255}
                    {...register("message", { maxLength: 255})}/>
                <Button
                    mt={'5'}
                    colorScheme={'teal'}
                    variant={'solid'}
                    type={"submit"}
                    rightIcon={<MdSend />}
                    isLoading={isSubmitting}>Send message</Button>
            </form>
        </Box>
        <Box p={'10'}>
            <Heading fontSize={'4xl'} color={"teal"}>Templates</Heading>
                {SMS_TEMPLATES.map((text) => {
                    return <Box
                        onClick={() => setValue("message", text)}
                        mt={'5'}
                        p={'10'}
                        boxShadow={"lg"}
                        cursor={"pointer"}
                        _hover={{ boxShadow: "2xl" }}
                        key={text}>
                        <Text fontSize={"larger"}>{text}</Text>
                </Box>
                })}
        </Box>
      </Flex>
    </Box>
</>
}

export default OwnerSMSNotification
