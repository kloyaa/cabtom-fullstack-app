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
    FormHelperText,
  } from '@chakra-ui/react';
import { useCookie } from "react-use";
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AlertMessage } from '../../../../component/alert.component';
import img from "../../../../images/px-img-3.jpg";
import PasswordStrengthBar from 'react-password-strength-bar';
import { passwordPattern } from '../../../../const/pattern.const';
import { CabtomClient } from '../../../../http/instance.http';

function ClientRegister() {
 const [authToken, setAuthToken, deleteAuthToken] = useCookie("authToken");
 const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm();
  const [registrationError, setRegistrationError] = useState(null);



  const onSubmit = async (data) => {
    await CabtomClient.post("/user/register", data)
      .then((value) => {
        setAuthToken(value.data.accessToken);
        navigate("/dashboard");
      })
      .catch((err) => setRegistrationError(err.response.data.message))
  };

    return <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'} as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Heading fontSize={'2xl'}>Create your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" {...register("email", { required: true })}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password"  {...register("password", { required: true, minLength: 10, pattern: passwordPattern })}/>
            <FormHelperText>It is important to create a strong and secure password to protect your account. In order to ensure the safety of your account, we require you to Create a strong password with at least 10 characters, including 1 uppercase & lowercase letter, 1 number, and 1 special character.</FormHelperText>
          </FormControl>

          {watch("password") && <PasswordStrengthBar
            password={watch("password")}
            minLength={10} />}

          <FormControl id="confirm-password">
            <FormLabel>Confirm</FormLabel>
            <Input type="password"  {...register("confirm-password", { required: true })}/>
          </FormControl>

          {
            watch("confirm-password")?.length &&
            watch("password") !== watch("confirm-password") &&
            <AlertMessage type={'error'} message={"The passwords do not match. Please ensure that you have typed the same password in both fields and try again."}/>
          }

          {registrationError && <AlertMessage type={'error'} message={registrationError}/>}

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
              Sign up
            </Button>
            <Button
              colorScheme={'green'}
              variant={'unstyled'}
              fontWeight={'normal'}
              fontSize={'small'}
              onClick={() => navigate("/user/client/login")}>
              Already have an account?
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

export default ClientRegister
