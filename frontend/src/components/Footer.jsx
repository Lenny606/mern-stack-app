import {Button, Container, Flex, HStack, Text, useColorMode} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";
import {useProductStore} from "../store/product.js";
import treeMenuData from "./TreeMenu/data.js";
import TreeMenu from "./TreeMenu/TreeMenu.jsx";

const Footer = (props) => {

    const treeMenuData = props.treeMenuData;
    // const hasChildren = treeMenuData && treeMenuData.children.length > 0;

    const {colorMode, toggleColorMode} = useColorMode();

    return <Container maxW={"1140px"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={'space-between'}

              flexDir={{
                  base: 'column',
                  sm: "row"
              }}>

            <TreeMenu menu={treeMenuData}>

            </TreeMenu>
        {/*    Right buttons */}
            <HStack spacing={2} alignItems={'center'} >
                <Link to={"/create"}>
                    <Button>
                        {/*<PlusSquareIcon  fontSize={20}/>*/}
                    </Button>
                </Link>
                    <Button onClick={toggleColorMode}>
                        {/*{colorMode === 'light' ? <IoMoon/> : <LuSun />}*/}
                    </Button>
            </HStack>
        </Flex>
    </Container>
}

export default Footer;