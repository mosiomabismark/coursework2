const app = require('express')().disable('x-powered-by')
const fs = require('fs')
const path = require('path')
let dbConnection = require('./config/mongo.config')


app.use(require('express').json())
app.get('/images/lessons', (req, res) => {
    console.log('GET IMAGES',req.query)

    if(fs.existsSync(`./assets/images/${req.query.imageName}`)){
        res.sendFile(path.resolve(__dirname, `assets/images/${req.query.imageName}`))
    }else{
        res.end(`The image ${req.query.imageName} does not exist.`)
    }
})

// Return lessons from Database
app.get('/lessons', async (req, res) => {
    console.log('GET ALL LESSONS',req.query)

    const response = await dbConnection.db("course-work").collection("lessons").find().toArray();
     if (response) {
        console.log('GET ALL LESSONS RESPONSE',response)
        res.json(response)
    } else { 
        res.json({
            acknowledged: false,
            message: 'Unable to fetch lessons at the moment'
        })
    }
})

// post route to search for subjects that matches seacrh query e.g {"subject": "kuber"}
app.post('/search-lessons', async (req, res) => {
    console.log('SEARCH LESSONS',req.body)

    const response = await dbConnection.db("course-work").collection("lessons").find({ subject: { '$regex': req.body.subject, '$options': 'i' } }).toArray();
     if (response) {
        console.log('SEARCH LESSONS RESPONSE',response)
        res.json(response)
    } else { 
        res.json({
            acknowledged: false,
            message: 'Unable to fetch lessons at the moment'
        })
    }
})
app.post('/new-order', async (req, res) => {
    console.log('ADD NEW ORDER',req.body)

    const response = await dbConnection.db("course-work").collection("orders").insertOne(req.body.order);
     if (response) {
        res.json(response)
    } else { 
        res.json({
            success: false,
            message: 'Unable to add new order at the moment'
        })
    }
})
app.post('/increase-order', async (req, res) => {
    console.log('INCREASE ORDER',req.body)

    const response = await dbConnection.db("course-work").collection("orders").findOneAndUpdate({ name: req.body.name}, { $set: req.body.data });
     if (response) {
        console.log('INCREASE ORDER RESPONSE',response)
        res.json(response)
    } else { 
        res.json({
            success: false,
            message: 'Unable to add new order at the moment'
        })
    }
})

app.listen(4000, ()=> console.log('APP started on port 4000'))