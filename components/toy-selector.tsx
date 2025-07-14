// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// interface ToySelectorProps {
//   formData: any
//   updateFormData: (field: string, value: any) => void
//   onNext: () => void
//   onBack: () => void
// }

// export default function ToySelector({ formData, updateFormData, onNext, onBack }: ToySelectorProps) {
//   // Store as single string instead of array
//   const [selectedToy, setSelectedToy] = useState<string>(formData.toy || "")

//   const toyOptions = [
//     { id: "squeaky", name: "Plush Toys", emoji: "🦆", description: "Soft Materials" },
//     { id: "rope", name: "Durable Chew Toys", emoji: "🪢", description: "Tough Materials" },
//   ]

//   const handleSelect = (toyId: string) => {
//     if (selectedToy === toyId) {
//       // Deselect if clicking the same toy
//       setSelectedToy("")
//       updateFormData('toy', "")
//     } else {
//       // Select new toy
//       setSelectedToy(toyId)
//       updateFormData('toy', toyId)
//     }
//   }

//   const handleNext = () => {
//     if (selectedToy) {
//       onNext()
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
//       <div className="max-w-4xl mx-auto w-full">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Step 1 of 12</span>
//             <span className="text-sm text-gray-600">8% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300" style={{ width: '8%' }}></div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
//               What type of toys does your pup love?
//             </h2>
//             <p className="text-gray-600 text-sm sm:text-base">
//               Select one option - we'll customize every box based on their favorite!
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
//             {toyOptions.map((toy) => (
//               <Card
//                 key={toy.id}
//                 className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
//                   selectedToy === toy.id
//                     ? 'ring-2 ring-bhau bg-blue-50'
//                     : 'hover:shadow-lg'
//                 }`}
//                 onClick={() => handleSelect(toy.id)}
//               >
//                 <CardContent className="p-4 text-center">
//                   <div className="text-3xl mb-2">{toy.emoji}</div>
//                   <h3 className="font-semibold text-gray-800 mb-1">{toy.name}</h3>
//                   <p className="text-xs text-gray-600">{toy.description}</p>
//                   {selectedToy === toy.id && (
//                     <div className="mt-2 text-bhau">
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
//               variant="outline"
//               onClick={onBack}
//               className="flex items-center gap-2"
//               disabled
//             >
//               <ChevronLeft size={16} />
//               Back
//             </Button>

//             <Button
//               onClick={handleNext}
//               disabled={!selectedToy}
//               className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
//             >
//               Next
//               <ChevronRight size={16} />
//             </Button>
//           </div>

//           {!selectedToy && (
//             <p className="text-center text-sm text-gray-500 mt-4">
//               Please select one toy type to continue
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

interface ToySelectorProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export default function ToySelector({
  formData,
  updateFormData,
  onNext,
  onBack,
}: ToySelectorProps) {
  const [selectedToy, setSelectedToy] = useState<string>(formData.toy || '')

  const toyOptions = [
    { id: 'plusy toy', name: 'Plush Toys', emoji: '🦆', description: 'Soft Materials' },
    { id: 'durable', name: 'Durable Chew Toys', emoji: '🪢', description: 'Tough Materials' },
  ]

  const handleSelect = (toyId: string) => {
    const newSelection = selectedToy === toyId ? '' : toyId
    setSelectedToy(newSelection)
    updateFormData('toy', newSelection)
  }

  const handleNext = () => {
    if (selectedToy) onNext()
  }

  // useEffect(() => {
  //   console.log('🧸 Toy Selection:', selectedToy)
  // }, [selectedToy])

  useEffect(() => {
  console.log("📦 Full Form Data Snapshot:", formData)
}, [formData])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step 1 of 12</span>
            <span className="text-sm text-gray-600">8% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: '8%' }}
            ></div>
          </div>
        </div>

        {/* Toy Cards */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
              What type of toys does your pup love?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Select one option - we'll customize every box based on their favorite!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {toyOptions.map((toy) => (
              <Card
                key={toy.id}
                onClick={() => handleSelect(toy.id)}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedToy === toy.id
                    ? 'ring-2 ring-bhau bg-blue-50'
                    : 'hover:shadow-lg'
                }`}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{toy.emoji}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{toy.name}</h3>
                  <p className="text-xs text-gray-600">{toy.description}</p>
                  {selectedToy === toy.id && (
                    <div className="mt-2 text-bhau">
                      <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2" disabled>
              <ChevronLeft size={16} />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedToy}
              className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>

          {!selectedToy && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Please select one toy type to continue
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
