import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/react";
import { useEffect, useState } from "react";
import { navlinks } from "../constants";
import Logo from "./Logo";
import menuIcon from "../assets/Menu.svg";
import closeIcon from "../assets/Close.svg";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Nav = ({ isReady }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    if (!isReady) return;

    const logoSplit = new SplitText("#nav-brand p", { type: "words" });
    const navtl = gsap.timeline();

    navtl.from("#logo", {
      yPercent: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    navtl.from(logoSplit.words, {
      xPercent: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
    });
    navtl.from(".navlink", {
      yPercent: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
    });
  }, [isReady]);

  useEffect(() => {
    if (isMenuOpen) {
      // Animate white background fade in
      gsap.fromTo(
        ".mobile-menu-bg",
        { opacity: 0, xPercent: -100 },
        { opacity: 1, xPercent: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isMenuOpen]);

  return (
    <div className="w-full flex items-center justify-center fixed top-0 left-0 z-50">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="flex flex-row justify-between content py-5"
      >
        <NavbarContent>
          <NavbarMenuToggle
            icon={
              <img
                src={isMenuOpen ? closeIcon : menuIcon}
                alt={isMenuOpen ? "Close menu" : "Open menu"}
              />
            }
            srOnlyText="null"
            className="sm:hidden [&_.sr-only]:hidden w-12 h-12 "
          ></NavbarMenuToggle>
          <NavbarBrand id="nav-brand">
            <Logo />
            <p className="font-light text-lg uppercase ml-2">Torse Studio</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex sm:gap-5 lg:gap-10">
          {navlinks.map((link, index) => (
            <NavbarItem key={index} className="navlink">
              <Link
                href={link.path}
                className={`text-lg uppercase font-light ${
                  location.pathname === link.path ? "font-medium" : ""
                } transition-all ease-in-out duration-300 hover:text-shadow-current hover:text-shadow-2xs`}
              >
                {link.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarMenu
          className="flex flex-col gap-4 content pt-8"
          id="navbar-menu-content"
        >
          <div className="mobile-menu-bg absolute inset-0 bg-white z-60"></div>
          {navlinks.map((link, index) => (
            <NavbarMenuItem key={index}>
              <Link
                href={link.path}
                className={`text-lg uppercase font-light 
                  ${location.pathname === link.path ? "font-medium" : ""} z-70
                  `}
              >
                {link.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};
export default Nav;
