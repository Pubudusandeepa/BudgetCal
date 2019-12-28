import React, { useState,useEffect } from 'react';
import "./App.css";
import  ExpencesForm  from './component/ExpencesForm';
import ExpenceList from './component/ExpenceList';
import Alert from "./component/Alert";
import './App.css';
import uuid from "uuid/v4";

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600  },
//   { id: uuid(), charge: "car payment", amount: 800  },
//   { id: uuid(), charge: "credit card bill", amount: 1200  }
// ]
const initialExpenses = localStorage.getItem("expenses")
? JSON.parse(localStorage.getItem("expenses"))
: [];

function App() {
  //******* state value******* */
  //all expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  //*****singel expenses*****/
  const [charge, setCharge] = useState(' ');
  // single amount
  const [amount, setAmount] = useState('');
  //alert
  const [alert,setAlert] = useState({show: false});
  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);
  //******UseEffect**** */
  useEffect(()=>{
    localStorage.setItem('expenses',JSON.stringify(expenses));
  },[expenses])
  //****functionality*******/
  const handleCharge = e => {
    setCharge(e.target.value);
  }
  const handleAmount =e =>{
    console.log(`amount : ${e.target.value}`);
    setAmount(e.target.value);
  }
  //handle alert
  const handleAlert = ({type,text}) =>{
    setAlert({show:true,type,text});
    setTimeout(()=>{
      setAlert({show:false})
    },3000);
  }
  //clear all items
  const clearItems =() =>{
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items delete"});
  } 
  //handle delete
  const handleDelete =(id) =>{
   let tempExpenses = expenses.filter(item => item.id !== id );
   setExpenses(tempExpenses);
   handleAlert({type: "danger", text: "item deleted"});
  }

   //handle edit
   const handleEdit =(id) =>{
   let expense = expenses.find(item => item.id === id)
   let {charge,amount} = expense;
   setCharge(charge)
   setAmount(amount)
   setEdit(true);
   setId(id);
  }

  const handleSubmit = e =>{
    e.preventDefault();
    if(charge !== "" && amount > 0){
      if(edit){
         let tempExpress = expenses.map(item =>{
           return item.id === id? {...item,charge,amount}: item;
         });
         setExpenses(tempExpress);
         setEdit(false);
         handleAlert({type: "success", text: "item edited"})
      }else{
        const singleExpenses ={id: uuid(), charge, amount};
        setExpenses([...expenses,singleExpenses]);
        handleAlert({type: "success", text: "item added"})
      }
     
      setCharge("");
      setAmount("");
    }else{
       handleAlert({type:'danger',text:`charge can't be value and 
       amount value has to be bigger than zero`})
    }
  }
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text} /> }
   <Alert />
   <h1>budget calculator</h1>
   <main className="App">
   <ExpencesForm 
       charge={charge}
       amount={amount}
       handleAmount={handleAmount}
       handleCharge={handleCharge}
       handleSubmit={handleSubmit}
       edit={edit}
   />
   <ExpenceList 
   expenses={expenses}
   handleDelete ={handleDelete}
   handleEdit = {handleEdit}
   clearItems = {clearItems}
   />
   </main>
   <h1>
     Total Spending : {" "}
     <span className="total">
       $
       {expenses.reduce((acc, curr) =>{
          return (acc += parseInt(curr.amount));
       },0)}
     </span>
   </h1>
    </>
  
  );
}

export default App;
