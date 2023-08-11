import { useEffect, useState } from "react";
import styles from "@/styles/modules/Filters.module.scss";
import Filter from "@/components/filter";
import { filterConfig } from "@/utils/config_api";
import { getDataProp } from "@/utils/functions";

export type FiltersProps = {
  data: ProductArray;
  setFilteredData: Function;
};

const getDefaultProps = (myConfig: FilterConfig[]) => {
  const defaultProps: Object = myConfig.reduce(
    (acc: FilterObject, config) => {
      acc[config.key] = "";
      return acc;
    },
    {} // default value for accumulator (acc)
  );

  return defaultProps;
};
const filterDefaultProps = getDefaultProps(filterConfig);

const Filters: React.FC<FiltersProps> = ({ data, setFilteredData }) => {
  const [filters, setFilters] = useState<FilterObject>(
    filterDefaultProps as FilterObject
  ); // state of filters

  // filter state update
  useEffect(() => {
    updateFilterData(); // when the filters state is updated also update the view
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]); // the eslint rule is disabled because updateFilterData() does not update the filters state (which would create an infinite loop)

  // get unique filter options
  function getUniqueFilterData(filterKey: string) {
    const filterArray: Array<string> = [];

    data.map((dataArray: ProductData) => {
      filterConfig.map((config) => {
        if (filterKey === config.key) {
            filterArray.push(getDataProp(dataArray, config.key, config.type));
        }
      });
    });

    return [...new Set(filterArray)];
  }

  function isFilterUsed(filterKey: string): Boolean {
    // check if the filter `filterName` is currently being used
    return filters[filterKey] !== "";
  }

  function updateFilterData() {
    // filter the data
    const filterData = data.filter((item) => {
      // loop through each filter
      const checkFilter = filterConfig.map((config) => {
        if(isFilterUsed(config.key)) {
          // check if filter is used
          return getDataProp(filters, config.key, config.type).includes(getDataProp(item, config.key, config.type));
        }
      });

      return !checkFilter.includes(false); // if checkFilter array includes a 'false' return false
    });

    setFilteredData(filterData); // update the view
  }

  function updateFilterStore(filterName: String, filterKey: String) {
    // change the filters in the store
    const updatedFilters = {
      [filterKey as string]: filterName,
    } as FilterObject;
    setFilters((filters) => ({
      // creates a new Object
      ...filters, // adds existing data to new Object
      ...updatedFilters, // overwrites the data with updates values
    }));
  }

  // handle the filter clicks
  function handleFilters(event: Event) {
    const targetElement = event.target as HTMLElement;
    const filterValue = targetElement?.innerHTML || "";
    const filterKey = targetElement?.dataset.filter as string;

    if (filters[filterKey] === filterValue) {
      updateFilterStore("", filterKey); // remove filter
    } else {
      updateFilterStore(filterValue, filterKey);
    }
  }

  return (
    <section className={styles.filters}>
      {typeof filterConfig != "undefined"
        ? filterConfig.map((config) => (
            <Filter
              key={config.key}
              fkey={config.key}
              name={config.name}
              filters={filters}
              handleFilters={handleFilters}
              filterData={getUniqueFilterData(config.key)}
            />
          ))
        : null}
    </section>
  );
};

export default Filters;
