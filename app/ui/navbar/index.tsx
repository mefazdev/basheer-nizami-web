"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import { clsx } from "clsx";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import MobileNavbar from "./MobileNav";
// import MobNav from "./MobNav";

export default function Navbar() {
  const [collapse, setCollapse] = useState(false);

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

  return (
    <div>
      <div
        className={clsx(
          "hidden lg:grid  fixed px-4 lg:px-0 left-0 w-full m-auto z-50 transition ease-linear duration-200",
          {
            "top-0    ": navScroll,
            "top-5": !navScroll,
          }
        )}
      >
        <div
          className={clsx(
            "transition  ease-linear duration-200 flex justify-between   ",
            {
              "bg-black/60 backdrop-blur-lg px-14 bg-opacity-95  py-1":
                navScroll,
              "bg-black/10 backdrop-blur-m md:w-full w-11/12 xl:w-10/12 px-8   mx-auto rounded-xl":
                !navScroll,
            }
          )}
        >
          <div className=" flex w-full justify-between items-center py-1 ">
            <div className="flex gap-2">
              {/* <div className="bg-white p-0.5 rounded-md">
                <div className=" h-11 w-14 relative rounded">
                  <Link passHref href="/">
                    <Image
                      src={"/images/name-4.png"}
                      className="rounded"
                      alt=""
                      layout="fill"
                    />
                  </Link>
                </div>
              </div> */}
              <div className=" h-11 w-34 relative rounded mt-1">
                <Link passHref href="/">
                  <Image src={"/images/name-4.png"} alt="" layout="fill" />
                </Link>
              </div>
            </div>

            <span className="lg:hidden">
              <Menu id="menu__icon" onClick={() => setCollapse(!collapse)} />
            </span>
          </div>

          <div className="text-white col-span-2 hidden  lg:flex justify-end  relative  font-montserrat ">
            <div className="flex gap-3 items-center">
              <Link passHref href="/">
                <span className="group">
                  <h3
                    className={
                      pathname == "/" ? " cursor-pointer" : "  cursor-pointer"
                    }
                  >
                    HOME
                  </h3>

                  <div
                    className={
                      pathname === "/"
                        ? "bg-secondary rounded-full h-0.5    group-hover:block"
                        : "bg-secondary rounded-full  h-0.5   hidden   group-hover:block"
                    }
                  ></div>
                </span>
              </Link>
              <Link passHref href="/about">
                <span className="group">
                  <h3
                    className={
                      pathname == "/about"
                        ? " cursor-pointer"
                        : "  cursor-pointer"
                    }
                  >
                    ABOUT
                  </h3>

                  <div
                    className={
                      pathname === "/initiatives"
                        ? "bg-secondary rounded-full h-0.5    group-hover:block"
                        : "bg-secondary rounded-full  h-0.5   hidden   group-hover:block"
                    }
                  ></div>
                </span>
              </Link>
              <Link passHref href="/initiatives">
                <span className="group">
                  <h3
                    className={
                      pathname == "/initiatives"
                        ? " cursor-pointer"
                        : "  cursor-pointer"
                    }
                  >
                    INITIATIVES
                  </h3>

                  <div
                    className={
                      pathname === "/initiatives"
                        ? "bg-secondary rounded-full h-0.5    group-hover:block"
                        : "bg-secondary rounded-full  h-0.5   hidden   group-hover:block"
                    }
                  ></div>
                </span>
              </Link>
              <Link passHref href="/videos">
                <span className="group">
                  <h3
                    className={
                      pathname == "/videos"
                        ? " cursor-pointer"
                        : "  cursor-pointer"
                    }
                  >
                  VIDEOS
                  </h3>

                  <div
                    className={
                      pathname === "/videos"
                        ? "bg-secondary rounded-full h-0.5     group-hover:block"
                        : "bg-secondary rounded-full h-0.5   hidden   group-hover:block"
                    }
                  ></div>
                </span>
              </Link>

              {/* News */}
              <Link passHref href="/articles">
                <span className="group">
                  <h3
                    className={
                      pathname == "/articles"
                        ? " cursor-pointer"
                        : "  cursor-pointer"
                    }
                  >
               ARTICLES
                  </h3>

                  <div
                    className={
                      pathname === "/articles"
                        ? "bg-secondary rounded-full h-0.5     group-hover:block"
                        : "bg-secondary rounded-full h-0.5   hidden   group-hover:block"
                    }
                  ></div>
                </span>
              </Link>
              <Link passHref href="/contact">
                <span className="group">
                  <h3
                    className={
                      pathname == "/contact"
                        ? " cursor-pointer"
                        : "  cursor-pointer"
                    }
                  >
CONTACT
                  </h3>

                  <div
                    className={
                      pathname === "/contact"
                        ? "bg-secondary rounded-full h-0.5     group-hover:block"
                        : "bg-secondary rounded-full h-0.5   hidden   group-hover:block"
                    }
                  ></div>
                </span>
              </Link>
              
               <Link
                  href="/"
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-black  hover:bg-red-700 text-white font-medium rounded-lg  whitespace-nowrap"
                >
                 
             INVITE
                </Link>
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
