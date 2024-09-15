import {Container, VStack, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom"
import {SimpleGrid} from '@chakra-ui/react'
import React, {useEffect} from "react";
import {useCategoryStore} from "../../store/category.js";
import {CategoryCard} from "../../components/CategoryCard.jsx";

export const CategoryPage = () => {

     const {fetchCategories, categories} = useCategoryStore();

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories]);


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

                <SimpleGrid columns={{
                    base: 1,
                    md: 2,
                    lg: 3,
                }}
                            spacing={10}
                            w={"full"}>
                    {
                        categories.map(category => {
                            return <CategoryCard key={category._id} category={category}/>
                        })
                    }
                </SimpleGrid>

                {categories.length == 0 ?
                    <Text fontSize='30' fontWeight='bold'
                          bgGradient={"linear(to-r, cyan.400, blue.500)"}
                          bgClip={'text'}
                          textAlign={'center'}>
                        No categories found
                        <Link to={'/create'}>
                            <Text as={'span'} fontSize='30' fontWeight='bold' _hover={{textDecoration: 'underline'}}>
                                Create Product
                            </Text>
                        </Link>
                    </Text>

                    : null
                }
            </VStack>
        </Container>
    )
}