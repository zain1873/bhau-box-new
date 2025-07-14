"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronRight,
  Package,
  CreditCard,
  Truck,
  Heart,
  Settings,
  HelpCircle,
  MessageCircle,
  Phone
} from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState({})
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle, count: 24 },
    { id: "subscription", label: "Subscription", icon: Package, count: 8 },
    { id: "billing", label: "Billing & Payment", icon: CreditCard, count: 6 },
    { id: "shipping", label: "Shipping & Delivery", icon: Truck, count: 5 },
    { id: "products", label: "Products & Quality", icon: Heart, count: 3 },
    { id: "account", label: "Account Management", icon: Settings, count: 2 }
  ]

  const faqData = [
    {
      category: "subscription",
      question: "How does the BhauBox subscription work?",
      answer: "BhauBox is a monthly subscription service that delivers carefully curated toys, treats, and accessories for your dog. Each box is customized based on your dog's size, preferences, and any allergies or restrictions you've specified. You can pause, skip, or cancel your subscription at any time."
    },
    {
      category: "subscription",
      question: "Can I customize what's in my dog's box?",
      answer: "Yes! When you sign up, you'll create a detailed profile for your dog including their size, activity level, chew strength, favorite toy types, and any allergies. Our team uses this information to hand-pick items for each box. You can also update preferences anytime in your dashboard."
    },
    {
      category: "subscription",
      question: "How often will I receive a box?",
      answer: "BhauBox ships monthly. Your box will arrive on the same date each month based on when you first subscribed. You can see your next delivery date in your dashboard and have the option to skip a month if needed."
    },
    {
      category: "subscription",
      question: "Can I pause or cancel my subscription?",
      answer: "Absolutely! You can pause your subscription for up to 3 months or cancel anytime through your dashboard. If you pause, your subscription will automatically resume after the pause period. There are no cancellation fees."
    },
    {
      category: "billing",
      question: "When will I be charged for my subscription?",
      answer: "You'll be charged on the same date each month that you originally subscribed. For example, if you signed up on the 15th, you'll be charged on the 15th of every month. You can view your next billing date in your account settings."
    },
    {
      category: "billing",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. All payments are processed securely through our encrypted payment system."
    },
    {
      category: "billing",
      question: "Can I change my payment method?",
      answer: "Yes, you can update your payment method anytime in your account settings. Go to 'Account' → 'Billing Information' to add or change your payment method."
    },
    {
      category: "billing",
      question: "Do you offer refunds?",
      answer: "We offer a 100% satisfaction guarantee. If you're not completely happy with your box, contact us within 30 days and we'll either send a replacement or provide a full refund."
    },
    {
      category: "shipping",
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within the US. We also offer expedited shipping (2-3 days) and express shipping (1-2 days) for an additional fee. You'll receive tracking information once your box ships."
    },
    {
      category: "shipping",
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within the United States and Canada. We're working on expanding to more countries soon! Sign up for our newsletter to be notified when we launch in your area."
    },
    {
      category: "shipping",
      question: "What if my box is damaged or lost?",
      answer: "If your box arrives damaged or goes missing, please contact us immediately. We'll investigate with the shipping carrier and send you a replacement box at no additional cost."
    },
    {
      category: "shipping",
      question: "Can I change my shipping address?",
      answer: "Yes, you can update your shipping address in your account settings. If you need to change it for an upcoming shipment that hasn't been processed yet, contact our support team for assistance."
    },
    {
      category: "products",
      question: "Are the products safe for my dog?",
      answer: "Absolutely! All products in BhauBox are carefully vetted for safety and quality. We only include items from trusted brands that meet high safety standards. Each product is also age and size appropriate for your specific dog."
    },
    {
      category: "products",
      question: "What if my dog has allergies?",
      answer: "When setting up your dog's profile, you can specify any allergies or dietary restrictions. We'll ensure that no items containing those allergens are included in your boxes. You can update this information anytime."
    },
    {
      category: "products",
      question: "What if my dog doesn't like something in the box?",
      answer: "We want your pup to love everything! If your dog doesn't enjoy an item, let us know through your dashboard feedback. This helps us better understand your dog's preferences for future boxes."
    },
    {
      category: "account",
      question: "How do I update my dog's profile?",
      answer: "You can update your dog's profile anytime by logging into your dashboard and going to 'Dog Profile'. Here you can change preferences, update size, add allergies, or modify activity level information."
    },
    {
      category: "account",
      question: "Can I have multiple dogs on one account?",
      answer: "Currently, each subscription is designed for one dog to ensure proper customization. If you have multiple dogs, you can create separate subscriptions for each one, and we offer a 10% discount for additional subscriptions."
    }
  ]

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
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
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about BhauBox subscriptions, shipping, and more.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full justify-between text-left ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      <span className="text-sm">{category.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {filteredFAQs.length === 0 ? (
              <Card className="text-center p-8">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse different categories.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                    <Collapsible open={openItems[index]} onOpenChange={() => toggleItem(index)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base md:text-lg font-semibold text-left">
                              {faq.question}
                            </CardTitle>
                            {openItems[index] ? (
                              <ChevronDown className="h-5 w-5 text-gray-500 transform transition-transform duration-200" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-500 transform transition-transform duration-200" />
                            )}
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Still Need Help Section */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Still need help?
            </h3>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-support">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <Link href="/help-center">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Visit Help Center
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}