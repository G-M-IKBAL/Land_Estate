const mongoose = require('mongoose');


Login_Schema = new mongoose.Schema({
    person_id:
    { type: mongoose.Schema.ObjectId, require: true, ref: "Employee" },
    role:
    { type: String, require: true },
    user:
    { type: String, require: true },
    passwd:
    { type: String, require: true }
})

module.exports = mongoose.model('Credensials', Login_Schema);