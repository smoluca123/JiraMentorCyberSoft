import ContentWrapper from '@/components/ContentWrapper';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col bg-background min-h-dvh">
      <Header />
      <ContentWrapper className="container flex-1 mx-auto my-6">
        {children || <Outlet />}
        <Toaster />

      </ContentWrapper>
    </div>
  );
}
