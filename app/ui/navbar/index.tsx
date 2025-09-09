

"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import { clsx } from "clsx";
import { Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import MobileNavbar from "./MobileNav";

export default function Navbar() {
  const [collapse, setCollapse] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);

  const pathname = usePathname();
  const [, setChangeNav] = useState(false);

  const [navScroll, setNavScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavScroll(true);
      } else {
        setNavScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const changeNavBar = () => {
    if (window.scrollY >= 5) {
      setChangeNav(true);
    }
    if (window.scrollY < 5) {
      setChangeNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBar);
  });

  // Check if current path is media-related
  const isMediaActive = pathname === '/videos' || pathname === '/gallery' || pathname === '/publications';

  const mediaItems = [
        { href: '/publications', label: 'Publications' },
            { href: '/updates', label: 'Updates' },
    { href: '/videos', label: 'Videos' },
    { href: '/gallery', label: 'photos' },

  ];

  return (
    <div>
      <div
        className={clsx(
          "hidden lg:grid fixed px-4 lg:px-0 left-0 w-full m-auto z-50 transition ease-linear duration-200",
          {
            "top-0": navScroll,
            "top-5": !navScroll,
          }
        )}
      >
        <div
          className={clsx(
            "transition ease-linear duration-200 flex justify-between",
            {
              "bg-black/60 backdrop-blur-lg px-14 bg-opacity-95 py-1":
                navScroll,
              "bg-black/10 backdrop-blur-m md:w-full w-11/12 xl:w-10/12 px-8 mx-auto rounded-xl":
                !navScroll,
            }
          )}
        >
          <div className="flex w-full justify-between items-center py-1">
            <div className="flex gap-2">
              <div className="h-11 w-34 relative rounded mt-1">
                <Link passHref href="/">
                  <Image src={"/images/logo-5.png"} alt="" layout="fill" />
                </Link>
              </div>
            </div>

            <span className="lg:hidden">
              <Menu id="menu__icon" onClick={() => setCollapse(!collapse)} />
            </span>
          </div>

          <div className="text-white col-span-2 hidden lg:flex justify-end relative font-montserrat">
            <div className="flex gap-3 items-center">
              <Link passHref href="/">
                <span className="group">
                  <h3 className={pathname == "/" ? "cursor-pointer" : "cursor-pointer"}>
                    HOME
                  </h3>
                  <div
                    className={
                      pathname === "/"
                        ? "bg-secondary rounded-full h-0.5 group-hover:block"
                        : "bg-secondary rounded-full h-0.5 hidden group-hover:block"
                    }
                  ></div>
                </span>
              </Link>

              <Link passHref href="/about">
                <span className="group">
                  <h3 className={pathname == "/about" ? "cursor-pointer" : "cursor-pointer"}>
                    ABOUT
                  </h3>
                  <div
                    className={
                      pathname === "/about"
                        ? "bg-secondary rounded-full h-0.5 group-hover:block"
                        : "bg-secondary rounded-full h-0.5 hidden group-hover:block"
                    }
                  ></div>
                </span>
              </Link>

              <Link passHref href="/initiatives">
                <span className="group">
                  <h3 className={pathname == "/initiatives" ? "cursor-pointer" : "cursor-pointer"}>
                    INITIATIVES
                  </h3>
                  <div
                    className={
                      pathname === "/initiatives"
                        ? "bg-secondary rounded-full h-0.5 group-hover:block"
                        : "bg-secondary rounded-full h-0.5 hidden group-hover:block"
                    }
                  ></div>
                </span>
              </Link>
 <Link passHref href="/articles">
                <span className="group">
                  <h3 className={pathname == "/articles" ? "cursor-pointer" : "cursor-pointer"}>
                    ARTICLES
                  </h3>
                  <div
                    className={
                      pathname === "/articles"
                        ? "bg-secondary rounded-full h-0.5 group-hover:block"
                        : "bg-secondary rounded-full h-0.5 hidden group-hover:block"
                    }
                  ></div>
                </span>
              </Link>
              {/* Media Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setMediaDropdownOpen(true)}
                onMouseLeave={() => setMediaDropdownOpen(false)}
              >
                <span className="group cursor-pointer">
                  <div className="flex items-center gap-1">
                    <h3 className={isMediaActive ? "cursor-pointer" : "cursor-pointer"}>
                      MEDIA
                    </h3>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mediaDropdownOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                  <div
                    className={
                      isMediaActive
                        ? "bg-secondary rounded-full h-0.5 group-hover:block"
                        : "bg-secondary rounded-full h-0.5 hidden group-hover:block"
                    }
                  ></div>
                </span>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-lg border border-gray-700 rounded-lg shadow-xl transition-all duration-200 ${
                    mediaDropdownOpen
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="py-2">
                    {mediaItems.map((item, index) => (
                      <Link key={item.href} href={item.href}>
                        <div
                          className={`px-4 py-2 text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-black transition-all duration-200 ${
                            pathname === item.href ? 'bg-gradient-to-r from-red-600 to-black' : ''
                          }`}
                        >
                          <span className="font-medium">{item.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

             

              <Link passHref href="/contact">
                <span className="group">
                  <h3 className={pathname == "/contact" ? "cursor-pointer" : "cursor-pointer"}>
                    CONTACT
                  </h3>
                  <div
                    className={
                      pathname === "/contact"
                        ? "bg-secondary rounded-full h-0.5 group-hover:block"
                        : "bg-secondary rounded-full h-0.5 hidden group-hover:block"
                    }
                  ></div>
                </span>
              </Link>

              <a
                href="https://ailtacademy.com/"
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-black hover:bg-red-700 text-white font-medium rounded-lg whitespace-nowrap"
              >
        AILT ACADEMY
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}