import React, { useState } from 'react';

//Components
import Header from './Header';
import ListItems from './ListItems';
import InputModal from './InputModal';

//import async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({todos, setTodos}) => {

    //Clear All
    const handleClearAllTodos = () => {
        AsyncStorage.setItem("storedTodos", JSON.stringify([])).then(() => {
            setTodos([]);
        }).catch(error => console.log(error));
    }

    //Modal visibility variable
    const [modalVisibility, setModalVisibility] = useState(false);

    //Todo input variable
    const [todoInputValue, setTodoInputValue] = useState();

    //function to add a todo
    const handleAddTodo = (todo) => {
        const newTodos = [...todos, todo];
        AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos)).then(() => {
            setTodos(newTodos);
            setModalVisibility(false);
        }).catch(error => console.log(error));
    }

    //Editing
    const [todoToBeEdited, setTodoToBeEdited] = useState(null);

    const handleTriggerEdit = (item) => {
        setTodoToBeEdited(item);
        setModalVisibility(true);
        setTodoInputValue(item.title);
    }

    const handleEditTodo = (editedTodo) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
        newTodos.splice(todoIndex, 1, editedTodo);

        AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos)).then(() => {
            setTodos(newTodos);
            setModalVisibility(false);
            setTodoToBeEdited(null);
            setTodos(newTodos);
            setModalVisibility(false);
        }).catch(error => console.log(error));
    }

    return  (
        <>
            <Header handleClearAllTodos={handleClearAllTodos}/>
            <ListItems 
                todos={todos}
                setTodos={setTodos}
                handleTriggerEdit={handleTriggerEdit}
            />
            <InputModal
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
                todoInputValue={todoInputValue}
                setTodoInputValue={setTodoInputValue}
                handleAddTodo={handleAddTodo}
                todoToBeEdited={todoToBeEdited}
                setTodoToBeEdited={setTodoToBeEdited}
                handleEditTodo={handleEditTodo}
                todos={todos}
            />
        </>
    );
}

export default Home;