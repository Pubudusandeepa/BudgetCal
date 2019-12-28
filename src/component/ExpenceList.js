import React from 'react'
import Item from './Expencesitem';
import {MdDelete} from 'react-icons/md';

const ExpenceList = ({expenses,handleEdit,handleDelete,clearItems}) => {
    return (
        <>
           <ul>
               {expenses.map((expense)=>{
                   return <Item 
                   key={expense.id} 
                   expense={expense}
                   handleDelete ={handleDelete}
                   handleEdit ={handleEdit}
                   />
               })}
           </ul>
           {expenses.length > 0 && <button className="btn" onClick={clearItems}>
               Clear expenses
               <MdDelete className="btn-icon" />
               </button>}
        </>
    )
}

export default ExpenceList;