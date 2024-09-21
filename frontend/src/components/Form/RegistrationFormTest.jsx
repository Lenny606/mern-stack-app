import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Text,
    InputGroup,
    InputRightElement,
    useToast,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';

const RegistrationForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically send the form data to your API
        toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box maxWidth="500px" margin="auto" mt={8}>
            <Heading mb={4}>Register</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" placeholder="John Doe" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="johndoe@example.com" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                            />
                            <InputRightElement width="3rem">
                                <Button h="1.5rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button type="submit" colorScheme="blue">
                        Register
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default RegistrationForm;