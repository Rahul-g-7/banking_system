require('dotenv').config();

const morgan = require('morgan')
const app = require('./src/app')
const connectDB=require("./src/db/db")



connectDB()
app.listen(3000, () => {
    console.log("server started on port 3000");

})