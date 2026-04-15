"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "_/components/ui/button"

import { Field, FieldError, FieldGroup, FieldLabel } from "_/components/ui/field"
import { Input } from "_/components/ui/input"
import Link from "next/link"
import { loginSchema } from "_/api/services/auth"
import { signIn } from "next-auth/react";
import { Session } from "inspector/promises";
import { getLoggedUserCart } from "_/api/services/rout.services";
import { useCart } from "_/app/_context/CartContext";

export default function _login_form() {
  const {updateNumOfCartItems} = useCart();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false, 
  });

  if (result?.ok) {
    toast.success("Welcome back to FreshCart!");
   const res =  await getLoggedUserCart();
 
  updateNumOfCartItems(res?.data?.products.length || 0);
    router.refresh(); 
    router.push("/");
    // setTimeout(() => {
    
    // }, 3000);
     

  } else {
    toast.error("Invalid email or password");
  }
}

  return (
    <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email Address</FieldLabel>
                  <Input {...field} type="email" placeholder="Enter your email" />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {/* pass */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between">
                    <FieldLabel>Password</FieldLabel>
                    <Link href="#" className="text-xs text-green-600">Forgot Password?</Link>
                  </div>
                  <Input {...field} type="password" placeholder="Enter your password" />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Button type="submit" className="w-full h-12 bg-green-600 hover:bg-green-700 font-bold">
              Sign In
            </Button>
          </form>
  )
}
