import React from 'react'
import { mobNav } from '../Contants/navigation'
import { NavLink } from 'react-router-dom'

const MobNav = () => {
  return (
    <section className='lg:hidden z-40 h-14 bg-black backdrop-blur-2xl bg-opacity-60 fixed bottom-0 w-full'>
        <div className='flex items-center justify-between pl-5 pr-5 h-full text-neutral-400'>
            {
            mobNav.map((nav, index) => {
            return [
              <div>
                <NavLink
                  key={nav.label + "mobNav"}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-3 flex items-center justify-center h-full flex-col hover:text-neutral-100 ${
                      isActive && "text-white"
                    } `
                  }
                >
                  <div className='text-2xl'>{nav.icon}</div>
                  <p className='text-sm'>{nav.label}</p>
                </NavLink>
              </div>,
            ];
          })
            }
        </div>
    </section>
  )
}

export default MobNav