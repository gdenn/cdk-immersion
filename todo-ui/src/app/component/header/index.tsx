import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import AddTodoModal from '../add-todo-modal';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title 
}) => {

  const [isModalOpen, setModelOpen] = useState(false);
  const closeModal = () => setModelOpen(false);
  const openModal = () => setModelOpen(true);

  return (
    <header className="bg-gray-800 py-4 px-6 rounded-lg">
      <div className="flex flex-row gap-3 container mx-auto flex justify-between items-center px-4">
        <h1 className="text-white text-2xl font-bold">{title}</h1>
        <Button onClick={openModal}>
          Add Todo
        </Button>
      </div>
      <AddTodoModal addTodo={() => {}} closeModal={closeModal} isModalOpen={isModalOpen} />
    </header>
  );
};

export default Header;

