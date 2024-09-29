import {Button, Collapse, Container, Flex, HStack, List, ListIcon, ListItem, Text, useColorMode, Box} from "@chakra-ui/react";
import {LockIcon, PlusSquareIcon, SearchIcon, UnlockIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";
import {useProductStore} from "../store/product.js";
import {useUserStore} from "../store/user.js";
import treeMenuData from "./TreeMenu/data.js";
import TreeMenu from "./TreeMenu/TreeMenu.jsx";
import Logout from "./Logout.jsx";
import Search from "./Inputs/Search.jsx";
import {useEffect, useRef, useState} from "react";

const NavBar = (props) => {

    const [searchedItems, setSearchedItems] = useState([]);
    const [searchedItemsCount, setSearchedItemsCount] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const treeMenuData = props.treeMenuData;
    // const hasChildren = treeMenuData && treeMenuData.children.length > 0;
    const {colorMode, toggleColorMode} = useColorMode();
    const {products, searchProducts} = useProductStore();
    const {isLogged} = useUserStore();

    const handleSearch = async (term) => {
        const result = await searchProducts(term)
        const data = result.data.data //array
        console.log(data)
        const itemsCount = result.count //array

        if (itemsCount > 0) {
            setSearchedItems(data)
            setSearchedItemsCount(itemsCount)
            setIsOpen(true)
        }

    };
    const wrapperRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
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
            <HStack spacing={4} alignItems={'center'}>
                <Search onSearch={handleSearch} />
                <Collapse in={isOpen && searchedItems.length > 0} animateOpacity>
                    <Box
                        mt={8}
                        border="1px"
                        // borderColor={borderColor}
                        borderRadius="md"
                        boxShadow="md"
                        bg={'#276cf930'}
                        position="absolute"
                        right={545}
                        width="25%"
                        zIndex={10}
                        ref={wrapperRef}
                    >
                        <List spacing={3} p={4}>
                            {searchedItems.length > 0 && searchedItems.map((item, index) => (
                                <ListItem key={index} display="flex" alignItems="center">
                                    <ListIcon as={SearchIcon} color="green.500" />
                                    <Text>{item.name}</Text>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Collapse>
                <Link to="/create">
                    <Button
                        aria-label="Create new item"
                        title="Create new item" // Tooltip for accessibility
                    >
                        <PlusSquareIcon fontSize={20}/>
                    </Button>
                </Link>

                <Button
                    aria-label={`Toggle ${colorMode === 'light' ? 'dark' : 'light'} mode`}
                    onClick={toggleColorMode}
                >
                    {colorMode === 'light' ? <IoMoon/> : <LuSun/>}
                </Button>

                <Link to="/login">
                    <Button
                        aria-label="User login"
                        title="User login" // Tooltip for accessibility
                    >
                        {isLogged ? <UnlockIcon fontSize={20}/> : <LockIcon fontSize={20}/>}
                    </Button>
                </Link>
                {
                    !isLogged ?
                        <Link to={"/register"}>
                            <Button
                                aria-label="User register"
                                title="User register" // Tooltip for accessibility
                            >
                                {isLogged ? <UnlockIcon fontSize={20}/> : <LockIcon fontSize={20}/>}
                            </Button>
                        </Link>
                        : null
                }

                <Link to={"/admin"}>
                    <Button
                        aria-label="User register"
                        title="User register" // Tooltip for accessibility
                    >
                        Admin
                    </Button>
                </Link>
                {isLogged
                    ? <Logout></Logout>
                    : ""
                }

            </HStack>
        </Flex>
    </Container>
}

export default NavBar;