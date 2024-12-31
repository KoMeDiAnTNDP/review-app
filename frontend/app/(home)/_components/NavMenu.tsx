import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", href: "/" },
  { name: "Details", href: "/details" },
];
function NavMenu() {
  const currentPath = usePathname(); 

  return (
    <nav className="flex items-center space-x-6">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`relative text-sm font-medium ${
            currentPath === item.href
              ? "text-gray-900  hover:text-gray-600 dark:text-white"
              : "text-gray-900 hover:text-gray-600 dark:text-white"
          }`}
        >
          <p className="text-md">{item.name}</p>
          <span
            className={`absolute left-0 -bottom-1 h-[2px] w-full bg-primary transition-transform duration-300 ease-in-out ${
              currentPath === item.href ? "scale-x-100" : "scale-x-0"
            }`}
          ></span>
        </Link>
      ))}
    </nav>
  );
}

export default NavMenu;
