import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  confirm?: boolean;
}

export const CompleteModal = ({
  children,
  isOpen,
  onClose,
  title,
  confirm,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={4} bg="green.600"  color="white">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {confirm && (
          <ModalFooter>
            <Button colorScheme="green" onClick={onClose} width="100%">
              OK
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
