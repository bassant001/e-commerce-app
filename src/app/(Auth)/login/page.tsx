import { Button } from "_/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "_/components/ui/card"
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import _login_form from "./_loginform";

export default function login() {
 

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 gap-10">
      {/* right: fresh card */}
     
      <div className="hidden md:flex flex-col items-center max-w-sm text-center">
        <img src="assets/images/FreshCart.png" alt="FreshCart" className="w-full mb-6" />
        <h2 className="text-2xl font-bold mb-2">FreshCart - Your One-Stop Shop</h2>
        <p className="text-gray-500">Join thousands of happy customers...</p>
      </div>

  {/* left: login form */}
      <Card className="w-full max-w-md shadow-lg border-gray-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-600 font-bold">FreshCart</CardTitle>
          <h3 className="text-xl font-bold mt-2">Welcome Back!</h3>
          <p className="text-gray-500 text-sm">Sign in to continue your shopping</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
    
          <div className="space-y-2">
            <Button variant="outline" className="w-full gap-2 border-gray-200">
              <FaGoogle color="red" /> Continue with Google
            </Button>
            <Button variant="outline" className="w-full gap-2 border-gray-200">
              <FaFacebook color="blue" /> Continue with Facebook
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase">
            <div className="h-px bg-gray-200 w-full"></div>
            <span>Or</span>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>

            {/* form */}
          <_login_form />
         

          <p className="text-center text-sm text-gray-600 mt-4">
            New to FreshCart? <Link href="/register" className="text-green-600 font-bold">Create an account</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}