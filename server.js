const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 10000

let db,
          dbConnectionStr = 'mongodb+srv://zuri:zuri@cluster0.cxkdg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
          dbName = 'ZURI',
          dataBased

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true  })
          .then(client => {
                    console.log(`Connected to ${dbName} Database`)
                    db = client.db(dbName)
                    dataBased = db.collection('messages')
          })
          .catch(err => console.error(err))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
          dataBased.find().toArray()
                    .then(data => {
                              res.render('index.ejs', {info: data})
                    })
                    .catch(err => console.error(err))
})

app.post('/toData', (req, res) => {
          dataBased.insertOne(
                    {
                              name: req.body.name,
                              email: req.body.email,
                              country: req.body.country,
                    }
          )
          .then(result => {
                    res.redirect('/')
          })
          .catch(err => {
                    console.error(err)
          })
})

app.put('/upUrl', (req, res) => {
          dataBased.updateOne(
                    {
                              name: req.body.newName,
                    },
                    {
                              $set: {
                                        name: req.body.name,
                                        email: req.body.email,
                                        country: req.body.country
                              }
                    },
                    {
                              // upsert: true
                    }
          )
          .then(result => {
                    res.json('One Item Updated')
          })
          .catch(err => console.error(err))
})

app.delete('/inputDel', (req, res) => {
          dataBased.deleteOne(
                    {
                              name: req.body.getGot
                    }
          )
          .then(result => {
                    res.json(`One item deleted`)
          })
})

app.listen(process.env.PORT || PORT, () => {
          console.log(`Server is running on port: ${PORT}`)
})