import { BillPayDetails } from '../pages/BillPayPage';



export function createBillPayDetails(): BillPayDetails {
    return {
        payeeName: 'QATest',
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zip: '62704',
        phone: '555-123-4567',
        accountNumber: '1234567890',
        verifyAccountNumber: '1234567890',
        amount:(Math.floor(Math.random() * (10000 - 100 + 1)) + 100).toString(),

    }
}