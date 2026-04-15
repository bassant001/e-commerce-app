"use client";
import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "_/app/_context/CartContext";
import { toast } from "sonner";
import { createCashOrder, createOnlineOrder } from "_/cart/cartAction";
import ServiceIcon from "_/app/_components/ServiceIcon/ServiceIcon";
import {
  Truck,
  RotateCcw,
  Share2,
  Banknote,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import React, { useState } from "react";
import { getUserCart } from "_/api/services/rout.services";
import { CartResponse } from "_/api/services/types";
import BarLoader from "react-spinners/BarLoader";
import { Suspense } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState<CartResponse | undefined>(undefined);
  useEffect(() => {
    async function fetchCart() {
      const cartData = await getUserCart();
      setCartData(cartData);
      setLoading(false);
    }
    fetchCart();
  }, []);

  const detailsInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const cityInput = useRef<HTMLInputElement>(null);
  const postalCodeInput = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const { updateNumOfCartItems } = useCart() as any;
  const router = useRouter();
  const [paymentType, setPaymentType] = useState<"cash" | "online">("cash");

  //online
  async function handlecreateOnlineOrder() {
    const obj = {
      shippingAddress: {
        details: detailsInput.current?.value || "",
        phone: phoneInput.current?.value || "",
        city: cityInput.current?.value || "",
        postalCode: postalCodeInput.current?.value || "",
      },
    };

    const link = await createOnlineOrder(id?.toString() || "", obj);
    if (link !== false) {
      window.location.replace(link);
    } else {
      toast.error("Something went wrong");
    }
  }

  //on dilvery
  async function handleCashOrder() {
    const obj = {
      shippingAddress: {
        details: detailsInput.current?.value || "",
        phone: phoneInput.current?.value || "",
        city: cityInput.current?.value || "",
        postalCode: postalCodeInput.current?.value || "",
      },
    };

    const isCreated = await createCashOrder(id?.toString() || "", obj);

    if (isCreated) {
      toast.success("Order created successfully", { position: "top-right" });
      updateNumOfCartItems(0);
      router.push("/");
    } else {
      toast.error("Failed to create order. Please try again.", {
        position: "top-right",
      });
    }
  }

  if (loading)
    return <div className="p-20 text-center">Loading your cart...</div>;

  if (!cartData || cartData.numOfCartItems === 0) {
    return (
      <div className="p-20 text-center font-bold">No items to checkout</div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM  & PAYMENT METHOD*/}
        <div className="lg:col-span-2 space-y-6">
          <div className="  py-10 px-4 flex justify-center rounded-3xl items-center">
            <div className="max-w-2xl w-full rounded-3xl shadow-lg border border-gray-100">
              <div className="bg-green-600 p-6 text-white rounded-t-3xl">
                <h1 className="text-2xl font-black">Shipping Address</h1>
                <p className="text-xs opacity-80">
                  Where should we deliver your order?
                </p>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Street Details
                  </label>
                  <input
                    ref={detailsInput}
                    type="text"
                    placeholder="Building, street, apartment..."
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Phone Number
                  </label>
                  <input
                    ref={phoneInput}
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                      City
                    </label>
                    <input
                      ref={cityInput}
                      type="text"
                      placeholder="e.g. Cairo"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                      Postal Code
                    </label>
                    <input
                      ref={postalCodeInput}
                      type="text"
                      placeholder="12345"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-green-600 p-5 text-white flex items-center gap-3">
              <CreditCard size={24} />
              <div>
                <h2 className="font-bold text-lg">Payment Method</h2>
                <p className="text-[11px] opacity-80">
                  Choose how you'd like to pay
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* DELIVERY OPTION */}
              <div
                onClick={() => setPaymentType("cash")}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                  paymentType === "cash"
                    ? "border-green-600 bg-green-50/30"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                  <Banknote size={24} />
                </div>
                <div className="grow">
                  <h3 className="font-bold text-gray-800 text-sm">
                    Cash on Delivery
                  </h3>
                  <p className="text-xs text-gray-400">
                    Pay when your order arrives at your doorstep
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    paymentType === "cash"
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-gray-200"
                  }`}
                >
                  {paymentType === "cash" && <CheckCircle2 size={16} />}
                </div>
              </div>

              {/* ONLINE OPTION */}
              <div
                onClick={() => setPaymentType("online")}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                  paymentType === "online"
                    ? "border-[#48a15e] bg-green-50/30"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="p-3 bg-green-400 rounded-xl text-white shadow-md shadow-green-100">
                  <CreditCard size={24} />
                </div>
                <div className="grow">
                  <h3 className="font-bold text-gray-800 text-sm">
                    Pay Online
                  </h3>
                  <p className="text-xs text-gray-400">
                    Secure payment with Credit/Debit Card via Stripe
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    paymentType === "online"
                      ? "border-[#48a15e] bg-[#48a15e] text-white"
                      : "border-gray-200"
                  }`}
                >
                  {paymentType === "online" && <CheckCircle2 size={16} />}
                </div>
              </div>

              {/* SERVICES ICONS */}
              <div className="bg-green-50/50 p-4 rounded-2xl flex flex-row items-center  justify-between border border-green-100/50">
                <ServiceIcon
                  icon={<Truck size={20} />}
                  title="Free Delivery"
                  desc="Orders over $50"
                />
                <ServiceIcon
                  icon={<RotateCcw size={20} />}
                  title="30 Days Return"
                  desc="Money back"
                />
                <ServiceIcon
                  icon={<ShieldCheck size={20} />}
                  title="Secure Payment"
                  desc="100% Protected"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: ORDER SUMMARY */}
        <div className="p-6 space-y-6">
          <div className="space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
            {cartData.data.products.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 items-center pb-3 border-b border-gray-50 last:border-0"
              >
                <img
                  src={item.product.imageCover}
                  className="w-12 h-12 rounded-lg shrink-0 object-cover"
                  alt={item.product.title}
                />

                <div className="grow">
                  <p className="text-xs font-bold text-gray-800 line-clamp-1">
                    {item.product.title}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {item.count} × {item.price} EGP
                  </p>
                </div>

                <p className="text-xs font-bold text-gray-700">
                  {(item.price * item.count).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* SUBTOTAL */}
          <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="font-bold text-gray-800">
                {cartData.data.totalCartPrice.toLocaleString()} EGP
              </span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Shipping</span>
              <span className="font-bold">FREE</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-2xl font-black text-green-600">
                {cartData.data.totalCartPrice.toLocaleString()} EGP
              </span>
            </div>
          </div>

          {/* PLACE ORDER BUTTON */}
          {paymentType === "online" && (
            <button
              onClick={handlecreateOnlineOrder}
              className="w-full py-5 bg-green-600 hover:bg-green-500 text-white font-black  shadow-xl shadow-green-100 mt-4 rounded-2xl"
            >
              Proceed To Payment
            </button>
          )}
          {paymentType === "cash" && (
            <button
              onClick={handleCashOrder}
              className="w-full py-5 bg-green-600 hover:bg-green-500 text-white font-black  shadow-xl shadow-green-100 mt-4 rounded-2xl"
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </>
  );
}
