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
import {MdDelete, MdEdit} from "react-icons/all";

import CreateBook from "../create-book";
import Book from "../model/book";
import DeleteModal from "../component/delete-modal";


const genresData = ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Romance", "Western", "Dystopian", "Historical Fiction"];


const BookList = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState(genresData);
    const toast = useToast()
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [deleteBook, setDeleteBook] = useState<Book | null>(null);
    const [deleteBookMessage, setDeleteBookMessage] = useState<string | null>(null);
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure();

    const onEdit = (book: Book) => {
        setSelectedBook(book);
        onOpen();
    };

    const onDeleteConfirm = (book: Book) => {
        const message = `Are you sure you want to delete the book "${book?.title}" with ISBN "${book?.isbn}"?`;
        setDeleteBook(book);
        setDeleteBookMessage(message);
        onDeleteOpen();
    };

    useEffect(() => {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        }
    }, [setBooks]);

    const onDelete = () => {
        const storedBooks = localStorage.getItem('books');
        let books = storedBooks ? JSON.parse(storedBooks) : [];
        books = books.filter((b: Book) => b.isbn !== deleteBook?.isbn);
        localStorage.setItem('books', JSON.stringify(books));
        setBooks(books);
        onDeleteClose();
        toast({
            title: 'Deleted',
            description: deleteBook?.title + " has been successfully deleted.",
            status: 'info',
            duration: 9000,
            isClosable: true,
        });
    };

    const onSubmit = (newBook: Book) => {
        try {
            const storedBooks = localStorage.getItem('books');
            let books = storedBooks ? JSON.parse(storedBooks) : [];

            // ISBN numarasına göre kitabın zaten kaydedilip kaydedilmediğini kontrol et
            const existingIndex = books.findIndex((b: Book) => b.isbn === newBook.isbn);

            if (existingIndex > -1) {
                // Kitap zaten var, güncelle
                books[existingIndex] = newBook;
                toast({
                    title: 'Successful',
                    description: "Book updated successfully!",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                // Yeni kitap, listeye ekle
                books.push(newBook);
                toast({
                    title: 'Successful',
                    description: "Book created successfully!",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            }

            // Yeni kitap listesini localStorage'a kaydet
            localStorage.setItem('books', JSON.stringify(books));
            setBooks(books); // State'i güncelle
            onClose(); // Modal'ı kapat
        } catch (error) {
            console.error("Error saving the book", error);
            toast({
                title: 'Error',
                description: "An error occurred while creating/updating the book: " + error,
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
                onClose={() => {
                    onClose();
                    setSelectedBook(null);
                }}
                genres={genres}
                onSubmit={onSubmit}
                initialBook={selectedBook}
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
                                        ml="2"
                                        icon={<MdEdit style={{fontSize: '1.2rem'}}/>}
                                        onClick={() => onEdit(book)} // Düzenle butonuna onClick olayı ekleniyor
                                        aria-label=""></IconButton>
                                    <IconButton
                                        ml="2"
                                        size="sm"
                                        onClick={() => onDeleteConfirm(book)}
                                        icon={<MdDelete style={{fontSize: '1.2rem', color: 'red'}}/>}
                                        aria-label=""/>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>

            <DeleteModal isDeleteOpen={isDeleteOpen} onDeleteClose={onDeleteClose} onDelete={onDelete}
                         message={deleteBookMessage}/>
        </Box>

    );


};

export default BookList;


