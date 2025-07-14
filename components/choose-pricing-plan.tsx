// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// interface DogPlanStepProps {
//   formData: any
//   updateFormData: (field: string, value: any) => void
//   onNext: () => void
//   onBack: () => void
// }

// export default function DogPlanStep({ formData, updateFormData, onNext, onBack }: DogPlanStepProps) {
//   const [plan, setPlan] = useState<string>(formData.plan || "")

//   useEffect(() => {
//     updateFormData("plan", plan)
//   }, [plan, updateFormData])

//   const handleNext = () => {
//     if (plan) onNext()
//   }

//   const planOptions = [
//     { id: "monthly", label: "Monthly", description: "3000 PKR" },
//     { id: "3months", label: "3 Months", description: "3000 PKR – 5% Off" },
//     { id: "6months", label: "6 Months", description: "3000 PKR – 10% Off" },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
//       <div className="max-w-4xl mx-auto w-full">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Step 9 of 12</span>
//             <span className="text-sm text-gray-600">75% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
//               style={{ width: '75%' }}
//             ></div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
//               Choose your plan
//             </h2>
//             <p className="text-gray-600 text-sm sm:text-base">
//               Select a subscription plan below.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-3 gap-4 mb-8">
//             {planOptions.map(option => (
//               <Card
//                 key={option.id}
//                 className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
//                   plan === option.id
//                     ? 'ring-2 ring-bhau bg-blue-50'
//                     : 'hover:shadow-lg'
//                 }`}
//                 onClick={() => setPlan(option.id)}
//               >
//                 <CardContent className="p-6 text-center">
//                   <h3 className="font-semibold text-gray-800 mb-2">{option.label}</h3>
//                   <p className="text-sm text-gray-600">{option.description}</p>
//                   {plan === option.id && (
//                     <div className="mt-4 text-bhau">
//                       <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center">

//             <Button
//               onClick={handleNext}
//               disabled={!plan}
//               className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
//             >
//               Next
//               <ChevronRight size={16} />
//             </Button>
//           </div>

//           {!plan && (
//             <p className="text-center text-sm text-gray-500 mt-4">
//               Please select a plan to continue.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface DogPlanStepProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export default function DogPlanStep({ formData, updateFormData, onNext, onBack }: DogPlanStepProps) {
  const [plan, setPlan] = useState<string>(formData.plan || "")

  useEffect(() => {
    updateFormData("plan", plan)
  }, [plan, updateFormData])

  useEffect(() => {
    console.log("📦 DogPlanStep: Full Form Data Snapshot:", formData)
  }, [formData])

  const handleNext = () => {
    if (plan) {
      console.log("✅ Selected Plan:", plan)
      onNext()
    }
  }

  // const planOptions = [
  //   { id: "monthly", label: "Monthly", description: "3000 PKR" },
  //   { id: "3months", label: "3 Months", description: "3000 PKR – 5% Off" },
  //   { id: "6months", label: "6 Months", description: "3000 PKR – 10% Off" },
  // ]

  const planOptions = [
  { id: "monthly", label: "Monthly", description: "3000 PKR" },
  { id: "3mo", label: "3 Months", description: "3000 PKR – 5% Off" },
  { id: "6mo", label: "6 Months", description: "3000 PKR – 10% Off" },
]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step 9 of 12</span>
            <span className="text-sm text-gray-600">75% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: '75%' }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
              Choose your plan
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Select a subscription plan below.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {planOptions.map(option => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  plan === option.id
                    ? 'ring-2 ring-bhau bg-blue-50'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setPlan(option.id)}
              >
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  {plan === option.id && (
                    <div className="mt-4 text-bhau">
                      <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!plan}
              className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>

          {!plan && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Please select a plan to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
