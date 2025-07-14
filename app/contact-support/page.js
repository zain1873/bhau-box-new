"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from "lucide-react"
import Link from "next/link"

export default function ContactSupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    priority: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      status: "Online",
      statusColor: "bg-green-500",
      action: "Start Chat",
      available: true
    },
    {
      title: "Phone Support",
      description: "Call us directly for urgent matters",
      icon: Phone,
      status: "9 AM - 6 PM PST",
      statusColor: "bg-blue-500",
      action: "Call Now",
      phone: "+1 (555) 123-4567"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      status: "24-48 hours response",
      statusColor: "bg-orange-500",
      action: "Send Email",
      email: "support@bhaubox.com"
    }
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4">
        <div className="max-w-4xl mx-auto py-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <Card className="max-w-md mx-auto text-center shadow-lg">
            <CardContent className="p-8">
              <div className="mb-4">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for contacting us. We'll get back to you within 24-48 hours.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="outline" 
                  className="w-full"
                >
                  Send Another Message
                </Button>
                <Link href="/dashboard">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Support
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Need help? We're here for you! Choose how you'd like to get in touch with our support team.
            </p>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {supportOptions.map((option, index) => (
            <Card 
              key={option.title}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto">
                    <option.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full ${option.statusColor}`}></div>
                  <span className="text-sm text-gray-500">{option.status}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-blue-50"
                  onClick={() => {
                    if (option.phone) window.open(`tel:${option.phone}`)
                    if (option.email) window.open(`mailto:${option.email}`)
                  }}
                >
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Send us a message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subscription">Subscription Issues</SelectItem>
                      <SelectItem value="delivery">Delivery Problems</SelectItem>
                      <SelectItem value="product">Product Quality</SelectItem>
                      <SelectItem value="billing">Billing Questions</SelectItem>
                      <SelectItem value="account">Account Management</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief description"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Please describe your issue or question in detail..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <HelpCircle className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Need immediate help?</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Check our FAQ section for common questions and instant answers, or browse our Help Center for detailed guides.
                </p>
                <div className="flex gap-3">
                  <Link href="/faq">
                    <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                      View FAQ
                    </Button>
                  </Link>
                  <Link href="/help-center">
                    <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                      Help Center
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}