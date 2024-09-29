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
import {useCategoryStore} from "../store/category.js";
import {useState} from "react";

export const CategoryCard = (data) => {

    const [updatedCategory, setUpdatedCategory] = useState(
        data.category
    )
    const {deleteCategory, updateCategory} = useCategoryStore()
    const textColor = useColorModeValue("grey.800", "grey.200")
    const bg = useColorModeValue("grey.800", "grey.200")
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()

    // async function handleDeleteCategory(id) {
    //     const {success, message} = await deleteCategory(id);
    //
    //     if (!success) {
    //         toast({
    //             title: "Error",
    //             description: message,
    //             status: "error",
    //             isClosable: true
    //         })
    //     } else {
    //         toast({
    //             title: "Success",
    //             description: message,
    //             status: "success",
    //             isClosable: true
    //         })
    //     }
    // }
    // async function handleUpdateCategory(id, updatedCategory) {
    //     const {success, message} = await updateCategory(id, updatedCategory);
    //     if (!success) {
    //         toast({
    //             title: "Error",
    //             description: message,
    //             status: "error",
    //             isClosable: true
    //         })
    //     } else {
    //         toast({
    //             title: "Success",
    //             description: message,
    //             status: "success",
    //             isClosable: true
    //         })
    //         onClose()
    //     }
    // }

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{transform: 'translateY(-5px)', shadow: "x1"}}
            bg={bg}
        >
            {/*TODO refactor for list of images*/}
            <Image src={data.category.image} alt={data.category.name} h={48} w={'full'} objectFit={'cover'}>
            </Image>
            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {data.category.name}
                </Heading>
                <Text color={textColor}>
                    {data.category.price}
                </Text>
                {/*<HStack spacing={2}>*/}
                {/*    <IconButton icon={<EditIcon/>} color={"blue"} onClick={onOpen}/>*/}
                {/*    <IconButton icon={<DeleteIcon/>} color={"red"}*/}
                {/*                onClick={() => handleDeleteCategory(data.category._id)}/>*/}
                {/*</HStack>*/}
            </Box>
            {/*<Modal isOpen={isOpen} onClose={onClose}>*/}
            {/*    <ModalOverlay/>*/}
            {/*    <ModalContent>*/}
            {/*        <ModalHeader>Update Category</ModalHeader>*/}
            {/*        <ModalCloseButton/>*/}
            {/*        <ModalBody>*/}
            {/*            <VStack spacing={4}>*/}
            {/*                <Input*/}
            {/*                    placeholder={'Name'}*/}
            {/*                    name={'name'}*/}
            {/*                    defaultValue={updatedCategory.name}*/}

            {/*                ></Input>*/}
            {/*                <Input*/}
            {/*                    placeholder={'Price'}*/}
            {/*                    name={'price'}*/}
            {/*                    type={'number'}*/}
            {/*                    defaultValue={updatedCategory.price}*/}
            {/*                ></Input>*/}
            {/*                <Input*/}
            {/*                    placeholder={'Image URl'}*/}
            {/*                    name={'image'}*/}
            {/*                    // TODO refactor for list of images*/}
            {/*                    defaultValue={updatedCategory.images[0]}*/}
            {/*                ></Input>*/}
            {/*            </VStack>*/}
            {/*        </ModalBody>*/}
            {/*        <ModalFooter>*/}
            {/*            <Button colorScheme='blue' mr={3} onClick={() => handleUpdateCategory(data.category._id, updatedCategory) }>*/}
            {/*                Update*/}
            {/*            </Button>*/}
            {/*            <Button variant='ghost' onClick={onClose}>Close</Button>*/}
            {/*        </ModalFooter>*/}
            {/*    </ModalContent>*/}
            {/*</Modal>*/}

        </Box>
    )
}