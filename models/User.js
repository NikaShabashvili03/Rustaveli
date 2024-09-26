const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    newsSubscription: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ['Person', 'Legal Entity'],
        required: true
    },
    // Fields for 'Person'
    personalNumber: {
        type: String,
        required: function () { return this.userType === 'Person'; }
    },
    livingAddress: {
        type: String,
        required: function () { return this.userType === 'Person'; }
    },
    // Fields for 'Legal Entity'
    organizationName: {
        type: String,
        required: function () { return this.userType === 'Legal Entity'; }
    },
    identificationCode: {
        type: String,
        required: function () { return this.userType === 'Legal Entity'; }
    },
    actualAddress: {
        type: String,
        required: function () { return this.userType === 'Legal Entity'; }
    },
    contactPerson: {
        type: String,
        required: function () { return this.userType === 'Legal Entity'; }
    },
 role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client'
}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
