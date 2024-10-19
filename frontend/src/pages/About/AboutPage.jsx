import {Container, VStack, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom"
import {SimpleGrid} from '@chakra-ui/react'
import {useProductStore} from "../../store/product.js";
import React, {useEffect} from "react";
import {ProductCard} from "../../components/ProductCard.jsx";

export const AboutPage = () => {

    // const {fetchProducts, products} = useProductStore();
    //
    // useEffect(() => {
    //     fetchProducts()
    // }, [fetchProducts]);

    const fakturoid = async () => {
        const res = await fetch( 'https://app.fakturoid.cz/api/v3/oauth?client_id=66ef4d634e2d123adf22d52ddd88c3abc17c3b90&redirect_uri=https://mern-stack-app-sjj5.onrender.com/&response_type=code');
        const data = await res.json();
    }

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
                    About Us
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