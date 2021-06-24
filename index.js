const app = require('./app')
const PORT = require('./config').PORT


app.listen(5000,()=>{
    console.log(`server started on port ${PORT}`)
})
