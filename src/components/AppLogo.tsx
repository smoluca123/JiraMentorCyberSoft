import Logo from '@/assets/imgs/logo.png';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function AppLogo({
  className,
  wrapperClassName,
}: {
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <Link to="/" className={cn('', wrapperClassName)}>
      <img
        src={Logo}
        alt="Cybersoft Logo"
        className={cn('h-8 w-[200px]', className)}
      />
    </Link>
  );
}
