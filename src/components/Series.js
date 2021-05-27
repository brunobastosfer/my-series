import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Table, Alert, ButtonToggle } from 'reactstrap'

const Series = () => {
    const [data, setData] = useState([])
    useEffect(() => {
      axios
        .get('/api/series')
        .then(res => {
          setData(res.data.data)
        })
    }, [])

    const deleteSerie = id => {
      axios
        .delete('/api/series/' + id)
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
          <ButtonToggle color='danger' onClick={() => deleteSerie(genre.id)}>Remover</ButtonToggle>
          <Link to={'/series/' + genre.id} className='btn btn-warning'>Info</Link>
          </td>
      </tr>
      )
    }

    if(data.length === 0) {
      return (
      <div className='container'>
        <h1>Séries</h1>
        <Link className='btn btn-primary' to='/series/novo'>Nova Série</Link>
        <Alert color="warning">
        Você não possui séries criadas.
        </Alert>
      </div>
      )
    }

return (
  <div className='container'>
    <h1>Séries</h1>
    <Link className='btn btn-primary' to='/series/novo'>Nova Série</Link>
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

export default Series