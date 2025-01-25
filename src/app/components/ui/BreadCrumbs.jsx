"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link";

import { usePathname } from "next/navigation"



const Breadcrumbs = () => {
    
    const pathname = usePathname();
    const locations = pathname.split('/');

    let crumb_url = '';
    return (
        
        <div className="flex gap-2 font-primary">
            {locations.map((location, i) => {
                crumb_url += `${location}/`;
                return (
                    // what the hell is going on here
                    <Breadcrumb key={i}>
                        <BreadcrumbList className="text-xl text-text">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link 
                                    href={crumb_url}
                                    className={`${
                                        // this is a shit ass solution to this problem
                                        crumb_url.substring(1, crumb_url.length - 1) === pathname.replace('/', '') && "text-secondary font-bold"
                                    }`}
                                >
                                    {location == '' ? '/' : location}
                                </Link>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                )
            })}
        </div>
    )
}

export default Breadcrumbs