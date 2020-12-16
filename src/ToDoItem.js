import React from 'react';
//import './styles/App.css';

export default ({id, type, text, onProcessItem}) => (
    <div className="ToDoBox">
        {type === "To do" ? <input type="checkbox" onChange={() => onProcessItem(id)}/>
            : <p className="ToDoItem" style={{textDecoration:"line-through"}}>{text}</p>}
        {type === "To do" ? <p className="ToDoItem">{text}</p>
            : <input type="button" value = "x" onClick={() => onProcessItem(id)} className="deleteBtn"/>}
    </div>
)
