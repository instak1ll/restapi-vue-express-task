const express = require('express')
const { v4 } = require('uuid')
const path = require('path')

const app = express()
const PORT = 8000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//TAREAS
let tasks = [
    { id: v4(), name: 'Terminar el REST API', completed: false },
    { id: v4(), name: 'Subir el REST API a github', completed: false }
]

//GET
app.get('/api/tasks', (req, res) => {
    res.json(tasks)
})

//POST
app.post('/api/tasks', (req, res) => {
    const { name, completed } = req.body
    const newTask = { id: v4(), name, completed }
    tasks.push(newTask)
    res.status(201).json(newTask)
})

app.listen(PORT, () => {
    console.log(`servidor iniciando en el puerto ${PORT}`)
})