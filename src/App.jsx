
import './App.css'
import Todolist from './Todolist'
import { Todos } from './ContextTodo'
import { useState,useEffect } from 'react'
import { v4 as id } from 'uuid';
function App() {

const [Tododata, setTododata]=useState( ()=> {
    const storage = JSON.parse(localStorage.getItem("todo"));
    return storage ||[
  {id:id(),
    title:" ",
   completed:"false"}]
});
useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(Tododata));
  }, [Tododata]);
  return (
    <>
     <Todos.Provider value={{ Tododata, setTododata }}>
        <Todolist />
      </Todos.Provider>
    </>
  )
}

export default App
