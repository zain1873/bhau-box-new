// "use client"

// import Link from 'next/link';

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Bot, ChevronDown, ChevronLeft, ChevronRight, Heart, Menu, Play, Send, Stethoscope, X } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// // Import the new ProcessSection component
// import { useCallback } from "react";
// import ProcessSection from "./components/process-section";

// // Import form components
// import AdoptionDateStep from "@/components/adoption-date-step";
// import Checkout from "@/components/checkout";
// import ChoosePricingPlan from "@/components/choose-pricing-plan";
// import DogBreed from "@/components/dog-breed";
// import DogImageUpload from "@/components/dog-image-upload";
// import DogSizeSelector from "@/components/dog-size-selector";
// import FoodPreferences from "@/components/food-preferences";
// import IdentityForm from "@/components/identity-form";
// import ToySelector from "@/components/toy-selector";
// import YourEmail from "@/components/you-email";
// // import ThankYou from "@/components/thank-you"
// import DogConfirmationStep from "@/components/thank-you";
// // import { useSiteData } from "@/components/context/SiteDataContext"



// const scrollableSections = ["hero", "product", "upgrade", "process", "testimonials", "safety", "story", "aivet", "faq"]
// const formSections = [
//   "toy-selector",
//   "identity-form",
//   "dog-size-selector",
//   "dog-breed",
//   "adoption-date-step",
//   "food-preferences",
//   "dog-image-upload",
//   "you-email",
//   "choose-pricing-plan",
//   "checkout",
//   "thank-you"
// ]
// const allSections = [...scrollableSections, ...formSections]

// export default function BhauBoxWebsite() {
//   const [currentSection, setCurrentSection] = useState(0)
//   const [isInFormFlow, setIsInFormFlow] = useState(false)
//   // const { siteData, updateSiteData } = useSiteData()
//   // const [formData, setFormData] = useState({
//   //   toys: [],
//   //   plushToys: [],
//   //   dogName: '',
//   //   gender: '',
//   //   dogSize: '',
//   //   dogBreed: '',
//   //   adoptionDate: '',
//   //   foodPreferences: [],
//   //   dogImage: null,
//   //   email: '',
//   //   pricingPlan: '',
//   //   // Add more fields as needed
//   // })
  
//   const [formData, setFormData] = useState({
//   dogName: "",
//   gender: "",
//   dogSize: "",
//   dogBreeds: [],
//   dogBirthdate: "",
//   dogAllergies: [],
//   toy: "",
//   dogImage: null,
//   email: "",
//   pricingPlan: ""
// })

//   const [canScroll, setCanScroll] = useState(true)
//   const [isTransitioning, setIsTransitioning] = useState(false)
//   const [fadeClass, setFadeClass] = useState("opacity-100")
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [progress, setProgress] = useState(0)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const sectionRef = useRef<HTMLDivElement>(null)
//   const touchStartY = useRef<number>(0)
//   const touchEndY = useRef<number>(0)
  
//   useEffect(() => {
//     setIsInFormFlow(currentSection >= scrollableSections.length)
//   }, [currentSection])

//   // Preloader effect
//   useEffect(() => {
//     const progressInterval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(progressInterval)
//           return 100
//         }
//         return prev + 2 // Increment by 2% every 40ms (2000ms / 50 steps = 40ms)
//       })
//     }, 40)

//     const loadingTimer = setTimeout(() => {
//       setIsLoading(false)
//     }, 2000)

//     return () => {
//       clearInterval(progressInterval)
//       clearTimeout(loadingTimer)
//     }
//   }, [])

//   // Check if user has scrolled to bottom of current section
//   const isAtBottom = () => {
//     if (!sectionRef.current) return true
//     const { scrollTop, scrollHeight, clientHeight } = sectionRef.current
//     return scrollTop + clientHeight >= scrollHeight - 10 // 10px threshold
//   }

//   // Check if user is at top of current section
//   const isAtTop = () => {
//     if (!sectionRef.current) return true
//     return sectionRef.current.scrollTop <= 10 // 10px threshold
//   }

//   useEffect(() => {
//     if (isLoading || isInFormFlow) return // Don't set up scroll listeners while loading or in form

// const handleWheel = (e: WheelEvent) => {
//   if (isTransitioning || !canScroll) { // Add !canScroll check
//     e.preventDefault()
//     return
//   }

//   const direction = e.deltaY > 0 ? 1 : -1

//   if (currentSection < scrollableSections.length) {
//     if (direction > 0 && !isAtBottom()) {
//       return
//     }

//     if (direction < 0 && !isAtTop()) {
//       return
//     }

//     e.preventDefault()
//     const nextSection = currentSection + direction

//     if (nextSection >= 0 && nextSection < scrollableSections.length) {
//       setIsTransitioning(true)
//       setCanScroll(false) // Disable scrolling immediately
//       setFadeClass("opacity-0")

//       setTimeout(() => {
//         setCurrentSection(nextSection)
//         setFadeClass("opacity-100")
//         if (sectionRef.current) {
//           sectionRef.current.scrollTop = 0
//         }
//       }, 300)

//       setTimeout(() => {
//         setIsTransitioning(false)
//       }, 600)

//       // Add this new timeout for the 1-second scroll delay
//       setTimeout(() => {
//         setCanScroll(true)
//       }, 1600) // 600ms transition + 1000ms delay = 1600ms total
//     }
//   }
// }

//     const handleTouchStart = (e: TouchEvent) => {
//       touchStartY.current = e.touches[0].clientY
//     }

//     const handleTouchMove = (e: TouchEvent) => {
//       const currentY = e.touches[0].clientY
//       const deltaY = touchStartY.current - currentY

//       // If we're at the top and trying to scroll up, prevent default to stop pull-to-refresh
//       if (isAtTop() && deltaY < 0) {
//         e.preventDefault()
//       }

//       // If we're at the bottom and trying to scroll down, allow normal behavior
//       if (isAtBottom() && deltaY > 0) {
//         // Allow normal scrolling
//       }
//     }

// const handleTouchEnd = (e: TouchEvent) => {
//   if (isTransitioning || !canScroll) return // Add !canScroll check

//   touchEndY.current = e.changedTouches[0].clientY
//   const deltaY = touchStartY.current - touchEndY.current
//   const threshold = 50 // Minimum swipe distance

//   if (Math.abs(deltaY) > threshold) {
//     const direction = deltaY > 0 ? 1 : -1

//     // Check scroll position before allowing navigation
//     if (direction > 0 && !isAtBottom()) {
//       return
//     }

//     if (direction < 0 && !isAtTop()) {
//       return
//     }

//     const nextSection = currentSection + direction

//     if (nextSection >= 0 && nextSection < scrollableSections.length) {
//       setIsTransitioning(true)
//       setCanScroll(false) // Disable scrolling immediately
//       setFadeClass("opacity-0")

//       setTimeout(() => {
//         setCurrentSection(nextSection)
//         setFadeClass("opacity-100")
//         // Reset scroll position for new section
//         if (sectionRef.current) {
//           sectionRef.current.scrollTop = 0
//         }
//       }, 300)

//       setTimeout(() => {
//         setIsTransitioning(false)
//       }, 600)

//       // Add this new timeout for the 1-second scroll delay
//       setTimeout(() => {
//         setCanScroll(true)
//       }, 1600) // 600ms transition + 1000ms delay = 1600ms total
//     }
//   }
// }


//     const container = containerRef.current
//     if (container) {
//       container.addEventListener("wheel", handleWheel, { passive: false })
//       container.addEventListener("touchstart", handleTouchStart, { passive: true })
//       container.addEventListener("touchmove", handleTouchMove, { passive: false })
//       container.addEventListener("touchend", handleTouchEnd, { passive: true })
//     }

//     return () => {
//       if (container) {
//         container.removeEventListener("wheel", handleWheel)
//         container.removeEventListener("touchstart", handleTouchStart)
//         container.removeEventListener("touchmove", handleTouchMove)
//         container.removeEventListener("touchend", handleTouchEnd)
//       }
//     }
//   }, [currentSection, isTransitioning, isLoading, isInFormFlow, canScroll])

// const goToSection = (index: number) => {
//   if (isTransitioning || index === currentSection || !canScroll) return // Add !canScroll check

//   setIsTransitioning(true)
//   setCanScroll(false) // Disable scrolling immediately
//   setFadeClass("opacity-0")

//   setTimeout(() => {
//     setCurrentSection(index)
//     setFadeClass("opacity-100")
//     // Reset scroll position for new section
//     if (sectionRef.current) {
//       sectionRef.current.scrollTop = 0
//     }
//   }, 300)

//   setTimeout(() => {
//     setIsTransitioning(false)
//   }, 600)

//   // Add this new timeout for the 1-second scroll delay
//   setTimeout(() => {
//     setCanScroll(true)
//   }, 1600) // 600ms transition + 1000ms delay = 1600ms total
// }

// const goToNextFormStep = () => {
//   if (currentSection < allSections.length - 1 && canScroll) { // Add canScroll check
//     setIsTransitioning(true)
//     setCanScroll(false) // Disable scrolling immediately
//     setFadeClass("opacity-0")

//     setTimeout(() => {
//       setCurrentSection(currentSection + 1)
//       setFadeClass("opacity-100")
//     }, 300)

//     setTimeout(() => {
//       setIsTransitioning(false)
//     }, 600)

//     // Add this new timeout for the 1-second scroll delay
//     setTimeout(() => {
//       setCanScroll(true)
//     }, 1600) // 600ms transition + 1000ms delay = 1600ms total
//   }
// }

// const goToPreviousFormStep = () => {
//   if (currentSection > scrollableSections.length && canScroll) { // Add canScroll check
//     setIsTransitioning(true)
//     setCanScroll(false) // Disable scrolling immediately
//     setFadeClass("opacity-0")

//     setTimeout(() => {
//       setCurrentSection(currentSection - 1)
//       setFadeClass("opacity-100")
//     }, 300)

//     setTimeout(() => {
//       setIsTransitioning(false)
//     }, 600)

//     // Add this new timeout for the 1-second scroll delay
//     setTimeout(() => {
//       setCanScroll(true)
//     }, 1600) // 600ms transition + 1000ms delay = 1600ms total
//   }
// }

//   // Handle Get BhauBox button click
//   const handleGetBhauBox = () => {
//     // Jump to first form section
//     const firstFormIndex = scrollableSections.length
//     goToSection(firstFormIndex)
//   }




  
// const updateFormData = useCallback((field: string, value: any) => {
//   setFormData(prev => {
//     const updated = { ...prev, [field]: value }
//     console.log("📦 Full Form Data Snapshot:", updated)
//     return updated
//   })
// }, [])


//   // Update renderSection function
//   const renderSection = () => {
//     const sectionName = allSections[currentSection]
    
//     // Scrollable sections
//     switch (sectionName) {
//       case "hero":
//         return <HeroSection onGetStarted={handleGetBhauBox} />
//       case "product":
//         return <ProductSection />
//       case "upgrade":
//         return <UpgradeSection onClaimOffer={handleGetBhauBox} />
//       case "process":
//         return <ProcessSection />
//       case "testimonials":
//         return <TestimonialsSection />
//       case "safety":
//         return <SafetySection />
//       case "story":
//         return <OurStorySection />
//       case "aivet":
//         return <AIVetChatSection />
//       case "faq":
//         return <FAQSection />
      
