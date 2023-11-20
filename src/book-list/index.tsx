import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Flex,
    FormControl, FormErrorMessage,
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
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";


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


    const bookSchema = yup.object({
        title: yup.string().required('Title is required'),
        author: yup.string().required('Author is required'),
        publisher: yup.string().required('Publisher is required'),
        publicationDate: yup.string().required('Publication Date is required')
            .matches(
                /^\d{4}-\d{2}-\d{2}$/,
                'Publication Date must be in the format YYYY-MM-DD'
            ), isbn: yup.string().required('ISBN is required'),
        genre: yup.string().required('Genre is required'),
    });

    const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm<Book>({
        resolver: yupResolver(bookSchema),
        mode: "all",
        defaultValues: {
            title: '',
            author: '',
            publisher: '',
            publicationDate: '',
            isbn: '',
            genre: ''
        }
    });


    // Modal açıldığında formu sıfırla
    useEffect(() => {
        if (isOpen) {
            reset();
        }
    }, [isOpen, reset]);

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

    const onSubmit = (values: Book) => {
        console.log(values);
    };


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
                        <form id="create-book-form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            alert("Submitted")
                        }}>
                            <Grid templateColumns="repeat(2, 2fr)" gap={6}>
                                <GridItem colSpan={1}>
                                    <VStack spacing={8}>
                                        <FormControl isRequired
                                                     isInvalid={Boolean(errors?.title)}>
                                            <FormLabel>Title</FormLabel>
                                            <Input type="text"
                                                   {...register("title")}
                                                   name="title" onChange={handleChange}
                                                   placeholder="Title"/>

                                            <FormErrorMessage>
                                                {errors?.title && errors?.title?.message}
                                            </FormErrorMessage>

                                        </FormControl>

                                        <FormControl isRequired isInvalid={!!errors?.author?.message}>
                                            <FormLabel>Author</FormLabel>
                                            <Input type="email"
                                                   {...register("author")}
                                                   name="author" onChange={handleChange}
                                                   placeholder="Author"/>

                                            <FormErrorMessage>
                                                {errors?.author && errors?.author?.message}
                                            </FormErrorMessage>

                                        </FormControl>

                                        <FormControl isRequired isInvalid={!!errors?.publisher?.message}>
                                            <FormLabel>Publisher</FormLabel>
                                            <Input type="text"
                                                   {...register("publisher")}
                                                   name="publisher" onChange={handleChange}
                                                   placeholder="Publisher"/>
                                            <FormErrorMessage>
                                                {errors?.publisher && errors?.publisher?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </VStack>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <VStack spacing={8}>
                                        <FormControl isRequired isInvalid={!!errors?.publicationDate?.message}>
                                            <FormLabel>Publication Date</FormLabel>
                                            <Input type="date"
                                                   {...register("publicationDate")}
                                                   name="publicationDate" onChange={handleChange}
                                                   placeholder="Publication Date"/>
                                            <FormErrorMessage>
                                                {errors?.publicationDate && errors?.publicationDate?.message}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl isRequired isInvalid={!!errors?.isbn?.message}>
                                            <FormLabel>ISBN</FormLabel>
                                            <Input type="text"
                                                   {...register("isbn")}
                                                   name="isbn" onChange={handleChange} placeholder="ISBN"/>
                                            <FormErrorMessage>
                                                {errors?.isbn && errors?.isbn?.message}
                                            </FormErrorMessage>
                                        </FormControl>


                                        <FormControl isRequired isInvalid={!!errors?.genre?.message}>
                                            <FormLabel>Genre</FormLabel>
                                            <Select placeholder="Select genre"
                                                    {...register("genre")}
                                                    name="genre"
                                                    onChange={handleSelectChange}>
                                                {genres.map((genre, index) => (
                                                    <option key={index} value={genre}>
                                                        {genre}
                                                    </option>
                                                ))}
                                            </Select>
                                            <FormErrorMessage>
                                                {errors?.genre && errors?.genre?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </VStack>
                                </GridItem>
                            </Grid>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' mr={3} type="submit"
                                onClick={handleSubmit(onSubmit)}
                                isDisabled={!isValid}
                                form="create-book-form">
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


