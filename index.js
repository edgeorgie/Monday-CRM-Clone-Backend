const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')

require('dotenv').config()

const PORT = process.env.PORT
const API_POST_TASK = process.env.API_POST_TASK
const TOKEN = process.env.TOKEN

app.use(cors())
app.use(express.json())

app.get('/tickets/:documentId', async (req, res) => {
  const id = req.params.documentId

  const options = {
    method: 'GET',
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': TOKEN,
    }
  }

  try {
    const response = await axios(`${API_POST_TASK}/${id}`, options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

app.get('/tickets', async (req, res) => { 
  const options = {
    method: 'GET',
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': TOKEN,
    }
  }
  try {
    const response = await axios(API_POST_TASK, options)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

app.post('/tickets', async (req, res) => {
  const formData = req.body.formData
  
  const options = {
    method: 'POST',
    headers: {
      Accepts: 'application/json',
      'Content-Type': 'application/json',
      'X-Cassandra-Token': TOKEN,
    },
    data: formData
  }

  try {
    const response = await axios(API_POST_TASK, options)
    res.status(200).json(response.data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
})

app.put('/tickets/:documentId', async (req, res) => {
  const id = req.params.documentId
  const data = req.body.data

  const options = {
    method: 'PUT',
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': TOKEN,
    },
    data
  }

  try {
    const response = await axios(`${API_POST_TASK}/${id}`, options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

app.delete('/tickets/:documentId', async (req, res) => {
  const id = req.params.documentId
  const options = {
    method: 'DELETE',
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': TOKEN,
    }
  }
  try {
    const response = await axios(`${API_POST_TASK}/${id}`, options)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})