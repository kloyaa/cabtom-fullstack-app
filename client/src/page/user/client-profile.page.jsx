import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCookie } from 'react-use';
import ClientNavbar from '../../component/client-nav.component'
import { CabtomClient } from '../../http/instance.http';
import { setHeaders } from '../../utils/http-headers.utils';

function ClientProfile() {
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm();
  const [authToken, setAuthToken, deleteAuthToken] = useCookie("authToken");
  const [state, setState] = useState({
    type: "create",
  })
  const toast = useToast();
  const navigate = useNavigate();

  const getProfile= async () => {
    await CabtomClient.get("/profile/me", {
      ...setHeaders({ authToken }),
    })
      .then((value) => {
        const { data: { name, contact, address, company, role, birthdate }} = value;
        setValue("company", company);
        setValue("first", name.first);
        setValue("last", name.last);
        setValue("initial", name.initial);
        setValue("birthdate", new Date(birthdate).toISOString().slice(0, 10));
        setValue("email", contact.email)
        setValue("number", contact.number);
        setValue("primary", address.primary);
        setValue("permanent", address.permanent);
        setState(prev => ({
          ...prev,
          type: "edit"
        }))
        console.log(value);
      })
      .catch((err) => {
        if(err.response?.status === 401)
          return navigate("/user/client/login", { replace: true });
      });
  };

  const onCreateProfile = async (data) => {
    const {  company, first, last, initial, birthdate, email, number, primary, permanent } = data;
    const payload = {
      role: "client",
      company,
      name: { first, last, initial },
      birthdate,
      contact: { email, number },
      address: { primary, permanent }
    }

    if(state.type === "create") {
      await CabtomClient.post("/profile/create", payload, setHeaders({ authToken }))
        .then((value) => toast({
          status: "success",
          description: "Congratulations! Your profile has been successfully created."
        }))
        .catch((err) => {
          if(err.response?.status === 401)
            return navigate("/user/client/login", { replace: true });
        })
    }

    if(state.type === "edit") {
      await CabtomClient.put("/profile/edit", payload, setHeaders({ authToken }))
        .then((value) => toast({
          status: "success",
          description: "Your profile has been successfully updated!"
        }))
        .catch((err) => {
          if(err.response?.status === 401)
            return navigate("/user/client/login", { replace: true });
        })
    }
  };

  useEffect(() => {
    getProfile();

    return () => { }
  }, []);

  return <>
        <ClientNavbar />
        <Box px={{ base: '10', md: '72'}} py={{ base: '10', md: '14'}}>
         <form onSubmit={handleSubmit(onCreateProfile)}>
          <Box border={"1px"} borderColor={'teal.100'} p={{ base: '5', md: '10'}} borderRadius={'2xl'}>
            <Heading mt={'5'} size={'lg'}>Basic Info</Heading>
            <FormControl id="company" mt={'2'}>
                <FormLabel>Company name</FormLabel>
                <Input type="text" {...register("company", { required: true })}/>
            </FormControl>
            <Flex mt={'2'} gap={'5'}>
              <FormControl id="first">
                  <FormLabel>First name</FormLabel>
                  <Input type="text" {...register("first", { required: true })}/>
              </FormControl>
              <FormControl id="last">
                  <FormLabel>Last name</FormLabel>
                  <Input type="text" {...register("last", { required: true })}/>
              </FormControl>
              <FormControl id="initial">
                  <FormLabel>Middle Initial</FormLabel>
                  <Input type="text" {...register("initial", { required: true })}/>
              </FormControl>
              <FormControl id="first">
                  <FormLabel>Birthdate</FormLabel>
                  <Input type="date" {...register("birthdate", { required: true })}/>
              </FormControl>
            </Flex>
          </Box>
          <Box mt={'10'} border={"1px"} borderColor={'teal.100'} p={{ base: '5', md: '10'}} borderRadius={'2xl'}>
            <Heading mt={'5'} size={'lg'}>Contact</Heading>
            <Flex mt={'2'} gap={'5'}>
              <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" {...register("email", { required: true })}/>
              </FormControl>
              <FormControl id="number">
                  <FormLabel>Mobile Number</FormLabel>
                  <Input type="number" {...register("number", { required: true })}/>
              </FormControl>
            </Flex>
          </Box>
          <Box mt={'10'} border={"1px"} borderColor={'teal.100'} p={{ base: '5', md: '10'}} borderRadius={'2xl'}>
            <Heading mt={'5'} size={'lg'}>Address</Heading>
            <Flex mt={'2'} gap={'5'}>
              <FormControl id="primary">
                  <FormLabel>Primary Address</FormLabel>
                  <Input type="text" {...register("primary", { required: true })}/>
              </FormControl>
              <FormControl id="permanent">
                  <FormLabel>Permanent Address</FormLabel>
                  <Input type="text" {...register("permanent", { required: true })}/>
              </FormControl>
            </Flex>
          </Box>
          <Button
              mt={'10'}
              colorScheme={'teal'}
              variant={'solid'}
              type={"submit"}
              isLoading={isSubmitting}>
              {state.type === "create" ? "Create Profile" : "Update Profile"}
          </Button>
         </form>
        </Box>
    </>
}

export default ClientProfile
