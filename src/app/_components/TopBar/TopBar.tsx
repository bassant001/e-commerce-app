

import { FiTruck, FiGift, FiPhone, FiMail } from "react-icons/fi";
import User from "./User";


export default async function TopBar() {



  return (
    <div className="w-full bg-gray-100 text-sm text-gray-600 border-b">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* left */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FiTruck className="text-green-600" />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>

          <div className="flex items-center gap-2">
            <FiGift className="text-green-600" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <FiPhone />
            <span>+1 (800) 123-4567</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <FiMail />
            <span>support@freshcart.com</span>
          </div>

          <User />
          
        </div>
      </div>
    </div>
  );
}
