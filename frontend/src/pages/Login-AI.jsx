import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    InputGroup,
    InputRightElement,
    useToast
} from '@chakra-ui/react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast({
                title: 'Error',
                description: 'Please fill in both fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Here, you can handle login logic (API call, authentication)
        console.log({ email, password });

        toast({
            title: 'Success',
            description: 'Logged in successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Box
            maxW="sm"
            mx="auto"
            mt={12}
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
        >
            <VStack spacing={4}>
                <Heading as="h2" size="lg" textAlign="center">
                    Login
                </Heading>

                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </FormControl>

                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Button
                    colorScheme="blue"
                    width="full"
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </VStack>
        </Box>
    );
}