//       // Form sections
//       case "toy-selector":
//         return <ToySelector 
//           formData={formData} 
//           updateFormData={updateFormData}
//           onNext={goToNextFormStep}
//           onBack={goToPreviousFormStep}
//         />
//       case "identity-form":
//         return <IdentityForm 
//           formData={formData} 
//           updateFormData={updateFormData}
//           onNext={goToNextFormStep}
//           onBack={goToPreviousFormStep}
//         />
//       case "dog-size-selector":
//         return <DogSizeSelector 
//           formData={formData} 
//           updateFormData={updateFormData}
//           onNext={goToNextFormStep}
//           onBack={goToPreviousFormStep}
//         />
//       case "dog-breed":
//         return <DogBreed 
//           formData={formData} 
//           updateFormData={updateFormData}
//           onNext={goToNextFormStep}
//           onBack={goToPreviousFormStep}
//         />
//       case "adoption-date-step":
//         return <AdoptionDateStep 
//           formData={formData} 
//           updateFormData={updateFormData}
//           onNext={goToNextFormStep}
//           onBack={goToPreviousFormStep}
//         />
//       case "food-preferences":
//         return <FoodPreferences 
//           formData={formData} 
//           updateFormData={updateFormData}
//           onNext={goToNextFormStep}
//           onBack={goToPreviousFormStep}
//         />
//       case "dog-image-upload":
//         return <DogImageUpload 
//           formData={formData} 
//           updateFormData={updateFormData}
//           onNext={goToNextFormStep}
//           onBack={goToPreviousFormStep}
//         />
//       case "you-email":
//         return <YourEmail 
//           formData={formData} 
//           updateFormData={updateFormData}
//           onNext={goToNextFormStep}
//           onBack={goToPreviousFormStep}
//         />
//       case "choose-pricing-plan":
//         return <ChoosePricingPlan 
//           formData={formData} 
//           updateFormData={updateFormData}
//           onNext={goToNextFormStep}
//           onBack={goToPreviousFormStep}
//         />
//       case "checkout":
//         return <Checkout 
//           formData={formData} 
//           updateFormData={updateFormData}
//           onNext={goToNextFormStep}
//           onBack={goToPreviousFormStep}
//         />
//       // case "thank-you":
//       //   return <ThankYou formData={formData} />

//       case "thank-you":
//   return (
//     <DogConfirmationStep 
//       formData={formData} 
//       onAccountClick={() => {
//         // logic to redirect or go to dashboard
//         console.log("Go to account clicked!")
//       }} 
//     />
//   )

//       default:
//         return <HeroSection onGetStarted={handleGetBhauBox} />
//     }
//   }
  

//   // Show preloader
//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
//         {/* Logo */}
//         <div className="mb-8 sm:mb-12 lg:mb-16 animate-pulse">
//           <img
//             src="/images/bhau-box-logo-new.png"
//             alt="BHAU BOX"
//             className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto mx-auto"
//             onClick={() => window.location.reload()}
//           />
//         </div>

//         {/* Loading Text */}
//         <div className="mb-6 sm:mb-8 text-center">
//           <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-bhau mb-2 sm:mb-3">
//             Loading BhauBox 🐕
//           </h2>
//           <p className="text-sm sm:text-base md:text-lg text-gray-600">Preparing pawsome content for you...</p>
//         </div>

//         {/* Progress Bar Container */}
//         <div className="w-64 sm:w-80 md:w-96 lg:w-[28rem] mx-auto">
//           {/* Progress Bar Background */}
//           <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 lg:h-4 mb-3 sm:mb-4">
//             {/* Progress Bar Fill */}
//             <div
//               className="bg-gradient-to-r from-bhau to-blue-400 h-full rounded-full transition-all duration-100 ease-out relative overflow-hidden"
//               style={{ width: `${progress}%` }}
//             >
//               {/* Animated shine effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
//             </div>
//           </div>

//           {/* Progress Percentage */}
//           <div className="text-center">
//             <span className="text-xs sm:text-sm md:text-base font-semibold text-bhau">{Math.round(progress)}%</span>
//           </div>
//         </div>

//         {/* Loading Dots */}
//         <div className="flex space-x-1 sm:space-x-2 mt-6 sm:mt-8">
//           <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-bhau to-blue-400 rounded-full animate-bounce"></div>
//           <div
//             className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-bhau to-blue-400 rounded-full animate-bounce"
//             style={{ animationDelay: "0.1s" }}
//           ></div>
//           <div
//             className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-bhau to-blue-400 rounded-full animate-bounce"
//             style={{ animationDelay: "0.2s" }}
//           ></div>
//         </div>

//         {/* Fun Loading Messages */}
//         <div className="mt-6 sm:mt-8 text-center">
//           <p className="text-xs sm:text-sm text-gray-500 animate-pulse">
//             {progress < 25 && "Fetching the best toys... 🧸"}
//             {progress >= 25 && progress < 50 && "Selecting healthy treats... 🍖"}
//             {progress >= 50 && progress < 75 && "Preparing your box... 📦"}
//             {progress >= 75 && "Almost ready to play! 🎾"}
//           </p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div ref={containerRef} className="h-screen overflow-hidden relative no-pull-refresh">
//       {/* Fixed Navigation Bar - Always Visible */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md shadow-sm">
//         <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
//           <div className="max-w-7xl mx-auto">
//             {/* Mobile Layout */}
//             <div className="lg:hidden flex items-center justify-between">
//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="text-gray-700 hover:text-blue-600 transition-colors p-2"
//               >
//                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>


//         {/* Centered Logo - Mobile */}
//         <div className="flex-1 flex justify-center">
//           <img 
//             src="/images/bhau-box-logo-new.png" 
//             alt="BHAU BOX" 
//             className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity" 
//             onClick={() => window.location.reload()}
//           />
//         </div>

//               {/* Spacer for balance */}
//               <div className="w-10"></div>
//             </div>

//             {/* Desktop Layout */}
//             <div className="hidden lg:flex items-center justify-between">
//             {/* Desktop Layout */}
//             <div className="hidden lg:flex items-center justify-between">
//               <div className="flex items-center space-x-8">
//                 <div className="flex items-center">
//                   <img 
//                     src="/images/bhau-box-logo-new.png" 
//                     alt="BHAU BOX" 
//                     className="h-12 w-auto cursor-pointer" 
//                     onClick={() => window.location.reload()}
//                   />
//                 </div>
//               </div>
//             </div>
//               {/* Desktop Menu */}
//               <div className="flex items-center space-x-4">
//                 <button className="text-bhau hover:text-blue-600 transition-colors">Get help 🎧</button>
//             <Link href="/login">
//               <Button className="bg-bhau rounded-full hover:bg-blue-700 text-white px-6 transition-colors">
//                 Login
//               </Button>
//             </Link>
         
//                 <Button onClick={handleGetBhauBox} className="bg-bhau rounded-full hover:bg-blue-700 text-white px-6 transition-colors">GET BHAUBOX</Button>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {mobileMenuOpen && (
//             <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
//               <div className="pt-4 space-y-4">
//                 <hr className="border-gray-200" />
//                 <button className="block w-full text-left text-bhau hover:text-blue-600 transition-colors py-2">
//                   Get help 🎧
//                 </button>
//                   <Link href="/login">
//                   <Button className="w-full bg-bhau rounded-full hover:bg-blue-700 text-white transition-colors mt-4">
//                     Login
//                   </Button>
//                 </Link>
//                 <Button onClick={handleGetBhauBox} className="w-full bg-bhau rounded-full hover:bg-blue-700 text-white transition-colors mt-4">
//                   GET BHAUBOX
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Line Progress Indicator - Hidden on Mobile and in form flow */}
//       {!isInFormFlow && (
//         <div className="hidden lg:block fixed right-4 xl:right-8 top-1/2 transform -translate-y-1/2 z-40">
//           <div className="relative">
//             <div className="w-1 h-32 lg:h-48 bg-gray-300 rounded-full"></div>
//             <div
//               className="absolute top-0 w-1 bg-bhau rounded-full transition-all duration-300"
//               style={{ height: `${((currentSection + 1) / scrollableSections.length) * 100}%` }}
//             ></div>
//             <div
//               className="absolute w-3 h-3 bg-bhau rounded-full -left-1 transition-all duration-300"
//               style={{ top: `${(currentSection / (scrollableSections.length - 1)) * (192 - 12)}px` }}
//             ></div>
//           </div>
//         </div>
//       )}

//       {/* Floating Get BhauBox Pill - Hide when in form flow */}
//       {!isInFormFlow && (
//         <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50">
//           <Button 
//             onClick={handleGetBhauBox}
//             className="bg-bhau hover:bg-blue-700 text-white px-10 py-10 sm:px-12 sm:py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-base sm:text-lg"
//           >
//             Get BhauBox!
//           </Button>
//         </div>
//       )}

//       {/* Main Content */}
//       <div ref={sectionRef} className={`h-full transition-opacity duration-300 ${fadeClass} overflow-y-auto`}>
//         {renderSection()}
//       </div>
//     </div>
//   )
// }

// // Update HeroSection to accept props
// function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden pt-20 sm:pt-24 lg:pt-28">
//       {/* Background Video */}
//       <div className="absolute inset-0 z-0">
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="w-full h-full object-cover"
//           style={{ filter: "brightness(0.7)" }}
//         >
//           <source src="/Hero-Video.mp4" type="video/mp4" />
//           {/* Fallback background */}
//           <div className="w-full h-full bg-white"></div>
//         </video>
//         {/* Video overlay */}
//         <div className="absolute inset-0 bg-transparent"></div>
//       </div>

//       {/* Animated Dog Elements - Reduced */}
//       <div className="absolute inset-0 z-10 pointer-events-none">
//         <div className="absolute top-1/4 left-4 sm:left-10 text-4xl sm:text-6xl opacity-20">🐕‍🦺</div>
//         <div className="absolute top-1/3 right-4 sm:right-20 text-3xl sm:text-5xl opacity-30">🐾</div>
//         <div className="absolute bottom-1/4 left-1/4 text-2xl sm:text-4xl opacity-25">🦴</div>
//         <div className="absolute top-1/2 right-1/4 text-xl sm:text-3xl opacity-20">🎾</div>
//       </div>

//       {/* Hero Content */}
//       <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen relative z-20 pb-20">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
//           <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
//             <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-bhau leading-tight">
//               The Perfect Box for Your Perfect Pup! 🐕
//             </h1>
//             <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed max-w-2xl mx-auto lg:mx-0">
//               Every month, we deliver 2 original toys, 2 bags of healthy treats, and a chew - all customized for your
//               dog's size and preferences.
//             </p>
//             <Button
//               size="lg"
//               onClick={onGetStarted}
//               className="bg-bhau rounded-full hover:bg-blue-700 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 shadow-lg"
//             >
//               Get Started!
//             </Button>
//           </div>
//           <div className="relative order-first lg:order-last">
//             <div className="bg-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-8">
//               <img
//                 src="/heropic.png?height=400&width=600"
//                 alt="Happy dog with BhauBox toys and treats"
//                 className="w-full h-auto rounded-lg sm:rounded-xl lg:rounded-2xl"
//               />
//               {/* Floating elements - Reduced */}
//               <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg sm:text-2xl">❤️</div>
//               <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 text-lg sm:text-2xl">🐾</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator - Hidden on Mobile */}
//       <div className="hidden lg:block absolute bottom-8 left-8 text-center z-20">
//         <div className="text-white/80">
//           <ChevronDown size={32} />
//           <p className="text-sm mt-2">Scroll for more pawsome content!</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// function ProductSection() {
//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-20">
//       <div className="max-w-7xl mx-auto text-center">
//         <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-bhau mb-6 sm:mb-8 lg:mb-16">
//           {"WHAT'S IN A BHAUBOX?"} 
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start mb-6 sm:mb-8 lg:mb-12">
          
//           {/* Plush Toys Section */}
//           <div className="space-y-4 lg:space-y-6">
//             <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
//               plushies
//               <br />
//               your doggy
//               <br />
//               will lovies
//             </div>
            
