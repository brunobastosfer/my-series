import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'

const EditGenre = ({ match }) => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    axios
      .get(`/api/genres/${match.params.id}`)
      .then(res => {
        setName(res.data.name)
      })
  }, [match.params.id])

  const handlesClick = (evt) => {
    setName(evt.target.value)
  }

  const saveSubmite = () => {
    axios
      .put(`/api/genres/${match.params.id}`, {
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
      <h1>Editar Gênero</h1>
      <Form>
      <FormGroup>
        <Label htmlfor="name">Email</Label>
        <Input type="text" value={name} onChange={handlesClick} className='form-control' id="name" placeholder="Nome do Gênero" />
      </FormGroup>
      <Button onClick={saveSubmite}>Salvar</Button>
      </Form>
    </div>
    )
}

export default EditGenre