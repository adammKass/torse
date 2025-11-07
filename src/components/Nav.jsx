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
import { useState } from "react";
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

    navtl.from("#nav-logo", {
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
            <Logo id="nav-logo" />
            <p className="font-light text-lg uppercase ml-2">Torse Studio</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex sm:gap-5 lg:gap-10">
          {navlinks.map((link, index) => (
            <NavbarItem key={index} className="navlink">
              <Link
                href={link.path}
                className={`text-lg uppercase font-light ${
                  index === 0 ? "font-medium" : "font-light"
                }`}
              >
                {link.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarMenu className="flex flex-col gap-4 content">
          {navlinks.map((link, index) => (
            <NavbarMenuItem key={index}>
              <Link
                href={link.path}
                className={`text-lg uppercase font-light ${
                  index === 0 ? "font-medium" : "font-light"
                }`}
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
