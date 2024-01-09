import React , { useState }from 'react';

// export const Header = ({ category, title }) => (
//   <div className=" mb-10">
//     <p className="text-lg text-gray-400">{category}</p>
//     <p className="text-3xl font-extrabold tracking-tight text-slate-900">
//       {title}
//     </p>
//   </div>
// );

//export default Header;

// import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header;