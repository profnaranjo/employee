const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) {
        console.log('MongoDB connection successful');
    } else {
        console.log('connection failed', err);
    }
});

require('./employee.model');