import React, {
    createContext,
    useState,
    useContext,
    PropsWithChildren,
  } from 'react';
import { Product, ProductOptions } from '../enum';
import { productDefinition } from '../constant/productDefinition';
import { ProductDefinition } from '../types/ProductDefinition';

const useNavigationContextValue = () => {
    let defaultProduct = '' as Product;
    let defaultProductOption = '' as ProductOptions;
    // if (typeof localStorage !== 'undefined') {
    //   defaultProduct = localStorage.getItem('activeProduct') as Product;
    //   defaultProductOption = localStorage.getItem('activeProductOption') as ProductOptions;
    // }

    const [activeProduct, setActiveProduct] = useState<Product>((defaultProduct || '') as Product);
    const [activeProductOption, setActiveProductOption] = useState<ProductOptions>((defaultProductOption || '') as ProductOptions);

    const setterActiveProduct = (product: Product) => {
      const p = productDefinition.find((p: ProductDefinition) => p.key === product);
      const firstOption = p?.options[0]?.key as ProductOptions || '';

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('activeProduct', product);
        localStorage.setItem('activeProductOption', firstOption);
      }

      setActiveProductOption(firstOption as ProductOptions)
      setActiveProduct(product)
    }
    const setterActiveProductOption = (option: ProductOptions) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('activeProductOption', option);
      }
      setActiveProductOption(option)
    }

    return {
      activeProduct,
      activeProductOption,
      setActiveProduct: setterActiveProduct,
      setActiveProductOption: setterActiveProductOption,
    };
  };

  export type NavigationContextValue = ReturnType<
    typeof useNavigationContextValue
  >;

  const NavigationContext = createContext(
    {} as NavigationContextValue
  );

  export const useNavigationContext = () =>
    useContext(NavigationContext);

  export const NavigationContextProvider: React.FC<PropsWithChildren> =
    ({children}) => {
      const value = useNavigationContextValue();
      return (
        <NavigationContext.Provider value={value}>
          {children}
        </NavigationContext.Provider>
      );
    };
