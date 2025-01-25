"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if current path is either /signup or /error
  const isSidebarVisible = !["/signup", "/webLogin", "/errorpage"].includes(
    currentPath
  );

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="relative md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="absolute top-0 right-4 text-white px-4 z-10"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMobileMenu}
          >
            <div
              className="fixed top-0 right-0 h-full w-24 bg-[#010B13] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center py-6 space-y-12">
                <Link href="/profile" currentPath={currentPath}>
                  <i className="fas fa-home"></i>
                </Link>
                <Link href="/news" currentPath={currentPath}>
                  <i className="fas fa-newspaper"></i>
                </Link>
                <Link href="/blog" currentPath={currentPath}>
                  <i className="fas fa-file-alt"></i>
                </Link>
                <Link href="/upcoming" currentPath={currentPath}>
                  <i className="fas fa-calendar-alt"></i>
                </Link>
                <Link href="/achievements" currentPath={currentPath}>
                  <i className="fas fa-trophy"></i>
                </Link>
                <Link href="/manage" currentPath={currentPath}>
                  <i className="fas fa-cog"></i>
                </Link>
                <div
                  className="absolute bottom-4 bg-contain rounded-full mb-4 w-10 h-10 bg-[url('/images/user.png')]"
                  onClick={() => router.push("/profile")}
                >
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div
          className="hidden md:block fixed top-0 left-0 h-[calc(100%-20px)] w-20 z-50"
          style={{
            backgroundColor: "#010B13",
            borderRadius: "0 20px 20px 0",
            marginTop: "10px",
            marginLeft: "10px",
          }}
        >
          <div className="flex flex-col items-center pt-4 pb-6 space-y-6">
            <a href="/">
              <img src="/images/logo.png" className="w-16" />
            </a>
          </div>
          <div className="flex flex-col items-center py-6 space-y-12">
            <Link href="/profile" currentPath={currentPath}>
              <i className="fas fa-home"></i>
            </Link>
            <Link href="/news" currentPath={currentPath}>
              <i className="fas fa-newspaper"></i>
            </Link>
            <Link href="/blog" currentPath={currentPath}>
              <i className="fas fa-file-alt"></i>
            </Link>
            <Link href="/upcoming" currentPath={currentPath}>
              <i className="fas fa-calendar-alt"></i>
            </Link>
            <Link href="/achievements" currentPath={currentPath}>
              <i className="fas fa-trophy"></i>
            </Link>
            <Link href="/manage" currentPath={currentPath}>
              <i className="fas fa-cog"></i>
            </Link>
            <div
              className="absolute bottom-6 rounded-full bg-contain w-12 h-12 bg-[url('/images/user.png')]"
              onClick={() => router.push("/userprofile")}
            >
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Link = ({ href, currentPath, children }) => {
  return (
    <div className="text-gray-400 text-3xl hover:text-white cursor-pointer">
      <a
        href={href}
        className={`${currentPath === href ? "bg-blue-600 text-white" : ""} p-2 rounded-full`}
      >
        {children}
      </a>
    </div>
  );
};

export default Sidebar;