//             {/* Two plush toy images */}
//             <div className="flex justify-center gap-4">
//               <div className="relative group">
//                 <img
//                   src="/plush1.png?height=150&width=150&text=Pirate+Bear"
//                   alt="Pirate bear plush toy"
//                   className="w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 object-contain spin-on-hover"
//                 />
//                 <div className="absolute -top-1 -right-1 text-xs sm:text-sm"></div>
//               </div>
//               <div className="relative group">
//                 <img
//                   src="/plush2.png?height=150&width=150&text=Treasure+Chest"
//                   alt="Treasure chest plush toy"
//                   className="w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 object-contain spin-on-hover"
//                 />
//                 <div className="absolute -top-1 -right-1 text-xs sm:text-sm"></div>
//               </div>
//             </div>
            
//             <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-bhau">2 Plush Toys</h3>
//             <div className="text-xs sm:text-sm text-gray-600">
//               HAVE A
//               <br />
//               PLUSHIE
//               <br />
//               DAY!
//             </div>
//           </div>

//           {/* Center Badge */}
//           <div className="relative order-first md:order-none">
//             <div className="bg-bhau text-white rounded-full p-3 sm:p-4 lg:p-8 text-center font-bold text-xs sm:text-sm lg:text-lg transform rotate-12 max-w-32 sm:max-w-40 lg:max-w-48 mx-auto">
//               NEW ✨
//               <br />
//               STYLES EVERY
//               <br />
//               MONTH! 🗓️
//             </div>
//           </div>

//           {/* Chew Toys Section */}
//           <div className="space-y-4 lg:space-y-6">
//             <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
//               TOUGH &
//               <br />
//               DURABLE
//               <br />
//               ADVENTURE 🦴
//             </div>
            
//             {/* One chew toy image */}
//             <div className="relative group">
//               <img
//                 src="/chew.png?height=180&width=180&text=Rope+Toy"
//                 alt="Rope chew toy"
//                 className="w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 mx-auto object-contain spin-on-hover"
//               />
//               <div className="absolute -top-1 -right-1 text-xs sm:text-sm">🦴</div>
//             </div>
            
//             <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-bhau">1 Chew Toy</h3>
//             <div className="text-xs sm:text-sm text-gray-600">
//               BUILT FOR
//               <br />
//               SERIOUS
//               <br />
//               CHOMPERS! 💪
//             </div>
//           </div>
//         </div>

//         {/* Treats Section - Full Width */}
//         <div className="mb-8 lg:mb-12">
//           <div className="space-y-4 lg:space-y-6">
//             <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-bhau">
//               2 Bags of Healthy Treats 🥨
//             </h3>
            
//             {/* Two treat bag images */}
//             <div className="flex justify-center gap-6 lg:gap-8">
//               <div className="relative group">
//                 <img
//                   src="/treat1.png?height=120&width=180&text=Beef+Treats"
//                   alt="Beef treat bag"
//                   className="w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-32 object-contain spin-on-hover"
//                 />
//                 <div className="absolute -top-1 -left-1 text-xs sm:text-sm"></div>
//               </div>
//               <div className="relative group">
//                 <img
//                   src="/treat2.png?height=120&width=180&text=Chicken+Treats"
//                   alt="Chicken treat bag"
//                   className="w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-32 object-contain spin-on-hover"
//                 />
//                 <div className="absolute -top-1 -left-1 text-xs sm:text-sm"></div>
//               </div>
//             </div>
            
//             <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
//               ALL-NATURAL 🌱<br />
//               MADE IN PAKISTAN
//             </div>
//           </div>
//         </div>


//       </div>
      
//       <style jsx>{`
//         .spin-on-hover {
//           transition: transform 0.3s ease;
//         }
        
//         .spin-on-hover:hover {
//           animation: spinOnce 1s ease-in-out;
//         }
        
//         @keyframes spinOnce {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// // Update UpgradeSection to accept props
// function UpgradeSection({ onClaimOffer }: { onClaimOffer: () => void }) {
//   return (
//     <div className="min-h-screen bg-white pt-24 sm:pt-28 lg:pt-32 pb-20">
//       <div className="h-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
//           <div className="text-center lg:text-left space-y-3 sm:space-y-4 lg:space-y-6">
//             <p className="text-sm sm:text-base lg:text-lg text-bhau font-medium">Plus, get</p>
//             <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-bhau leading-tight">
//               16% OFF
//               <br />
//               ON
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl text-bhau font-medium"> your first BHAU BOX</p>
//             <Button
//               size="lg"
//               onClick={onClaimOffer}
//               className="bg-bhau hover:bg-blue-700 rounded-full text-white px-6 sm:px-8 lg:px-12 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold mt-4 sm:mt-6 lg:mt-8 transition-all duration-300 shadow-lg"
//             >
//               CLAIM OFFER!
//             </Button>
//           </div>
//           <div className="relative order-first lg:order-last">
//             <div className="absolute -top-1 sm:-top-2 lg:-top-4 -right-1 sm:-right-2 lg:-right-4 bg-bhau text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1 lg:py-2 rounded-full font-bold text-xs sm:text-sm transform rotate-12">
//               16% OFF 
//               <br />& TREATS 🎾
//             </div>
//             <img
//               src="/heropic.png?height=300&width=400"
//               alt="Dog with BhauBox and toys"
//               className="w-full h-auto rounded-lg sm:rounded-xl lg:rounded-2xl hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="h-1/2 bg-blue-50 flex items-center justify-center px-4 py-9 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 lg:space-y-8">
//           <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">HOW WE MAKE DOGS HAPPY</h3>
//           <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
//             We believe dog happiness is serious business. {"Here's"} how we deliver it right to your door, every month.
//           </p>
//           <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">PERSONALIZED JUST FOR YOUR PUP</h3>
//           <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
//             Every box is tailored to your dog's unique play style, size, and preferences—because no two tails wag the same.
//           </p>
//           <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">NEW TOYS & TREATS EVERY MONTH</h3>
//           <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
//             Each month brings an all-new theme with original toys, healthy treats, and chews designed to surprise and delight.
//           </p>
//           <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">DESIGNED BY DOG EXPERTS</h3>
//           <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
//             Our toys are play-tested by real dogs (and approved by humans) to make sure they're fun, safe, and built for endless tail wags.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Keep all other component sections below (TestimonialsSection, SafetySection, etc.)
// // ... [Insert all other component functions here from your original code]

// function TestimonialsSection() {
//   const [currentIndex, setCurrentIndex] = useState(0);
  
//   const testimonials = [
//     {
//       name: "GOLDIE",
//       image: "/t1.png?height=300&width=300",
//       quote:
//         "Goldie likes BhauBox so much that she now thinks every box that's delivered is for her. It's not, but try explaining that to someone who needs to squeak and chew all. the. time.",
//       author: "- GOLDIE & WALDO",
//       emoji: "🐕‍🦺",
//     },
//     {
//       name: "Cashew",
//       image: "/t2.png?height=300&width=300",
//       quote:
//         "Cashew loves the multi-part, multi-texture toys for snuffling, crinkling, and hunting down treats. I love the toys because they make me laugh.",
//       author: "- CASHEW & MADDIE",
//       emoji: "🦮",
//     },
//     {
//       name: "Mac",
//       image: "/t3.png?height=300&width=300",
//       quote:
//         "Mac's toys are tailored to his size, so I feel good knowing they're safe and thoughtfully designed for him. He proudly opens his box in our lobby, and sometimes (sometimes) shares with a lucky neighbor.",
//       author: "- MACARONI & BRIANNA",
//       emoji: "🐕",
//     },
//     {
//       name: "Luna",
//       image: "/t4.png?height=300&width=300",
//       quote:
//         "Luna goes absolutely bonkers for her monthly BhauBox! She's learned to recognize the delivery truck and starts doing zoomies around the house. The best part? Everything is perfectly sized for her tiny paws.",
//       author: "- LUNA & MARCUS",
//       emoji: "🐕‍🦺",
//     },
//     {
//       name: "Biscuit",
//       image: "/t5.png?height=300&width=300",
//       quote:
//         "Biscuit used to destroy his toys in minutes, but BhauBox toys are built tough! Now he actually plays with them for weeks. My wallet and my vacuum cleaner are both grateful.",
//       author: "- BISCUIT & SARAH",
//       emoji: "🦴",
//     },
//     {
//       name: "Pepper",
//       image: "/t6.png?height=300&width=300",
//       quote:
//         "Pepper is the pickiest dog I know, but somehow BhauBox always knows exactly what she wants. It's like they have a direct line to her doggy brain. She gives every toy four paws up!",
//       author: "- PEPPER & JAMES",
//       emoji: "🐾",
//     },
//     {
//       name: "Rocco",
//       image: "/t7.png?height=300&width=300",
//       quote:
//         "Rocco thinks he's a fierce guard dog, but he turns into a playful puppy the moment his BhauBox arrives. Watching him gently carry each toy to his favorite spot is pure joy.",
//       author: "- ROCCO & ELENA",
//       emoji: "🐕",
//     },
//   ];

//   const itemsToShow = 3;
//   const totalItems = testimonials.length;

//   // Auto-scroll functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
//     }, 4000); // Change every 4 seconds

//     return () => clearInterval(interval);
//   }, [totalItems]);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
//   };

//   // Get visible testimonials (3 at a time, wrapping around)
//   const getVisibleTestimonials = () => {
//     const visible = [];
//     for (let i = 0; i < itemsToShow; i++) {
//       const index = (currentIndex + i) % totalItems;
//       visible.push(testimonials[index]);
//     }
//     return visible;
//   };

//   const visibleTestimonials = getVisibleTestimonials();
//   const currentSet = Math.floor(currentIndex / itemsToShow) + 1;
//   const totalSets = Math.ceil(totalItems / itemsToShow);

//   return (
//     <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-20">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau mb-3 sm:mb-4">
//           SOME NICE THINGS DOGS HAVE SAID ABOUT US
//         </h2>
//         <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 sm:mb-8 lg:mb-12 max-w-3xl mx-auto">
//           {"There's"} no better feeling than when a dog likes you. And since 2012, {"we've"} made over 6,000,000 dogs
//           like us. See what the pups in our pack are barking about. 🎉
//         </p>

//         {/* Carousel Container */}
//         <div className="relative overflow-hidden mb-4 sm:mb-6 lg:mb-8">
//           <div 
//             className="flex transition-transform duration-700 ease-in-out"
//             style={{ transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)` }}
//           >
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={`${testimonial.name}-${index}`}
//                 className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3 lg:px-4"
//               >
//                 <Card className="bg-gradient-to-r from-bhau to-blue-400 text-white border-none hover:scale-105 transition-transform duration-300 h-full">
//                   <CardContent className="p-3 sm:p-4 lg:p-6 relative h-full flex flex-col">
//                     <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg sm:text-2xl">
//                       {testimonial.emoji}
//                     </div>
//                     <img
//                       src={testimonial.image || "/placeholder.svg"}
//                       alt={testimonial.name}
//                       className="w-full h-24 sm:h-32 lg:h-48 object-cover rounded-lg mb-3 sm:mb-4 hover:scale-110 transition-transform duration-300"
//                     />
//                     <blockquote className="text-xs sm:text-sm mb-3 sm:mb-4 italic flex-grow">
//                       "{testimonial.quote}"
//                     </blockquote>
//                     <p className="text-xs font-semibold mt-auto">{testimonial.author}</p>
//                     <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 text-lg sm:text-xl">❤️</div>
//                   </CardContent>
//                 </Card>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation Controls */}
//         <div className="flex items-center justify-center space-x-4 mb-4 sm:mb-6 lg:mb-8">
//           <button 
//             onClick={prevSlide}
//             className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
//           >
//             <ChevronLeft size={16} className="sm:w-5 sm:h-5 text-blue-600" />
//           </button>
          
//           {/* Dots Indicator */}
//           <div className="flex space-x-2">
//             {Array.from({ length: totalItems }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                   index === currentIndex ? 'bg-bhau w-8' : 'bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
          
