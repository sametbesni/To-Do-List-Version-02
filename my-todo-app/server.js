// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://root:example@localhost:27017/mongodb')
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch(err => console.error('MongoDB bağlantısı hatası:', err));

// Şema ve Model
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// Todo ekleme
app.post('/todos', async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        completed: false,
    });
    await todo.save();
    res.status(201).send(todo);
});

// Tüm Todo'ları alma
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.send(todos);
});

// Sunucuyu başlatma
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});