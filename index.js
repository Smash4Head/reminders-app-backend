require('dotenv').config();

const express = require('express');
const app = express();

const {
    getTodos,
    closeCon
} = require("./controllers/TodosController");

app.get('/api/todos/:id', getTodos); // http://localhost:7050/api/todos
app.options('/api/todos/close', closeCon);

app.listen(process.env.PORT, () => {
    console.log(`API is running on PORT ${process.env.PORT}`) 
})




