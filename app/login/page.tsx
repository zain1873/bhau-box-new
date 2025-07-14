"use client"

import type React from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, ArrowRight, CheckCircle, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"
import { useEffect, useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    if (value && value.length < 6) {
      setPasswordError("Password must be at least 6 characters")
    } else {
      setPasswordError("")
    }
  }


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setSuccess("")

  if (!email || !password) {
    setError("Please fill in all fields")
    return
  }

  if (!validateEmail(email)) {
    setEmailError("Please enter a valid email address")
    return
  }

  if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters")
    return
  }

  setIsLoading(true)

  try {
    const res = await fetch(`${API_URL}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email.trim(),
        password: password.trim(),
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.detail || "Login failed")
    }

    // ✅ Save tokens locally
    localStorage.setItem("access", data.access)
    localStorage.setItem("refresh", data.refresh)
    localStorage.setItem("user_id", data.user_id)
    localStorage.setItem("user_email", data.email)

    setSuccess("Login successful! Redirecting...")
    setTimeout(() => {
      window.location.href = "/dashboard" // or wherever
    }, 1000)
  } catch (err: any) {
    setError(err.message || "Login failed")
  } finally {
    setIsLoading(false)
  }
}



  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(`Logging in with ${provider}...`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float-delayed"></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-bounce"></div>

      <div
        className={`w-full max-w-md transition-all duration-1000 ${
          isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                 src="/images/bhau-box-logo-new.png"
                  alt="BhauBox"
                  className="h-12 w-auto hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Sign in to manage your buddy's subscription
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              {/* <Button
                variant="outline"
                className="w-full h-12 hover:bg-gray-50 hover:scale-105 transition-all duration-200 group"
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading}
              >
                <Chrome className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                Continue with Google
              </Button> */}
              {/* <Button
                variant="outline"
                className="w-full h-12 hover:bg-gray-50 hover:scale-105 transition-all duration-200 group"
                onClick={() => handleSocialLogin("GitHub")}
                disabled={isLoading}
              >
                <Github className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                Continue with GitHub
              </Button> */}
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">or continue with email</span>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <Alert className="border-red-200 bg-red-50 animate-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50 animate-in slide-in-from-top-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`pl-10 h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 hover:border-blue-300 ${
                      emailError ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {emailError && <p className="text-sm text-red-600 animate-in slide-in-from-top-1">{emailError}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`pl-10 pr-10 h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 hover:border-blue-300 ${
                      passwordError ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-600 animate-in slide-in-from-top-1">{passwordError}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}

                    // onCheckedChange={setRememberMe}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="text-sm text-blue-600 hover:text-blue-700 p-0 h-auto font-medium hover:underline"
                  type="button"
                >
                  Forgot password?
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold hover:scale-105 transition-all duration-200 group"
                disabled={isLoading || !!emailError || !!passwordError}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold hover:underline"
                >
                  Sign up for free
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 BhauBox. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Button variant="link" className="text-gray-500 hover:text-gray-700 p-0 h-auto text-sm">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-gray-500 hover:text-gray-700 p-0 h-auto text-sm">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}
