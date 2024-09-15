import {Button, Container, Flex, HStack, Text, useColorMode} from "@chakra-ui/react";
import {PlusSquareIcon, UnlockIcon} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";
import {useProductStore} from "../store/product.js";
import treeMenuData from "./TreeMenu/data.js";
import TreeMenu from "./TreeMenu/TreeMenu.jsx";
import Login from "./Login.jsx";

const NavBar = (props) => {

    const treeMenuData = props.treeMenuData;
    // const hasChildren = treeMenuData && treeMenuData.children.length > 0;
    console.log(treeMenuData)
    const {colorMode, toggleColorMode} = useColorMode();
    const { products } = useProductStore();

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

        {/*    Middle buttons */}
        {/*    <HStack spacing={treeMenuData.length} alignItems={'center'} >*/}
        {/*        {treeMenuData.map(function(item) {*/}
        {/*            console.log(item)*/}
        {/*            return (*/}
        {/*                <Link key={item.id} to={item.path}>*/}
        {/*                    {item.label}*/}
        {/*                </Link>*/}
        {/*            /!*    check for nested items*!/*/}
        {/*            */}
        {/*                hasChildren && displayCurrentChild[item.id]*/}
        {/*                    ? <TreeMenuList list={item.children}/>*/}
        {/*                    : null*/}

        {/*            */}
        {/*            )})*/}
        {/*        }*/}

        {/*        /!*<Button onClick={toggleColorMode}>*!/*/}
        {/*        /!*    {colorMode === 'light' ? <IoMoon/> : <LuSun />}*!/*/}
        {/*        /!*</Button>*!/*/}
        {/*    </HStack>*/}

            <TreeMenu menu={treeMenuData}>

            </TreeMenu>
        {/*    Right buttons */}
            <HStack spacing={3} alignItems={'center'}>
                <Link to="/create">
                    <Button
                        aria-label="Create new item"
                        title="Create new item" // Tooltip for accessibility
                    >
                        <PlusSquareIcon fontSize={20} />
                    </Button>
                </Link>

                <Button
                    aria-label={`Toggle ${colorMode === 'light' ? 'dark' : 'light'} mode`}
                    onClick={toggleColorMode}
                >
                    {colorMode === 'light' ? <IoMoon /> : <LuSun />}
                </Button>

                <Link to="/login">
                    <Button
                        aria-label="User login"
                        title="User login" // Tooltip for accessibility
                    >
                        <UnlockIcon fontSize={20} />
                    </Button>
                </Link>
            </HStack>
        </Flex>
    </Container>
}

export default NavBar;