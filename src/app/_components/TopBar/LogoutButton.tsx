"use client";

import { signOut } from "next-auth/react";


export default function LogoutButton() {


  async function handleLogOut() {
    await signOut({ callbackUrl: "/", redirect: true }); 
  }

  return (
    <div>
      <span className="cursor-pointer hover:text-red-600" onClick={handleLogOut}>
        Log Out
      </span>
    </div>
  );
}
