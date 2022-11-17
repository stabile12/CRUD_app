import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import Card from './components/cards/cards.js';

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState()

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClick = () => {
    Axios.post('http://localhost:3001/register', {
      name: values.name,
      cost: values.cost,
      category: values.category
    }).then((response) => {
      console.log(response)
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getcards")
      .then((response) => {
        setListGames(response.data)
      })
  }, [])

  return (
    <div className='app-container'>
      <div className="register-container">
        <h1 className='register-title'>Crud Shop</h1>
        <input
          type="text"
          name='name'
          placeholder='nome'
          className='register-input'
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name='cost'
          placeholder='preço'
          className='register-input'
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name='category'
          placeholder='categoria'
          className='register-input'
          onChange={handleChangeValues}
        />
        <button className='register-button' onClick={() => handleClick()}>Cadastrar</button>
      </div>
      {typeof listGames !== 'undefined' &&
        listGames.map((value) => {
          return (<Card 
          key={value.id}
          id={value.id}
          listCard={listGames} 
          setListCard={setListGames}
          name={value.name}
          cost={value.cost}
          category={value.category}></Card>)
        })}
    </div>
  )
}

export default App;
