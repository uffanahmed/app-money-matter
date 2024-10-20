import { CarFinanceOptions, MortgageOptions, PersonalLoanOptions, Product } from "../enum";
import { ProductDefinition } from "../types/ProductDefinition";
import { faCar, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import ProductMortgage from "../products/mortgage/page";
import ProductCarFinance from "../products/car-finance/page";
import ProductPersonalLoan from "../products/personal-loan/page";
import { MortgageExtraPaymentOptions, MortgageInfo } from "../products/mortgage";

export const productDefinition: Array<ProductDefinition> = [
    {
        label: 'Mortgage',
        icon: faHome,
        key: Product.Mortgage,
        options: [
            {
                label: 'What is this?',
                key: MortgageOptions.Info,
                page: <MortgageInfo />,
            },
            {
                label: 'Extra Payment Options',
                key: MortgageOptions.CustomizeMortgagePlan,
                page: <MortgageExtraPaymentOptions />,
            },
            {
                label: 'Customize Mortgage Plan',
                key: MortgageOptions.A,
                page: <ProductMortgage />,
            },
            {
                label: 'Testing 2',
                key: MortgageOptions.B,
                page: <ProductMortgage />,
            },
            {
                label: 'Testing 3',
                key: MortgageOptions.C,
                page: <ProductMortgage />,
            },
        ]
    },
    {
        label: 'Car Finance',
        icon: faCar,
        key: Product.CarFinance,
        options: [
            {
                label: 'Lahore',
                key: CarFinanceOptions.UnlockMortgagePotential,
                page: <ProductCarFinance />,
            },
            {
                label: 'Karachi',
                key: CarFinanceOptions.CustomizeMortgagePlan,
                page: <ProductCarFinance />,
            },
            {
                label: 'Islamabad',
                key: CarFinanceOptions.A,
                page: <ProductCarFinance />,
            },
            {
                label: 'Sialkot',
                key: CarFinanceOptions.B,
                page: <ProductCarFinance />,
            },
            {
                label: 'Gujranwala',
                key: CarFinanceOptions.C,
                page: <ProductCarFinance />,
            },
        ]
    },
    {
        label: 'Personal Loan',
        icon: faUser,
        key: Product.PersonalLoan,
        options: [
            {
                label: 'Uffan',
                key: PersonalLoanOptions.UnlockMortgagePotential,
                page: <ProductPersonalLoan />,
            },
            {
                label: 'Ahmed',
                key: PersonalLoanOptions.CustomizeMortgagePlan,
                page: <ProductPersonalLoan />,
            },
            {
                label: 'Ali',
                key: PersonalLoanOptions.A,
                page: <ProductPersonalLoan />,
            },
            {
                label: 'Usman',
                key: PersonalLoanOptions.B,
                page: <ProductPersonalLoan />,
            },
            {
                label: 'Tahir',
                key: PersonalLoanOptions.C,
                page: <ProductPersonalLoan />,
            },
        ]
    },
]
