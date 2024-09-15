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

                    <FormControl>
                        <FormLabel>Profile Picture URL</FormLabel>
                        <Input type="url" placeholder="https://example.com/profiles/johndoe.jpg" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Birth Date</FormLabel>
                        <Input type="date" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Phone Number</FormLabel>
                        <Input type="tel" placeholder="1234567890" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Street</FormLabel>
                        <Input placeholder="123 Main St" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>City</FormLabel>
                        <Input placeholder="Anytown" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>State</FormLabel>
                        <Input placeholder="CA" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Country</FormLabel>
                        <Input placeholder="USA" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Zip Code</FormLabel>
                        <Input placeholder="12345" />
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