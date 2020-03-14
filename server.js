const express = require('express')
const nunjucks = require('nunjucks')
const pg = require('pg')

const server = express()
const port = 3000

// Colocando a permissão para renderizar arquivos estáticos
server.use(express.static('public'))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Conexão com o Postgres
const Pool = pg.Pool
const db = new Pool({
    user: 'postgres',
    password: 'SocraM19',
    host: 'localhost',
    port: 5432,
    database: 'DB_DOE'
})

// template engine
nunjucks.configure('./', {
    express: server,
    noCache: true
})

server.get('/', async (req, res) => { 
    await db.query('SELECT * FROM donor;', (err, result) => {
        if (err) {
            return res.send('Erro no banco de dados')
        }

        const donors = result.rows

        return res.render('index.html', { donors })
    })

})

server.post('/', async (req, res) => {
    const { name, blood, email = 'Nao possui' } = req.body
    
    const query = `
        INSERT INTO donor ("name", "email", "blood")
        VALUES ($1, $2, $3);`

    const values = [name, email, blood]

    await db.query(query, values, (err) => {
        if (err) {
            return res.send('Erro no banco de dados')
        }

        return res.redirect('/')
    })
})

server.listen(port, 
    () => console.log(`Server has running http://localhost:${port}`))

