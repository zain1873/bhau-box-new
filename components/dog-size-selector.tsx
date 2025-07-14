// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// interface DogSizeStepProps {
//   formData: any
//   updateFormData: (field: string, value: any) => void
//   onNext: () => void
//   onBack: () => void
// }

// export default function DogSizeStep({ formData, updateFormData, onNext, onBack }: DogSizeStepProps) {
//   const [size, setSize] = useState<string>(formData.dogSize || "")

//   useEffect(() => {
//     updateFormData("dogSize", size)
//   }, [size, updateFormData])

//   const handleNext = () => {
//     if (size) {
//       onNext()
//     }
//   }

//   const sizeOptions = [
//     { id: "small", label: "Small", description: "1-20 lbs" },
//     { id: "medium", label: "Medium", description: "20-50 lbs" },
//     { id: "large", label: "Large", description: "50+ lbs" },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
//       <div className="max-w-4xl mx-auto w-full">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Step 3 of 12</span>
//             <span className="text-sm text-gray-600">25% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
//               style={{ width: '25%' }}
//             ></div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
//               What size is your dog?
//             </h2>
//             <p className="text-gray-600 text-sm sm:text-base">
//               All products are the same price, regardless of size. You can change sizes at any time.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-3 gap-4 mb-8">
//             {sizeOptions.map((option) => (
//               <Card
//                 key={option.id}
//                 className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
//                   size === option.id
//                     ? 'ring-2 ring-bhau bg-blue-50'
//                     : 'hover:shadow-lg'
//                 }`}
//                 onClick={() => setSize(option.id)}
//               >
//                 <CardContent className="p-4 text-center">
//                   <p className="font-semibold text-gray-800 mb-1">{option.label}</p>
//                   <p className="text-xs text-gray-600">{option.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center">
//             <Button
//               variant="outline"
//               onClick={onBack}
//               className="flex items-center gap-2"
//             >
//               <ChevronLeft size={16} />
//               Back
//             </Button>

//             <Button
//               onClick={handleNext}
//               disabled={!size}
//               className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
//             >
//               Next
//               <ChevronRight size={16} />
//             </Button>
//           </div>

//           {!size && (
//             <p className="text-center text-sm text-gray-500 mt-4">
//               Please select your dog’s size to continue.
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

interface DogSizeStepProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export default function DogSizeStep({
  formData,
  updateFormData,
  onNext,
  onBack,
}: DogSizeStepProps) {
  const [size, setSize] = useState<string>(formData.dogSize || "")

  useEffect(() => {
  if (size) {
    console.log("🐕 Size Updated:", size)
    updateFormData("dogSize", size)
  }
}, [size, updateFormData])


  const handleNext = () => {
    if (size) {
      onNext()
    }
  }
  useEffect(() => {
  console.log("📦 Full Form Data Snapshot:", formData)
}, [formData])


  const sizeOptions = [
    { id: "small", label: "Small", description: "1-20 lbs" },
    { id: "medium", label: "Medium", description: "20-50 lbs" },
    { id: "large", label: "Large", description: "50+ lbs" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step 3 of 12</span>
            <span className="text-sm text-gray-600">25% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: "25%" }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
              What size is your dog?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              All products are the same price, regardless of size. You can change sizes at any time.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {sizeOptions.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  size === option.id
                    ? "ring-2 ring-bhau bg-blue-50"
                    : "hover:shadow-lg"
                }`}
                onClick={() => setSize(option.id)}
              >
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-gray-800 mb-1">{option.label}</p>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ChevronLeft size={16} />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!size}
              className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>

          {!size && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Please select your dog’s size to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
