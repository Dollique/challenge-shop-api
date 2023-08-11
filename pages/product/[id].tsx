import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { productConfig } from "@/utils/config_api";
import { getData, getDataProp, sanitizeData } from "@/utils/functions";

export default function Page() {
  const [product, setProduct] = useState<ProductArray>([]); // data fetched from API

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!process.env.API_PATH) {
        throw new Error('API path not defined');
      } else {
        const response = await fetch(process.env.API_PATH);
        let newData = await response.json();
        newData = sanitizeData(newData);

        if(process.env.API_PRODUCT_PROPERTY_PATH) {
          newData = getDataProp(newData, process.env.API_PRODUCT_PROPERTY_PATH, 'object');
        }
  
        setProduct(newData);
      }
    };

    fetchData();
  }, []); // on build

  const router = useRouter();
  return (
    <>
      <h1>Detail Product Page</h1>
      <p>Post: {router.query.id}</p>
      <p>
        My Product:
        {product.map((data) => {
          if (String(getData(data, productConfig.id)) === router.query.id) {
            console.log(data);
            return getData(data, productConfig.name);
          }
        })}
      </p>
    </>
  );
}
