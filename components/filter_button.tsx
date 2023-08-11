import styles from "@/styles/modules/FilterButton.module.scss";

export type FilterButtonProps = {
  active: Boolean;
  label: String;
  handleFilters: Function;
  category: String;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  active,
  label,
  handleFilters,
  category,
}) => {
  let classes = "";
  if (active) {
    classes = styles.filter__button + " " + styles.active;
  } else {
    classes = styles.filter__button;
  }

  return (
    <button
      className={classes}
      onClick={(e) => handleFilters(e)}
      data-filter={category}
      dangerouslySetInnerHTML={{ __html: label }}
    >
    </button>
  );
};

export default FilterButton;
