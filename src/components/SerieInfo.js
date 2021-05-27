import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, FormGroup, Label, Input, Button, ButtonToggle, Badge } from 'reactstrap'
import { Redirect } from 'react-router-dom'

const SerieInfo = ({ match }) => {
  const [form, setForm] = useState({
    name: ''
  })
  const [success, setSuccess] = useState(false)
  const [editing, setEditing] = useState('INFO')
  const [data, setData] = useState({})
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')

  useEffect(() => {
      axios
      .get(`/api/series/${match.params.id}`)
      .then(res => {
          setData(res.data)
          setForm(res.data)
      })
  },[match.params.id])
  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
          setGenres(res.data.data)
          const genres = res.data.data
          const finded = genres.find(value => data.genre === value.name)
          if(finded){
            setGenreId(finded.id)
          }
      })
  },[data])

  const customHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }


  const handleClick = field => (evt) => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const saveSubmit = () => {
    axios
      .put('/api/series/' + match.params.id, {
        ...form,
        genre_id: genreId
      })
      .then(res => {
        setSuccess(true)
      })
  }

  if(success) {
    return <Redirect to='/series' />
  }

const select = value => () => {
  setForm({
    ...form,
    status: value
  })
}
  

  return (
    <div>
      <header style={customHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
          <div className='row h-100 align-items-center'>
            <div className='col-3'>
              <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
            </div>
            <div className='col-8'>
              <h1 className='font-weight-light text-white'>{data.name}</h1>
              <div className='lead text-white'>
                {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                {data.status ==='ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
              </div>
            </div>
            </div>
            </div>
          </div>
        </header>
        <div className='container'>
          <ButtonToggle color='primary' onClick={() => setEditing('EDIT')}>Editar</ButtonToggle>
        </div>
        {
          editing === 'EDIT' &&
    <div className='container'>
      <h1>Editar Série</h1>
      <Form>
      <FormGroup>
        <Label htmlFor="name">Nome</Label>
        <Input type="text" value={form.name} onChange={handleClick('name')} className='form-control' id="name" placeholder="Nome da Série" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="name">Comentários</Label>
        <Input type="text" value={form.comments} onChange={handleClick('comments')} className='form-control' id="name" placeholder="Nome da Série" />
      </FormGroup>
      <FormGroup tag="fieldset">
      <Label htmlFor="name">Status</Label>
        <FormGroup check>
          <Label check>
            <Input type="radio" checked={form.status=== 'ASSISTIR'} name="status" id='assistir' value='ASSISTIR' onChange={select('ASSISTIR')} />
              Para assistir
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" checked={form.status=== 'ASSISTIDO'} name="status" id='assistido' value='ASSISTIDO' onChange={select('ASSISTIDO')}/>
            Assistido
          </Label>
        </FormGroup>
      </FormGroup>
      <Button onClick={saveSubmit}>Salvar</Button>
      <ButtonToggle color='info' onClick={() => setEditing('INFO')}>Cancelar</ButtonToggle>
      </Form>
    </div>
    }
    </div>
    )
}

export default SerieInfo