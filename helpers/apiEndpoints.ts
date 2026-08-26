// Accounts 

// Account could be checkings or savings
export const accountApiUrl = (accountId: string | number) =>
    `/parabank/services_proxy/bank/accounts/${accountId}`;

// Customer's Account(s)
export const customerAccountsUrl = (customerId: string | number) =>
    `/parabank/services_proxy/bank/customers/${customerId}/accounts`;

// Create Account
export const createAccountUrl = `/parabank/services_proxy/bank/createAccount`

// Money Movement

// Transfer Money
export const transferUrl = '/parabank/services_proxy/bank/transfer';

//Pay Bill
export const billPayUrl = '/parabank/services_proxy/bank/billpay';

// Request a Loan
export const requestLoanUrl = '/parabank/services_proxy/bank/requestLoan';

// Customer Profile
export const updateCustomerUrl = (customerId: string | number) =>
  `/parabank/services_proxy/bank/customers/update/${customerId}`;