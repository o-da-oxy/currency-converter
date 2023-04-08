import React from 'react';
import s from './History.module.css';
import { useAppSelector } from '../../reduxToolkit/typedHooks';
import { Column, useFilters, useTable } from 'react-table';
import SelectColumnFilter from '../filtration/Filter';
import Navigation from '../navigation/Navigation';

function History() {
  const selectorList = useAppSelector((state) => state.converter.list);

  const data = React.useMemo(() => selectorList, [selectorList]);

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: 'FROM',
        accessor: 'fromCode',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'TO',
        accessor: 'toCode',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'INPUT VALUE',
        accessor: 'inputValue',
        disableFilters: true,
      },
      {
        Header: 'RESULT VALUE',
        accessor: 'resultValue',
        disableFilters: true,
      },
      {
        Header: 'DATE',
        accessor: 'date',
        disableFilters: true,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useFilters);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <div className={s.indent}>
        <table className={s.tableWrapper} {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render('Header')
                        }
                        {/* Render the columns filter UI */}
                        <div>
                          {column.canFilter ? column.render('Filter') : null}
                        </div>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <Navigation text="Converter" />
    </div>
  );
}

export default History;
