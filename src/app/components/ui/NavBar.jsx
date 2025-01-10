import Link from "next/link";
import { Button } from "@/components/ui/button";

import Navs from "./Navs";
import { Laugh } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

const NavBar = () => {
    return(
        <header className="w-full px-20 py-8 xl:py-10 border-b-2 border-foreground">
            <div className="max-w-full relative container mx-auto flex justify-between items-center">
                {/* nav section */}
                <div className="hidden xl:flex">
                    <Navs />
                </div>

                {/* logo */}
                <Link href="/">
                    <h1 className="z-1 text-lg px-4 bg-black md:text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-tertiary font-bold text-center">
                        THE BMC<br/>INSIGHTS
                    </h1>
                    
                </Link>
                <div className="absolute h-1 bg-secondary lg:w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl z-[-1]"></div>

                {/* CTA */}
                <div className="hidden xl:flex gap-8">
                
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="rounded-3xl text-text px-8 bg-inherit border-2 border-primary hover:bg-primary hover:bg-opacity-5 hover:text-text">
                                Query
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px] bg-inherit border-2 border-foreground">
                            <DialogHeader className="font-bold text-xl">
                                QUERY:
                            </DialogHeader>
                            <DialogDescription>
                                Query support will be added in future
                            </DialogDescription>
                        </DialogContent>

                    </Dialog>


                    <Link href="/profile">
                        <Button variant="ghost" size="icon" className="rounded-3xl bg-inherit hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                            <Laugh />
                        </Button>
                    </Link>
                </div>

                {/* screen size support */}
                <div className="xl:hidden">
                    mobile user 
                </div>
            </div>
        </header>
    )
}

export default NavBar