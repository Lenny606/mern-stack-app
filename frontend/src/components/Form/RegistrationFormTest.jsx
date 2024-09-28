import React, {useState} from 'react';
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
import {Eye, EyeOff} from 'lucide-react';
import {useUserStore} from "../../store/user.js";
import {useNavigate} from "react-router-dom";

const RegistrationForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const toast = useToast();
    const navigate = useNavigate();


    const {registerUser} = useUserStore();
    const {loginUser, isLogged} = useUserStore();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            var result = await registerUser(user);
            if (result.success) {

            }
        } catch (e) {
            toast({
                title: "Error",
                description: e.message,
                status: "error",
                isClosable: true
            })
        } finally {
            toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            const {success, message} = await loginUser(user);

            if (success) {
                setUser({
                    name: "",
                    email: "",
                    password: ""
                })
                navigate('/')
            } else {
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    isClosable: true
                })
            }
        }
    };

    return (
        <Box maxWidth="500px" margin="auto" mt={8}>
            <Heading mb={4}>Register</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input type="text"
                               value={user.name}
                               onChange={(e) => setUser({...user, name: e.target.value})}
                               placeholder="John Doe"
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email"
                               value={user.email}
                               onChange={(e) => setUser({...user, email: e.target.value})}
                               placeholder="Enter your email"/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                placeholder="Enter your password"
                            />
                            <InputRightElement width="3rem">
                                <Button h="1.5rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
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