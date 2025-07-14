// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// interface DogNameStepProps {
//   formData: any
//   updateFormData: (field: string, value: any) => void
//   onNext: () => void
//   onBack: () => void
// }

// export default function DogNameStep({ formData, updateFormData, onNext, onBack }: DogNameStepProps) {
//   const [dogName, setDogName] = useState<string>(formData.dogName || "")
//   const [gender, setGender] = useState<string>(formData.dogGender || "")

//   useEffect(() => {
//     updateFormData("dogName", dogName)
//   }, [dogName, updateFormData])

//   useEffect(() => {
//     updateFormData("dogGender", gender)
//   }, [gender, updateFormData])

//   const handleNext = () => {
//     if (dogName.trim() && gender) {
//       onNext()
//     }
//   }

//   const genderOptions = [
//     { id: "female", label: "She's a good girl" },
//     { id: "male", label: "He's a good boy" },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
//       <div className="max-w-4xl mx-auto w-full">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Step 2 of 12</span>
//             <span className="text-sm text-gray-600">17% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
//               style={{ width: '17%' }}
//             ></div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
//               What is your dog's name?
//             </h2>
//           </div>

//           <div className="mb-6">
//             <input
//               type="text"
//               value={dogName}
//               onChange={(e) => setDogName(e.target.value)}
//               placeholder="Enter Name..."
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
//             />
//           </div>

//           <div className="grid sm:grid-cols-2 gap-4 mb-8">
//             {genderOptions.map((option) => (
//               <Card
//                 key={option.id}
//                 className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
//                   gender === option.id
//                     ? 'ring-2 ring-bhau bg-blue-50'
//                     : 'hover:shadow-lg'
//                 }`}
//                 onClick={() => setGender(option.id)}
//               >
//                 <CardContent className="p-4 text-center">
//                   <p className="font-semibold text-gray-800">{option.label}</p>
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
//               disabled={!dogName.trim() || !gender}
//               className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
//             >
//               Next
//               <ChevronRight size={16} />
//             </Button>
//           </div>

//           {(!dogName.trim() || !gender) && (
//             <p className="text-center text-sm text-gray-500 mt-4">
//               { !dogName.trim()
//                 ? 'Please enter your dog’s name.'
//                 : 'Please select an option to continue.'
//               }
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DogNameStepProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export default function DogNameStep({
  formData,
  updateFormData,
  onNext,
  onBack,
}: DogNameStepProps) {
  const [dogName, setDogName] = useState<string>(formData.dogName || '')
  const [gender, setGender] = useState<string>(formData.dogGender || '')



useEffect(() => {
  updateFormData('dogName', dogName)
}, [dogName, updateFormData])

useEffect(() => {
  updateFormData('gender', gender);
}, [gender, updateFormData])

  const handleNext = () => {
    if (dogName.trim() && gender) {
      onNext()
    }
  }
useEffect(() => {
  console.log("📦 Full Form Data Snapshot:", formData)
}, [formData])

  const genderOptions = [
    { id: 'female', label: "She's a good girl" },
    { id: 'male', label: "He's a good boy" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step 2 of 12</span>
            <span className="text-sm text-gray-600">17% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: '17%' }}
            ></div>
          </div>
        </div>

        {/* Dog Name Input */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
              What is your dog's name?
            </h2>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
              placeholder="Enter Name..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
            />
          </div>

          {/* Gender Select */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {genderOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => setGender(option.id)}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  gender === option.id
                    ? 'ring-2 ring-bhau bg-blue-50'
                    : 'hover:shadow-lg'
                }`}
              >
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-gray-800">{option.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ChevronLeft size={16} />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!dogName.trim() || !gender}
              className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>

          {(!dogName.trim() || !gender) && (
            <p className="text-center text-sm text-gray-500 mt-4">
              {!dogName.trim()
                ? 'Please enter your dog’s name.'
                : 'Please select an option to continue.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
