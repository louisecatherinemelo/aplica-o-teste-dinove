require("dotenv").config();

const db = require("./db")

const port = process.env.PORT;

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Funcionando!"
    })
})

// CONSULTAR UM ITEM
app.get("/itens/:id", async (req, res) => {
    const itens = await db.selectItem(req.params.id);
    res.json(itens);
})

// LISTAR TODOS OS ITENS

app.get("/itens", async (req, res) => {
    const itens = await db.selectItems();
    res.json(itens);
})


// INSERIR NOVO ITEM

app.post("/itens", async (req, res) => {
    await db.insertItem(req.body);
    res.sendStatus(201);
})

// EDITAR ITEM

app.patch("/itens/:id", async (req, res) => {
    await db.updateItem(req.params.id, req.body);
    res.sendStatus(200);
})

// DELETAR ITEM 

app.delete("/itens/:id", async (req, res) => {
    await db.deleteItem(req.params.id);
    res.sendStatus(204);
})


app.listen(port);

console.log("Backend rodando!!");