let express = require('express')
const app = express()

app.get('/users', (req, res) => {
  res.json({
    id: 1,
    name: 'hashiqi'
  })
})

app.listen(3000)