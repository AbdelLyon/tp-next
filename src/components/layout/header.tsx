"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToggleTheme } from "x-react/theme";

export const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 mb-10 w-full border-b shadow-md dark:shadow-none border-default-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background">
      <div className="container mx-auto flex h-16 items-center">
        <div className="mr-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">ShopApp</span>
          </Link>
        </div>
        <nav className="flex-1">
          <ul className="flex gap-6">
            <li></li>
            <li className="relative overflow-hidden">
              <Link
                href="/products"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/products") ? "text-primary" : ""
                }`}
              >
                Products
              </Link>
            </li>
            <li className="relative overflow-hidden">
              <Link
                href="/categories"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/categories") ? "text-primary" : ""
                }`}
              >
                Categories
              </Link>
            </li>
            <li className="relative overflow-hidden">
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/about") ? "text-primary" : ""
                }`}
              >
                About
                {isActive("/about") && (
                  <span className="absolute bottom-[1px] left-0 h-[2px] w-full bg-red-500 nav-underline"></span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <ToggleTheme />
          <Link
            href="/search"
            className={`text-sm font-medium relative overflow-hidden ${
              isActive("/search")
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <span className="sr-only">Search</span>
          </Link>
          <Link
            href="/cart"
            className={`text-sm font-medium relative overflow-hidden ${
              isActive("/cart")
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
