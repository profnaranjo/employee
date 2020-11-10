const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render('employee/addOrEdit', {
        viewTitle: 'Insert Employee'
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertEmployee(req, res);
    } else {
        updateRecords(req, res);
    }
});

function insertEmployee(req, res) {
    const employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.phone = req.body.phone;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('employee/addOrEdit', {
                    viewTitle: 'Insert Employee',
                    employee: req.body
                });
            }
        }
    })
}

function updateRecords(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id },
        req.body, { new: true },
        (err, doc) => {
            if (!err) {
                res.redirect('employee/list');
            } else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render('employee/addOrEdit', {
                        viewTitle: 'Update Employee',
                        employee: req.body
                    });
                } else {
                    console.log('Error while updating', err)
                }
            }
        })
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render('employee/list', {
                list: docs
            });
        } else {
            console.log('Error showing list', err);
        }
    }).lean();
});

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('employee/addOrEdit', {
                viewTitle: 'Update Employee',
                employee: doc
            });
        }
    }).lean();
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log('Error while deleting', err)
        }
    });
})
module.exports = router;