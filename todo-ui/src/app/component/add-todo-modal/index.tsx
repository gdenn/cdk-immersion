'use client';

import React from 'react';
import { TodoProps } from '../todo';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useCreateTodo } from './hook';

interface AddTodoModalProps {
  addTodo: (todo: TodoProps) => void;
  isModalOpen: boolean;
  closeModal: () => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  closeModal,
  isModalOpen
}: AddTodoModalProps) => {

  const {
    title,
    setTitle,
    description,
    setDescription,
    onSubmit
  } = useCreateTodo();

  return (
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Add</Button>
        <Button color="gray" onClick={closeModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTodoModal;
