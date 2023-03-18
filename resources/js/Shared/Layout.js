import React from 'react';

import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';
import MenuDesktop from './MenuDesktop';

export default function Layout({ children }) {
  
  return (
    <div className="page-wrapper">
        
        <HeaderMobile />
        
        <aside className="menu-sidebar d-none d-lg-block">
            <div className="logo">
                <a href="#">
                    <img src="/images/icon/logo.png" alt="Cool Admin" />
                </a>
            </div>
            <div className="menu-sidebar__content">
                <MenuDesktop/>
            </div>
        </aside>

        <div className="page-container">
            <HeaderDesktop />
            
            <div className="main-content">
                <div className="container-fluid">

                    {children}

                </div>
            </div>
        </div>
    </div>
   );
}
