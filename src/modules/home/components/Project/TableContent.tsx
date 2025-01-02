import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { IProjectDataType } from '@/lib/types/interfaces';
import { flexRender, Row } from '@tanstack/react-table';

export function TableContent({ rows }: { rows: Row<IProjectDataType>[] }) {
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} className="py-4">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
