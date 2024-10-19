import {Container, VStack, Text} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import React, {useEffect} from "react";
import ContactForm from "../../components/Form/ContactForm.jsx";

const getRandomString = async () => {
    const response = await fetch('https://restcountries.com/v3.1/region/europe');
    // const data = Promise.reject('errr')
    const data = await response.json()
    return data
}


export const AboutPage = () => {

    const {
        data: responseData,
        error: responseError,
        isLoading: responseLoading
    } = useQuery({
        queryKey: ['randomString'],
        queryFn: getRandomString,
    })
    // console.log(getStringQuery)
    //
    if(responseError && !responseLoading) {
        return (
            <>
                <Text color="red.500">An error occurred: {responseError}</Text>
            </>
        )
    }

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
            <ContactForm />
            <VStack spacing={9}>
                <Text fontSize='30' fontWeight='bold'
                      bgGradient={"linear(to-r, cyan.400, blue.500)"}
                      bgClip={'text'}
                      textAlign={'center'}>
                    About Us
                </Text>
                {
                   responseData && !responseLoading ?
                        (
                       <>
                           {responseData.map(item => (
                               <div>
                                   <h5>{item.name.common}</h5>
                                   <p>{item.region}</p>
                               </div>
                           ) )}

                       </>
                    ) :
                       <div>Loading ... </div>
                }
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