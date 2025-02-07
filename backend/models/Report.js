const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String
});

const creditAccountSchema = new mongoose.Schema({
  accountType: String,
  bankName: String,
  accountNumber: String,
  amountOverdue: Number,
  currentBalance: Number,
  address: addressSchema
});

const reportSchema = new mongoose.Schema({
  basicDetails: {
    name: { type: String, required: true },
    mobilePhone: { type: String, required: true },
    pan: { type: String, required: true },
    creditScore: { type: Number, required: true }
  },
  
  reportSummary: {
    totalAccounts: { type: Number, required: true },
    activeAccounts: { type: Number, required: true },
    closedAccounts: { type: Number, required: true },
    currentBalanceAmount: { type: Number, required: true },
    securedAccountsAmount: { type: Number, required: true },
    unsecuredAccountsAmount: { type: Number, required: true },
    lastSevenDaysCreditEnquiries: { type: Number, required: true }
  },
  
  creditAccounts: [creditAccountSchema],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);