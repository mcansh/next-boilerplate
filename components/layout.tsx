import React from 'react';

import { useServiceWorker } from '~/hooks/use-service-worker';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useServiceWorker();

  return <>{children}</>;
};

export { Layout };
