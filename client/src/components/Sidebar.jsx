import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

// Adobe-like sidebar colors and style
const navItems = [
    {to: '/ai', label: 'Dashboard', Icon: House},
    {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
    {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
    {to: '/ai/generate-images', label: 'Generate Images', Icon: Image},
    {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser},
    {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors},
    {to: '/ai/review-resume', label: 'Review Resume', Icon: FileText},
    {to: '/ai/community', label: 'Community', Icon: Users},
];

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    return (
        <div className={`w-64 bg-gradient-to-b from-[#23272A] to-[#181A1B] shadow-xl flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
            <div className='my-7 w-full flex flex-col items-center'>
                <img src={user.imageUrl} alt="User avatar" className='w-16 h-16 rounded-full border-2 border-[#5651F6] shadow-lg'/>
                <h1 className='mt-3 text-center text-lg font-semibold text-white'>{user.fullName}</h1>
                <div className='mt-8 w-full flex flex-col gap-1'>
                    {navItems.map(({to, label, Icon})=>(
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={()=> setSidebar(false)}
                            className={({isActive})=>
                                `px-5 py-3 flex items-center gap-4 rounded-lg transition-colors duration-200
                                ${isActive
                                    ? 'bg-[#5651F6] text-white shadow-md'
                                    : 'text-[#B0B3B8] hover:bg-[#23272A] hover:text-white'}`
                            }
                        >
                            {({ isActive })=>(
                                <>
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#B0B3B8]'}`} />
                                    <span className='font-medium'>{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className='w-full border-t border-[#23272A] p-5 flex items-center justify-between bg-[#181A1B]'>
                <div onClick={openUserProfile} className='flex gap-3 items-center cursor-pointer'>
                    <img src={user.imageUrl} className='w-10 h-10 rounded-full border border-[#5651F6]' alt="" />
                    <div>
                        <h1 className='text-base font-semibold text-white'>{user.fullName}</h1>
                        <p className='text-xs text-[#B0B3B8]'>
                            <Protect plan='premium' fallback="Free">Premium</Protect> Plan
                        </p>
                    </div>
                </div>
                <LogOut onClick={signOut} className='w-5 h-5 text-[#B0B3B8] hover:text-[#5651F6] transition cursor-pointer'/>
            </div>
        </div>
    );
};

export default Sidebar;
