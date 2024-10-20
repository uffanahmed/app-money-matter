export const enum Product {
    Mortgage = 'mortgage',
    CarFinance = 'car-finance',
    PersonalLoan = 'personal-loan',
};



export const enum MortgageOptions {
    Info = 'Info',
    UnlockMortgagePotential = 'UnlockMortgagePotential',
    CustomizeMortgagePlan = 'CustomizeMortgagePlan',
    A = 'A',
    B = 'B',
    C = 'C',
};

export const enum CarFinanceOptions {
    Info = 'Info',
    UnlockMortgagePotential = 'UnlockMortgagePotential',
    CustomizeMortgagePlan = 'CustomizeMortgagePlan',
    A = 'A',
    B = 'B',
    C = 'C',
};

export const enum PersonalLoanOptions {
    Info = 'Info',
    UnlockMortgagePotential = 'UnlockMortgagePotential',
    CustomizeMortgagePlan = 'CustomizeMortgagePlan',
    A = 'A',
    B = 'B',
    C = 'C',
};

export type ProductOptions = MortgageOptions | CarFinanceOptions | PersonalLoanOptions;
