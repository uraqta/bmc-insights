"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"

// prob should put this stuff in its own file
const links = [
    {
        name: "News",
        path: "/news",
    },
    {
        name: "Blog",
        path: "/blog",
    },
];

const Navs = () => {
    const pathname = usePathname();
    // console.log(pathname);
    return (
        <nav className="flex justify-center items-center gap-12">
            {links.map((link, index) => { 

                // makes the links work 
                return (
                    <Link 
                        href={link.path} 
                        key={index}
                        className={`${
                            link.path === pathname && "border-b-2 border-primary font-bold"
                        }`}    
                    >

                        {link.name}
                        
                    </Link>
                )
            })}
        </nav>
    )
}

export default Navs