const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    company: {
        type: CompanySchema,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

module.exports = model('User', UserSchema);
