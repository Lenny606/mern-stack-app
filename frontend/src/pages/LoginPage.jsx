import {useState} from "react";
import {Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack} from "@chakra-ui/react";
import {ChakraProvider, FormControl, FormLabel} from '@chakra-ui/react';
import {useUserStore} from "../store/user.js";
import {redirect, useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const {loginUser} = useUserStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {success, message} = await loginUser(user)

        if (success) {
            setUser({
                email: "",
                password: ""
            })
            navigate('/')
        } else {
            alert(message)
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
                    <Button colorScheme="teal" type="submit" width="100%">
                        Submit
                    </Button>
                </form>
            </Box>
        </ChakraProvider>
    )
}
