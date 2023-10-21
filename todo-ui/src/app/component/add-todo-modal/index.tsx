'use client';

import React from 'react';
import { TodoProps } from '../todo';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

interface AddTodoModalProps {
  addTodo: (todo: TodoProps) => void;
  isModalOpen: boolean;
  closeModal: () => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  closeModal,
  isModalOpen
}: AddTodoModalProps) => (
  <Modal show={isModalOpen} onClose={closeModal}>
      <Modal.Header>Create new Todo</Modal.Header>
      <Modal.Body>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="small"
            value="Todo Title"
          />
        </div>
        <TextInput
          id="small"
          sizing="sm"
          type="text"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="large"
            value="Description"
          />
        </div>
        <TextInput
          id="large"
          sizing="lg"
          type="text"
        />
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Add</Button>
        <Button color="gray" onClick={closeModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
);

export default AddTodoModal;
