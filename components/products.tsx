import React from "react";
import styles from "@/styles/modules/Products.module.scss";
import Product from "@/components/product";
import { productConfig } from "@/utils/config_api";
import { getData } from "@/utils/functions";

interface ProductsProps {
  items: ProductArray;
}

const Products: React.FC<ProductsProps> = ({ items }) => {
  return (
    <section className={styles.products}>
      {typeof items !== "undefined"
        ? items.map((item: ProductData) => (
            <Product key={getData(item, productConfig.id)} item={item} />
          ))
        : null}
    </section>
  );
};

export default Products;
