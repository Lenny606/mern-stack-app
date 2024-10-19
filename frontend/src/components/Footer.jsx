import {Button, Container, Flex, HStack, Text, useColorMode, Link, Icon} from "@chakra-ui/react";
// import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import SocialLinks from "./Links/SocialLinks.jsx";
import FooterLinks from "./Links/FooterLinks.jsx";

const Footer = (props) => {


    // const hasChildren = treeMenuData && treeMenuData.children.length > 0;


    return <Container maxW={"1140px"} px={4}>
        <Flex h={16}
              columnGap={20}
              rowGap={5}
              alignItems={"center"}
              justifyContent={'center'}
              flexDir={{
                  base: 'column',
                  md: "row",
                  lg: "row",
              }}>

            {/*     links  */}
            {/*<TreeMenu menu={treeMenuData}>*/}

            {/*</TreeMenu>*/}

            <FooterLinks  treeMenuData={ props.treeMenuData}/>
        {/*    Social links icons */}
            <SocialLinks />
        </Flex>
    </Container>
}

export default Footer;