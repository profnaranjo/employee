const mongoose = require('mongoose');
let employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Employee Name is required.'
    },
    email: {
        type: String,
        required: 'Email is required.'
    },
    phone: {
        type: String
    },
    city: {
        type: String
    }
});
// custom validation for email
employeeSchema.path('email').validate(val => {
    const emailRegex =
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(val);
}, 'Invalid Email');
mongoose.model('Employee', employeeSchema);