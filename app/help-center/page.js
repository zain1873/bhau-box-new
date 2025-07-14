"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  ArrowRight,
  Package,
  CreditCard,
  Truck,
  Heart,
  Settings,
  HelpCircle,
  MessageCircle,
  BookOpen,
  Video,
  FileText,
  Download,
  Clock,
  Star,
  Users,
  Phone
} from "lucide-react"
import Link from "next/link"

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const helpCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Everything you need to know to get started with BhauBox",
      icon: Package,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      iconBg: "bg-blue-100",
      articles: 8,
      popular: true
    },
    {
      id: "subscription-management",
      title: "Subscription Management",
      description: "Manage your subscription, pause, skip, or modify your plan",
      icon: Settings,
      color: "bg-green-50 text-green-600 border-green-200",
      iconBg: "bg-green-100",
      articles: 12,
      popular: true
    },
    {
      id: "billing-payments",
      title: "Billing & Payments",
      description: "Payment methods, billing cycles, and refund information",
      icon: CreditCard,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      iconBg: "bg-purple-100",
      articles: 6
    },
    {
      id: "shipping-delivery",
      title: "Shipping & Delivery",
      description: "Shipping options, tracking, and delivery troubleshooting",
      icon: Truck,
      color: "bg-orange-50 text-orange-600 border-orange-200",
      iconBg: "bg-orange-100",
      articles: 7
    },
    {
      id: "products-quality",
      title: "Products & Quality",
      description: "Product safety, quality standards, and customization",
      icon: Heart,
      color: "bg-pink-50 text-pink-600 border-pink-200",
      iconBg: "bg-pink-100",
      articles: 5
    },
    {
      id: "account-profile",
      title: "Account & Profile",
      description: "Account settings, dog profiles, and personal information",
      icon: Users,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
      iconBg: "bg-indigo-100",
      articles: 4
    }
  ]

  const popularArticles = [
    {
      title: "How to create your dog's profile",
      category: "Getting Started",
      readTime: "3 min read",
      views: "2.1k views",
      rating: 4.9
    },
    {
      title: "Managing your subscription preferences",
      category: "Subscription",
      readTime: "2 min read",
      views: "1.8k views",
      rating: 4.8
    },
    {
      title: "What to do if your box is damaged",
      category: "Shipping",
      readTime: "2 min read",
      views: "1.5k views",
      rating: 4.7
    },
    {
      title: "Understanding your billing cycle",
      category: "Billing",
      readTime: "4 min read",
      views: "1.2k views",
      rating: 4.6
    },
    {
      title: "How to pause or cancel your subscription",
      category: "Subscription",
      readTime: "3 min read",
      views: "1.1k views",
      rating: 4.8
    }
  ]

  const quickActions = [
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: MessageCircle,
      action: "contact-support",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Live Chat",
      description: "Chat with us in real-time",
      icon: MessageCircle,
      action: "live-chat",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "Call Support",
      description: "Speak with our team directly",
      icon: Phone,
      action: "call-support",
      color: "bg-purple-600 hover:bg-purple-700"
    }
  ]

  const resources = [
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: Video,
      count: "12 videos",
      color: "bg-red-50 text-red-600",
      iconBg: "bg-red-100"
    },
    {
      title: "User Guides",
      description: "Detailed written instructions",
      icon: BookOpen,
      count: "24 guides",
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100"
    },
    {
      title: "Download Center",
      description: "Forms and documents",
      icon: Download,
      count: "8 files",
      color: "bg-green-50 text-green-600",
      iconBg: "bg-green-100"
    }
  ]

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find guides, tutorials, and resources to help you get the most out of your BhauBox experience.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search help articles and guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {quickActions.map((action, index) => (
            <Card key={action.title} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Button className={`w-full ${action.color} text-white mb-3`}>
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.title}
                </Button>
                <p className="text-sm text-gray-600">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => (
              <Card
                key={category.id}
                className={`border-2 ${category.color} hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-full ${category.iconBg} group-hover:scale-110 transition-transform duration-200`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    {category.popular && (
                      <Badge className="bg-yellow-100 text-yellow-800">Popular</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.articles} articles</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-500">{article.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                      <span>{article.views}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={resource.title} className={`border-2 ${resource.color} hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer`}>
                <CardContent className="p-6 text-center">
                  <div className={`p-3 rounded-full ${resource.iconBg} w-fit mx-auto mb-4`}>
                    <resource.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                  <Badge variant="secondary">{resource.count}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Still can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team is always ready to help you. Get in touch and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-support">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  View FAQ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}