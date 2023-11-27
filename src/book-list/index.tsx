import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Flex,
    IconButton,
    Link,
    Spacer,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import {AiFillEye, MdDelete, MdEdit} from "react-icons/all";

import CreateBook from "../create-book";
import Book from "../model/book";


const BookList = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const toast = useToast()


    useEffect(() => {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        }

        const storedGenres = localStorage.getItem('genres');
        if (storedGenres) {
            setGenres(JSON.parse(storedGenres));
        }
    }, [setBooks, setGenres]);


    const onSubmit = (newBook: Book) => {
        try {
            const storedBooks = localStorage.getItem('books');
            let books = storedBooks ? JSON.parse(storedBooks) : [];
            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));
            setBooks(books);
            toast({
                title: 'Successful',
                description: "Book created successfully!",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            console.error("Error saving the book", error);
            toast({
                title: 'Error',
                description: "While creatina a book error occcured: " + error,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };


    return (
        <Box w='100%' bg='white' p={4} borderWidth='5px' borderRadius='lg' mt="10">
            <Flex p={4}>
                <h2 style={{fontWeight: 600}}>Book List</h2>
                <Spacer/>
                <Link>
                    <Button
                        onClick={onOpen} colorScheme='blue'>Create Book</Button>
                </Link>
            </Flex>

            <CreateBook
                isOpen={isOpen}
                onClose={onClose}
                genres={genres}
                onSubmit={onSubmit}
            />
            <Table variant='simple'>
                <TableCaption>Book Management List</TableCaption>
                <Thead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Title</Th>
                        <Th>Author</Th>
                        <Th>Publisher</Th>
                        <Th>Publication Date</Th>
                        <Th>ISBN</Th>
                        <Th>Genre</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        books.map((book: Book, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{book.title}</Td>
                                <Td>{book.author}</Td>
                                <Td>{book.publisher}</Td>
                                <Td>{book.publicationDate}</Td>
                                <Td>{book.isbn}</Td>
                                <Td>{book.genre}</Td>
                                <Td>
                                    <IconButton
                                        size="sm"
                                        icon={<AiFillEye style={{fontSize: '1.2rem'}}/>}
                                        aria-label=""/>
                                    <IconButton
                                        size="sm"
                                        ml="2"
                                        icon={<MdEdit style={{fontSize: '1.2rem'}}/>}
                                        aria-label=""></IconButton>
                                    <IconButton
                                        ml="2"
                                        size="sm"
                                        icon={<MdDelete style={{fontSize: '1.2rem', color: 'red'}}/>}
                                        aria-label=""/>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </Box>

    );


};

export default BookList;


