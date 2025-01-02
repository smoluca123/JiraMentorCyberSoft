import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function LoadingProjectSkeleton({
  rows = 10,
}: {
  rows?: number;
}) {
  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            {/* Header cells matching your columns */}
            {Array.from({ length: 6 }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="w-20 h-4" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Create 5 skeleton rows */}
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <LoadingProjectSkeletonRow key={rowIndex} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function LoadingProjectSkeletonRow() {
  return (
    <TableRow>
      {/* ID column */}
      <TableCell className="py-6">
        <Skeleton className="w-8 h-4" />
      </TableCell>
      {/* Project name column */}
      <TableCell className="py-6">
        <Skeleton className="w-32 h-4" />
      </TableCell>
      {/* Category column */}
      <TableCell className="py-6">
        <Skeleton className="w-24 h-4" />
      </TableCell>
      {/* Creator column */}
      <TableCell className="py-6">
        <Skeleton className="h-4 w-28" />
      </TableCell>
      {/* Members column */}
      <TableCell className="py-6">
        <Skeleton className="w-12 h-4" />
      </TableCell>

      {/* Actions column */}
      <TableCell className="py-6">
        <Skeleton className="w-12 h-4" />
      </TableCell>
    </TableRow>
  );
}
