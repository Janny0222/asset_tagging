
import { TableColumn } from '@/lib/definition';
import React from 'react';




interface TableProps<T> {
  tableHead: TableColumn[];
  rowData: T[];
  rowRender?: (data: T, i: number) => React.ReactNode;
}
const Head = 'text-xs text-center text-white text-main font-bold px-6 py-2 uppercase';


const Rows = <T extends object>({data, i, rowRenderer}: { data: T; i: number; rowRenderer?: (data: T, i: number) => React.ReactNode }) => {
  return <tr key={i}>{rowRenderer ? rowRenderer(data, i) : <></>}</tr>
};
const Table =<T extends object> ({ tableHead, rowData, rowRender }: TableProps<T>) => {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full" >
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-navbar">
            {tableHead.map((head, index) => (
              <th key={index} scope="col" className={`${Head}`}>
                {head.label}
              </th>
            ))}
            <th scope='col' className='text-xs text-center text-white font-bold px-6 py-2 uppercase'> Actions </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-800">
          {rowData.map((data, i) => (
            <Rows key={i} data={data} i={i} rowRenderer={rowRender} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