//           <button 
//             onClick={nextSlide}
//             className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
//           >
//             <ChevronRight size={16} className="sm:w-5 sm:h-5 text-blue-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SafetySection() {
//   return (
//     <div className="min-h-screen bg-white flex flex-col pt-24 sm:pt-28 lg:pt-32 pb-20">
//       <div className="flex-1 bg-blue-50">
//         {/* Safety Section */}
//         <div className="h-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 lg:space-y-8">
//             <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">
//               THE LEADER IN DOG TOY SAFETY 🛡️🐕
//             </h2>
//             <div className="space-y-2 sm:space-y-3 lg:space-y-4">
//               <p className="text-sm sm:text-base lg:text-lg text-gray-700">
//                 Did you know there are no safety standards for dog toys? 😱
//               </p>
//               <p className="text-sm sm:text-base lg:text-lg text-gray-700">
//                 {"Don't"} worry, {"we're"} fixing that. We put every BHAU toy to the test in our state-of-the-art lab to
//                 ensure it meets the highest safety requirements. 🔬✅
//               </p>
//             </div>

//             {/* Video Placeholder */}
//             <div className="relative bg-gray-200 rounded-lg overflow-hidden max-w-2xl mx-auto hover:scale-105 transition-transform duration-300">
//               <img
//                 src="/unboxbuddy.png?height=300&width=500"
//                 alt="BARK Safety Lab video"
//                 className="w-full h-32 sm:h-48 lg:h-64 object-cover"
//               />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <button className="bg-gradient-to-r from-bhau to-blue-400 text-white rounded-full p-2 sm:p-3 lg:p-4 hover:bg-blue-700 transition-all duration-300">
//                   <Play size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
//                 </button>
//               </div>
//               <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg sm:text-2xl">🎬</div>
//             </div>
//           </div>
//         </div>

//         {/* Support Section */}
//         <div className="h-1/2 bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 lg:space-y-8">
//             <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">OUR PACK HAS YOUR BACK 🐕‍🦺❤️</h2>
//             <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
//               If your pup {"isn't"} 100% happy, then {"we'll"} work with you to make it right. In case it {"wasn't"}{" "}
//               obvious, {"we're"} kiiind of obsessed with dogs. 🥰🐕
//             </p>

//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-bhau to-blue-400 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-12 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 shadow-lg"
//             >
//               CHAT WITH US NOW 💬
//             </Button>

//             <div className="relative bg-gray-200 rounded-lg overflow-hidden max-w-2xl mx-auto hover:scale-105 transition-transform duration-300">
//               <img
//                 src="/unboxbuddy.png?height=300&width=500"
//                 alt="BARK Safety Lab video"
//                 className="w-full h-32 sm:h-48 lg:h-64 object-cover"
//               />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <button className="bg-gradient-to-r from-bhau to-blue-400 text-white rounded-full p-2 sm:p-3 lg:p-4 hover:bg-blue-700 transition-all duration-300">
//                   <Play size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
//                 </button>
//               </div>
//               <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg sm:text-2xl">🎬</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function OurStorySection() {
//   return (
//     <div className="min-h-screen bg-blue-50 pt-24 sm:pt-28 lg:pt-32 pb-20">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
//         {/* Header */}
//         <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//           <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-bhau mb-4 sm:mb-6">OUR STORY 📖✨</h2>
//           <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto">
//             From a simple idea to making millions of dogs happy worldwide - {"here's"} how BhauBox became the{" "}
//             {"world's"} most beloved dog subscription box! 🌍🐕❤️
//           </p>
//         </div>

//         {/* Timeline */}
//         <div className="space-y-8 sm:space-y-12 lg:space-y-16">
//           {/* 2012 - The Beginning */}
//           <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
//             <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
//               <div className="inline-block bg-bhau text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
//                 2012 🚀
//               </div>
//               <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau">The Spark of an Idea 💡</h3>
//               <p className="text-sm sm:text-base text-gray-700">
//                 It all started when our founder, Matt, couldn{"'t"} find quality toys for his rescue dog, Bark.
//                 Frustrated by flimsy, unsafe toys, he decided to create something better. The mission was simple: make
//                 dogs happier, one box at a time! 🎯🐕
//               </p>
//             </div>
//             <div className="relative order-first lg:order-last">
//               <img
//                 src="/placeholder.svg?height=300&width=400"
//                 alt="Founder with rescue dog Bark"
//                 className="w-full h-auto rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute -top-2 -right-2 text-2xl">🏠</div>
//               <div className="absolute -bottom-2 -left-2 text-2xl">🐕</div>
//             </div>
//           </div>

//           {/* 2015 - Growth */}
//           <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
//             <div className="relative">
//               <img
//                 src="/placeholder.svg?height=300&width=400"
//                 alt="BhauBox team packing boxes"
//                 className="w-full h-auto rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute -top-2 -left-2 text-2xl">📦</div>
//               <div className="absolute -bottom-2 -right-2 text-2xl">👥</div>
//             </div>
//             <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
//               <div className="inline-block bg-bhau text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
//                 2015 📈
//               </div>
//               <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau">Growing the Pack 🌱</h3>
//               <p className="text-sm sm:text-base text-gray-700">
//                 From a garage operation to a real warehouse! We hit 10,000 subscribers and realized we were onto
//                 something special. Dogs across the country were wagging their tails, and their humans were sharing the
//                 joy on social media. 📱✨
//               </p>
//             </div>
//           </div>

//           {/* 2018 - Innovation */}
//           <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
//             <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
//               <div className="inline-block bg-bhau text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
//                 2018 🔬
//               </div>
//               <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau">Safety First Innovation 🛡️</h3>
//               <p className="text-sm sm:text-base text-gray-700">
//                 We opened our state-of-the-art safety lab - the first of its kind in the pet industry! Every toy now
//                 goes through rigorous testing because we believe every dog deserves safe, high-quality playtime. 🧪✅
//               </p>
//             </div>
//             <div className="relative order-first lg:order-last">
//               <img
//                 src="/placeholder.svg?height=300&width=400"
//                 alt="Safety lab with testing equipment"
//                 className="w-full h-auto rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute -top-2 -right-2 text-2xl">🔬</div>
//               <div className="absolute -bottom-2 -left-2 text-2xl">✅</div>
//             </div>
//           </div>

//           {/* 2020 - Pandemic Heroes */}
//           <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
//             <div className="relative">
//               <img
//                 src="/placeholder.svg?height=300&width=400"
//                 alt="Dogs playing during pandemic"
//                 className="w-full h-auto rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute -top-2 -left-2 text-2xl">🏠</div>
//               <div className="absolute -bottom-2 -right-2 text-2xl">❤️</div>
//             </div>
//             <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
//               <div className="inline-block bg-bhau text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
//                 2020 🦸‍♂️
//               </div>
//               <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau">Pandemic Heroes 🦸‍♀️</h3>
//               <p className="text-sm sm:text-base text-gray-700">
//                 When the world stayed home, dogs became our greatest companions. BhauBox became more than a subscription
//                 - it was a monthly dose of joy during uncertain times. We helped millions of families bond with their
//                 furry friends! 🏠💕
//               </p>
//             </div>
//           </div>

//           {/* 2024 - Today */}
//           <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
//             <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
//               <div className="inline-block bg-bhau text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
//                 2024 🌟
//               </div>
//               <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau">
//                 6 Million Happy Dogs & Counting! 🎉
//               </h3>
//               <p className="text-sm sm:text-base text-gray-700">
//                 Today, {"we're"} proud to have made over 6 million dogs happy worldwide! With AI-powered vet
//                 consultations, personalized boxes, and the same commitment to safety and quality that started it all.
//                 The best is yet to come! 🚀🌈
//               </p>
//             </div>
//             <div className="relative order-first lg:order-last">
//               <img
//                 src="/placeholder.svg?height=300&width=400"
//                 alt="Happy dogs around the world with BhauBox"
//                 className="w-full h-auto rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute -top-2 -right-2 text-2xl">🌍</div>
//               <div className="absolute -bottom-2 -left-2 text-2xl">🎉</div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg">
//           <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-bhau mb-6 sm:mb-8 lg:mb-12">
//             BY THE NUMBERS 📊
//           </h3>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//             <div className="text-center">
//               <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">6M+</div>
//               <div className="text-sm sm:text-base text-gray-600">Happy Dogs 🐕</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">12</div>
//               <div className="text-sm sm:text-base text-gray-600">Years of Joy 🎂</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">500+</div>
//               <div className="text-sm sm:text-base text-gray-600">Original Toys 🧸</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">50</div>
//               <div className="text-sm sm:text-base text-gray-600">Countries 🌍</div>
//             </div>
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="text-center mt-8 sm:mt-12 lg:mt-16">
//           <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-4 sm:mb-6">
//             READY TO JOIN OUR STORY? 📝✨
//           </h3>
//           <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
//             {"Let's"} write the next chapter together - with your pup as the star! 🌟🐕
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// function AIVetChatSection() {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       sender: "vet",
//       message:
//         "Hello! I'm Dr. Paws, your AI veterinarian! 🩺 I've reviewed Goldie's profile and I'm here to help with any questions about his health, behavior, or care. What would you like to discuss today?",
//       time: "2:30 PM",
//     },
//   ])
//   const [newMessage, setNewMessage] = useState("")
//   const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false)

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const userMessage = {
//         id: messages.length + 1,
//         sender: "user",
//         message: newMessage,
//         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       }

//       setMessages([...messages, userMessage])
//       setNewMessage("")
      
//       // Show subscription popup instead of AI response
//       setShowSubscriptionPopup(true)
//     }
//   }

//   const closeSubscriptionPopup = () => {
//     setShowSubscriptionPopup(false)
//   }

//   const handleGetBHAUBOX = () => {
//     // Add your subscription logic here
//     console.log("Redirecting to BHAUBOX subscription...")
//     // You can add navigation logic here
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 pt-24 sm:pt-28 lg:pt-32 pb-20 relative">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
//         {/* Header */}
//         <div className="text-center mb-6 sm:mb-8">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-3 sm:mb-4">AI VET CHAT 🩺</h2>
//           <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto">
//             Chat with Dr. Paws - your personal AI veterinarian! Get instant answers about your dog's health, behavior,
//             and care. 🐕❤️
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-4 gap-6 sm:gap-8 h-[calc(100vh-300px)] min-h-[500px]">
//           {/* Dog Profile Card */}
//           <div className="lg:col-span-1">
//             <Card className="h-full bg-white shadow-lg">
//               <CardContent className="p-4 sm:p-6 h-full flex flex-col">
//                 <div className="text-center mb-4 sm:mb-6">
//                   <div className="relative inline-block">
//                     <img
//                       src="/pickbudplan.png?height=120&width=120"
//                       alt="Buddy the Golden Retriever"
//                       className="w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 rounded-full mx-auto object-cover border-4 border-blue-200"
//                     />
//                     <div className="absolute -bottom-1 -right-1 bg-bhau text-white rounded-full p-1">
//                       <Heart size={12} className="sm:w-4 sm:h-4" />
//                     </div>
//                   </div>
//                   <h3 className="text-lg sm:text-xl font-bold text-bhau mt-3 sm:mt-4">Goldie</h3>
//                   <p className="text-xs sm:text-sm text-gray-600">Labrador • 6 years old</p>
//                 </div>

//                 <div className="space-y-3 sm:space-y-4 flex-1">
//                   <div className="flex items-center justify-between text-xs sm:text-sm">
//                     <span className="text-gray-600">Weight:</span>
//                     <span className="font-semibold">65 lbs</span>
//                   </div>
//                   <div className="flex items-center justify-between text-xs sm:text-sm">
//                     <span className="text-gray-600">Activity Level:</span>
//                     <span className="font-semibold text-lime-400">High 🏃‍♂️</span>
//                   </div>
//                   <div className="flex items-center justify-between text-xs sm:text-sm">
//                     <span className="text-gray-600">Allergies:</span>
//                     <span className="font-semibold">None</span>
//                   </div>
//                   <div className="flex items-center justify-between text-xs sm:text-sm">
//                     <span className="text-gray-600">Last Checkup:</span>
//                     <span className="font-semibold">March 2025 ✅</span>
//                   </div>
//                 </div>

//                 <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <Stethoscope size={16} className="text-bhau mr-2" />
//                     <span className="text-xs sm:text-sm font-semibold text-bhau">Health Status</span>
//                   </div>
//                   <p className="text-xs sm:text-sm text-gray-700">
//                     Excellent health! Up to date on all vaccinations. 💚
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Chat Interface */}
//           <div className="lg:col-span-3">
//             <Card className="h-full bg-white shadow-lg flex flex-col">
//               {/* Chat Header */}
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <div className="flex items-center">
//                   <div className="relative">
//                     <div className="w-10 sm:w-12 h-10 sm:h-12 bg-bhau rounded-full flex items-center justify-center">
//                       <Bot size={20} className="sm:w-6 sm:h-6 text-white" />
//                     </div>
//                     <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-bhau rounded-full border-2 border-white"></div>
//                   </div>
//                   <div className="ml-3 sm:ml-4">
//                     <h3 className="text-sm sm:text-base font-bold text-gray-800">Dr. Paws 🩺</h3>
//                     <p className="text-xs sm:text-sm text-bhau">AI Veterinarian • Online</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Chat Messages */}
//               <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
//                 <div className="space-y-3 sm:space-y-4">
//                   {messages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//                     >
//                       <div
//                         className={`max-w-xs sm:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
//                           message.sender === "user" ? "bg-bhau text-white" : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         <p className="text-xs sm:text-sm">{message.message}</p>
//                         <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-200" : "text-gray-500"}`}>
//                           {message.time}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Chat Input */}
//               <div className="p-4 sm:p-6 border-t border-gray-200">
//                 <div className="flex space-x-2 sm:space-x-4">
//                   <Input
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Ask Dr. Paws anything about Goldie... 🐕"
//                     className="flex-1 text-xs sm:text-sm"
//                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                   />
//                   <Button
//                     onClick={handleSendMessage}
//                     className="bg-bhau hover:bg-bhau text-white px-3 sm:px-4 py-2"
//                   >
//                     <Send size={16} className="sm:w-5 sm:h-5" />
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>

