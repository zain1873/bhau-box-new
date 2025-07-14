// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// interface DogAllergiesStepProps {
//   formData: any
//   updateFormData: (field: string, value: any) => void
//   onNext: () => void
//   onBack: () => void
// }

// export default function DogAllergiesStep({ formData, updateFormData, onNext, onBack }: DogAllergiesStepProps) {
//   const [selectedAllergies, setSelectedAllergies] = useState<string[]>(formData.dogAllergies || [])

//   useEffect(() => {
//     updateFormData("dogAllergies", selectedAllergies)
//   }, [selectedAllergies, updateFormData])

//   const allergyOptions = [
//     { id: "chicken", label: "Chicken" },
//     { id: "turkey", label: "Turkey" },
//     { id: "beef", label: "Beef" },
//     { id: "none", label: "None" },
//   ]

//   const toggleAllergy = (id: string) => {
//     if (id === "none") {
//       setSelectedAllergies(["none"])
//     } else {
//       let updated = [...selectedAllergies]
//       // remove none if selecting other
//       if (updated.includes("none")) {
//         updated = []
//       }
//       if (updated.includes(id)) {
//         updated = updated.filter(a => a !== id)
//       } else {
//         updated.push(id)
//       }
//       setSelectedAllergies(updated)
//     }
//   }

//   const handleNext = () => {
//     if (selectedAllergies.length > 0) {
//       onNext()
//     }
//   }

//   const dogName = formData.dogName || 'your dog'

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
//       <div className="max-w-4xl mx-auto w-full">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Step 6 of 12</span>
//             <span className="text-sm text-gray-600">50% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
//               style={{ width: '50%' }}
//             ></div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
//               Any allergies?
//             </h2>
//             <p className="text-gray-600 text-sm sm:text-base">
//               Our treats are formulated by a certified nutritionist and made in the USA and Canada to make sure your pup is happy and healthy.
//             </p>
//             <p className="text-gray-600 text-sm sm:text-base mt-2">
//               Please do not send any...
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {allergyOptions.map(option => (
//               <Card
//                 key={option.id}
//                 className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
//                   selectedAllergies.includes(option.id)
//                     ? 'ring-2 ring-bhau bg-blue-50'
//                     : 'hover:shadow-lg'
//                 }`}
//                 onClick={() => toggleAllergy(option.id)}
//               >
//                 <CardContent className="p-4 text-center">
//                   <p className="font-semibold text-gray-800">{option.label}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <p className="text-gray-600 text-sm sm:text-base mb-8">
//             If {dogName} has other dietary needs, please chat with us after you checkout and we'll do our best to accommodate.
//           </p>

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
//               disabled={selectedAllergies.length === 0}
//               className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
//             >
//               Next
//               <ChevronRight size={16} />
//             </Button>
//           </div>

//           {selectedAllergies.length === 0 && (
//             <p className="text-center text-sm text-gray-500 mt-4">
//               Please select at least one option to continue.
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

interface DogAllergiesStepProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export default function DogAllergiesStep({ formData, updateFormData, onNext, onBack }: DogAllergiesStepProps) {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(formData.dogAllergies || [])

  useEffect(() => {
    updateFormData("dogAllergies", selectedAllergies)
  }, [selectedAllergies, updateFormData])

  useEffect(() => {
    console.log("🐾 Full Form Data Snapshot:", formData)
  }, [formData])

  const allergyOptions = [
    { id: "chicken", label: "Chicken" },
    { id: "turkey", label: "Turkey" },
    { id: "beef", label: "Beef" },
    { id: "none", label: "None" },
  ]

  // const toggleAllergy = (id: string) => {
  //   if (id === "none") {
  //     setSelectedAllergies(["none"])
  //   } else {
  //     let updated = [...selectedAllergies]
  //     if (updated.includes("none")) updated = []
  //     if (updated.includes(id)) {
  //       updated = updated.filter(a => a !== id)
  //     } else {
  //       updated.push(id)
  //     }
  //     setSelectedAllergies(updated)
  //   }
  // }
  const toggleAllergy = (id: string) => {
  if (id === "none" || selectedAllergies.includes("none")) {
    setSelectedAllergies([id])
    return // ✅ stop here to avoid pushing again
  }

  let updated = [...selectedAllergies]
  if (updated.includes(id)) {
    updated = updated.filter(a => a !== id)
  } else {
    updated.push(id)
  }

  setSelectedAllergies(updated)
}


  const handleNext = () => {
    if (selectedAllergies.length > 0) {
      onNext()
    }
  }

  const dogName = formData.dogName || 'your dog'

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step 6 of 12</span>
            <span className="text-sm text-gray-600">50% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: '50%' }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
              Any allergies?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Our treats are formulated by a certified nutritionist and made in the USA and Canada to make sure your pup is happy and healthy.
            </p>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Please do not send any...
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {allergyOptions.map(option => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedAllergies.includes(option.id)
                    ? 'ring-2 ring-bhau bg-blue-50'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => toggleAllergy(option.id)}
              >
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-gray-800">{option.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-gray-600 text-sm sm:text-base mb-8">
            If {dogName} has other dietary needs, please chat with us after you checkout and we'll do our best to accommodate.
          </p>

          {/* Navigation Buttons */}
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
              disabled={selectedAllergies.length === 0}
              className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>

          {selectedAllergies.length === 0 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Please select at least one option to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
