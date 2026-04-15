'use client';
import Link from "next/link";

import { Button } from "_/components/ui/button";
import LogoutButton from "./LogoutButton";
import { getServerSession } from "next-auth";

 import {FiUser } from "react-icons/fi";
import { useSession } from "next-auth/react";


export default  function User() {
     const session = useSession();
      const username = session.data?.user?.name || "Guest";
      const isAuthenticated = session.status === "authenticated";
  return (
              <div className="flex items-center gap-4">

           {isAuthenticated? (username):(<Link
              href="/login"
              className="flex items-center gap-1 hover:text-green-600"
            >
              <FiUser />
              Sign In
            </Link>
            )}

            {isAuthenticated? <LogoutButton/> 
            :<Link href="/register" className="hover:text-green-600">
              Sign Up
            </Link>}

          </div>
  )
}