//         {/* Features */}
//         <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           <div className="bg-white p-3 sm:p-4 rounded-lg shadow text-center">
//             <div className="text-2xl sm:text-3xl mb-2">🕐</div>
//             <h4 className="text-xs sm:text-sm font-bold text-gray-800">24/7 Available</h4>
//             <p className="text-xs text-gray-600">Always here when you need us</p>
//           </div>
//           <div className="bg-white p-3 sm:p-4 rounded-lg shadow text-center">
//             <div className="text-2xl sm:text-3xl mb-2">🎯</div>
//             <h4 className="text-xs sm:text-sm font-bold text-gray-800">Personalized</h4>
//             <p className="text-xs text-gray-600">Tailored to your dog's needs</p>
//           </div>
//           <div className="bg-white p-3 sm:p-4 rounded-lg shadow text-center">
//             <div className="text-2xl sm:text-3xl mb-2">✅</div>
//             <h4 className="text-xs sm:text-sm font-bold text-gray-800">Expert Advice</h4>
//             <p className="text-xs text-gray-600">Trusted by vets and dogs</p>
//           </div>
//           <div className="bg-white p-3 sm:p-4 rounded-lg shadow text-center">
//             <div className="text-2xl sm:text-3xl mb-2">🔒</div>
//             <h4 className="text-xs sm:text-sm font-bold text-gray-800">Privacy</h4>
//             <p className="text-xs text-gray-600">Your data is always safe</p>
//           </div>
//         </div>
//       </div>

//       {/* Subscription Popup */}
//       {showSubscriptionPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative animate-in fade-in zoom-in duration-200">
//             {/* Close Button */}
//             <button
//               onClick={closeSubscriptionPopup}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X size={20} />
//             </button>
            
//             {/* Popup Content */}
//             <div className="p-8 text-center">
//               <div className="mb-6">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Stethoscope size={32} className="text-bhau" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">Subscribe Now to Unlock</h3>
//                 <h4 className="text-lg font-semibold text-bhau mb-4">Dr. Paws Services! 🩺</h4>
//                 <p className="text-gray-600 text-sm">
//                   Get unlimited access to our AI veterinarian and personalized care recommendations for your furry friend.
//                 </p>
//               </div>
              
//               <Button
//                 onClick={handleGetBHAUBOX}
//                 className="w-full bg-gradient-to-r from-bhau to-blue-400 hover:bg-bhau text-white font-semibold py-3 px-6 rounded-full transition-colors"
//               >
//                 Get BHAUBOX!
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// function FAQSection() {
//   const [openFAQ, setOpenFAQ] = useState<number | null>(null)

//   const faqs = [
//     {
//       question: "What comes in a BhauBox? 📦",
//       answer:
//         "Each BhauBox contains 2 original toys, 2 bags of all-natural treats, and a chew - all tailored to your dog's size and preferences. 🎾🍖",
//     },
//     {
//       question: "What kind of toys are in a BhauBox? 🧸",
//       answer:
//         "We create original toys with fun themes each month, designed specifically for your dog's play style and size. 🎨🐕",
//     },
//     {
//       question: "Is BhauBox approved for puppies and different dog breeds? 🐶",
//       answer: "Yes! BhauBox is suitable for dogs of all breeds and ages, including puppies over 6 months old. 🐕‍🦺❤️",
//     },
//     {
//       question: "Is BhauBox customizable? ⚙️",
//       answer: "We customize each box based on your dog's size, allergies, and play preferences. 🎯🐕",
//     },
//     {
//       question: "How much does a BhauBox cost? 💰",
//       answer: "BhauBox subscriptions start at $23/month, with discounts available for longer commitments. 💳✨",
//     },
//     {
//       question: "How can you cancel a BhauBox? ❌",
//       answer:
//         "You can cancel your subscription anytime through your account dashboard or by contacting our customer service team. 📞💬",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-white pt-24 sm:pt-28 lg:pt-32 pb-20">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
//         {/* FAQ Section */}
//         <div className="mb-8 sm:mb-12 lg:mb-16">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau text-center mb-6 sm:mb-8 lg:mb-12">
//             FAQs 🤔💭
//           </h2>
//           <div className="space-y-3 sm:space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="border-b border-gray-200">
//                 <button
//                   onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
//                   className="flex justify-between items-center w-full p-3 sm:p-4 text-left hover:bg-blue-50 transition-all duration-300 rounded-lg"
//                 >
//                   <span className="font-medium text-gray-800 text-sm sm:text-base pr-4">{faq.question}</span>
//                   <ChevronDown
//                     className={`transform transition-transform flex-shrink-0 ${
//                       openFAQ === index ? "rotate-180" : ""
//                     } text-blue-600`}
//                     size={20}
//                   />
//                 </button>
//                 {openFAQ === index && (
//                   <div className="p-3 sm:p-4 text-gray-600 text-sm sm:text-base bg-blue-50/50 rounded-lg">
//                     {faq.answer}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Newsletter Section */}
//         <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//           <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau mb-3 sm:mb-4 lg:mb-6">
//             Wanna sniff butts? 🐕👃
//           </h3>
//           <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto">
//             And by "sniff butts," of course we mean "sign up for our emails so you can get exclusive deals, content, and
//             more." So... wanna sniff butts? 📧✨
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
//             <Input
//               type="email"
//               placeholder="Email Address...."
//               className="flex-1 text-sm sm:text-base lg:text-lg py-2 sm:py-3 border-blue-300 focus:border-blue-500 transition-colors"
//             />
//             <Button className="bg-gradient-to-r from-bhau to-blue-400 hover:bg-bhau text-white rounded-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300">
//               SIGN UP 
//             </Button>
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="border-t border-gray-200 pt-6 sm:pt-8 lg:pt-12">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
//             {/* About Bark */}
//             <div>
//               <h4 className="font-bold text-bhau mb-3 sm:mb-4 uppercase tracking-wide text-sm">ABOUT BARK </h4>
//               <ul className="space-y-1 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
//                 <li>
//                   <a href="#" className="hover:text-bhau transition-colors">
//                     Our Story  
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-bhau transition-colors">
//                     Careers  
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-bhau transition-colors">
//                     Investors  
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-bhau transition-colors">
//                     Affiliate Program  
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-bhau transition-colors">
//                     Contact Us  
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-bhau transition-colors">
//                     FAQs  
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Our Products */}
//             <div>
//               <h4 className="font-bold text-bhau mb-3 sm:mb-4 uppercase tracking-wide text-sm">OUR PRODUCTS  </h4>
//               <ul className="space-y-1 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
//                 <li>
//                   <a href="#" className="hover:text-bhau transition-colors">
//                     BhauBox  
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-bhau transition-colors">
//                     Super Chewer 
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-bhau transition-colors">
//                     Dental  
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-bhau transition-colors">
//                     Food  
//                   </a>
//                 </li>
//               </ul>
//             </div>

// {/* Follow Us */}
// <div className="sm:col-span-2 lg:col-span-1">
//   <h4 className="font-bold text-bhau mb-3 sm:mb-4 uppercase tracking-wide text-sm">FOLLOW US</h4>
//   <div className="flex space-x-3 sm:space-x-4">
//     {/* Facebook */}
//     <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
//       <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 24 24">
//         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//       </svg>
//     </a>
    
//     {/* Twitter/X */}
//     <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
//       <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 24 24">
//         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//       </svg>
//     </a>
    
//     {/* Instagram */}
//     <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
//       <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 24 24">
//         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//       </svg>
//     </a>
    
//     {/* LinkedIn */}
//     <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
//       <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 24 24">
//         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//       </svg>
//     </a>
    
//     {/* YouTube */}
//     <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
//       <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 24 24">
//         <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//       </svg>
//     </a>
//   </div>
// </div>
//           </div>

//           {/* Copyright */}
//           <div className="border-t border-gray-200 pt-4 sm:pt-6 lg:pt-8 text-center text-xs sm:text-sm text-gray-500">
//             <p className="mb-3 sm:mb-4">©2025 BhauBox. All rights reserved. Made with ❤️ for dogs.</p>
//             <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
//               <a href="#" className="hover:text-bhau transition-colors">
//                 Privacy Policy 
//               </a>
//               <a href="#" className="hover:text-bhau transition-colors">
//                 Terms of Service  
//               </a>
//               <a href="#" className="hover:text-bhau transition-colors">
//                 Accessibility 
//               </a>
//               <a href="#" className="hover:text-bhau transition-colors">
//                 California Supply Chains Act 
//               </a>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   )
// }





"use client"

import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, ChevronDown, ChevronLeft, ChevronRight, Heart, Menu, Play, Send, Stethoscope, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// Import the new ProcessSection component
import { useCallback } from "react";
import ProcessSection from "./components/process-section";

// Import form components
import AdoptionDateStep from "@/components/adoption-date-step";
import Checkout from "@/components/checkout";
import ChoosePricingPlan from "@/components/choose-pricing-plan";
import DogBreed from "@/components/dog-breed";
import DogImageUpload from "@/components/dog-image-upload";
import DogSizeSelector from "@/components/dog-size-selector";
import FoodPreferences from "@/components/food-preferences";
import IdentityForm from "@/components/identity-form";
import ToySelector from "@/components/toy-selector";
import YourEmail from "@/components/you-email";
// import ThankYou from "@/components/thank-you"
import DogConfirmationStep from "@/components/thank-you";
// import { useSiteData } from "@/components/context/SiteDataContext"

