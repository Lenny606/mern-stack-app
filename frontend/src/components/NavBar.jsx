import {Button, Container, Flex, HStack, Link, Text, useColorMode} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";

const NavBar = () => {

    const {colorMode, toggleColorMode} = useColorMode();

    return <Container maxW={"1140px"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={'space-between'}

              flexDir={{
                  base: 'column',
                  sm: "row"
              }}>

            <Text
                fontSize={{
                    base: "22", sm: "28"
                }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                bgClip='text'
                bgGradient='linear(to-r, #7928CA, #FF0080)'
            >
                <Link to={'/'}>Product store </Link>
            </Text>
        {/*    HOrizontal buttons */}
            <HStack spacing={2} alignItems={'center'} >
                <Link to={"/create"}>
                    <Button>
                        <PlusSquareIcon  fontSize={20}/>
                    </Button>
                </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <IoMoon/> : <LuSun />}
                    </Button>
            </HStack>
        </Flex>
    </Container>
}

export default NavBar;