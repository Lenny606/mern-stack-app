import React, { useState } from 'react';
import {
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Box
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchInputButton = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Box width="100%" maxWidth="400px">
            <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleSearch}>
                        <SearchIcon />
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Box>
    );
};

export default SearchInputButton;