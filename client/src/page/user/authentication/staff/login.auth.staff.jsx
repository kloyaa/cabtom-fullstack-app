import React, { useState } from 'react'
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    Box,
    Icon,
    Center,
  } from '@chakra-ui/react';
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import img from "../../../../images/px-img-3.jpg";
import { useCookie } from 'react-use';
import { CabtomClient } from '../../../../http/instance.http';
import { AlertMessage } from '../../../../component/alert.component';

function StaffLogin() {
  const [authToken, setAuthToken, deleteAuthToken] = useCookie("authToken");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    await CabtomClient.post("/user/login", data)
      .then((value) => {
        setAuthToken(value.data.accessToken);
        navigate("/dashboard/staff");
      })
      .catch((err) => setLoginError(err.response.data.message))
  };

    return <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'} as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" {...register("email", { required: true })}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password"  {...register("password", { required: true })}/>
          </FormControl>

          {loginError && <AlertMessage type={'error'} message={loginError}/>}

          <Stack spacing={8}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link>
            </Stack>
            <Box></Box>
            <Button
              colorScheme={'teal'}
              variant={'solid'}
              type={"submit"}
              isLoading={isSubmitting}>
              Sign in
            </Button>
          </Stack>

          <Box height={10}></Box>
          <Center>
            <Icon
              as={IoIosArrowRoundBack}
              w={12} h={12}
              color={'gray.400'}
              cursor={'pointer'}
              onClick={() => navigate("/")}/>
          </Center>
        </Stack>
    </Flex>

    <Flex flex={1}>
      <Image
        alt={'Login Image'}
        objectFit={'cover'}
        src={img} />
    </Flex>
  </Stack>
}

export default StaffLogin
