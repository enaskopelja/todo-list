import React, {useState, useEffect} from 'react';
import ToDo from './ToDo'
import './styles/App.css';

function App (){
    const api = "http://127.0.0.1:8080/api/"
    const [todos, setTodos] = useState([])

    const fetchApi = (source, method = 'GET') => {
        return fetch(source, {method: method})
            .then(r => r.json())
    }

    const loadData = () => (fetchApi(api + "todos", 'GET').then(setTodos))

    useEffect(() => {
        fetchApi(api + "todos", 'GET').then(setTodos)
    }, [])


    const doneItem = (id) => (
        fetchApi(api + "todos/"+id, 'PATCH')
            .then(loadData)
    )

    const markAllBtn = () => (
        fetchApi(api +"todos", 'PATCH')
            .then(setTodos)
    )

    const deleteItem = (id) => (
        fetchApi(api +"todos/"+id,  'DELETE')
            .then(loadData)
    )

    const deleteAllBtn = () => (
        fetchApi(api +"todos", 'DELETE')
            .then(setTodos)
    )

    const newTask = (text) => (
        fetch(api +"todos", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({text: text})})
            .then(loadData)
    )

    const onInput = (event) => {
        let text = event.target.value
        if(event.which === 13 && text){
            event.target.value=''
            return newTask(text)
        }
    }

    return (
        <div className="App">
          <ToDo
                title = "To do"
                button = "Mark all as done"
                items = {todos.filter(todo => todo.done === false)}
                onProcessItem = {doneItem}
                onProcessAll = {markAllBtn}
                onInput = {onInput}
          />
          <ToDo
                title = "Done"
                button = "Delete all"
                items = {todos.filter(todo => todo.done === true)}
                onProcessItem = {deleteItem}
                onProcessAll = {deleteAllBtn}
                onInput = {onInput}

          />
        </div>
    )
}

export default App

