import React from 'react';
import LPAR from './Lpar';
import Image from 'react-bootstrap/Image';
import Img from '../../Assets/img/logo.jpg'

const Sidebar = ({ menu, onTableClick, pageSize }) => {
  return (
    <div className="sidebar-nav p-0">
      {menu.map((lparData, index) => (
        <LPAR key={index} data={lparData} onTableClick={onTableClick} pageSize={pageSize}/>
      ))}
      <Image className="menuLogo img-fluid mt-auto" src={Img} alt="Logo" />
    </div>
  );
};

export default Sidebar;
