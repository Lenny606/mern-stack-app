import {useState} from "react";
import {Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack} from "@chakra-ui/react";
import {useProductStore} from "../store/product.js";

export const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });

    const toast = useToast();

    const {createProduct} = useProductStore();

    async function handleNewProduct() {
        const {success, message} = await createProduct(newProduct)
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            })
        }
        setNewProduct({
            name: "",
            price: "",
            image: ""
        })

    }

    return (
        <Container
            maxW={'container.sm'}>
            <VStack spacing={8}>
                <Heading
                    as={"h1"} textAlign={"center"}
                >Create New Product</Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder={'Name'}
                            name={'name'}
                            value={newProduct.name}
                            onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                        ></Input>
                        <Input
                            placeholder={'Price'}
                            name={'price'}
                            type={'number'}
                            value={newProduct.price}
                            onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        ></Input>
                        <Input
                            placeholder={'Image URl'}
                            name={'image'}

                            value={newProduct.image}
                            onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                        ></Input>
                    </VStack>
                    <Button colorScheme={"blue"}
                            w={'full'}
                            onClick={handleNewProduct}>Add Product</Button>
                </Box>
            </VStack>
        </Container>
    )
}
