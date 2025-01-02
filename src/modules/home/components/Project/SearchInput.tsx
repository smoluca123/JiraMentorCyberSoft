import { Input } from '@/components/ui/input';
import { useDebounce } from '@/components/ui/multiselect';
import { useProjectContext } from '@/hooks/useProjectContext';
import { useEffect, useState } from 'react';

export default function SearchInput() {
  const { setProjectFilters } = useProjectContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    setProjectFilters({ projectName: debouncedSearchTerm });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <Input
      className="w-48"
      placeholder="Search project name"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
