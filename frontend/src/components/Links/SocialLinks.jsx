import {HStack, Icon, Link} from "@chakra-ui/react";
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";

const SocialLinks = () => {
    return (
        <HStack spacing={4} alignItems="center" >
            {/* Facebook */}
            <Link href="https://www.facebook.com" isExternal aria-label="Facebook">
                <Icon
                    as={FaFacebook}
                    boxSize={{
                        base: "24px", // 24px on mobile
                        md: "30px",   // 30px on tablets
                        lg: "36px",   // 36px on large screens
                    }}
                    color="blue.500"
                    _hover={{ color: 'blue.600' }}
                />
            </Link>

            {/* Twitter */}
            <Link href="https://www.twitter.com" isExternal aria-label="Twitter">
                <Icon
                    as={FaTwitter}
                    boxSize={{
                        base: "24px",
                        md: "30px",
                        lg: "36px",
                    }}
                    color="cyan.400"
                    _hover={{ color: 'cyan.500' }}
                />
            </Link>

            {/* Instagram */}
            <Link href="https://www.instagram.com" isExternal aria-label="Instagram">
                <Icon
                    as={FaInstagram}
                    boxSize={{
                        base: "24px",
                        md: "30px",
                        lg: "36px",
                    }}
                    color="pink.400"
                    _hover={{ color: 'pink.500' }}
                />
            </Link>

            {/* LinkedIn */}
            <Link href="https://www.linkedin.com" isExternal aria-label="LinkedIn">
                <Icon
                    as={FaLinkedin}
                    boxSize={{
                        base: "24px",
                        md: "30px",
                        lg: "36px",
                    }}
                    color="blue.700"
                    _hover={{ color: 'blue.800' }}
                />
            </Link>
        </HStack>
    )
}

export default SocialLinks;