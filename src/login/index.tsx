import React from 'react'
import {Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input} from "@chakra-ui/react"
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import LoginRequest from "../model/login-request";
import {useNavigate} from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const loginSchema = yup.object({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm<LoginRequest>({
        resolver: yupResolver(loginSchema),
        mode: "all",
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (login: LoginRequest) => {


        setTimeout(()=>{
            navigate('/book');
        }, 5000)


        /*
        axios.post('http://localhost:9086/library-api/api/book/', login)
            .then(response => {

            })
            .catch(error => {
                console.error("Error updating the book", error);
            });*/
    };

    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box
                borderWidth={1}
                px={4}
                width='full'
                maxWidth='500px'
                borderRadius={4}
                textAlign='center'
                boxShadow='lg'>
                <Box p={4}>
                    <Box textAlign='center'>
                        <Heading>Sign In</Heading>
                    </Box>
                    <Box my={8} textAlign='left'>
                        <form id='login-form' onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                        }}>
                            <FormControl isRequired
                                         isInvalid={Boolean(errors?.email)}>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    {...register("email")}
                                    type='email'
                                    name='email'
                                    placeholder='Enter your email address'/>
                                <FormErrorMessage>
                                    {errors?.email && errors?.email?.message}
                                </FormErrorMessage>

                            </FormControl>

                            <FormControl mt={8} isRequired
                                         isInvalid={Boolean(errors?.password)}>
                                <FormLabel>Password</FormLabel>
                                <Input type='password'
                                       {...register("password")}
                                       name="password"
                                       placeholder='Enter your password'/>
                                <FormErrorMessage>
                                    {errors?.password && errors?.password?.message}
                                </FormErrorMessage>
                            </FormControl>


                            <Button colorScheme='blue'
                                    width='full'
                                    onClick={handleSubmit(onSubmit)}
                                    mt={16} type="submit"
                                    isDisabled={!isValid}
                                    form="login-form">
                                Sign In
                            </Button>
                        </form>
                    </Box>

                </Box>
            </Box>
        </Flex>
    );
}


export default Login;
