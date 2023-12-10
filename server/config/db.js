const mongoose = require('mongoose');

// async function run(){
//     await 
// }

// run();

mongoose.connect('mongodb://127.0.0.1:27017/employees', {
        useNewUrlParser: true,
        useUnifiedTopology: true
});