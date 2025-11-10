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
    //Happens only after preloader finishes
    if (!isReady) return;

    const logoSplit = new SplitText("#nav-brand p", { type: "words" });
    const navtl = gsap.timeline();
    //Show just logo img
    navtl.from("#logo", {
      yPercent: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    //Company name slides out
    navtl.from(logoSplit.words, {
      xPercent: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
    });
    //Navlinks stagger slide
    navtl.from(".navlink", {
      yPercent: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
    });
  }, [isReady]);

  useEffect(() => {
    //Menu slide out
    if (isMenuOpen) {
      gsap.fromTo(
        ".mobile-menu-bg",
        { opacity: 0, xPercent: -100 },
        { opacity: 1, xPercent: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isMenuOpen]);

  return (
    <div className="fixed top-0 left-0 w-full bg-primary flex items-center justify-center  text-secondary  z-50">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="content flex flex-row justify-between sm:py-4 sm:landscape:py-2 lg:landscape:py-10"
      >
        {/* Menu button - only on mobile, had to add sr-only hiden because of some HeroUI bug, text was showing all the time */}
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
          {/* Logo */}
          <NavbarBrand id="nav-brand" className="text-secondary">
            <Logo />
            <p className="text-lg font-light uppercase ml-2 text-secondary">
              Torse Studio
            </p>
          </NavbarBrand>
        </NavbarContent>
        {/* Desktop navlinks */}
        <NavbarContent className="hidden sm:flex sm:gap-5 lg:gap-10">
          {navlinks.map((link, index) => (
            <NavbarItem key={index} className="navlink">
              {/* This mess is just underline on hover, do not be afraid */}
              <Link
                href={link.path}
                className={`relative inline-block text-lg text-secondary font-light uppercase 
                after:content-[''] after:absolute after:bottom-0 after:left-0
                after:h-0.5 after:w-full after:bg-current 
                after:scale-x-0 after:origin-left 
                after:transition-transform after:duration-300 after:ease-in-out
                hover:after:scale-x-100  ${
                  location.pathname === link.path ? "font-medium" : ""
                }`}
              >
                {link.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarMenu
          className="content flex flex-col gap-4 justify-center"
          id="navbar-menu-content"
        >
          {/* Menu BG */}
          <div className="mobile-menu-bg absolute inset-0 bg-primary z-60"></div>
          {/* Menu Items */}
          {navlinks.map((link, index) => (
            <NavbarMenuItem key={index}>
              <Link
                href={link.path}
                className={`text-lg text-secondary font-light uppercase 
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
