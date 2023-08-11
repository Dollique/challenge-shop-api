import { Inter } from "next/font/google";
import styles from "@/styles/modules/Home.module.scss";
import { useEffect, useState } from "react";

import Products from "@/components/products";
import Filters from "@/components/filters";

// include type validation
import { getDataProp, sanitizeData } from "@/utils/functions";

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  const [data, setData] = useState<ProductArray>([]); // data fetched from API
  const [filteredData, setFilteredData] = useState<ProductArray>(data); // data filtered

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!process.env.API_PATH) {
        throw new Error('API path not defined');
      } else {
        const response = await fetch(process.env.API_PATH);
        if (!response.ok) {
          console.error(`${response.status} error response`, response);
          throw new Error(`Resource not found (check console): ${response.status}`);
        } else {
          let newData = await response.json();
          newData = sanitizeData(newData);

          if(process.env.API_PRODUCT_PROPERTY_PATH) {
            newData = getDataProp(newData, process.env.API_PRODUCT_PROPERTY_PATH, 'object');
          }

          // set initial data
          setData(newData);
          setFilteredData(newData);
        }
      }      
    };

    fetchData();
  }, []); // on build

  return (
    <main className={styles.main}>
      <Filters data={data} setFilteredData={setFilteredData} />
      <Products items={filteredData} />
    </main>
  );
};

export default Home;
