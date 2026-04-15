import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import FooterColumn from "./FooterColumn";

export default function Footer() {
  return (
    <footer className="bg-[#0b121c] text-gray-400 py-16 px-6 lg:px-20  left-0 bottom-0 z-50">
      <div className="max-w-325 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white inline-block p-3 px-5 rounded-2xl shadow-lg">
            <Image
              src="/assets/images/freshcart-logo.svg"
              alt="FreshCart Logo"
              width={140}
              height={35}
            />
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            FreshCart is your one-stop destination for quality products. From
            fashion to electronics, we bring you the best brands at competitive
            prices.
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-[#48a15e]" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[#48a15e]" />
              <span>support@freshcart.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[#48a15e]" />
              <span>123 Commerce Street, NY 10001</span>
            </div>
          </div>

        
        </div>

        <FooterColumn
          title="Shop"
          links={["All Products", "Categories", "Brands", "Electronics"]}
        />
        <FooterColumn
          title="Account"
          links={["My Account", "Order History", "Wishlist", "Sign In"]}
        />
        <FooterColumn
          title="Support"
          links={["Contact Us", "Help Center", "Shipping Info", "Track Order"]}
        />
        <FooterColumn
          title="Legal"
          links={["Privacy Policy", "Terms of Service", "Cookie Policy"]}
        />
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-325 mx-auto mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
        <p>© 2026 FreshCart. All rights reserved.</p>
        <div className="flex gap-6 grayscale opacity-40 italic">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>PayPal</span>
        </div>
      </div>
    </footer>
  );
}

