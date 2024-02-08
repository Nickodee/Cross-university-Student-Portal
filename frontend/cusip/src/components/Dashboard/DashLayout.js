import React, { useState } from 'react';
import AsideNav from './AsideNav';
import DashNav from './DashNav';

export default function DashLayout({ children }) {
  const [asideNavCollapsed, setAsideNavCollapsed] = useState(false);

  const toggleAsideNav = () => {
    setAsideNavCollapsed(!asideNavCollapsed);
  };

  return (
    <div className='flex overflow-hidden'>
      <AsideNav collapsed={asideNavCollapsed} />
      <div className='flex flex-col flex-1 h-screen'>
        <div className='bg-gray-100 h-full'>
          <DashNav onToggleAsideNav={toggleAsideNav} />
          {children}
        </div>
      </div>
    </div>
  );
}
