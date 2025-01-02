import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

// Components
import AppLogo from '@/components/AppLogo';
import UserButton from '@/components/UserButton';

// Sub-components
const LeftSection = () => (
  <>
    <div className="flex items-center lg:justify-between lg:w-[20rem] ~gap-x-2/3">
      <AppLogo className="h-auto" />
      <Link
        to="/"
        className="flex items-center p-2 text-white rounded-md gap-x-2 bg-accent hover:bg-accent/90"
      >
        <Home size={18} />
        <span className="hidden text-sm sm:inline-block">Home</span>
      </Link>
    </div>
  </>
);

const AuthSection = () => {
  return <UserButton showName={true} />;
};

export default function Header() {
  return (
    <header className="h-[70px] bg-card sticky top-0 z-10 border-b border-border px-4 sm:px-0">
      <div className="container flex justify-between items-center mx-auto h-full ~gap-x-2/4">
        <LeftSection />

        <AuthSection />
      </div>
    </header>
  );
}
