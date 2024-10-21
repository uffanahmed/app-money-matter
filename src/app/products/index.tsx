"use client";

import Image from "next/image";
import logo from "./../assets/brand/logo64.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigationContext } from "../context/NavigationContext";
import { productDefinition } from "../constant/productDefinition";
import { ProductDefinition, ProductOptionDefinition } from "../types/ProductDefinition";
import ProductOptions from "../components/ProductOptions";

export default function Products() {
  const { activeProduct, activeProductOption, setActiveProduct } =
    useNavigationContext();

  return (
    <div className="page">
      <div className="page-header">
        <div className="brand-logo">
          <Image src={logo} alt={"Logo"} />
        </div>
        <div className="brand-name">
          Financial Empowerment Hub
        </div>
      </div>
      <div className="page-body">
        <div className="page-products">
          <ul className="product-menu">
            {productDefinition.map(
              (product: ProductDefinition, index: number) => (
                <li key={index}>
                  <a
                    onClick={() => setActiveProduct(product?.key)}
                    className={product.key === activeProduct ? "active" : ""}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={product?.icon} />
                    </span>
                    <label>{product?.label}</label>
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="page-wrapper">
          <div className="page-navigation">
            {productDefinition.map(
              (product: ProductDefinition, index: number) => (
                <div key={index}>
                  {product?.options && product.key === activeProduct && <ProductOptions navigationOption={product.options} />}
                </div>
              )
            )}
          </div>
          <div className="page-content">
            <div className="page-content-wrapper">
              <main className="main-content">
                <div className="content-wrapper">
                  {productDefinition.map(
                    (product: ProductDefinition, index: number) => (
                      <div key={index}>
                        {product.options && product.options.map((option: ProductOptionDefinition, index, numbher) => (
                          <div key={index}>
                            {product.key === activeProduct && option.key === activeProductOption && option.page}
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <div className="page-footer">
        <div className="page-footer-content">
          <nav>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </div>
    </div>
  );
}