const scrollableSections = ["hero", "product", "upgrade", "process", "testimonials", "safety", "story", "aivet", "faq"]
const formSections = [
  "toy-selector",
  "identity-form",
  "dog-size-selector",
  "dog-breed",
  "adoption-date-step",
  "food-preferences",
  "dog-image-upload",
  "you-email",
  "choose-pricing-plan",
  "checkout",
  "thank-you"
]
const allSections = [...scrollableSections, ...formSections]

export default function BhauBoxWebsite() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isInFormFlow, setIsInFormFlow] = useState(false)
  
  const [formData, setFormData] = useState({
    dogName: "",
    gender: "",
    dogSize: "",
    dogBreeds: [],
    dogBirthdate: "",
    dogAllergies: [],
    toy: "",
    dogImage: null,
    email: "",
    pricingPlan: ""
  })

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setIsInFormFlow(currentSection >= scrollableSections.length)
  }, [currentSection])

  // Preloader effect
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(loadingTimer)
    }
  }, [])

  
  // transparent navbar
  // Updated navbar scroll effect that handles existing CSS classes
useEffect(() => {
    const navbar = document.querySelector('nav');
    
    if (!navbar) return;
    
    // Set initial transparent state - override existing classes
    navbar.style.backgroundColor = 'transparent !important';
    navbar.style.backdropFilter = 'none !important';
    navbar.style.transition = 'background-color 0.3s ease, backdrop-filter 0.3s ease';
    
    // Scroll event listener
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            // When scrolled - white background
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95) !important';
            navbar.style.backdropFilter = 'blur(10px) !important';
        } else {
            // At top - transparent
            navbar.style.backgroundColor = 'transparent !important';
            navbar.style.backdropFilter = 'none !important';
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

  // Handle Get BhauBox button click
  const handleGetBhauBox = () => {
    // Jump to first form section
    const firstFormIndex = scrollableSections.length
    setCurrentSection(firstFormIndex)
  }

  const goToNextFormStep = () => {
    if (currentSection < allSections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const goToPreviousFormStep = () => {
    if (currentSection > scrollableSections.length) {
      setCurrentSection(currentSection - 1)
    }
  }
  
  const updateFormData = useCallback((field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      console.log("📦 Full Form Data Snapshot:", updated)
      return updated
    })
  }, [])

  // Update renderSection function
  const renderSection = () => {
    const sectionName = allSections[currentSection]
    
    // Scrollable sections
    switch (sectionName) {
      case "hero":
        return <HeroSection onGetStarted={handleGetBhauBox} />
      case "product":
        return <ProductSection />
      case "upgrade":
        return <UpgradeSection onClaimOffer={handleGetBhauBox} />
      case "process":
        return <ProcessSection />
      case "testimonials":
        return <TestimonialsSection />
      case "safety":
        return <SafetySection />
      case "story":
        return <OurStorySection />
      case "aivet":
        return <AIVetChatSection />
      case "faq":
        return <FAQSection />
      
      // Form sections
      case "toy-selector":
        return <ToySelector 
          formData={formData} 
          updateFormData={updateFormData}
          onNext={goToNextFormStep}
          onBack={goToPreviousFormStep}
        />
      case "identity-form":
        return <IdentityForm 
          formData={formData} 
          updateFormData={updateFormData}
          onNext={goToNextFormStep}
          onBack={goToPreviousFormStep}
        />
      case "dog-size-selector":
        return <DogSizeSelector 
          formData={formData} 
          updateFormData={updateFormData}
          onNext={goToNextFormStep}
          onBack={goToPreviousFormStep}
        />
      case "dog-breed":
        return <DogBreed 
          formData={formData} 
          updateFormData={updateFormData}
          onNext={goToNextFormStep}
          onBack={goToPreviousFormStep}
        />
      case "adoption-date-step":
        return <AdoptionDateStep 
          formData={formData} 
          updateFormData={updateFormData}
          onNext={goToNextFormStep}
          onBack={goToPreviousFormStep}
        />
      case "food-preferences":
        return <FoodPreferences 
          formData={formData} 
          updateFormData={updateFormData}
          onNext={goToNextFormStep}
          onBack={goToPreviousFormStep}
        />
      case "dog-image-upload":
        return <DogImageUpload 
          formData={formData} 
          updateFormData={updateFormData}
          onNext={goToNextFormStep}
          onBack={goToPreviousFormStep}
        />
      case "you-email":
        return <YourEmail 
          formData={formData} 
          updateFormData={updateFormData}
          onNext={goToNextFormStep}
          onBack={goToPreviousFormStep}
        />
      case "choose-pricing-plan":
        return <ChoosePricingPlan 
          formData={formData} 
          updateFormData={updateFormData}
          onNext={goToNextFormStep}
          onBack={goToPreviousFormStep}
        />
      case "checkout":
        return <Checkout 
          formData={formData} 
          updateFormData={updateFormData}
          onNext={goToNextFormStep}
          onBack={goToPreviousFormStep}
        />
      case "thank-you":
        return (
          <DogConfirmationStep 
            formData={formData} 
            onAccountClick={() => {
              console.log("Go to account clicked!")
            }} 
          />
        )

      default:
        return <HeroSection onGetStarted={handleGetBhauBox} />
    }
  }

  // Show preloader
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        <div className="mb-8 sm:mb-12 lg:mb-16 animate-pulse">
          <img
            src="/images/bhau-box-logo-new.png"
            alt="BHAU BOX"
            className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto mx-auto"
            onClick={() => window.location.reload()}
          />
        </div>

        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-bhau mb-2 sm:mb-3">
            Loading BhauBox 🐕
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">Preparing pawsome content for you...</p>
        </div>

        <div className="w-64 sm:w-80 md:w-96 lg:w-[28rem] mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 lg:h-4 mb-3 sm:mb-4">
            <div
              className="bg-gradient-to-r from-bhau to-blue-400 h-full rounded-full transition-all duration-100 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          <div className="text-center">
            <span className="text-xs sm:text-sm md:text-base font-semibold text-bhau">{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="flex space-x-1 sm:space-x-2 mt-6 sm:mt-8">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-bhau to-blue-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-bhau to-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-bhau to-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500 animate-pulse">
            {progress < 25 && "Fetching the best toys... 🧸"}
            {progress >= 25 && progress < 50 && "Selecting healthy treats... 🍖"}
            {progress >= 50 && progress < 75 && "Preparing your box... 📦"}
            {progress >= 75 && "Almost ready to play! 🎾"}
          </p>
        </div>
      </div>
    )
  }

  // If in form flow, show only the current form section
  if (isInFormFlow) {
    return (
      <div className="min-h-screen bg-white">
        {renderSection()}
      </div>
    )
  }

  // Normal scrollable page for marketing sections
  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Layout */}
            <div className="lg:hidden flex items-center justify-between">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className="flex-1 flex justify-center">
                <img 
                  src="/images/bhau-box-logo-new.png" 
                  alt="BHAU BOX" 
                  className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity" 
                  onClick={() => window.location.reload()}
                />
              </div>

              <div className="w-10"></div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <img 
                    src="/images/bhau-box-logo-new.png" 
                    alt="BHAU BOX" 
                    className="h-12 w-auto cursor-pointer" 
                    onClick={() => window.location.reload()}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-bhau hover:text-blue-600 transition-colors">Get help 🎧</button>
                <Link href="/login">
                  <Button className="bg-bhau rounded-full hover:bg-blue-700 text-white px-6 transition-colors">
                    Login
                  </Button>
                </Link>
                <Button onClick={handleGetBhauBox} className="bg-bhau rounded-full hover:bg-blue-700 text-white px-6 transition-colors">GET BHAUBOX</Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="pt-4 space-y-4">
                <hr className="border-gray-200" />
                <button className="block w-full text-left text-bhau hover:text-blue-600 transition-colors py-2">
                  Get help 🎧
                </button>
                <Link href="/login">
                  <Button className="w-full bg-bhau rounded-full hover:bg-blue-700 text-white transition-colors mt-4">
                    Login
                  </Button>
                </Link>
                <Button onClick={handleGetBhauBox} className="w-full bg-bhau rounded-full hover:bg-blue-700 text-white transition-colors mt-4">
                  GET BHAUBOX
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Get BhauBox Pill */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Button 
          onClick={handleGetBhauBox}
          className="bg-bhau hover:bg-blue-700 text-white px-10 py-10 sm:px-12 sm:py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-base sm:text-lg"
        >
          Get BhauBox!
        </Button>
      </div>

      {/* Main Content - All sections stacked normally */}
      <div className="">
        <HeroSection onGetStarted={handleGetBhauBox} />
        <ProductSection />
        <UpgradeSection onClaimOffer={handleGetBhauBox} />
        <ProcessSection />
        <TestimonialsSection />
        <SafetySection />
        <OurStorySection />
        <AIVetChatSection />
        <FAQSection />
      </div>
    </div>
  )
}

