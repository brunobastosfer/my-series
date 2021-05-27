import React, {useState} from 'react'
import axios from 'axios'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'

const NewSerie = () => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  const handlesClick = (evt) => {
    setName(evt.target.value)
  }

  const saveSubmite = () => {
    axios.post('/api/series', {
      name
    })
    .then(res => {
      setSuccess(true)
    })
  }

  if(success) {
    return <Redirect to='/series' />
  }

  return (
    <div className='container'>
      <h1>Nova Série</h1>
      <Form>
      <FormGroup>
        <Label htmlfor="name">Nome</Label>
        <Input type="text" value={name} onChange={handlesClick} className='form-control' id="name" placeholder="Nome da Série" />
      </FormGroup>
      <Button onClick={saveSubmite}>Salvar</Button>
      </Form>
    </div>
    )
}

export default NewSerie