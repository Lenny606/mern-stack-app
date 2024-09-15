import {Container, VStack, Text, Image, Box} from "@chakra-ui/react";
import {Link} from "react-router-dom"
import {SimpleGrid} from '@chakra-ui/react'
import {useProductStore} from "../store/product.js";
import React, {useEffect} from "react";
import {ProductCard} from "../components/ProductCard.jsx";

export const HomePage = () => {

    const {fetchProducts, products} = useProductStore();

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]);


    return (
        <Container maxW="container.xl" py={12}>

            <Box boxSize=""
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
                 >

                <Image
                    src="/hp-main-banner.webp"
                    alt="Main banner"
                    aria-hidden="true"
                    boxSize={1200}
                    height={600}
                    objectFit="fit"

                />
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
                    Current Products
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
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            role="listitem" /* Each card acts as a list item */
                        />
                    ))}
                </SimpleGrid>

                {/* No products found */}
                {products.length === 0 ? (
                    <Text
                        fontSize="30"
                        fontWeight="bold"
                        bgGradient="linear(to-r, cyan.400, blue.500)"
                        bgClip="text"
                        textAlign="center"
                        role="alert" /* Alert for when no products are found */
                    >
                        No products found.{' '}
                        <Link to="/create" aria-label="Create a product">
                            <Text
                                as="span"
                                fontSize="30"
                                fontWeight="bold"
                                _hover={{ textDecoration: 'underline' }}
                            >
                                Create Product
                            </Text>
                        </Link>
                    </Text>
                ) : null}
            </VStack>
        </Container>
    )
}