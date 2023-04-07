import React, { useState } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { BsMusicNoteList, BsFolder } from 'react-icons/bs';
import { MdOutlinePlaylistPlay, MdOutlineDashboard } from 'react-icons/md';
import { TbFileLike } from 'react-icons/tb';
import { FaRegHeart } from 'react-icons/fa';
import { RiSettings4Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

function Sidebar() {
    const menus = [
        { name: 'dashboard', link: '/', icon: MdOutlineDashboard },
        { name: 'all Songs', link: '/', icon: BsMusicNoteList },
        { name: 'All Playlists', link: '/', icon: MdOutlinePlaylistPlay },
        { name: 'File Manager', link: '/', icon: BsFolder },
        { name: 'Liked Songs', link: '/', icon: TbFileLike },
        { name: 'Saved', link: '/', icon: FaRegHeart },
        { name: 'Setting', link: '/', icon: RiSettings4Line },
    ];

    const [open, setOpen] = useState(true);

    return (
        <div className={`bg-[#0e0e0e] min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 text-gray-100 px-4`}>
                <div className="py-3 flex justify-end">
                    <HiMenuAlt1 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {
                        menus?.map((menu, index) => (
                            <Link to={menu?.link} key={index} className={` ${menu?.margin && "mt-5"
                                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}>
                                <div>
                                    {React.createElement(menu?.icon, { size: '20' })}
                                </div>
                                <h2
                                    style={{
                                        transitionDelay: `${index + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}>
                                    {menu?.name}
                                </h2>
                                <h2
                                    className={`${open && "hidden"
                                        } absolute left-48 bg-black font-semibold whitespace-pre text-white rounded-md drop-shadow-md px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                                >
                                    {menu?.name}
                                </h2>
                            </Link>
                        ))
                    }
                </div>
            </div>
    )
}


export default Sidebar;