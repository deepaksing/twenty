import * as React from 'react';
import styled from '@emotion/styled';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRecoilState } from 'recoil';

import {
  FilterConfigType,
  SelectedFilterType,
} from '@/filters-and-sorts/interfaces/filters/interface';
import {
  SelectedSortType,
  SortType,
} from '@/filters-and-sorts/interfaces/sorts/interface';
import { RecoilScope } from '@/recoil-scope/components/RecoilScope';
import { useInitializeTableDimensions } from '@/ui/tables/hooks/useInitializeTableDimensions';
import { useMapKeyboardToSoftFocus } from '@/ui/tables/hooks/useMapKeyboardToSoftFocus';
import { RowContext } from '@/ui/tables/states/RowContext';
import { softFocusPositionState } from '@/ui/tables/states/softFocusPositionState';

import { useResetTableRowSelection } from '../../tables/hooks/useResetTableRowSelection';
import { currentRowSelectionState } from '../../tables/states/rowSelectionState';

import { TableHeader } from './table-header/TableHeader';
import { EntityTableRow } from './EntityTableRow';

type OwnProps<TData extends { id: string }, SortField> = {
  data: Array<TData>;
  columns: Array<ColumnDef<TData, any>>;
  viewName: string;
  viewIcon?: React.ReactNode;
  availableSorts?: Array<SortType<SortField>>;
  availableFilters?: FilterConfigType<TData>[];
  onSortsUpdate?: (sorts: Array<SelectedSortType<SortField>>) => void;
  onFiltersUpdate?: (filters: Array<SelectedFilterType<TData>>) => void;
  onRowSelectionChange?: (rowSelection: string[]) => void;
};

const StyledTable = styled.table`
  border-collapse: collapse;

  border-radius: 4px;
  border-spacing: 0;
  margin-left: ${(props) => props.theme.table.horizontalCellMargin};
  margin-right: ${(props) => props.theme.table.horizontalCellMargin};
  table-layout: fixed;
  width: calc(100% - ${(props) => props.theme.table.horizontalCellMargin} * 2);

  th {
    border: 1px solid ${(props) => props.theme.tertiaryBackground};
    border-collapse: collapse;
    color: ${(props) => props.theme.text40};
    padding: 0;
    text-align: left;

    :last-child {
      border-right-color: transparent;
    }
    :first-of-type {
      border-left-color: transparent;
      border-right-color: transparent;
    }
    :last-of-type {
      min-width: 0;
      width: 100%;
    }
  }

  td {
    border: 1px solid ${(props) => props.theme.tertiaryBackground};
    border-collapse: collapse;
    color: ${(props) => props.theme.text80};
    padding: 0;

    text-align: left;

    :last-child {
      border-right-color: transparent;
    }
    :first-of-type {
      border-left-color: transparent;
      border-right-color: transparent;
    }
    :last-of-type {
      min-width: 0;
      width: 100%;
    }
  }
`;

const StyledTableWithHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const StyledTableScrollableContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
`;

export function EntityTable<TData extends { id: string }, SortField>({
  data,
  columns,
  viewName,
  viewIcon,
  availableSorts,
  availableFilters,
  onSortsUpdate,
  onFiltersUpdate,
}: OwnProps<TData, SortField>) {
  const [currentRowSelection, setCurrentRowSelection] = useRecoilState(
    currentRowSelectionState,
  );

  const [, setSoftFocusPosition] = useRecoilState(softFocusPositionState);

  const resetTableRowSelection = useResetTableRowSelection();

  React.useEffect(() => {
    resetTableRowSelection();
  }, [resetTableRowSelection]);

  React.useEffect(() => {
    setSoftFocusPosition({
      row: 0,
      column: 1,
    });
  }, [setSoftFocusPosition]);

  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      rowSelection: currentRowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setCurrentRowSelection,
    getRowId: (row) => row.id,
  });

  useInitializeTableDimensions({
    numberOfColumns: columns.length,
    numberOfRows: data.length,
  });

  useMapKeyboardToSoftFocus();

  return (
    <StyledTableWithHeader>
      <TableHeader
        viewName={viewName}
        viewIcon={viewIcon}
        availableSorts={availableSorts}
        availableFilters={availableFilters}
        onSortsUpdate={onSortsUpdate}
        onFiltersUpdate={onFiltersUpdate}
      />
      <StyledTableScrollableContainer>
        <StyledTable>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.column.getSize(),
                      minWidth: header.column.getSize(),
                      maxWidth: header.column.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
                <th></th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <RecoilScope SpecificContext={RowContext} key={row.id}>
                <EntityTableRow row={row} index={index} />
              </RecoilScope>
            ))}
          </tbody>
        </StyledTable>
      </StyledTableScrollableContainer>
    </StyledTableWithHeader>
  );
}
