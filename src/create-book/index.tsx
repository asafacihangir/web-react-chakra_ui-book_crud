import React, {useEffect, useState} from "react";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    VStack
} from "@chakra-ui/react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Book from "../model/book";


type CreateBookModalProps = {
    isOpen: boolean;
    onClose: () => void;
    genres: string[];
    onSubmit: (newBook: Book) => void;
};

const CreateBook: React.FC<CreateBookModalProps> = ({ isOpen, onClose, genres, onSubmit }) => {
    const [book, setBook] = useState<Book>({
        title: '',
        author: '',
        publisher: '',
        publicationDate: '',
        isbn: '',
        genre: ''
    });
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


    return (
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
    );



};

export default CreateBook;
