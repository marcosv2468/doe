const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const port = 8000

// Colocando a permissão para renderizar arquivos estáticos
server.use(express.static('public'))

// template engine
nunjucks.configure('./', {
    express: server
})

server.get('/', (req, res) => res.render('index.html'))

server.listen(port, 
    () => console.log(`Server has running http://localhost:${port}`))

