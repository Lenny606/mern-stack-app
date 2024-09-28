import {Button, Container, Flex, HStack, Text, useColorMode} from "@chakra-ui/react";
import {LockIcon, PlusSquareIcon, UnlockIcon} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";
import {useProductStore} from "../store/product.js";
import {useUserStore} from "../store/user.js";
import treeMenuData from "./TreeMenu/data.js";
import TreeMenu from "./TreeMenu/TreeMenu.jsx";
import Logout from "./Logout.jsx";

const NavBar = (props) => {

    const treeMenuData = props.treeMenuData;
    // const hasChildren = treeMenuData && treeMenuData.children.length > 0;
    const {colorMode, toggleColorMode} = useColorMode();
    const { products } = useProductStore();
    const { isLogged } = useUserStore();

    return <Container maxW={"container.xl"} px={12} bgColor={"#276cf930"}>
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
                        {isLogged ? <UnlockIcon fontSize={20} /> : <LockIcon fontSize={20} />}
                    </Button>
                </Link>
                <Link to={isLogged ? "/logout" : "/register"}>
                    <Button
                        aria-label="User register"
                        title="User register" // Tooltip for accessibility
                    >
                        {isLogged ? <UnlockIcon fontSize={20} /> : <LockIcon fontSize={20} />}
                    </Button>
                </Link>
                <Link to={"/admin"}>
                    <Button
                        aria-label="User register"
                        title="User register" // Tooltip for accessibility
                    >
                        Admin
                    </Button>
                </Link>
                <Logout></Logout>
            </HStack>
        </Flex>
    </Container>
}

export default NavBar;