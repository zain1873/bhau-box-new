// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// interface DogBreedStepProps {
//   formData: any
//   updateFormData: (field: string, value: any) => void
//   onNext: () => void
//   onBack: () => void
// }

// export default function DogBreedStep({ formData, updateFormData, onNext, onBack }: DogBreedStepProps) {
//   const [selectedBreeds, setSelectedBreeds] = useState<string[]>(formData.dogBreeds || [])
//   const [otherBreed, setOtherBreed] = useState<string>(formData.otherBreed || "")
//   const [searchTerm, setSearchTerm] = useState<string>("")

  // const allBreeds = [
  //   "Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler",
  //   "Yorkshire Terrier", "Boxer", "Dachshund", "Siberian Husky", "Great Dane", "Doberman Pinscher", "Shih Tzu", "Miniature Schnauzer",
  //   "Australian Shepherd", "Cavalier King Charles Spaniel", "Shetland Sheepdog", "Boston Terrier", "Pomeranian", "Havanese", "Bernese Mountain Dog",
  //   "English Springer Spaniel", "Basset Hound", "Mastiff", "Chihuahua", "Corgi", "Vizsla", "Weimaraner", "Bull Terrier", "Belgian Malinois",
  //   "Akita", "Alaskan Malamute", "Chow Chow", "Great Pyrenees", "Maltese", "Bearded Collie", "Bichon Frise", "Bloodhound",
  //   "Brittany", "Bullmastiff", "Cairn Terrier", "Chinese Shar-Pei", "Collie", "Dalmatian", "English Setter", "German Shorthaired Pointer",
  //   "Jack Russell Terrier", "Lhasa Apso", "Newfoundland", "Papillon", "Rhodesian Ridgeback", "Saluki", "Samoyed", "Scottish Terrier", "Staffordshire Bull Terrier"
  // ]

//   const filteredBreeds = allBreeds
//     .filter(b => b.toLowerCase().includes(searchTerm.toLowerCase()))
//     .filter(b => !selectedBreeds.includes(b))

//   const selectBreed = (breed: string) => {
//     if (selectedBreeds.length >= 3) return
//     const updated = [...selectedBreeds, breed]
//     setSelectedBreeds(updated)
//     updateFormData("dogBreeds", updated)
//   }

//   const deselectBreed = (breed: string) => {
//     const updated = selectedBreeds.filter(b => b !== breed)
//     setSelectedBreeds(updated)
//     updateFormData("dogBreeds", updated)
//   }

//   const toggleBreed = (breed: string) => {
//     if (selectedBreeds.includes(breed)) {
//       deselectBreed(breed)
//       if (breed === "other") {
//         setOtherBreed("")
//         updateFormData("otherBreed", "")
//       }
//     } else {
//       selectBreed(breed)
//     }
//   }

//   const handleOtherChange = (val: string) => {
//     setOtherBreed(val)
//     updateFormData("otherBreed", val)
//     if (!selectedBreeds.includes("other") && val.trim()) {
//       selectBreed("other")
//     }
//   }

//   const handleNext = () => {
//     if (
//       selectedBreeds.length > 0 &&
//       (!selectedBreeds.includes("other") || otherBreed.trim())
//     ) {
//       onNext()
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
//       <div className="max-w-4xl mx-auto w-full">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Step 4 of 12</span>
//             <span className="text-sm text-gray-600">33% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
//               style={{ width: '33%' }}
//             />
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
//           <div className="text-center mb-4">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">
//               What breed(s) is your dog?
//             </h2>
//             <p className="text-gray-600 text-sm sm:text-base">
//               Select up to 3 breeds. If not listed, choose "Other" and type below.
//             </p>
//           </div>

//           {/* Search Input */}
//           <div className="mb-4">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               placeholder="Search breeds..."
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
//             />
//           </div>

//           {/* Selected Breeds */}
//           <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
//             {selectedBreeds.map(breed => (
//               <Card
//                 key={breed}
//                 className="ring-2 ring-bhau bg-blue-50 cursor-pointer"
//                 onClick={() => toggleBreed(breed)}
//               >
//                 <CardContent className="p-4 text-center">
//                   <p className="font-semibold text-gray-800 text-sm">
//                     {breed === "other" ? otherBreed || "Other" : breed}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Suggestions Grid */}
//           {searchTerm && (
//             <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
//               {filteredBreeds.map(breed => (
//                 <Card
//                   key={breed}
//                   className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                   onClick={() => toggleBreed(breed)}
//                 >
//                   <CardContent className="p-4 text-center">
//                     <p className="font-semibold text-gray-800 text-sm">{breed}</p>
//                   </CardContent>
//                 </Card>
//               ))}

//               {/* Always show "Other" */}
//               {!selectedBreeds.includes("other") && (
//                 <Card
//                   className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                   onClick={() => toggleBreed("other")}
//                 >
//                   <CardContent className="p-4 text-center">
//                     <p className="font-semibold text-gray-800 text-sm">Other</p>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           )}

//           {/* Other Breed Input */}
//           {selectedBreeds.includes("other") && (
//             <div className="mb-6">
//               <input
//                 type="text"
//                 value={otherBreed}
//                 onChange={e => handleOtherChange(e.target.value)}
//                 placeholder="Enter your breed..."
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
//               />
//             </div>
//           )}

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
//               disabled={
//                 selectedBreeds.length === 0 ||
//                 (selectedBreeds.includes("other") && !otherBreed.trim())
//               }
//               className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
//             >
//               Next
//               <ChevronRight size={16} />
//             </Button>
//           </div>

