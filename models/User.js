const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true }, // Make sure this is defined as required
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    newsSubscription: { type: Boolean, default: false },
    userType: { type: String, required: true, enum: ['Person', 'Legal Entity'] },
    personalNumber: { type: String }, // Optional for Person
    livingAddress: { type: String }, // Optional for Person
    organizationName: { type: String }, // Optional for Legal Entity
    identificationCode: { type: String }, // Optional for Legal Entity
    actualAddress: { type: String }, // Optional for Legal Entity
    contactPerson: { type: String }, // Optional for Legal Entity
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user', // Default role is 'user'
    },
}, { collection: 'authorization' });

module.exports = mongoose.model('User', UserSchema);
