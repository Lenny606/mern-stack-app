import {
    Box,
    Heading,
    HStack,
    IconButton,
    Image,
    useColorModeValue,
    Text,
    useToast,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    VStack,
    Input,
    Button
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useProductStore} from "../store/product.js";
import {useState} from "react";

export const ProductCard = (data) => {

    const [updatedProduct, setUpdatedProduct] = useState(
        data.product
    )
    const {deleteProduct, updateProduct} = useProductStore()
    const textColor = useColorModeValue("grey.800", "grey.200")
    const bg = useColorModeValue("grey.800", "grey.200")
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()
    // console.log(product.product.name)

    async function handleDeleteProduct(id) {
        const {success, message} = await deleteProduct(id);

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
    }
    async function handleUpdateProduct(id, updatedProduct) {
        const {success, message} = await updateProduct(id, updatedProduct);
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
            onClose()
        }
    }

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{transform: 'translateY(-5px)', shadow: "x1"}}
            bg={bg}
        >
            <Image src={data.product.image} alt={data.product.name} h={48} w={'full'} objectFit={'cover'}>
            </Image>
            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {data.product.name}
                </Heading>
                <Text color={textColor}>
                    {data.product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon/>} color={"blue"} onClick={onOpen}/>
                    <IconButton icon={<DeleteIcon/>} color={"red"}
                                onClick={() => handleDeleteProduct(data.product._id)}/>
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder={'Name'}
                                name={'name'}
                                defaultValue={updatedProduct.name}

                            ></Input>
                            <Input
                                placeholder={'Price'}
                                name={'price'}
                                type={'number'}
                                defaultValue={updatedProduct.price}
                            ></Input>
                            <Input
                                placeholder={'Image URl'}
                                name={'image'}
                                defaultValue={updatedProduct.image}
                            ></Input>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(data.product._id, updatedProduct) }>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}