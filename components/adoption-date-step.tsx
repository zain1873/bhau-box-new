// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// interface DogBirthdayStepProps {
//   formData: any
//   updateFormData: (field: string, value: any) => void
//   onNext: () => void
//   onBack: () => void
// }

// export default function DogBirthdayStep({ formData, updateFormData, onNext, onBack }: DogBirthdayStepProps) {
//   const [month, setMonth] = useState<string>(formData.dogBirthMonth || "")
//   const [year, setYear] = useState<string>(formData.dogBirthYear || "")
//   const [day, setDay] = useState<string>(formData.dogBirthDay || "")

//   useEffect(() => {
//     updateFormData("dogBirthMonth", month)
//   }, [month, updateFormData])

//   useEffect(() => {
//     updateFormData("dogBirthYear", year)
//   }, [year, updateFormData])

//   useEffect(() => {
//     updateFormData("dogBirthDay", day)
//   }, [day, updateFormData])

//   const handleNext = () => {
//     if (month && year) {
//       onNext()
//     }
//   }

//   const monthOptions = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ]

//   const currentYear = new Date().getFullYear()
//   const yearOptions = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString())

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
//       <div className="max-w-4xl mx-auto w-full">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Step 5 of 12</span>
//             <span className="text-sm text-gray-600">42% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
//               style={{ width: '42%' }}
//             />
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
//               When is your dog’s birthday?
//             </h2>
//             <p className="text-gray-600 text-sm sm:text-base">
//               Select month, year and Day
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 gap-4 mb-8">
//             {/* Month & Year */}
//             <div>
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <select
//                   value={month}
//                   onChange={e => setMonth(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
//                 >
//                   <option value="" disabled>Month</option>
//                   {monthOptions.map(m => (
//                     <option key={m} value={m}>{m}</option>
//                   ))}
//                 </select>
//                 <select
//                   value={year}
//                   onChange={e => setYear(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
//                 >
//                   <option value="" disabled>Year</option>
//                   {yearOptions.map(y => (
//                     <option key={y} value={y}>{y}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Day (Optional) */}
//             <div>
//               <input
//                 type="number"
//                 value={day}
//                 onChange={e => setDay(e.target.value)}
//                 placeholder="Day"
//                 min="1"
//                 max="31"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
//               />
//             </div>
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
//               disabled={!month || !year}
//               className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
//             >
//               Next
//               <ChevronRight size={16} />
//             </Button>
//           </div>

//           {(!month || !year) && (
//             <p className="text-center text-sm text-gray-500 mt-4">
//               Please select both month and year to continue.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface DogBirthdayStepProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export default function DogBirthdayStep({ formData, updateFormData, onNext, onBack }: DogBirthdayStepProps) {
  const [month, setMonth] = useState<string>(formData.dogBirthMonth || "")
  const [year, setYear] = useState<string>(formData.dogBirthYear || "")
  const [day, setDay] = useState<string>(formData.dogBirthDay || "")
  const [isValidDate, setIsValidDate] = useState(true)

  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString())
  const dayOptions = Array.from({ length: 31 }, (_, i) => (i + 1).toString())

  // Update form data
  // useEffect(() => { updateFormData("dogBirthMonth", month) }, [month])
  // useEffect(() => { updateFormData("dogBirthYear", year) }, [year])
  // useEffect(() => { updateFormData("dogBirthDay", day) }, [day])

  useEffect(() => {
  if (month && year && day) {
    const monthIndex = monthOptions.indexOf(month) + 1
    const paddedMonth = monthIndex.toString().padStart(2, "0")
    const paddedDay = day.toString().padStart(2, "0")
    const formattedDate = `${year}-${paddedMonth}-${paddedDay}`
    updateFormData("dogBirthdate", formattedDate)
  }
}, [month, year, day])

  // // Validate selected date is in the past
  // useEffect(() => {
  //   if (day && month && year) {
  //     const monthIndex = monthOptions.indexOf(month)
  //     const selectedDate = new Date(Number(year), monthIndex, Number(day))
  //     const today = new Date()

  //     // Valid if in the past and a real date
  //     if (
  //       selectedDate < today &&
  //       selectedDate.getDate() === Number(day) &&
  //       selectedDate.getMonth() === monthIndex &&
  //       selectedDate.getFullYear() === Number(year)
  //     ) {
  //       setIsValidDate(true)
  //     } else {
  //       setIsValidDate(false)
  //     }
  //   } else {
  //     setIsValidDate(true) // skip validation if incomplete
  //   }
  // }, [day, month, year])

  const handleNext = () => {
    if (month && year && isValidDate) onNext()
  }
useEffect(() => {
  console.log("📦 Full Form Data Snapshot:", formData)
}, [formData])


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step 5 of 12</span>
            <span className="text-sm text-gray-600">42% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: '42%' }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-4">
              When is your dog’s birthday?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Select month, day and year — today or future dates not allowed.
            </p>
          </div>

          {/* Selects */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <select
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
            >
              <option value="" disabled>Month</option>
              {monthOptions.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            <select
              value={day}
              onChange={e => setDay(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
            >
              <option value="" disabled>Day</option>
              {dayOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
            >
              <option value="" disabled>Year</option>
              {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ChevronLeft size={16} />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!month || !year || !day || !isValidDate}
              className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>

          {/* Validation Message */}
          {(!month || !year || !day || !isValidDate) && (
            <p className="text-center text-sm text-gray-500 mt-4">
              {!month || !year || !day
                ? "Please complete all fields."
                : "Please choose a valid past date."}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
