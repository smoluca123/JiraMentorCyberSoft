import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
  OnChangeFn,
} from '@tanstack/react-table';
import {
  Table,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllProjects } from '@/modules/home/components/Project/querys';
import { IProjectDataType } from '@/lib/types/interfaces';
import { TableContent } from '@/modules/home/components/Project/TableContent';
import { useState, useEffect } from 'react';
import { TablePagination } from '@/modules/home/components/Project/TablePagination';
import LoadingProjectSkeleton from '@/modules/home/components/Project/LoadingProjectSkeleton';
import ProjectMembersDisplay from '@/modules/home/components/Project/DisplayMembersCell';
import DisplayActionsCell from '@/modules/home/components/Project/Actions/DisplayActionsCell';
import ProjectSettingsDialog from '@/modules/home/components/Project/Actions/ProjectSettings/ProjectSettingsDialog';
import AssignMembersDialog from '@/modules/home/components/Project/Actions/ProjectSettings/AssignMembersDialog';
import CreateTaskDialog from '@/modules/home/components/Project/Actions/CreateTask/CreateTaskDialog';
import TasksDialog from '@/modules/home/components/Project/Actions/Tasks/TasksDialog';
import UpdateTaskDialog from '@/modules/home/components/Project/Actions/Tasks/UpdateTask/UpdateTaskDialog';
import { useProjectContext } from '@/hooks/useProjectContext';

// Create column helper
const columnHelper = createColumnHelper<IProjectDataType>();

// Define columns using helper
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
  }),
  columnHelper.accessor('projectName', {
    header: 'Project name',
    cell: (info) => (
      <div className="font-medium text-primary">{info.getValue()}</div>
    ),
  }),
  columnHelper.accessor('categoryName', {
    header: 'Category',
  }),
  columnHelper.accessor('creator', {
    header: 'Creator',
    cell: (info) => info.getValue().name,
  }),
  columnHelper.accessor('members', {
    header: 'Members',
    cell: (info) => <ProjectMembersDisplay members={info} />,
  }),
  columnHelper.display({
    header: 'Actions',
    cell: (info) => <DisplayActionsCell projectData={info.row.original} />,
  }),
];

export function Projects() {
  const { projectFilters } = useProjectContext();
  const { data: projects, isLoading } = useGetAllProjects({
    keyword: projectFilters.projectName,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Calculate total pages
  const totalPages = Math.ceil((projects?.length || 0) / pageSize);

  // Validate and adjust page number
  const validatedPage = Math.min(
    Math.max(page || 1, 1),
    Math.max(totalPages, 1)
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: validatedPage - 1,
    pageSize,
  });

  // Function to handle pagination changes
  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue
  ) => {
    const newPagination =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(pagination)
        : updaterOrValue;

    // Ensure page number is within valid range
    const newPage = Math.min(
      Math.max(newPagination.pageIndex + 1, 1),
      Math.max(totalPages, 1)
    );

    setPage(newPage);
    setPagination({ ...newPagination, pageIndex: newPage - 1 });
  };
  // Function to handle pageSize changes
  const handlePageSizeChange = (newPageSize: number) => {
    const newTotalPages = Math.ceil((projects?.length || 0) / newPageSize);
    const newPage = Math.min(page, newTotalPages);

    setPageSize(newPageSize);
    setPagination({
      pageIndex: newPage - 1,
      pageSize: newPageSize,
    });
    setPage(newPage);
  };

  const table = useReactTable({
    data: projects || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: Math.ceil((projects?.length || 0) / pagination.pageSize),
    state: {
      pagination,
    },
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: handlePaginationChange,
  });

  const { getHeaderGroups, getRowModel, getPageCount } = table;

  // Use useEffect to sync URL page with pagination state
  useEffect(() => {
    if (validatedPage !== pagination.pageIndex + 1) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: validatedPage - 1,
      }));
    }
  }, [validatedPage, pagination.pageIndex]);

  return (
    <div className="my-4">
      {/* Loading skeleton */}
      {isLoading && <LoadingProjectSkeleton rows={pagination.pageSize} />}

      {/* Table */}
      {projects && (
        <Table>
          <TableCaption>A list of all projects.</TableCaption>
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableContent rows={getRowModel().rows} />

          <TableFooter>
            {getPageCount() > 0 && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <TablePagination
                    pagination={pagination}
                    table={table}
                    handlePageSizeChange={handlePageSizeChange}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      )}

      <ProjectSettingsDialog />
      <AssignMembersDialog />
      <TasksDialog />
      <CreateTaskDialog />
      <UpdateTaskDialog />
    </div>
  );
}
