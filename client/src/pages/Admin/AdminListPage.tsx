import React, { HTMLProps, useEffect, useState } from "react";
import {
  Column,
  ColumnDef,
  FilterFn,
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { refreshToken } from "../../app/store/feature/userSlice";
import { getAllCandidate } from "../../app/store/feature/candidateSlice";

import { logins } from "../../app/store/feature/authSlice";
import { getAllAdmin } from "../../app/store/feature/adminSlice";
const AdminListPage = ({ setEditCandidate }: any) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const isLoading = useAppSelector((state) => state.candidate.isLoading);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.users.accessToken);
  const adminData = useAppSelector((state) => state.admin.admin);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllAdmin(accessToken));
    }
  }, [dispatch, accessToken]);

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },

      {
        accessorFn: (row) => row.AdminName,
        id: "AdminName",
        cell: (info) => info.getValue(),
        header: () => <span>Nama Candidate</span>,
        footer: (props) => props.column.id,
      },

      {
        id: "action",
        cell: (info) => (
          <div className="row">
            <div className="col-1">
              <FontAwesomeIcon
                icon={faEye}
                style={{ color: "green" }}
                onClick={() => {
                  dispatch(logins({ id: info.row.original.id }));
                  setEditCandidate(true);
                }}
              />
            </div>
          </div>
        ),
        header: () => <span>action</span>,
      },
    ],
    []
  );
  const table = useReactTable({
    data: adminData,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true, // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    filterFns: {} as Record<"fuzzy", FilterFn<any>>,
  });
  const styelTable = {
    fontSize: "13px",
  };

  return (
    <div className="tableComponent">
      <div className="p-2 mt-3">
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : null}
        <div className="h-2" />
        <table className="table table-striped" style={styelTable}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanFilter() ? (
                            <Filter column={header.column} table={table} />
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <span className="visually-hidden">Loading...</span>
            ) : (
              table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="p-1">
                <IndeterminateCheckbox
                  {...{
                    checked: table.getIsAllPageRowsSelected(),
                    indeterminate: table.getIsSomePageRowsSelected(),
                    onChange: table.getToggleAllPageRowsSelectedHandler(),
                  }}
                />
              </td>
              <td colSpan={20}>
                Page Rows ({table.getRowModel().rows.length})
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="h-2" />
        <div className="row justify-content-between">
          <div className="col-7">
            <div className="p-2">
              {Object.keys(rowSelection).length} of
              {table.getPreFilteredRowModel().rows.length} Total Rows Selected
            </div>
          </div>
          <div className="col">
            <nav aria-label="...">
              <ul className="pagination pagination-sm">
                <li className="page-item active" aria-current="page">
                  <button
                    className="border rounded p-1 m-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {"<<"}
                  </button>
                </li>
                <li className="page-item">
                  <button
                    className="border rounded p-1 m-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {"<"}
                  </button>
                </li>
                <li className="page-item"></li>
                <li className="page-item">
                  <button
                    className="border rounded p-1 m-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    {">"}
                  </button>
                </li>

                <li className="page-item">
                  <button
                    className="border rounded p-1 m-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    {">>"}
                  </button>
                </li>
                <li className="page-item">
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
                  <select
                    className=" m-2"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={((column.getFilterValue() as any)?.[0] ?? "") as string}
        onChange={(e) =>
          column.setFilterValue((old: any) => [e.target.value, old?.[0]])
        }
        placeholder={`Search`}
        className="p-1 w-100 border rounded"
      />
      {/* <input
                    type="text"
                    value={((column.getFilterValue() as any)?.[1] ?? "") as string}
                    onChange={(e) =>
                      column.setFilterValue((old: any) => [old?.[0], e.target.value])
                    }
                    placeholder={`Max`}
                    className="w-24 border shadow rounded"
                  /> */}
    </div>
  ) : (
    <input
      type="text"
      value={(column.getFilterValue() ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search`}
      className="p-1 w-100 border rounded"
    />
  );
}
function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}
export default AdminListPage;