// Update HeroSection to accept props
function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.7)" }}
        >
          <source src="/Hero-Video.mp4" type="video/mp4" />
          <div className="w-full h-full bg-white"></div>
        </video>
        <div className="absolute inset-0 bg-transparent"></div>
      </div>

      {/* Animated Dog Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-4 sm:left-10 text-4xl sm:text-6xl opacity-20">🐕‍🦺</div>
        <div className="absolute top-1/3 right-4 sm:right-20 text-3xl sm:text-5xl opacity-30">🐾</div>
        <div className="absolute bottom-1/4 left-1/4 text-2xl sm:text-4xl opacity-25">🦴</div>
        <div className="absolute top-1/2 right-1/4 text-xl sm:text-3xl opacity-20">🎾</div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen relative z-20 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-bhau leading-tight">
              The Perfect Box for Your Perfect Pup! 🐕
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Every month, we deliver 2 original toys, 2 bags of healthy treats, and a chew - all customized for your
              dog's size and preferences.
            </p>
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-bhau rounded-full hover:bg-blue-700 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 shadow-lg"
            >
              Get Started!
            </Button>
          </div>
          <div className="relative order-first lg:order-last">
            <div className="bg-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-8">
              <img
                src="/heropic.png?height=400&width=600"
                alt="Happy dog with BhauBox toys and treats"
                className="w-full h-auto rounded-lg sm:rounded-xl lg:rounded-2xl"
              />
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg sm:text-2xl">❤️</div>
              <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 text-lg sm:text-2xl">🐾</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden lg:block absolute bottom-8 left-8 text-center z-20">
        <div className="text-white/80">
          <ChevronDown size={32} />
          <p className="text-sm mt-2">Scroll for more pawsome content!</p>
        </div>
      </div>
    </div>
  )
}

function ProductSection() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-bhau mb-6 sm:mb-8 lg:mb-16">
          {"WHAT'S IN A BHAUBOX?"} 
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start mb-6 sm:mb-8 lg:mb-12">
          
          {/* Plush Toys Section */}
          <div className="space-y-4 lg:space-y-6">
            <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
              plushies
              <br />
              your doggy
              <br />
              will lovies
            </div>
            
            {/* Two plush toy images */}
            <div className="flex justify-center gap-4">
              <div className="relative group">
                <img
                  src="/plush1.png?height=150&width=150&text=Pirate+Bear"
                  alt="Pirate bear plush toy"
                  className="w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 object-contain spin-on-hover"
                />
                <div className="absolute -top-1 -right-1 text-xs sm:text-sm"></div>
              </div>
              <div className="relative group">
                <img
                  src="/plush2.png?height=150&width=150&text=Treasure+Chest"
                  alt="Treasure chest plush toy"
                  className="w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 object-contain spin-on-hover"
                />
                <div className="absolute -top-1 -right-1 text-xs sm:text-sm"></div>
              </div>
            </div>
            
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-bhau">2 Plush Toys</h3>
            <div className="text-xs sm:text-sm text-gray-600">
              HAVE A
              <br />
              PLUSHIE
              <br />
              DAY!
            </div>
          </div>

          {/* Center Badge */}
          <div className="relative order-first md:order-none">
            <div className="bg-bhau text-white rounded-full p-3 sm:p-4 lg:p-8 text-center font-bold text-xs sm:text-sm lg:text-lg transform rotate-12 max-w-32 sm:max-w-40 lg:max-w-48 mx-auto">
              NEW ✨
              <br />
              STYLES EVERY
              <br />
              MONTH! 🗓️
            </div>
          </div>

          {/* Chew Toys Section */}
          <div className="space-y-4 lg:space-y-6">
            <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
              TOUGH &
              <br />
              DURABLE
              <br />
              ADVENTURE 🦴
            </div>
            
            {/* One chew toy image */}
            <div className="relative group">
              <img
                src="/chew.png?height=180&width=180&text=Rope+Toy"
                alt="Rope chew toy"
                className="w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 mx-auto object-contain spin-on-hover"
              />
              <div className="absolute -top-1 -right-1 text-xs sm:text-sm">🦴</div>
            </div>
            
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-bhau">1 Chew Toy</h3>
            <div className="text-xs sm:text-sm text-gray-600">
              BUILT FOR
              <br />
              SERIOUS
              <br />
              CHOMPERS! 💪
            </div>
          </div>
        </div>

        {/* Treats Section - Full Width */}
        <div className="mb-8 lg:mb-12">
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-bhau">
              2 Bags of Healthy Treats 🥨
            </h3>
            
            {/* Two treat bag images */}
            <div className="flex justify-center gap-6 lg:gap-8">
              <div className="relative group">
                <img
                  src="/treat1.png?height=120&width=180&text=Beef+Treats"
                  alt="Beef treat bag"
                  className="w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-32 object-contain spin-on-hover"
                />
                <div className="absolute -top-1 -left-1 text-xs sm:text-sm"></div>
              </div>
              <div className="relative group">
                <img
                  src="/treat2.png?height=120&width=180&text=Chicken+Treats"
                  alt="Chicken treat bag"
                  className="w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-32 object-contain spin-on-hover"
                />
                <div className="absolute -top-1 -left-1 text-xs sm:text-sm"></div>
              </div>
            </div>
            
            <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
              ALL-NATURAL 🌱<br />
              MADE IN PAKISTAN
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .spin-on-hover {
          transition: transform 0.3s ease;
        }
        
        .spin-on-hover:hover {
          animation: spinOnce 1s ease-in-out;
        }
        
        @keyframes spinOnce {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

// Update UpgradeSection to accept props
function UpgradeSection({ onClaimOffer }: { onClaimOffer: () => void }) {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="h-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left space-y-3 sm:space-y-4 lg:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg text-bhau font-medium">Plus, get</p>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-bhau leading-tight">
              16% OFF
              <br />
              ON
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-bhau font-medium"> your first BHAU BOX</p>
            <Button
              size="lg"
              onClick={onClaimOffer}
              className="bg-bhau hover:bg-blue-700 rounded-full text-white px-6 sm:px-8 lg:px-12 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold mt-4 sm:mt-6 lg:mt-8 transition-all duration-300 shadow-lg"
            >
              CLAIM OFFER!
            </Button>
          </div>
          <div className="relative order-first lg:order-last">
            <div className="absolute -top-1 sm:-top-2 lg:-top-4 -right-1 sm:-right-2 lg:-right-4 bg-bhau text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1 lg:py-2 rounded-full font-bold text-xs sm:text-sm transform rotate-12">
              16% OFF 
              <br />& TREATS 🎾
            </div>
            <img
              src="/heropic.png?height=300&width=400"
              alt="Dog with BhauBox and toys"
              className="w-full h-auto rounded-lg sm:rounded-xl lg:rounded-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <div className="h-1/2 bg-blue-50 flex items-center justify-center px-4 py-9 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 lg:space-y-8">
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">HOW WE MAKE DOGS HAPPY</h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
            We believe dog happiness is serious business. {"Here's"} how we deliver it right to your door, every month.
          </p>
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">PERSONALIZED JUST FOR YOUR PUP</h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
            Every box is tailored to your dog's unique play style, size, and preferences—because no two tails wag the same.
          </p>
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">NEW TOYS & TREATS EVERY MONTH</h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
            Each month brings an all-new theme with original toys, healthy treats, and chews designed to surprise and delight.
          </p>
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">DESIGNED BY DOG EXPERTS</h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
            Our toys are play-tested by real dogs (and approved by humans) to make sure they're fun, safe, and built for endless tail wags.
          </p>
        </div>
      </div>
    </div>
  )
}

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "GOLDIE",
      image: "/t1.png?height=300&width=300",
      quote:
        "Goldie likes BhauBox so much that she now thinks every box that's delivered is for her. It's not, but try explaining that to someone who needs to squeak and chew all. the. time.",
      author: "- GOLDIE & WALDO",
      emoji: "🐕‍🦺",
    },
    {
      name: "Cashew",
      image: "/t2.png?height=300&width=300",
      quote:
        "Cashew loves the multi-part, multi-texture toys for snuffling, crinkling, and hunting down treats. I love the toys because they make me laugh.",
      author: "- CASHEW & MADDIE",
      emoji: "🦮",
    },
    {
      name: "Mac",
      image: "/t3.png?height=300&width=300",
      quote:
        "Mac's toys are tailored to his size, so I feel good knowing they're safe and thoughtfully designed for him. He proudly opens his box in our lobby, and sometimes (sometimes) shares with a lucky neighbor.",
      author: "- MACARONI & BRIANNA",
      emoji: "🐕",
    },
    {
      name: "Luna",
      image: "/t4.png?height=300&width=300",
      quote:
        "Luna goes absolutely bonkers for her monthly BhauBox! She's learned to recognize the delivery truck and starts doing zoomies around the house. The best part? Everything is perfectly sized for her tiny paws.",
      author: "- LUNA & MARCUS",
      emoji: "🐕‍🦺",
    },
    {
      name: "Biscuit",
      image: "/t5.png?height=300&width=300",
      quote:
        "Biscuit used to destroy his toys in minutes, but BhauBox toys are built tough! Now he actually plays with them for weeks. My wallet and my vacuum cleaner are both grateful.",
      author: "- BISCUIT & SARAH",
      emoji: "🦴",
    },
    {
      name: "Pepper",
      image: "/t6.png?height=300&width=300",
      quote:
        "Pepper is the pickiest dog I know, but somehow BhauBox always knows exactly what she wants. It's like they have a direct line to her doggy brain. She gives every toy four paws up!",
      author: "- PEPPER & JAMES",
      emoji: "🐾",
    },
    {
      name: "Rocco",
      image: "/t7.png?height=300&width=300",
      quote:
        "Rocco thinks he's a fierce guard dog, but he turns into a playful puppy the moment his BhauBox arrives. Watching him gently carry each toy to his favorite spot is pure joy.",
      author: "- ROCCO & ELENA",
      emoji: "🐕",
    },
  ];

  const itemsToShow = 3;
  const totalItems = testimonials.length;

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [totalItems]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  // Get visible testimonials (3 at a time, wrapping around)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % totalItems;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau mb-3 sm:mb-4">
          SOME NICE THINGS DOGS HAVE SAID ABOUT US
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 sm:mb-8 lg:mb-12 max-w-3xl mx-auto">
          {"There's"} no better feeling than when a dog likes you. And since 2012, {"we've"} made over 6,000,000 dogs
          like us. See what the pups in our pack are barking about. 🎉
        </p>

        {/* Carousel Container */}
        <div className="relative overflow-hidden mb-4 sm:mb-6 lg:mb-8">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3 lg:px-4"
              >
                <Card className="bg-gradient-to-r from-bhau to-blue-400 text-white border-none hover:scale-105 transition-transform duration-300 h-full">
                  <CardContent className="p-3 sm:p-4 lg:p-6 relative h-full flex flex-col">
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg sm:text-2xl">
                      {testimonial.emoji}
                    </div>
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-24 sm:h-32 lg:h-48 object-cover rounded-lg mb-3 sm:mb-4 hover:scale-110 transition-transform duration-300"
                    />
                    <blockquote className="text-xs sm:text-sm mb-3 sm:mb-4 italic flex-grow">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="text-xs font-semibold mt-auto">{testimonial.author}</p>
                    <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 text-lg sm:text-xl">❤️</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4 sm:mb-6 lg:mb-8">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5 text-blue-600" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {Array.from({ length: totalItems }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-bhau w-8' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5 text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SafetySection() {
  return (
    <div className="min-h-screen bg-white flex flex-col py-20">
      <div className="flex-1 bg-blue-50">
        {/* Safety Section */}
        <div className="h-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 lg:space-y-8">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">
              THE LEADER IN DOG TOY SAFETY 🛡️🐕
            </h2>
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                Did you know there are no safety standards for dog toys? 😱
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                {"Don't"} worry, {"we're"} fixing that. We put every BHAU toy to the test in our state-of-the-art lab to
                ensure it meets the highest safety requirements. 🔬✅
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="relative bg-gray-200 rounded-lg overflow-hidden max-w-2xl mx-auto hover:scale-105 transition-transform duration-300">
              <img
                src="/unboxbuddy.png?height=300&width=500"
                alt="BARK Safety Lab video"
                className="w-full h-32 sm:h-48 lg:h-64 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-gradient-to-r from-bhau to-blue-400 text-white rounded-full p-2 sm:p-3 lg:p-4 hover:bg-blue-700 transition-all duration-300">
                  <Play size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg sm:text-2xl">🎬</div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="h-1/2 bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 lg:space-y-8">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-bhau">OUR PACK HAS YOUR BACK 🐕‍🦺❤️</h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
              If your pup {"isn't"} 100% happy, then {"we'll"} work with you to make it right. In case it {"wasn't"}{" "}
              obvious, {"we're"} kiiind of obsessed with dogs. 🥰🐕
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-bhau to-blue-400 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-12 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 shadow-lg"
            >
              CHAT WITH US NOW 💬
            </Button>

            <div className="relative bg-gray-200 rounded-lg overflow-hidden max-w-2xl mx-auto hover:scale-105 transition-transform duration-300">
              <img
                src="/unboxbuddy.png?height=300&width=500"
                alt="BARK Safety Lab video"
                className="w-full h-32 sm:h-48 lg:h-64 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-gradient-to-r from-bhau to-blue-400 text-white rounded-full p-2 sm:p-3 lg:p-4 hover:bg-blue-700 transition-all duration-300">
                  <Play size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg sm:text-2xl">🎬</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OurStorySection() {
  return (
    <div className="min-h-screen bg-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-bhau mb-4 sm:mb-6">OUR STORY 📖✨</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto">
            From a simple idea to making millions of dogs happy worldwide - {"here's"} how BhauBox became the{" "}
            {"world's"} most beloved dog subscription box! 🌍🐕❤️
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* 2012 - The Beginning */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
              <div className="inline-block bg-bhau text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
                2012 🚀
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau">The Spark of an Idea 💡</h3>
              <p className="text-sm sm:text-base text-gray-700">
                It all started when our founder, Matt, couldn{"'t"} find quality toys for his rescue dog, Bark.
                Frustrated by flimsy, unsafe toys, he decided to create something better. The mission was simple: make
                dogs happier, one box at a time! 🎯🐕
              </p>
            </div>
            <div className="relative order-first lg:order-last">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Founder with rescue dog Bark"
                className="w-full h-auto rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-2 -right-2 text-2xl">🏠</div>
              <div className="absolute -bottom-2 -left-2 text-2xl">🐕</div>
            </div>
          </div>

          {/* 2015 - Growth */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="relative">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="BhauBox team packing boxes"
                className="w-full h-auto rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-2 -left-2 text-2xl">📦</div>
              <div className="absolute -bottom-2 -right-2 text-2xl">👥</div>
            </div>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
              <div className="inline-block bg-bhau text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
                2015 📈
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau">Growing the Pack 🌱</h3>
              <p className="text-sm sm:text-base text-gray-700">
                From a garage operation to a real warehouse! We hit 10,000 subscribers and realized we were onto
                something special. Dogs across the country were wagging their tails, and their humans were sharing the
                joy on social media. 📱✨
              </p>
            </div>
          </div>

          {/* 2018 - Innovation */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
              <div className="inline-block bg-bhau text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
                2018 🔬
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau">Safety First Innovation 🛡️</h3>
              <p className="text-sm sm:text-base text-gray-700">
                We opened our state-of-the-art safety lab - the first of its kind in the pet industry! Every toy now
                goes through rigorous testing because we believe every dog deserves safe, high-quality playtime. 🧪✅
              </p>
            </div>
            <div className="relative order-first lg:order-last">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Safety lab with testing equipment"
                className="w-full h-auto rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-2 -right-2 text-2xl">🔬</div>
              <div className="absolute -bottom-2 -left-2 text-2xl">✅</div>
            </div>
          </div>

          {/* 2020 - Pandemic Heroes */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="relative">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Dogs playing during pandemic"
                className="w-full h-auto rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-2 -left-2 text-2xl">🏠</div>
              <div className="absolute -bottom-2 -right-2 text-2xl">❤️</div>
            </div>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
              <div className="inline-block bg-bhau text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
                2020 🦸‍♂️
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau">Pandemic Heroes 🦸‍♀️</h3>
              <p className="text-sm sm:text-base text-gray-700">
                When the world stayed home, dogs became our greatest companions. BhauBox became more than a subscription
                - it was a monthly dose of joy during uncertain times. We helped millions of families bond with their
                furry friends! 🏠💕
              </p>
            </div>
          </div>

          {/* 2024 - Today */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
              <div className="inline-block bg-bhau text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
                2024 🌟
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau">
                6 Million Happy Dogs & Counting! 🎉
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Today, {"we're"} proud to have made over 6 million dogs happy worldwide! With AI-powered vet
                consultations, personalized boxes, and the same commitment to safety and quality that started it all.
                The best is yet to come! 🚀🌈
              </p>
            </div>
            <div className="relative order-first lg:order-last">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Happy dogs around the world with BhauBox"
                className="w-full h-auto rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-2 -right-2 text-2xl">🌍</div>
              <div className="absolute -bottom-2 -left-2 text-2xl">🎉</div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-bhau mb-6 sm:mb-8 lg:mb-12">
            BY THE NUMBERS 📊
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">6M+</div>
              <div className="text-sm sm:text-base text-gray-600">Happy Dogs 🐕</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">12</div>
              <div className="text-sm sm:text-base text-gray-600">Years of Joy 🎂</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600">Original Toys 🧸</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">50</div>
              <div className="text-sm sm:text-base text-gray-600">Countries 🌍</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-4 sm:mb-6">
            READY TO JOIN OUR STORY? 📝✨
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
            {"Let's"} write the next chapter together - with your pup as the star! 🌟🐕
          </p>
        </div>
      </div>
    </div>
  )
}

function AIVetChatSection() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "vet",
      message:
        "Hello! I'm Dr. Paws, your AI veterinarian! 🩺 I've reviewed Goldie's profile and I'm here to help with any questions about his health, behavior, or care. What would you like to discuss today?",
      time: "2:30 PM",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: "user",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages([...messages, userMessage])
      setNewMessage("")
      
      // Show subscription popup instead of AI response
      setShowSubscriptionPopup(true)
    }
  }

  const closeSubscriptionPopup = () => {
    setShowSubscriptionPopup(false)
  }

  const handleGetBHAUBOX = () => {
    // Add your subscription logic here
    console.log("Redirecting to BHAUBOX subscription...")
    // You can add navigation logic here
  }

  return (
    <div className="min-h-screen bg-blue-50 py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-3 sm:mb-4">AI VET CHAT 🩺</h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto">
            Chat with Dr. Paws - your personal AI veterinarian! Get instant answers about your dog's health, behavior,
            and care. 🐕❤️
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8 h-[calc(100vh-300px)] min-h-[500px]">
          {/* Dog Profile Card */}
          <div className="lg:col-span-1">
            <Card className="h-full bg-white shadow-lg">
              <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="relative inline-block">
                    <img
                      src="/pickbudplan.png?height=120&width=120"
                      alt="Buddy the Golden Retriever"
                      className="w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 rounded-full mx-auto object-cover border-4 border-blue-200"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-bhau text-white rounded-full p-1">
                      <Heart size={12} className="sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-bhau mt-3 sm:mt-4">Goldie</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Labrador • 6 years old</p>
                </div>

                <div className="space-y-3 sm:space-y-4 flex-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-semibold">65 lbs</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Activity Level:</span>
                    <span className="font-semibold text-lime-400">High 🏃‍♂️</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Allergies:</span>
                    <span className="font-semibold">None</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Last Checkup:</span>
                    <span className="font-semibold">March 2025 ✅</span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Stethoscope size={16} className="text-bhau mr-2" />
                    <span className="text-xs sm:text-sm font-semibold text-bhau">Health Status</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Excellent health! Up to date on all vaccinations. 💚
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-full bg-white shadow-lg flex flex-col">
              {/* Chat Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-bhau rounded-full flex items-center justify-center">
                      <Bot size={20} className="sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-bhau rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-sm sm:text-base font-bold text-gray-800">Dr. Paws 🩺</h3>
                    <p className="text-xs sm:text-sm text-bhau">AI Veterinarian • Online</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <div className="space-y-3 sm:space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                          message.sender === "user" ? "bg-bhau text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-xs sm:text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-200" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 sm:p-6 border-t border-gray-200">
                <div className="flex space-x-2 sm:space-x-4">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask Dr. Paws anything about Goldie... 🐕"
                    className="flex-1 text-xs sm:text-sm"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-bhau hover:bg-bhau text-white px-3 sm:px-4 py-2"
                  >
                    <Send size={16} className="sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow text-center">
            <div className="text-2xl sm:text-3xl mb-2">🕐</div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-800">24/7 Available</h4>
            <p className="text-xs text-gray-600">Always here when you need us</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow text-center">
            <div className="text-2xl sm:text-3xl mb-2">🎯</div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-800">Personalized</h4>
            <p className="text-xs text-gray-600">Tailored to your dog's needs</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow text-center">
            <div className="text-2xl sm:text-3xl mb-2">✅</div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-800">Expert Advice</h4>
            <p className="text-xs text-gray-600">Trusted by vets and dogs</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow text-center">
            <div className="text-2xl sm:text-3xl mb-2">🔒</div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-800">Privacy</h4>
            <p className="text-xs text-gray-600">Your data is always safe</p>
          </div>
        </div>
      </div>

      {/* Subscription Popup */}
      {showSubscriptionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={closeSubscriptionPopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            {/* Popup Content */}
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope size={32} className="text-bhau" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Subscribe Now to Unlock</h3>
                <h4 className="text-lg font-semibold text-bhau mb-4">Dr. Paws Services! 🩺</h4>
                <p className="text-gray-600 text-sm">
                  Get unlimited access to our AI veterinarian and personalized care recommendations for your furry friend.
                </p>
              </div>
              
              <Button
                onClick={handleGetBHAUBOX}
                className="w-full bg-gradient-to-r from-bhau to-blue-400 hover:bg-bhau text-white font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Get BHAUBOX!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "What comes in a BhauBox? 📦",
      answer:
        "Each BhauBox contains 2 original toys, 2 bags of all-natural treats, and a chew - all tailored to your dog's size and preferences. 🎾🍖",
    },
    {
      question: "What kind of toys are in a BhauBox? 🧸",
      answer:
        "We create original toys with fun themes each month, designed specifically for your dog's play style and size. 🎨🐕",
    },
    {
      question: "Is BhauBox approved for puppies and different dog breeds? 🐶",
      answer: "Yes! BhauBox is suitable for dogs of all breeds and ages, including puppies over 6 months old. 🐕‍🦺❤️",
    },
    {
      question: "Is BhauBox customizable? ⚙️",
      answer: "We customize each box based on your dog's size, allergies, and play preferences. 🎯🐕",
    },
    {
      question: "How much does a BhauBox cost? 💰",
      answer: "BhauBox subscriptions start at $23/month, with discounts available for longer commitments. 💳✨",
    },
    {
      question: "How can you cancel a BhauBox? ❌",
      answer:
        "You can cancel your subscription anytime through your account dashboard or by contacting our customer service team. 📞💬",
    },
  ]

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* FAQ Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau text-center mb-6 sm:mb-8 lg:mb-12">
            FAQs 🤔💭
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="flex justify-between items-center w-full p-3 sm:p-4 text-left hover:bg-blue-50 transition-all duration-300 rounded-lg"
                >
                  <span className="font-medium text-gray-800 text-sm sm:text-base pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform flex-shrink-0 ${
                      openFAQ === index ? "rotate-180" : ""
                    } text-blue-600`}
                    size={20}
                  />
                </button>
                {openFAQ === index && (
                  <div className="p-3 sm:p-4 text-gray-600 text-sm sm:text-base bg-blue-50/50 rounded-lg">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-bhau mb-3 sm:mb-4 lg:mb-6">
            Wanna sniff butts? 🐕👃
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto">
            And by "sniff butts," of course we mean "sign up for our emails so you can get exclusive deals, content, and
            more." So... wanna sniff butts? 📧✨
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email Address...."
              className="flex-1 text-sm sm:text-base lg:text-lg py-2 sm:py-3 border-blue-300 focus:border-blue-500 transition-colors"
            />
            <Button className="bg-gradient-to-r from-bhau to-blue-400 hover:bg-bhau text-white rounded-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300">
              SIGN UP 
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-6 sm:pt-8 lg:pt-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
            {/* About Bark */}
            <div>
              <h4 className="font-bold text-bhau mb-3 sm:mb-4 uppercase tracking-wide text-sm">ABOUT BARK </h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
                <li>
                  <a href="#" className="hover:text-bhau transition-colors">
                    Our Story  
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-bhau transition-colors">
                    Careers  
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-bhau transition-colors">
                    Investors  
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-bhau transition-colors">
                    Affiliate Program  
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-bhau transition-colors">
                    Contact Us  
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-bhau transition-colors">
                    FAQs  
                  </a>
                </li>
              </ul>
            </div>

            {/* Our Products */}
            <div>
              <h4 className="font-bold text-bhau mb-3 sm:mb-4 uppercase tracking-wide text-sm">OUR PRODUCTS  </h4>
              <ul className="space-y-1 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
                <li>
                  <a href="#" className="hover:text-bhau transition-colors">
                    BhauBox  
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-bhau transition-colors">
                    Super Chewer 
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-bhau transition-colors">
                    Dental  
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-bhau transition-colors">
                    Food  
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="font-bold text-bhau mb-3 sm:mb-4 uppercase tracking-wide text-sm">FOLLOW US</h4>
              <div className="flex space-x-3 sm:space-x-4">
                {/* Facebook */}
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* Twitter/X */}
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                
                {/* Instagram */}
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                {/* YouTube */}
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-4 sm:pt-6 lg:pt-8 text-center text-xs sm:text-sm text-gray-500">
            <p className="mb-3 sm:mb-4">©2025 BhauBox. All rights reserved. Made with ❤️ for dogs.</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a href="#" className="hover:text-bhau transition-colors">
                Privacy Policy 
              </a>
              <a href="#" className="hover:text-bhau transition-colors">
                Terms of Service  
              </a>
              <a href="#" className="hover:text-bhau transition-colors">
                Accessibility 
              </a>
              <a href="#" className="hover:text-bhau transition-colors">
                California Supply Chains Act 
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

