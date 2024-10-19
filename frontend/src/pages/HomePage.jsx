import {Container, VStack, Text, Image, Box} from "@chakra-ui/react";
import {Link} from "react-router-dom"
import {SimpleGrid} from '@chakra-ui/react'
import {useProductStore} from "../store/product.js";
import {useLogger} from "../utility/LoggerContext.jsx"
import React, {useEffect, useState} from "react";
import {ProductCard} from "../components/ProductCard.jsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export const HomePage = () => {
    const {fetchProducts, products} = useProductStore();

    const queryClient = useQueryClient()
    const query = useQuery({ queryKey: ['products'], queryFn: fetchProducts })
    // console.log(query.data)

    const logger = useLogger()

    //TODO implement some feature like rich text field
    // https://www.freecodecamp.org/news/use-the-javascript-selection-api-to-build-a-rich-text-editor/
    const selection = window.getSelection();
    document.addEventListener("selectionchange", () => {

        const range = selection.getRangeAt(0)

        // console.log("Selection changed:", selection.toString());
        // console.log("Selection changed:", range);
    });

    // useEffect(() => {
    //     fetchProducts()
    // }, [fetchProducts]);



    return (
        <Container bgColor="#276cf930" maxW="container.xl" width={'full'} py={12} >

            <Box boxSize=""
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
                 >

                <Image
                    src="/hp-main-banner.webp"
                    alt="Main banner"
                    aria-hidden="true"
                    height={{
                        base: "200px",  // Smaller height on mobile
                        md: "400px",    // Medium height on tablets
                        lg: "600px",    // Full height on large screens
                    }}
                    objectFit="fit"
                    boxSize={{
                        base: "100%", // Full width on mobile
                        md: "80%",    // 80% width on tablets
                        lg: "60%",    // 60% width on larger screens
                    }}

                />
            </Box>

            <VStack spacing={9} pt={20}>
                {/* Heading for screen readers */}
                <Text
                    as="h1"
                    fontSize={{
                        base: "24px",  // Smaller font size on mobile
                        md: "30px",    // Medium font size on tablets
                        lg: "36px",    // Larger font size on large screens
                    }}
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
                    {products && products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            role="listitem" /* Each card acts as a list item */
                        />
                    ))}
                </SimpleGrid>

                {/* No products found */}
                {products && products.length === 0 ? (
                    <Text
                        fontSize={{
                            base: "24px",  // Smaller font size on mobile
                            md: "30px",    // Medium font size on tablets
                            lg: "36px",    // Larger font size on large screens
                        }}
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
                                fontSize={{
                                    base: "24px",  // Smaller font size on mobile
                                    md: "30px",    // Medium font size on tablets
                                    lg: "36px",    // Larger font size on large screens
                                }}
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