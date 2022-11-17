import React from 'react'
import './card.css'
import FormDialog from '../dialog/dialog'

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  const clickCard = () => {
    setOpen(true)
  }


  return (
    <>
      <FormDialog open={open} setOpen={setOpen}
        name={props.name}
        cost={props.cost}
        category={props.category}
        ListCard={props.listCard}
        setListCard={props.setlistCard}
        id={props.id}
      />
      <div className="card-container" onClick={() => clickCard()}>
        <h1 className='card-title'>{props.name}</h1>
        <p className='card-category'>{props.category}</p>
        <p className='card-cost'>{props.cost}</p>
      </div>
    </>
  )
}