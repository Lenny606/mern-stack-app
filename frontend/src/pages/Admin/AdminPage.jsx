import {Container, VStack, Text, Image, Box} from "@chakra-ui/react";
import {Link} from "react-router-dom"
import {SimpleGrid} from '@chakra-ui/react'
import React, {useEffect} from "react";
import {useUserStore} from "../../store/user.js";


export const AdminPage = () => {


    return (
        <Container bgColor="#276cf930" maxW="container.xl" py={12}>

            <Box boxSize=""
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
            >
                <Text
                    as="h1"
                    fontSize="30"
                    fontWeight="bold"
                    bgGradient="linear(to-r, cyan.400, blue.500)"
                    bgClip="text"
                    textAlign="center"
                    aria-label="Current Products"
                >
                    Admin Page
                </Text>
            </Box>

            <VStack spacing={9} pt={20}>
                {/* Heading for screen readers */}
                <Text
                    as="h1"
                    fontSize="30"
                    fontWeight="bold"
                    bgGradient="linear(to-r, cyan.400, blue.500)"
                    bgClip="text"
                    textAlign="center"
                    aria-label="Current Products"
                >

                </Text>

                {/* Grid of products */}
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w="full"
                    role="list" /* Accessible grid list */
                >

                </SimpleGrid>


            </VStack>
        </Container>
    )
}