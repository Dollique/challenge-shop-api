import React from "react";
import styles from "@/styles/modules/Product.module.scss";
import Image from "next/image";
import Link from "next/link";
import { productConfig } from "@/utils/config_api";
import { getData } from "@/utils/functions";

interface ProductProps {
  item: ProductData;
}

const Product: React.FC<ProductProps> = ({ item }) => {
  return (
    <Link
      href={'/product/' + getData(item, productConfig.id)}
      className={styles.products__item}
      key={getData(item, productConfig.id)}
    >
      <div className={styles.products__item_imgwrapper}>
        <Image
          src={getData(item, productConfig.img_url)}
          width={384}
          height={576}
          className={styles.products__item_img}
          alt="Test"
        ></Image>

        <div className={styles.products__item_button}>Select size</div>
      </div>
      <div className={styles.products__item_descriptions}>
        {
          productConfig.description.map((desc: ApiDataConfig, index: number) => (
            <div key={`description_${index}`}>{getData(item, desc)}</div>
          ))
        }
      </div>
    </Link>
  );
};

export default Product;
