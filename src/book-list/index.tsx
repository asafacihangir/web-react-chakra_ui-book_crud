import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    IconButton,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spacer,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {AiFillEye, MdDelete, MdEdit} from "react-icons/all";


interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    code: string;
    createdAt: string;
}

interface Book {
    title: string;
    author: string;
    publisher: string;
    publicationDate: string;
    isbn: string;
    genre: string;
}


const BookList = () => {
    const [book, setBook] = useState<Book>({
        title: '',
        author: '',
        publisher: '',
        publicationDate: '',
        isbn: '',
        genre: ''
    });
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);


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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBook(prevBook => ({
            ...prevBook,
            [e.target.name]: e.target.value
        }));
    };
    const onSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Click olayının varsayılan işlemi önle, eğer varsa
        console.log("Test"); // Konsola "Test" yazdırır
        console.log(book); // 'book' state'ini konsola yazdırır
    }


    return (
        <Box w='100%' bg='white' p={4} borderWidth='5px' borderRadius='lg' mt="10">
            <Flex p={4}>
                <h2 style={{fontWeight: 600}}>Book List</h2>
                <Spacer/>
                <Link>
                    <Button onClick={onOpen} colorScheme='blue'>Create Book</Button>
                </Link>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent maxW="2xl">
                    <ModalHeader>Create Book</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Grid templateColumns="repeat(2, 2fr)" gap={6}>
                            <GridItem colSpan={1}>
                                <VStack spacing={8}>
                                    <FormControl isRequired>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text" name="title" onChange={handleChange} placeholder="Title"/>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Author</FormLabel>
                                        <Input type="email" name="author" onChange={handleChange} placeholder="Author"/>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Publisher</FormLabel>
                                        <Input type="text" name="publisher" onChange={handleChange}
                                               placeholder="Publisher"/>
                                    </FormControl>
                                </VStack>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <VStack spacing={8}>
                                    <FormControl isRequired>
                                        <FormLabel>Publication Date</FormLabel>
                                        <Input type="date" name="publicationDate" onChange={handleChange}
                                               placeholder="Publication Date"/>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>ISBN</FormLabel>
                                        <Input type="text" name="isbn" onChange={handleChange} placeholder="ISBN"/>
                                    </FormControl>


                                    <FormControl isRequired>
                                        <FormLabel>Genre</FormLabel>
                                        <Select placeholder="Select genre" name="genre" onChange={handleSelectChange}>
                                            {genres.map((genre, index) => (
                                                <option key={index} value={genre}>
                                                    {genre}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </VStack>
                            </GridItem>
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={onSave}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
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
                            <Tr>
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


