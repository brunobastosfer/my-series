import React, {useState} from 'react'
import axios from 'axios'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'

const NewGenre = () => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  const handlesClick = (evt) => {
    setName(evt.target.value)
  }

  const saveSubmite = () => {
    axios.post('/api/genres', {
      name
    })
    .then(res => {
      setSuccess(true)
    })
  }

  if(success) {
    return <Redirect to='/generos' />
  }

  return (
    <div className='container'>
      <h1>Novo Gênero</h1>
      <Form>
      <FormGroup>
        <Label htmlfor="name">Nome</Label>
        <Input type="text" value={name} onChange={handlesClick} className='form-control' id="name" placeholder="Nome do Gênero" />
      </FormGroup>
      <Button onClick={saveSubmite}>Salvar</Button>
      </Form>
    </div>
    )
}

export default NewGenre