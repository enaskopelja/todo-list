import React from "react";
import './styles/App.css';
import Btn from "./Btn";
import ToDoItem from "./ToDoItem";


export default ({title, button, items, onProcessItem, onInput, onProcessAll}) => (
    <div className="To-Do">
            <div className="Title"> {title} </div>
            {title === "To do" && <input className="TextInput" id="textinput" placeholder="New task" onKeyDown={onInput}/>}

            <Btn text={button} onClick={onProcessAll}/>

            <ul> {items && items.map(todo => <ToDoItem key={todo.id}
                                                       id={todo.id}
                                                       type={title}
                                                       text={todo.text}
                                                       onProcessItem={onProcessItem}/>)
            }</ul>
    </div>)



