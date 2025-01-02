import { IProjectDataType } from '@/lib/types/interfaces';
import { PaginationState, Table } from '@tanstack/react-table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
export function TablePagination({
  pagination,
  table,
  handlePageSizeChange,
}: {
  pagination: PaginationState;
  table: Table<IProjectDataType>;
  handlePageSizeChange: (newPageSize: number) => void;
}) {
  const {
    nextPage,
    previousPage,
    getCanNextPage,
    getCanPreviousPage,
    setPageIndex,
    getPageCount,
  } = table;

  const currentPage = pagination.pageIndex;
  const totalPages = getPageCount();

  const renderPageNumbers = () => {
    const pages = [];

    // Always show first page
    if (currentPage > 2) {
      pages.push(
        <PaginationItem key={0} className="cursor-pointer">
          <PaginationLink onClick={() => setPageIndex(0)}>1</PaginationLink>
        </PaginationItem>
      );
      // Add ellipsis if there's a gap
      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="ellipsis1" className="cursor-pointer">
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Show 2 pages before and after current page
    for (
      let i = Math.max(0, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      pages.push(
        <PaginationItem key={i} className="cursor-pointer">
          <PaginationLink
            onClick={() => setPageIndex(i)}
            isActive={currentPage === i}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Always show last page
    if (currentPage < totalPages - 3) {
      // Add ellipsis if there's a gap
      if (currentPage < totalPages - 4) {
        pages.push(
          <PaginationItem key="ellipsis2" className="cursor-pointer">
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key={totalPages - 1} className="cursor-pointer">
          <PaginationLink onClick={() => setPageIndex(totalPages - 1)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <>
      <Pagination className="justify-end">
        <PaginationContent>
          {getCanPreviousPage() && (
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious onClick={() => previousPage()} />
            </PaginationItem>
          )}
          {renderPageNumbers()}
          {getCanNextPage() && (
            <PaginationItem className="cursor-pointer">
              <PaginationNext onClick={() => nextPage()} />
            </PaginationItem>
          )}
        </PaginationContent>
        <Select
          defaultValue="10"
          onValueChange={(value) => {
            handlePageSizeChange(Number(value));
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="10 / page" />
          </SelectTrigger>
          <SelectContent className="w-32">
            {Array.from({ length: 4 }, (_, index: number) => (
              <SelectItem
                key={`page-size-${index}`}
                value={`${Math.pow(2, index) * 10}`}
              >
                {`${Math.pow(2, index) * 10}`} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Pagination>
    </>
  );
}
