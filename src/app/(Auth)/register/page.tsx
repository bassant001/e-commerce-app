"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "_/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "_/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "_/components/ui/field";
import { Input } from "_/components/ui/input";
import Link from "next/link";
import { registerSchema } from "_/api/services/auth";
import { signupUser } from "_/api/services/rout.services";

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
async function onSubmit(data: z.infer<typeof registerSchema>) {
  try {
    const result = await signupUser(data);
    if (result.message === "success") {
      toast.success("Account created successfully!");
      router.push('/login'); 
    } else {
    
      toast.error(result.message || "Failed to create account");
    }

  } catch (error: any) {
    toast.error(error.message || "An unexpected error occurred");
    console.log("Error details:", error);
  }
}

  return (
    <Card className="w-full max-w-lg mx-auto shadow-none border-none">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="h-px bg-gray-200 w-full"></div>
          <div className="h-px bg-gray-200 w-full"></div>
        </div>
      </CardHeader>
 
      <CardContent>
        <form
          id="register-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup className="space-y-6">
            {/* name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-gray-700 font-semibold">
                    Name*
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Ali"
                    className="h-12 bg-gray-50/50"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-gray-700 font-semibold">
                    Email*
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="ali@example.com"
                    className="h-12 bg-gray-50/50"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* pass */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-gray-700 font-semibold">
                    Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="create a strong password"
                    className="h-12 bg-gray-50/50"
                  />
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500 font-medium">
                      Must be at least 8 characters with numbers and symbols
                    </p> 
                  </div>
                  <div className="h-1 w-full bg-gray-100 mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-300 w-1/4"></div>
                  </div>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* repass */}
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-gray-700 font-semibold">
                    Confirm Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="confirm your password"
                    className="h-12 bg-gray-50/50"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* phone */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-gray-700 font-semibold">
                    Phone Number*
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="+1 234 567 8900"
                    className="h-12 bg-gray-50/50"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        {/* submit button */}
        <div>
          <Button
            type="submit"
            form="register-form"
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center justify-center gap-2"
          >
            <span className="text-lg"></span> Create My Account
          </Button>
          
          {/* if he ve an account */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
