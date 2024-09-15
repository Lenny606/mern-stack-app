import {Container, VStack, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom"
import {SimpleGrid} from '@chakra-ui/react'
import {useProductStore} from "../store/product.js";
import React, {useEffect} from "react";
import {ProductCard} from "../components/ProductCard.jsx";

export const CategoryPage = () => {

    // const {fetchProducts, products} = useProductStore();
    //
    // useEffect(() => {
    //     fetchProducts()
    // }, [fetchProducts]);


    return (
        <Container
            maxW={"container.xl"}
            py={12}
        >
            <VStack spacing={9}>
                <Text fontSize='30' fontWeight='bold'
                      bgGradient={"linear(to-r, cyan.400, blue.500)"}
                      bgClip={'text'}
                      textAlign={'center'}>
                    Categories
                </Text>

                {/*<SimpleGrid columns={{*/}
                {/*    base: 1,*/}
                {/*    md: 2,*/}
                {/*    lg: 3,*/}
                {/*}}*/}
                {/*            spacing={10}*/}
                {/*            w={"full"}>*/}
                {/*    {*/}
                {/*        products.map(product => {*/}
                {/*            return <ProductCard key={product._id} product={product}/>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</SimpleGrid>*/}

                {/*{products.length == 0 ?*/}
                {/*    <Text fontSize='30' fontWeight='bold'*/}
                {/*          bgGradient={"linear(to-r, cyan.400, blue.500)"}*/}
                {/*          bgClip={'text'}*/}
                {/*          textAlign={'center'}>*/}
                {/*        No products found*/}
                {/*        <Link to={'/create'}>*/}
                {/*            <Text as={'span'} fontSize='30' fontWeight='bold' _hover={{textDecoration: 'underline'}}>*/}
                {/*                Create Product*/}
                {/*            </Text>*/}
                {/*        </Link>*/}
                {/*    </Text>*/}

                {/*    : null*/}
                {/*}*/}
            </VStack>
        </Container>
    )
}