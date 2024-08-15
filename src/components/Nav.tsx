import React, { ReactNode } from 'react';

interface NavProps {
  children: ReactNode;
}

const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <nav className="fixed top-5 right-2 p-5 flex items-center justify-end">
      <div >
        {children}
      </div>
    </nav>
  );
};

export default Nav;
