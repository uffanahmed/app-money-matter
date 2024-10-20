import { CarFinanceOptions, MortgageOptions, PersonalLoanOptions, Product } from "../enum";
import ProductMortgage from "../products/mortgage/page";
import { ProductDefinition } from "../types/ProductDefinition";
import ProductCarFinance from "../products/car-finance/page";
import ProductPersonalLoan from "../products/personal-loan/page";
import { faCar, faHome, faUser } from "@fortawesome/free-solid-svg-icons";

export const productDefinition: Array<ProductDefinition> = [
    {
        label: 'Mortgage',
        icon: faHome,
        key: Product.Mortgage,
        pageComponent: <ProductMortgage />,
        options: [
            {
                label: 'Unlock your mortgage potential',
                key: MortgageOptions.UnlockMortgagePotential
            },
            {
                label: 'Customize Mortgage Plan',
                key: MortgageOptions.CustomizeMortgagePlan
            },
            {
                label: 'Testing 1',
                key: MortgageOptions.A
            },
            {
                label: 'Testing 2',
                key: MortgageOptions.B
            },
            {
                label: 'Testing 3',
                key: MortgageOptions.C
            },
        ]
    },
    {
        label: 'Car Finance',
        icon: faCar,
        key: Product.CarFinance,
        pageComponent: <ProductCarFinance />,
        options: [
            {
                label: 'Lahore',
                key: CarFinanceOptions.UnlockMortgagePotential
            },
            {
                label: 'Karachi',
                key: CarFinanceOptions.CustomizeMortgagePlan
            },
            {
                label: 'Islamabad',
                key: CarFinanceOptions.A
            },
            {
                label: 'Sialkot',
                key: CarFinanceOptions.B
            },
            {
                label: 'Gujranwala',
                key: CarFinanceOptions.C
            },
        ]
    },
    {
        label: 'Personal Loan',
        icon: faUser,
        key: Product.PersonalLoan,
        pageComponent: <ProductPersonalLoan />,
        options: [
            {
                label: 'Uffan',
                key: PersonalLoanOptions.UnlockMortgagePotential
            },
            {
                label: 'Ahmed',
                key: PersonalLoanOptions.CustomizeMortgagePlan
            },
            {
                label: 'Ali',
                key: PersonalLoanOptions.A
            },
            {
                label: 'Usman',
                key: PersonalLoanOptions.B
            },
            {
                label: 'Tahir',
                key: PersonalLoanOptions.C
            },
        ]
    },
]
