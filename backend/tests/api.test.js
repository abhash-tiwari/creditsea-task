const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Report = require('../models/Report');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Report.deleteMany();
  global.testReport = await Report.create({
    basicDetails: { name: 'Test User', mobilePhone: '1234567890', pan: 'ABCDE1234F', creditScore: 750 }, //Dummy Data
    reportSummary: { totalAccounts: 1, activeAccounts: 1, closedAccounts: 0, currentBalanceAmount: 1000, securedAccountsAmount: 500, unsecuredAccountsAmount: 500, lastSevenDaysCreditEnquiries: 0 },
    creditAccounts: [],
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Endpoints', () => {
  test('GET /api/reports should return paginated reports', async () => {
    const res = await request(app).get('/api/reports?page=1&limit=2');
    console.log('Response:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.reports).toBeInstanceOf(Array);
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('currentPage');
  });

  test('GET /api/reports/:id should return a real report', async () => {
    const res = await request(app).get(`/api/reports/${global.testReport._id}`);
    console.log('Response:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.basicDetails.name).toBe(global.testReport.basicDetails.name);
  });
});
