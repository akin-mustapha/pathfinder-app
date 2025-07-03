import React from 'react';
import SidebarContainer from '../sidebar/SidebarContainer';
import SidebarHeader from '../sidebar/SidebarHeader';
import SidebarNav from '../sidebar/SidebarNav';

const Sidebar = () => (
  <SidebarContainer>
    <SidebarHeader />
    <SidebarNav />
  </SidebarContainer>
);

export default Sidebar;