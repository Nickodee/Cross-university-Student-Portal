import React, { useState } from 'react';
import AsideNav from './AsideNav';
import DashNav from './DashNav';

export default function DashLayout({ children }) {
  const [asideNavCollapsed, setAsideNavCollapsed] = useState(false);

  const toggleAsideNav = () => {
    setAsideNavCollapsed(!asideNavCollapsed);
  };

  return (
    <div className='flex'>
      <AsideNav collapsed={asideNavCollapsed} />
      <div className='flex flex-col h-screen w-full bg-gray-100'>
      <DashNav onToggleAsideNav={toggleAsideNav} />
        <div className=' overflow-y-scroll'>
          {children}
        </div>
      </div>
    </div>
  );
}
