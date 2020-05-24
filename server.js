const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;

const app = express();

const messages = [];

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.json({ status: 'Server is running!' });
});

app.get("/getMessages", (req, res) => {
    return res.json({ messages });
});

app.post("/addMessage", (req, res) => {
    const result = req.body;
    if (!result) { return res.status(400).end(); }

    obj = { "id": messages.length > 0 ? messages[messages.length - 1].id + 1 : 1, "author": req.body.author.toString(), "message": req.body.message.toString() };
    messages.push(obj);
    return res.json({ obj });
})

app.delete("/deleteMessage", (req, res) => {
    if (messages.length == 0) return res.json({ message: 'Mural is empty!' });
    const result = req.query;
    if (!result) { return res.status(400).end(); }

    for (let m of messages)
        if (m.id == req.query.id && m.author == req.query.author) {
            messages.splice(req.query.id - 1, 1);
            //console.log(result)
            return res.send({message : "The scrap was successfully deleted!"});
        }
    
    return res.send({message : "The mural doesn't have this scrap or it he doesn't belong to you. Try again"})
})

app.listen(port, () => console.log("Servidor rodando na porta local " + port));
