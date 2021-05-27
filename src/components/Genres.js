import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Table, Alert, ButtonToggle } from 'reactstrap'

const Genres = () => {
    const [data, setData] = useState([])
    useEffect(() => {
      axios
        .get('/api/genres')
        .then(res => {
          setData(res.data.data)
        })
    }, [])

    const deleteGenre = id => {
      axios
        .delete('/api/genres/' + id)
        .then(res => {
          const filter = data.filter((genre) => genre.id !== id)
          setData(filter)
      })
    }
  
    const newLine = (genre) => {
      return (
        <tr key={genre.id}>
        <th scope="row">{genre.id}</th>
        <td>{genre.name}</td>
        <td>
          <ButtonToggle color='danger' onClick={() => deleteGenre(genre.id)}>Remover</ButtonToggle>
          <Link to={'/generos/' + genre.id} className='btn btn-warning'>Editar</Link>
          </td>
      </tr>
      )
    }

    if(data.length === 0) {
      return (
      <div className='container'>
        <h1>Gêneros</h1>
        <Link className='btn btn-primary' to='/generos/novo'>Nova Série</Link>
        <Alert color="warning">
        Você não possui gêneros criados.
        </Alert>
      </div>
      )
    }

return (
  <div className='container'>
    <h1>Gêneros</h1>
    <Link className='btn btn-primary' to='/generos/novo'>Novo Gênero</Link>
    <Table dark>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
      {data.map(newLine)}
      </tbody>
    </Table>
  </div>
    )
  }

export default Genres