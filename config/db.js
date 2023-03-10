const mongoose = require('mongoose');

const DatabaseConnection = ()=>{
    mongoose.connect(" mongodb://127.0.0.1:27017/myapp", {useNewUrlParser:true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err =>console.log(err));
}

module.exports = DatabaseConnection;