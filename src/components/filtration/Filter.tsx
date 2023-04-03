import React from 'react';
import { FilterValue, Row } from 'react-table';

type Data = {
  fromCode: string;
  toCode: string;
  inputValue: number;
  resultValue: number;
  date: string;
};

// for resolving typescript errors
export interface CustomUseFiltersColumnProps<D extends object> {
  column: {
    canFilter: boolean;
    setFilter: (
      updater: ((filterValue: FilterValue) => FilterValue) | FilterValue
    ) => void;
    filterValue: FilterValue;
    preFilteredRows: Array<Row<D>>;
    filteredRows: Array<Row<D>>;
    id: number;
  };
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: CustomUseFiltersColumnProps<Data>) {
  const options = React.useMemo(() => {
    const options = new Set<string>();
    preFilteredRows.forEach((row: { values: { [x: string]: string } }) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default SelectColumnFilter;
