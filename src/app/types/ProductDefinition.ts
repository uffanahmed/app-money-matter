import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Product, ProductOptions } from "../enum";

export type ProductDefinition = {
    label: string;
    icon: IconProp;
    key: Product;
    options: ProductOptionDefinition[];
};

export type ProductOptionDefinition = {
    label: string;
    key: ProductOptions;
    page: JSX.Element;
}
