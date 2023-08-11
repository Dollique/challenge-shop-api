import styles from "@/styles/modules/Filter.module.scss";
import FilterButton from "@/components/filter_button";

export type FilterProps = {
  fkey: String,
  name: String;
  filters: FilterObject;
  handleFilters: Function;
  filterData: Array<string>;
};

const Filter: React.FC<FilterProps> = ({
  fkey,
  name,
  filters,
  handleFilters,
  filterData,
}) => {
  return (
    <div className={styles.filter__filtergroup}>
      <div className={styles.filter__title}>{name}</div>
      <div className={styles.filter__buttons}>
        {filterData.map((data) => {
          const active = Object.values(filters).includes(data);

          return (
            <FilterButton
              key={`filter_` + data}
              active={active}
              handleFilters={handleFilters}
              label={data}
              category={fkey}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
