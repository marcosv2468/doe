const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const port = 8000

nunjucks.configure(['../', '../', 'frontend/', 'index.html'], {
    express: server
})

server.get('/', (req, res) => res.render('index.html'))

server.listen(port, 
    () => console.log(`Server has running http://localhost:${port}`))

