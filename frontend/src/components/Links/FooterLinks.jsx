import {HStack, Icon, Link} from "@chakra-ui/react";
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";


const FooterLinks = (props) => {

    const links = props.treeMenuData
    return (
        <HStack spacing={4} alignItems="center">
            {links?.length ? (
                links.map((item) => (
                    <Link
                        key={item.id}
                        href={item.path}
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                    >
                        {item.label}
                    </Link>
                ))
            ) : null}
        </HStack>
    )
}

export default FooterLinks;