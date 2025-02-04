// import React, { useEffect, useState } from 'react'
import { SiStudyverse } from "react-icons/si";
import {Link} from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/PofileDropDown'
// import { apiConnector } from '../../services/apiconnector';
// import { categories } from '../../services/apis';
import { IoIosArrowDown } from 'react-icons/io';

const subLinks = [
  {
    title: "Python", 
    link: '/catalog/python'
  },
  {
    title: "Web Development", 
    link: '/catalog/web-development'
  },
]
const Navbar = () => {
  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile)
  const {totalItems} = useSelector((state)=>state.cart)
  const location = useLocation();
  // const [subLinks, setSubLinks] = useState([]);
  // const fetchSubLinks = async()=>{
  //   try {
  //     const result = await apiConnector("GET", categories.CATEGORIES_API)
  //     console.log(result)
  //     setSubLinks(result.data.data);
  //   } catch (error) {
  //     console.log("Could not get sublinks");
  //   }
  // }

  // useEffect(()=>{
  //   fetchSubLinks();
  // },[])
  const matchRoute = (route) => {
    return route === location.pathname;
  };
  

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-zinc-600'>
      <div className='flex w-3/4 max-w-maxContent items-center justify-between flex-row'>

      <Link to="/" className='flex items-center justify-between text-white text-2xl gap-3'>
        <SiStudyverse className='w-[30px] h-[30px] text-white'/>
        <p>StudyNotion</p>
      </Link>

      <nav>
        <ul className='text-md text-white flex gap-x-5 '>
          {
            NavbarLinks.map((link, index)=>(
              <li key={index}>
                {
                  link.title==='Catalog' ? (
                  <div className='flex justify-center items-center gap-1 group relative'>
                    <p>{link.title}</p>
                    <IoIosArrowDown/>

                  <div className='invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-white text-zinc-800 p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[200px] translate-x-[-50%] translate-y-[20%] z-10'>
                    <div className='absolute left-[50%] top-[0%] h-5 w-5 rotate-45 bg-white translate-y-[-50%] translate-x-[90%] z-0'></div>
                    {
                      subLinks.length ? (
                        subLinks.map((sublinks, index)=>(
                          <Link to={`${sublinks.link}`} key={index}>
                            {sublinks.title}
                          </Link>
                        ))
                      ) 
                      :(<div></div>)
                    }
                  </div>

                </div>

                  ) : (
                    <Link to={link?.path} className={`${matchRoute(link?.path) ? "text-yellow-600": "text-white"}`}>
                      {link.title}
                    </Link>
                  )
                }
              </li>
            ))
          }
        </ul>
      </nav>

      <div className='flex gap-x-4 items-center'>
        {
          // If user exists then user has some value it will show cart 
          user && user?.accuontType === "Student" && (
            <Link to="/dashboard/cart" className='relative'>
              <AiOutlineShoppingCart/>
              {
                totalItems > 0 && (
                  <span className='absoulte right-[0%] top-[0%] bg-red-700 text-white'>
                    {totalItems}
                  </span>
                )
              }
            </Link>
          )
        }

        {
        // if not logged in then it will go for login and signup buttons  
          token===null && (
            <div className='flex gap-5'>
              <Link to="/login">
                <button className='border-[1px] border-white text-white bg-black px-3 py-1 rounded-md'>Login</button>
              </Link>
              <Link to="/signup">
                <button className='border-[1px] border-white text-white bg-black px-3 py-1 rounded-md'>Signup</button>
              </Link>
            </div>
          )
        }
        {
          token!==null && <ProfileDropDown/>
        }
      </div>

      </div>
    </div>
  )
}

export default Navbar 
