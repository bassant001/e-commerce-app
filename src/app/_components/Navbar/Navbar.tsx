"use client";


import Link from "next/link";

import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiHeadphones,
} from "react-icons/fi";
import Image from "next/image";


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "_/components/ui/navigation-menu";
import { useSession } from "next-auth/react";
import { useCart } from "_/app/_context/CartContext";

const components: { title: string; href: string }[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "shop",
    href: "/shop",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "brands",
    href: "/brands",
  },
  {
    title: "sign in",
    href: "/login",
  },
  {
    title: "register",
    href: "/register",
  },
];

const categories = [
  { title: "All Categories", href: "/categories" },
  { title: "Electronics", href: "/categoriesdetails/6439d2d167d9aa4ca970649f" },
  {
    title: "Women's Fashion",
    href: "/categoriesdetails/6439d58a0049ad0b52b9003f",
  },
  {
    title: "Men's Fashion",
    href: "/categoriesdetails/6439d5b90049ad0b52b90048",
  },
  {
    title: "Beauty & Health",
    href: "/categoriesdetails/6439d40367d9aa4ca97064cc",
  },
];

export default function NavigationMenuDemo() {

  const session = useSession();
  const username = session.data?.user?.name || "Guest";
  const isAuthenticated = session.status === "authenticated";

//same of   seContext(cartContext);
const {numOfCartItems} = useCart()

  return (
    <div className="w-full border-b bg-white sticky left-0 top-0 z-50 text-black">
      <div className="flex items-center justify-between px-6 py-3">
        {/* logo */}
        <Image
          src="/assets/images/freshcart-logo.svg"
          alt="FreshCart Logo"
          width={140}
          height={35}
        />

        {/* search */}
        <div className="hidden md:flex items-center w-[40%] relative">
          <input
            type="text"
            placeholder="Search for products, brands  and more..."
            className="w-full border rounded-md px-4 py-2 pr-10 text-sm"
          />
          <FiSearch className="absolute right-3 text-gray-500" />
        </div>

        {/* navigation menu in large screen */}
        <NavigationMenu className="hidden  md:flex"> 
          <NavigationMenuList className="flex gap-4  ">
            <NavigationMenuItem> 

              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}  
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>     
            </NavigationMenuItem>   

            <NavigationMenuItem>
              <NavigationMenuLink   
                asChild   
                  className={navigationMenuTriggerStyle()}
              >
                <Link href="/Shop">Shop</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className=" hover:text-green-600 font-medium bg-transparent">
                Categories
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="flex flex-col w-125 p-2  shadow-xl border border-gray-100 rounded-xl">
                  {categories.map((cat) => (
                    <li key={cat.title}>   
                      <NavigationMenuLink asChild>  
                        <Link
                          href={cat.href}
                          className="block px-4 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-lg transition-colors"
                        >
                          {cat.title}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/Brands">Brands</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* right side */}
        <div className="flex items-center gap-4 ">
          {/* support */}
          <div>
            <div className="hidden md:flex items-center gap-1 text-sm">
              <FiHeadphones  color="green"/>
              <span className="text-gray-600">24/7 Help</span>
            </div>
          </div>
          <Link href={"/wishlist"}> <FiHeart className="text-lg cursor-pointer" color="green" /> 
          </Link>

        
          <div className="relative">
            <Link href={"/cart"}> <FiShoppingCart className="text-lg cursor-pointer" color="green" />
         { isAuthenticated && numOfCartItems>=1 &&<span className="absolute top-0 left-4 bg-green-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center ">{numOfCartItems}</span>}
          </Link>
          </div>
          
          
{isAuthenticated ? (
            <div className="items-center gap-2  text-white px-4 py-2 rounded-md hidden md:flex">
              <FiUser />
              <span className="text-gray-600">{username}</span>
            </div>
          ) : (
          <Link
            href={"/login"}
            className="items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 hidden md:flex"
          >
            <FiUser />
            Sign In
          </Link>)}

          {/* small screens menu */}
          <NavigationMenu className=" flex md:hidden">
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <NavigationMenuTrigger className=" bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  menu
                </NavigationMenuTrigger>
                <NavigationMenuContent className="fixed top-0 left-0 w-full h-screen bg-white z-50 p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <div className="bg-white inline-block p-3 px-5 rounded-2xl shadow-lg">
                      <Image
                        src="/assets/images/freshcart-logo.svg"
                        alt="FreshCart Logo"
                        width={140}
                        height={35}
                      />
                    </div>
                    <button
                      onClick={() => 
                        document.body.click()}
                      className="text-xl"
                    >
                      close icon
                    </button>
                  </div>
                  <ul 
                  className="flex flex-col gap-4 text-lg font-medium">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >

                      </ListItem>
                    )
                  )
                    }
                  </ul>
                </NavigationMenuContent>
                
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-lg font-medium">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
