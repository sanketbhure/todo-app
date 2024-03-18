import React from 'react'
import "./TaskCard.css"
import imgDelete from "./delete.png"

function TaskCard({ title, category, delFunction, index }) {
    return (
        <div className='task-card'>
            <h2 className='task-title'>{title}</h2>
            <span className='task-category'>{category}</span>
            <img src={imgDelete} alt='delete' className='delete-icon' onClick={()=>{
                delFunction(index)
            }} />
        </div>
    )

}

export default TaskCard