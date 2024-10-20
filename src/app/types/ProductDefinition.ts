import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Product, ProductOptions } from "../enum";

export type ProductDefinition = {
    label: string;
    icon: IconProp;
    key: Product;
    pageComponent: JSX.Element;
    options: ProductOptionDefinition[];
};

export type ProductOptionDefinition = {
    label: string;
    key: ProductOptions;
}
