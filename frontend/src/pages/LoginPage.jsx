import {useEffect, useState} from "react";
import {Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack} from "@chakra-ui/react";
import {ChakraProvider, FormControl, FormLabel} from '@chakra-ui/react';
import {useUserStore} from "../store/user.js";
import {redirect, useNavigate, useNavigation} from "react-router-dom";
import Turnstile from "react-turnstile";
import {isDev} from "../utility/enviroment.js";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [siteKey, setSiteKey] = useState('');
    // const navigationState = useNavigation();
    // const isSubmitting = navigate.state === "submitting"
    const isSubmitting = false

    const [user, setUser] = useState({
        email: "",
        password: "",
        token: ""
    });

    const {loginUser} = useUserStore();

    useEffect(() => {
        // We need an async function inside useEffect because useEffect can't directly accept async
        const fetchAndSetSiteKey = async () => {
            const key = await fetchSiteKey();  // Wait for the Promise to resolve
             // Now key contains the actual siteKey, not a Promise
            setSiteKey(key);   // Update the state with the siteKey
        };

        if (isDev()) {
            fetchAndSetSiteKey();
        } else {
            setSiteKey(process.env.TURNSTILE_SITE_KEY)
        }
    }, []); // Empty dependency array, meaning this will run only on component mount


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {success, message, data} = await loginUser(user)
            if (success) {
                setUser({
                    email: "",
                    password: ""
                })
                localStorage.setItem("token", data.token)
                const expiration = new Date();
                expiration.setHours(expiration.getHours() + 1)
                localStorage.setItem("expiration", expiration.toISOString())

                navigate('/')
            } else {

            }
        } catch (e) {

        } finally {

        }


    };

    return (
        <ChakraProvider>
            <Box maxW="sm" mx="auto" mt="50px" p="4" borderWidth="1px" borderRadius="lg">
                <Heading as="h2" size="lg" mb="6" textAlign="center">
                    User Form
                </Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl id="name" mb="4" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            placeholder="Enter your email"
                        />
                    </FormControl>
                    <FormControl id="password" mb="4" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            placeholder="Enter your password"
                        />
                    </FormControl>
                    <Button colorScheme="teal" type="submit" width="100%" disabled={isSubmitting}>
                        {isSubmitting ? "Logging... " : "Login"}
                    </Button>
                    {
                        isDev() ? null : <Turnstile
                            sitekey={siteKey}
                            onVerify={(token) => setValue('token', token)}
                        />
                    }
                </form>
            </Box>
        </ChakraProvider>
    )
}

const fetchSiteKey = async () => {
    try {
        const response = await fetch('/api/env/sitekey', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data.sitekey;
    } catch (error) {
        console.error("Error fetching sitekey:", error.message);
        return null;
    }
};