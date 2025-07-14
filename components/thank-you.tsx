"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface DogConfirmationStepProps {
  formData: any
  onAccountClick: () => void
}

export default function DogConfirmationStep({ formData, onAccountClick }: DogConfirmationStepProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="max-w-2xl w-full">
        <Card className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="mx-auto text-bhau" size={48} />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mt-4">
            Thank you for your order!
          </h2>
          <p className="text-gray-600 mt-2">
            Your subscription is now active. We’ll send you a confirmation email shortly.
          </p>

          {/* Order Summary */}
          <div className="mt-6 space-y-4 text-left">
            <h3 className="font-semibold text-gray-800">Order Summary</h3>
            <div className="border border-gray-200 rounded-lg">
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Plan:</span> {formData.planLabel}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Dog Name:</span> {formData.dogName}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Size:</span> {formData.dogSize}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Total:</span> PKR {formData.totalAmount}
                </p>
              </CardContent>
            </div>
          </div>

          {/* Go to Account Button */}
          <Button
            onClick={onAccountClick}
            className="mt-8 w-full bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full"
          >
            Go to BHAUBOX Account
          </Button>
        </Card>
      </div>
    </div>
  )
}
