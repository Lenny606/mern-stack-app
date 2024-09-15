import {useState} from "react";
import {Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack} from "@chakra-ui/react";
import {ChakraProvider, FormControl, FormLabel} from '@chakra-ui/react';
import {useUserStore} from "../store/user.js";

export const LoginPage = () => {

    const [user, setUser] = useState({
        name: ""
    });
    const {createUser} = useUserStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {success, message} = await createUser(user)

        if (success) {
            setUser({
                name: ""
            })
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
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({...user, name: e.target.value})}
                            placeholder="Enter your name"
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
