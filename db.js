async function connect(){

    if(global.connection)
        return global.connection.connect();

    const { Pool } = require("pg");
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    console.log("Criou o pool de conexão");

    const res = await client.query("select now()")
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();
}

connect();

async function selectItems(){
    const client = await connect();
    const res = await client.query("SELECT * FROM materiais.itens");
    return res.rows;
}


async function selectItem(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM materiais.itens WHERE ID=$1", [id]);
    return res.rows;
}


async function insertItem(item){
    const client = await connect();
    const sql = "INSERT INTO materiais.itens(nome, descricao, fabricante) VALUES ($1,$2,$3)";
    const values = [item.nome, item.descricao, item.fabricante]
    await client.query(sql, values);    
}


async function updateItem(id, item){
    const client = await connect();
    const sql = "UPDATE materiais.itens SET nome=$1, descricao=$2, fabricante=$3 WHERE id=$4";
    const values = [item.nome, item.descricao, item.fabricante, id];
    await client.query(sql, values);    
}

async function deleteItem(id){
    const client = await connect();
    const sql = "DELETE FROM materiais.itens WHERE id=$1";
    const values = [id];
    await client.query(sql, values);    
}


module.exports = {
    selectItems, 
    selectItem, 
    insertItem,
    updateItem,
    deleteItem
}