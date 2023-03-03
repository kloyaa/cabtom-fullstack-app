import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, Select, Stack, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdContactPhone, MdSend } from 'react-icons/md'
import { useCookie } from 'react-use'
import OwnerNavbar from '../../component/owner-nav.component'
import { SMS_TEMPLATES } from '../../const/text.const'
import { setHeaders } from '../../utils/http-headers.utils'
import { axiosHttp, HttpMethods } from '../../_core/http/axios.http'

function OwnerSMSNotification() {
    const PAGE_TITLE = "SMS Notifications";
    const { register, handleSubmit, setValue, formState: { isSubmitting }, watch } = useForm();
    const [state, setState] = useState({
      selectedGroup: ""
    });

    const [authToken, setAuthToken, deleteAuthToken] = useCookie("authToken");
    const toast = useToast();

    window.document.title = `CABTOM | ${PAGE_TITLE}`;
    const onSendSms = async (data) => {
      console.log(data.group)
        // await axiosHttp({
        //     url: "/sms/semaphore/messages",
        //     method: HttpMethods.POST,
        //     onErrorPaths: {
        //       "UnauthorizedException": "/user/owner/login"
        //     },
        //     payload:{
        //         "sendername": "CabTom",
        //         "number": data.number,
        //         "message": data.message
        //     },
        //     ...setHeaders({ authToken }),
        //   })
        //   .then((v) => {
        //     toast({
        //         status: "success",
        //         description: "The bulk SMS was delivered to the designated recipients successfully"
        //      });
        //   })
        //   .catch((err) => {
        //      toast({
        //         status: "error",
        //         description: "Message sending failed. Please check your internet connection and try again later."
        //      });
        //   });
    };


  return <>
    <OwnerNavbar />
    <Box p={'2'}>
      <Flex>
        <Box w={{ base: "full", md: "70%"}}>
            <form onSubmit={handleSubmit(onSendSms)}>
                <Flex alignItems={"center"} gap={5}>
                  <InputGroup opacity={state.selectedGroup !== "" ? 0.5 : 1}>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdContactPhone color="gray.300" />}
                    />
                    <Input
                      type="number"
                      placeholder="Recipient No."
                      disabled={state.selectedGroup !== ""}
                      maxLength={11}
                      {...register("number", { maxLength: 255})}/>
                  </InputGroup>
                  <Text color={"gray.500"} textAlign={"center"} fontSize={"13"}>OR</Text>
                  <FormControl opacity={watch("number") !== "" ? 0.5 : 1}>
                    <Select
                      placeholder='Select group of people'
                      value={state.selectedGroup}
                      onChange={(e) => {
                        console.log(e.target.value)
                        setValue("number", "");
                        setState(prev => ({
                          ...prev,
                          selectedGroup: e.target.value
                        }))
                      }}>
                      <option value={"staff"}>Staffs</option>
                      <option value={"driver"}>Drivers</option>
                      <option value={"farmer"}>Farmers</option>
                      <option value={"customer"}>Client</option>
                    </Select>
                  </FormControl>
                </Flex>
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