//           {(selectedBreeds.length === 0 || (selectedBreeds.includes("other") && !otherBreed.trim())) && (
//             <p className="text-center text-sm text-gray-500 mt-4">
//               {selectedBreeds.length === 0
//                 ? 'Please select at least one breed.'
//                 : 'Please enter your breed to continue.'
//               }
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

interface DogBreedStepProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export default function DogBreedStep({
  formData,
  updateFormData,
  onNext,
  onBack,
}: DogBreedStepProps) {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>(formData.dogBreeds || [])
  const [otherBreed, setOtherBreed] = useState<string>(formData.otherBreed || "")
  const [searchTerm, setSearchTerm] = useState<string>("")

    const allBreeds = [
    "Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler",
    "Yorkshire Terrier", "Boxer", "Dachshund", "Siberian Husky", "Great Dane", "Doberman Pinscher", "Shih Tzu", "Miniature Schnauzer",
    "Australian Shepherd", "Cavalier King Charles Spaniel", "Shetland Sheepdog", "Boston Terrier", "Pomeranian", "Havanese", "Bernese Mountain Dog",
    "English Springer Spaniel", "Basset Hound", "Mastiff", "Chihuahua", "Corgi", "Vizsla", "Weimaraner", "Bull Terrier", "Belgian Malinois",
    "Akita", "Alaskan Malamute", "Chow Chow", "Great Pyrenees", "Maltese", "Bearded Collie", "Bichon Frise", "Bloodhound",
    "Brittany", "Bullmastiff", "Cairn Terrier", "Chinese Shar-Pei", "Collie", "Dalmatian", "English Setter", "German Shorthaired Pointer",
    "Jack Russell Terrier", "Lhasa Apso", "Newfoundland", "Papillon", "Rhodesian Ridgeback", "Saluki", "Samoyed", "Scottish Terrier", "Staffordshire Bull Terrier"
  ]

  const filteredBreeds = allBreeds
    .filter(b => b.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(b => !selectedBreeds.includes(b))

  const selectBreed = (breed: string) => {
    if (selectedBreeds.length >= 3) return
    const updated = [...selectedBreeds, breed]
    setSelectedBreeds(updated)
    updateFormData("dogBreeds", updated)
    console.log("🐾 Selected Breeds:", updated)
  }

  const deselectBreed = (breed: string) => {
    const updated = selectedBreeds.filter(b => b !== breed)
    setSelectedBreeds(updated)
    updateFormData("dogBreeds", updated)
    console.log("❌ Deselected:", breed)
  }
  

  const toggleBreed = (breed: string) => {
    if (selectedBreeds.includes(breed)) {
      deselectBreed(breed)
      if (breed === "other") {
        setOtherBreed("")
        updateFormData("otherBreed", "")
      }
    } else {
      selectBreed(breed)
    }
  }
//   useEffect(() => {
//   if (selectedBreeds.includes("other")) {
//     console.log("✍️ Other Breed Input:", otherBreed)dogGender 
//   }
// }, [otherBreed, selectedBreeds])

useEffect(() => {
  console.log("📦 Full Form Data Snapshot:", formData)
}, [formData])


  const handleOtherChange = (val: string) => {
    setOtherBreed(val)
    updateFormData("otherBreed", val)
    if (!selectedBreeds.includes("other") && val.trim()) {
      selectBreed("other")
    }
  }

  const handleNext = () => {
    if (
      selectedBreeds.length > 0 &&
      (!selectedBreeds.includes("other") || otherBreed.trim())
    ) {
      onNext()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step 4 of 12</span>
            <span className="text-sm text-gray-600">33% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: '33%' }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">
              What breed(s) is your dog?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Select up to 3 breeds. If not listed, choose "Other" and type below.
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search breeds..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
            />
          </div>

          {/* Selected Breeds */}
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {selectedBreeds.map(breed => (
              <Card
                key={breed}
                className="ring-2 ring-bhau bg-blue-50 cursor-pointer"
                onClick={() => toggleBreed(breed)}
              >
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-gray-800 text-sm">
                    {breed === "other" ? otherBreed || "Other" : breed}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Suggestions Grid */}
          {searchTerm && (
            <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {filteredBreeds.map(breed => (
                <Card
                  key={breed}
                  className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => toggleBreed(breed)}
                >
                  <CardContent className="p-4 text-center">
                    <p className="font-semibold text-gray-800 text-sm">{breed}</p>
                  </CardContent>
                </Card>
              ))}

              {!selectedBreeds.includes("other") && (
                <Card
                  className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => toggleBreed("other")}
                >
                  <CardContent className="p-4 text-center">
                    <p className="font-semibold text-gray-800 text-sm">Other</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Other Breed Input */}
          {selectedBreeds.includes("other") && (
            <div className="mb-6">
              <input
                type="text"
                value={otherBreed}
                onChange={e => handleOtherChange(e.target.value)}
                placeholder="Enter your breed..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ChevronLeft size={16} />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                selectedBreeds.length === 0 ||
                (selectedBreeds.includes("other") && !otherBreed.trim())
              }
              className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>

          {(selectedBreeds.length === 0 || (selectedBreeds.includes("other") && !otherBreed.trim())) && (
            <p className="text-center text-sm text-gray-500 mt-4">
              {selectedBreeds.length === 0
                ? 'Please select at least one breed.'
                : 'Please enter your breed to continue.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
