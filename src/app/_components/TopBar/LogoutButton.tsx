"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; 

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogOut() {
    await signOut({ redirect: true }); 

    router.refresh(); 
    router.push("/");
  }

  return (
    <div>
      <span className="cursor-pointer hover:text-red-600" onClick={handleLogOut}>
        Log Out
      </span>
    </div>
  );
}