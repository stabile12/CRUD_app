import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    cost: props.cost,
    category: props.category
  });

  const handleEdit = () => {
    
      Axios.put("http://localhost:3001/edit", {
        id: editValues.id,
        name: editValues.name,
        cost: editValues.cost,
        category: editValues.category
      }).then(() => {
        console.log('chegou aqui')
      });
      handleClose()
  };

  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
    handleClose()
  }


  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  return (

    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Editar</DialogTitle>
      <DialogContent>
        <TextField
          disabled
          margin="dense"
          id="id"
          label="id"
          defaultValue={props.id}
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome do jogo"
          defaultValue={props.title}
          type="text"
          onChange={handleChangeValues}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="cost"
          label="preço"
          defaultValue={props.cost}
          type="number"
          onChange={handleChangeValues}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="category"
          label="Categoria"
          defaultValue={props.category}
          type="text"
          onChange={handleChangeValues}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Excluir</Button>
        <Button onClick={() => handleEdit()}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );

}