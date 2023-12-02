import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";


type DeleteModalProps = {
    isDeleteOpen: boolean;
    onDeleteClose: () => void;
    onDelete: () => void;
    message: string | null;
};

const DeleteModal: React.FC<DeleteModalProps> = ({isDeleteOpen, onDeleteClose, message, onDelete}) => {
    return (
        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Delete Book</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {message}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onDeleteClose}>
                        No
                    </Button>
                    <Button colorScheme='green' onClick={onDelete}>Yes</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );


}

export default DeleteModal;
