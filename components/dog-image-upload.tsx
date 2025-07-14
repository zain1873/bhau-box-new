// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// interface DogImageUploadStepProps {
//   formData: any
//   updateFormData: (field: string, value: any) => void
//   onNext: () => void
//   onBack: () => void
// }

// export default function DogImageUploadStep({ formData, updateFormData, onNext, onBack }: DogImageUploadStepProps) {
//   const [imageFile, setImageFile] = useState<File | null>(formData.dogImage || null)
//   const [previewUrl, setPreviewUrl] = useState<string>(formData.dogImageUrl || "")
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   useEffect(() => {
//     updateFormData("dogImage", imageFile)
//     updateFormData("dogImageUrl", previewUrl)
//   }, [imageFile, previewUrl, updateFormData])

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null
//     if (file) {
//       setImageFile(file)
//       setPreviewUrl(URL.createObjectURL(file))
//     }
//   }

//   const removeImage = () => {
//     setImageFile(null)
//     setPreviewUrl("")
//     if (fileInputRef.current) fileInputRef.current.value = ""
//   }

//   const handleNext = () => {
//     onNext()
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
//       <div className="max-w-4xl mx-auto w-full">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Step 8 of 12</span>
//             <span className="text-sm text-gray-600">67% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
//               style={{ width: '67%' }}
//             />
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">
//               Upload a photo of your dog (optional)
//             </h2>
//             <p className="text-gray-600 text-sm sm:text-base">
//               Add a cute photo so we can personalize your experience.
//             </p>
//           </div>

//           <div className="flex flex-col items-center mb-8">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               ref={fileInputRef}
//               className="hidden"
//             />
//             <Card
//               className="cursor-pointer border-dashed border-2 border-gray-300 hover:border-bhau transition rounded-lg p-6 w-full max-w-xs"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <CardContent className="flex flex-col items-center">
//                 {previewUrl ? (
//                   <div className="relative">
//                     <img
//                       src={previewUrl}
//                       alt="Dog preview"
//                       className="w-40 h-40 object-cover rounded-full mb-4"
//                     />
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={(e) => { e.stopPropagation(); removeImage() }}
//                       className="absolute top-2 right-2"
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="text-gray-400">
//                     <p className="mb-2">Click to upload</p>
//                     <p className="text-xs">PNG, JPG, GIF</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
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
//               className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
//             >
//               Next
//               <ChevronRight size={16} />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DogImageUploadStepProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export default function DogImageUploadStep({ formData, updateFormData, onNext, onBack }: DogImageUploadStepProps) {
  const [imageFile, setImageFile] = useState<File | null>(formData.dogImage || null)
  const [previewUrl, setPreviewUrl] = useState<string>(formData.dogImageUrl || "")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    updateFormData("dogImage", imageFile)
    updateFormData("dogImageUrl", previewUrl)
  }, [imageFile, previewUrl, updateFormData])

  useEffect(() => {
    console.log("🐶 Image Upload Snapshot:", {
      dogImage: imageFile,
      dogImageUrl: previewUrl,
    })
  }, [imageFile, previewUrl])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setPreviewUrl("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleNext = () => {
    onNext() // ✅ Always allowed since it's optional
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step 8 of 12</span>
            <span className="text-sm text-gray-600">67% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: '67%' }}
            />
          </div>
        </div>

        {/* Upload Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">
              Upload a photo of your dog (optional)
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Add a cute photo so we can personalize your experience.
            </p>
          </div>

          <div className="flex flex-col items-center mb-8">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <Card
              className="cursor-pointer border-dashed border-2 border-gray-300 hover:border-bhau transition rounded-lg p-6 w-full max-w-xs"
              onClick={() => fileInputRef.current?.click()}
            >
              <CardContent className="flex flex-col items-center">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Dog preview"
                      className="w-40 h-40 object-cover rounded-full mb-4"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeImage()
                      }}
                      className="absolute top-2 right-2"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">
                    <p className="mb-2">Click to upload</p>
                    <p className="text-xs">PNG, JPG, GIF</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
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
              className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
