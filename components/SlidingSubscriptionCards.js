// "use client";

// import {
//   Calendar,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Pause,
//   SkipForward,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

// const availablePlans = [
//   {
//     id: "monthly",
//     name: "Monthly",
//     price: "3000 PKR",
//     description: "Perfect for trying out the box monthly",
//     features: [
//       "3-4 quality toys",
//       "Healthy treats",
//       "Size customized",
//       "Standard shipping",
//     ],
//     isActive: false,
//   },
//   {
//     id: "3mo",
//     name: "3 Months",
//     price: "3000 PKR – 5% Off",
//     description: "Best value for short term",
//     features: [
//       "5-6 premium toys",
//       "Healthy treats",
//       "Size customized",
//       "Priority shipping",
//     ],
//     isActive: false,
//   },
//   {
//     id: "6mo",
//     name: "6 Months",
//     price: "3000 PKR – 10% Off",
//     description: "Ideal for committed pup parents",
//     features: [
//       "7-9 premium toys",
//       "Gourmet treats",
//       "Size customized",
//       "Express shipping",
//       "Free monthly surprise",
//     ],
//     isActive: false,
//   },
// ];

// export default  function SlidingSubscriptionCards({ subscription }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isSliding, setIsSliding] = useState(false);
//   const [plans, setPlans] = useState([]);
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   // useEffect(() => {
//   //   // Create current plan from subscription data
//   //   const currentPlan = {
//   //     id: "current",
//   //     name: subscription?.plan || "Current Plan",
//   //     price: "$29.99/month",
//   //     description: "Your current active subscription",
//   //     features: [
//   //       "5-7 premium toys",
//   //       "Healthy treats",
//   //       "Size customized",
//   //       "Free shipping",
//   //     ],
//   //     isActive: true,
//   //   };

//   //   // Combine current plan with available plans
//   //   setPlans([currentPlan, ...availablePlans]);
//   // }, [subscription]);

//   useEffect(() => {
//     if (subscription?.is_active) {
//       const currentPlan = {
//         id: "current",
//         name: subscription?.plan || "Current Plan",
//         price: "$29.99/month",
//         description: "Your current active subscription",
//         features: [
//           "5-7 premium toys",
//           "Healthy treats",
//           "Size customized",
//           "Free shipping",
//         ],
//         isActive: true,
//       };
//       setPlans([currentPlan, ...availablePlans]);
//     } else {
//       // No current subscription, show only available plans
//       setPlans(availablePlans);
//     }
//   }, [subscription]);

//   const nextPlan = () => {
//     if (isSliding) return;
//     setIsSliding(true);
//     setCurrentIndex((prev) => (prev + 1) % plans.length);
//     setTimeout(() => setIsSliding(false), 300);
//   };

//   // const createRes = await fetch(`${API_URL}/api/checkout/`, {
//   //   method: "POST",
//   //   headers: {
//   //     Authorization: `Bearer ${token}`,
//   //     "Content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify({
//   //     selected_plan: currentPlan.id,
//   //     billing_type: "monthly",
//   //     payment_method: "cod",
//   //     use_shipping_as_billing: true,
//   //     ...profile,
//   //   }),
//   // });

//   const pauseSubscription = async () => {
//     const token = localStorage.getItem("access");

//     if (!token) {
//       toast.error("Not logged in");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_URL}/api/pause-subscription/`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.ok) {
//         toast.success("Subscription paused!");
//         // optionally refresh page or state here
//       } else {
//         const data = await res.json();
//         toast.error(data.error || "Failed to pause subscription");
//       }
//     } catch (err) {
//       toast.error("Server error");
//       console.error(err);
//     }
//   };

//   const prevPlan = () => {
//     if (isSliding) return;
//     setIsSliding(true);
//     setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
//     setTimeout(() => setIsSliding(false), 300);
//   };

//   const goToPlan = (index) => {
//     if (isSliding || index === currentIndex) return;
//     setIsSliding(true);
//     setCurrentIndex(index);
//     setTimeout(() => setIsSliding(false), 300);
//   };

//   if (plans.length === 0) return <div>Loading...</div>;

//   const currentPlan = plans[currentIndex];

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
//       {/* Sliding Subscription Card */}
//       <div className="relative">
//         <div className="bg-white rounded-xl shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 overflow-hidden">
//           {/* Navigation Arrows */}
//           <button
//             onClick={prevPlan}
//             disabled={isSliding}
//             className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200 disabled:opacity-50"
//           >
//             <ChevronLeft className="h-4 w-4 text-gray-600" />
//           </button>

//           <button
//             onClick={nextPlan}
//             disabled={isSliding}
//             className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200 disabled:opacity-50"
//           >
//             <ChevronRight className="h-4 w-4 text-gray-600" />
//           </button>

//           {/* Card Content */}
//           <div
//             className={`transition-all duration-300 ease-in-out ${
//               isSliding ? "opacity-75 scale-95" : "opacity-100 scale-100"
//             }`}
//           >
//             {/* Header */}
//             <div className="p-6 pb-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg md:text-xl font-semibold">
//                   {currentPlan.isActive
//                     ? "Current Subscription"
//                     : currentPlan.name}
//                 </h3>
//                 {currentPlan.isActive ? (
//                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
//                     Active
//                   </span>
//                 ) : (
//                   <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
//                     Available
//                   </span>
//                 )}
//               </div>
//               <p className="text-sm text-gray-600 mt-1">
//                 {currentPlan.description}
//               </p>
//             </div>

//             {/* Content */}
//             <div className="px-6 pb-6 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-sm font-medium text-gray-600">
//                     Plan
//                   </label>
//                   <p className="text-base md:text-lg font-semibold">
//                     {currentPlan.name}
//                   </p>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="text-sm font-medium text-gray-600">
//                     Price
//                   </label>
//                   <p className="text-base md:text-lg font-semibold">
//                     {currentPlan.price}
//                   </p>
//                 </div>
//                 {currentPlan.isActive && (
//                   <>
//                     <div className="space-y-1">
//                       <label className="text-sm font-medium text-gray-600">
//                         Next Billing
//                       </label>
//                       <p className="text-base md:text-lg font-semibold">
//                         {subscription?.next_billing || "N/A"}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <label className="text-sm font-medium text-gray-600">
//                         Dog Size
//                       </label>
//                       <p className="text-base md:text-lg font-semibold">
//                         {subscription?.dog_size || "N/A"}
//                       </p>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Features */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">
//                   What's Included
//                 </label>
//                 <div className="space-y-1">
//                   {currentPlan.features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-2 text-sm"
//                     >
//                       <Check className="h-4 w-4 text-green-600" />
//                       <span>{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <hr className="border-gray-200" />

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 {currentPlan.isActive ? (
//                   <>
//                     <button
//                       onClick={pauseSubscription}
//                       className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-sm"
//                     >
//                       <Pause className="h-4 w-4" />
//                       Pause Subscription
//                     </button>

//                     <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-sm">
//                       <SkipForward className="h-4 w-4" />
//                       Skip Next Box
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={async () => {
//                       if (subscription?.is_active) {
//                         toast.error("Cancel previous subscription first");
//                         return;
//                       }

//                       const token = localStorage.getItem("access");
//                       if (!token) {
//                         toast.error("You must be logged in");
//                         return;
//                       }

//                       try {
//                         const profileRes = await fetch(
//                           `${API_URL}/api/user/profile/`,
//                           {
//                             method: "GET",
//                             headers: {
//                               Authorization: `Bearer ${token}`,
//                               "Content-Type": "application/json",
//                             },
//                           }
//                         );

//                         const profile = await profileRes.json();

//                         const createRes = await fetch(
//                           `${API_URL}/api/checkout/`,
//                           {
//                             method: "POST",
//                             headers: {
//                               Authorization: `Bearer ${token}`,
//                             },
//                             body: JSON.stringify({
//                               selected_plan: currentPlan.id,
//                               billing_type: "monthly",
//                               payment_method: "cod",
//                               use_shipping_as_billing: true,
//                               ...profile,
//                             }),
//                           }
//                         );

//                         if (createRes.ok) {
//                           toast.success("Subscription activated!");
//                           location.reload(); // or trigger a refetch of subscription
//                         } else {
//                           const data = await createRes.json();
//                           toast.error(data?.error || "Failed to switch plan");
//                         }
//                       } catch (err) {
//                         toast.error("Server error");
//                         console.error(err);
//                       }
//                     }}
//                   >
//                     Switch to This Plan
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dots Indicator */}
//         <div className="flex justify-center gap-2 mt-4">
//           {plans.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToPlan(index)}
//               disabled={isSliding}
//               className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                 index === currentIndex
//                   ? "bg-blue-600 w-6"
//                   : "bg-gray-300 hover:bg-gray-400"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Next Box Preview - Only show for active subscription */}
//       {currentPlan.isActive && (
//         <div className="bg-white rounded-xl shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
//           <div className="p-6 pb-4">
//             <h3 className="text-lg md:text-xl font-semibold">
//               Next Box Preview
//             </h3>
//             <p className="text-sm text-gray-600">
//               Curated specially for your pup
//             </p>
//           </div>
//           <div className="px-6 pb-6">
//             <div className="space-y-4">
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border hover:shadow-md transition-shadow duration-200">
//                 <h4 className="font-semibold text-gray-900 mb-2">
//                   {subscription?.next_box?.theme || "No upcoming box"}
//                 </h4>
//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <Calendar className="h-4 w-4" />
//                   Estimated delivery: {subscription?.ship_date || "TBD"}
//                 </div>
//               </div>
//               <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200 text-white py-2 px-4 rounded-lg font-medium">
//                 View Full Preview
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import {
//   Calendar,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Pause,
//   SkipForward,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

// const availablePlans = [
//   {
//     id: "monthly",
//     name: "Monthly",
//     price: "3000 PKR",
//     description: "Perfect for trying out the box monthly",
//     features: [
//       "3-4 quality toys",
//       "Healthy treats",
//       "Size customized",
//       "Standard shipping",
//     ],
//     isActive: false,
//   },
//   {
//     id: "3mo",
//     name: "3 Months",
//     price: "3000 PKR – 5% Off",
//     description: "Best value for short term",
//     features: [
//       "5-6 premium toys",
//       "Healthy treats",
//       "Size customized",
//       "Priority shipping",
//     ],
//     isActive: false,
//   },
//   {
//     id: "6mo",
//     name: "6 Months",
//     price: "3000 PKR – 10% Off",
//     description: "Ideal for committed pup parents",
//     features: [
//       "7-9 premium toys",
//       "Gourmet treats",
//       "Size customized",
//       "Express shipping",
//       "Free monthly surprise",
//     ],
//     isActive: false,
//   },
// ];

// export default function SlidingSubscriptionCards({ subscription }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isSliding, setIsSliding] = useState(false);
//   const [plans, setPlans] = useState([]);
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const [selectedBillingType, setSelectedBillingType] = useState("monthly");

//   useEffect(() => {
//     if (subscription?.is_active) {
//       const currentPlan = {
//         id: "current",
//         name: subscription?.plan || "Current Plan",
//         price: "$29.99/month",
//         description: "Your current active subscription",
//         features: [
//           "5-7 premium toys",
//           "Healthy treats",
//           "Size customized",
//           "Free shipping",
//         ],
//         isActive: true,
//       };
//       setPlans([currentPlan, ...availablePlans]);
//     } else {
//       setPlans(availablePlans);
//     }
//   }, [subscription]);

//   const nextPlan = () => {
//     if (isSliding) return;
//     setIsSliding(true);
//     setCurrentIndex((prev) => (prev + 1) % plans.length);
//     setTimeout(() => setIsSliding(false), 300);
//   };

//   const pauseSubscription = async () => {
//     const token = localStorage.getItem("access");

//     if (!token) {
//       toast.error("Not logged in");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_URL}/api/pause-subscription/`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.ok) {
//         toast.success("Subscription paused!");
//       } else {
//         const data = await res.json();
//         toast.error(data.error || "Failed to pause subscription");
//       }
//     } catch (err) {
//       toast.error("Server error");
//       console.error(err);
//     }
//   };

//   const prevPlan = () => {
//     if (isSliding) return;
//     setIsSliding(true);
//     setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
//     setTimeout(() => setIsSliding(false), 300);
//   };

//   const goToPlan = (index) => {
//     if (isSliding || index === currentIndex) return;
//     setIsSliding(true);
//     setCurrentIndex(index);
//     setTimeout(() => setIsSliding(false), 300);
//   };

//   if (plans.length === 0) return <div>Loading...</div>;

//   const currentPlan = plans[currentIndex];

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
//       <div className="relative">
//         <div className="bg-white rounded-xl shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 overflow-hidden">
//           {/* Navigation Arrows */}
//           <button
//             onClick={prevPlan}
//             disabled={isSliding}
//             className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200 disabled:opacity-50"
//           >
//             <ChevronLeft className="h-4 w-4 text-gray-600" />
//           </button>

//           <button
//             onClick={nextPlan}
//             disabled={isSliding}
//             className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200 disabled:opacity-50"
//           >
//             <ChevronRight className="h-4 w-4 text-gray-600" />
//           </button>

//           {/* Card Content */}
//           <div
//             className={`transition-all duration-300 ease-in-out ${
//               isSliding ? "opacity-75 scale-95" : "opacity-100 scale-100"
//             }`}
//           >
//             <div className="p-6 pb-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg md:text-xl font-semibold">
//                   {currentPlan.isActive
//                     ? "Current Subscription"
//                     : currentPlan.name}
//                 </h3>
//                 {currentPlan.isActive ? (
//                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
//                     Active
//                   </span>
//                 ) : (
//                   <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
//                     Available
//                   </span>
//                 )}
//               </div>
//               <p className="text-sm text-gray-600 mt-1">
//                 {currentPlan.description}
//               </p>
//             </div>

//             <div className="px-6 pb-6 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-sm font-medium text-gray-600">
//                     Plan
//                   </label>
//                   <p className="text-base md:text-lg font-semibold">
//                     {currentPlan.name}
//                   </p>
//                 </div>
//                 <div className="space-y-1">
//                   <label className="text-sm font-medium text-gray-600">
//                     Price
//                   </label>
//                   <p className="text-base md:text-lg font-semibold">
//                     {currentPlan.price}
//                   </p>
//                 </div>
//                 {currentPlan.isActive && (
//                   <>
//                     <div className="space-y-1">
//                       <label className="text-sm font-medium text-gray-600">
//                         Next Billing
//                       </label>
//                       <p className="text-base md:text-lg font-semibold">
//                         {subscription?.next_billing || "N/A"}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <label className="text-sm font-medium text-gray-600">
//                         Dog Size
//                       </label>
//                       <p className="text-base md:text-lg font-semibold">
//                         {subscription?.dog_size || "N/A"}
//                       </p>
//                     </div>
//                   </>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">
//                   What's Included
//                 </label>
//                 <div className="space-y-1">
//                   {currentPlan.features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-2 text-sm"
//                     >
//                       <Check className="h-4 w-4 text-green-600" />
//                       <span>{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <hr className="border-gray-200" />

//               <div className="flex flex-col sm:flex-row gap-3">
//                 {currentPlan.isActive ? (
//                   <>
//                     <button
//                       onClick={pauseSubscription}
//                       className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-sm"
//                     >
//                       <Pause className="h-4 w-4" />
//                       Pause Subscription
//                     </button>

//                     <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-sm">
//                       <SkipForward className="h-4 w-4" />
//                       Skip Next Box
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={async () => {
//                       if (subscription?.is_active) {
//                         toast.error("Cancel previous subscription first");
//                         return;
//                       }

//                       const token = localStorage.getItem("access");
//                       if (!token) {
//                         toast.error("You must be logged in");
//                         return;
//                       }

//                       try {
//                         const profileRes = await fetch(
//                           `${API_URL}/api/user/profile/`,
//                           {
//                             method: "GET",
//                             headers: {
//                               Authorization: `Bearer ${token}`,
//                               "Content-Type": "application/json",
//                             },
//                           }
//                         );

//                         if (!profileRes.ok) {
//                           toast.error("Failed to fetch profile");
//                           return;
//                         }

//                         const profile = await profileRes.json();

//                         const createRes = await fetch(
//                           `${API_URL}/api/direct-subscription-checkout/`,
//                           {
//                             method: "POST",
//                             headers: {
//                               Authorization: `Bearer ${token}`,
//                               "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify({
//                               selected_plan: currentPlan.id,
//                               billing_type: selectedBillingType, // e.g. "monthly" ya "yearly"
//                               payment_method: selectedPaymentMethod, // e.g. "cod" ya "stripe"
//                               use_shipping_as_billing: true,
//                             }),
//                           }
//                         );

//                         if (createRes.ok) {
//                           toast.success("Subscription activated!");
//                           location.reload();
//                         } else {
//                           const data = await createRes.json();
//                           toast.error(data?.error || "Failed to switch plan");
//                         }
//                       } catch (err) {
//                         toast.error("Server error");
//                         console.error(err);
//                       }
//                     }}
//                     className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-sm"
//                   >
//                     Switch to This Plan
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center gap-2 mt-4">
//           {plans.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToPlan(index)}
//               disabled={isSliding}
//               className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                 index === currentIndex
//                   ? "bg-blue-600 w-6"
//                   : "bg-gray-300 hover:bg-gray-400"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {currentPlan.isActive && (
//         <div className="bg-white rounded-xl shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
//           <div className="p-6 pb-4">
//             <h3 className="text-lg md:text-xl font-semibold">
//               Next Box Preview
//             </h3>
//             <p className="text-sm text-gray-600">
//               Curated specially for your pup
//             </p>
//           </div>
//           <div className="px-6 pb-6">
//             <div className="space-y-4">
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border hover:shadow-md transition-shadow duration-200">
//                 <h4 className="font-semibold text-gray-900 mb-2">
//                   {subscription?.next_box?.theme || "No upcoming box"}
//                 </h4>
//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <Calendar className="h-4 w-4" />
//                   Estimated delivery: {subscription?.ship_date || "TBD"}
//                 </div>
//               </div>
//               <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200 text-white py-2 px-4 rounded-lg font-medium">
//                 View Full Preview
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  SkipForward,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const availablePlans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "3000 PKR",
    description: "Perfect for trying out the box monthly",
    features: [
      "3-4 quality toys",
      "Healthy treats",
      "Size customized",
      "Standard shipping",
    ],
    isActive: false,
  },
  {
    id: "3mo",
    name: "3 Months",
    price: "3000 PKR – 5% Off",
    description: "Best value for short term",
    features: [
      "5-6 premium toys",
      "Healthy treats",
      "Size customized",
      "Priority shipping",
    ],
    isActive: false,
  },
  {
    id: "6mo",
    name: "6 Months",
    price: "3000 PKR – 10% Off",
    description: "Ideal for committed pup parents",
    features: [
      "7-9 premium toys",
      "Gourmet treats",
      "Size customized",
      "Express shipping",
      "Free monthly surprise",
    ],
    isActive: false,
  },
];

export default function SlidingSubscriptionCards({ subscription }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [plans, setPlans] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Dynamic states for billing type and payment method
  const [selectedBillingType, setSelectedBillingType] = useState("monthly"); // or "yearly"
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod"); // or "stripe"

  useEffect(() => {
    if (subscription?.is_active) {
      const currentPlan = {
        id: "current",
        name: subscription?.plan || "Current Plan",
        price: "$29.99/month",
        description: "Your current active subscription",
        features: [
          "5-7 premium toys",
          "Healthy treats",
          "Size customized",
          "Free shipping",
        ],
        isActive: true,
      };
      setPlans([currentPlan, ...availablePlans]);
    } else {
      setPlans(availablePlans);
    }
  }, [subscription]);

  const nextPlan = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prev) => (prev + 1) % plans.length);
    setTimeout(() => setIsSliding(false), 300);
  };

  const pauseSubscription = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      toast.error("Not logged in");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/pause-subscription/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Subscription paused!");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to pause subscription");
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  const prevPlan = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
    setTimeout(() => setIsSliding(false), 300);
  };

  const goToPlan = (index) => {
    if (isSliding || index === currentIndex) return;
    setIsSliding(true);
    setCurrentIndex(index);
    setTimeout(() => setIsSliding(false), 300);
  };

  if (plans.length === 0) return <div>Loading...</div>;

  const currentPlan = plans[currentIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <div className="relative">
        <div className="bg-white rounded-xl shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={prevPlan}
            disabled={isSliding}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>

          <button
            onClick={nextPlan}
            disabled={isSliding}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>

          {/* Card Content */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isSliding ? "opacity-75 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold">
                  {currentPlan.isActive
                    ? "Current Subscription"
                    : currentPlan.name}
                </h3>
                {currentPlan.isActive ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    Active
                  </span>
                ) : (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    Available
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {currentPlan.description}
              </p>
            </div>

            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    Plan
                  </label>
                  <p className="text-base md:text-lg font-semibold">
                    {currentPlan.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    Price
                  </label>
                  <p className="text-base md:text-lg font-semibold">
                    {currentPlan.price}
                  </p>
                </div>
                {currentPlan.isActive && (
                  <>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-600">
                        Next Billing
                      </label>
                      <p className="text-base md:text-lg font-semibold">
                        {subscription?.next_billing || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-600">
                        Dog Size
                      </label>
                      <p className="text-base md:text-lg font-semibold">
                        {subscription?.dog_size || "N/A"}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  What's Included
                </label>
                <div className="space-y-1">
                  {currentPlan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Billing type and payment method selectors */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div>
                  <label className="block font-medium mb-1">Billing Type</label>
                  <select
                    value={selectedBillingType}
                    onChange={(e) => setSelectedBillingType(e.target.value)}
                    className="border rounded p-2"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Payment Method
                  </label>
                  <select
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="border rounded p-2"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="stripe">Stripe</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {currentPlan.isActive ? (
                  <>
                    <button
                      onClick={pauseSubscription}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-sm"
                    >
                      <Pause className="h-4 w-4" />
                      Pause Subscription
                    </button>

                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-sm">
                      <SkipForward className="h-4 w-4" />
                      Skip Next Box
                    </button>
                  </>
                ) : (
                  <button
                    onClick={async () => {
                      if (subscription?.is_active) {
                        toast.error("Cancel previous subscription first");
                        return;
                      }

                      const token = localStorage.getItem("access");
                      if (!token) {
                        toast.error("You must be logged in");
                        return;
                      }

                      try {
                        // Fetch user profile and dog profile combined (you can make a single endpoint that returns both)
                        const profileRes = await fetch(
                          `${API_URL}/api/user/profile/`,
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        );

                        const dogRes = await fetch(
                          `${API_URL}/api/dog/profile/`,
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        );

                        if (!profileRes.ok || !dogRes.ok) {
                          toast.error("Failed to fetch profile data");
                          return;
                        }

                        const profile = await profileRes.json();
                        const dogProfile = await dogRes.json();

                        // Merge profile and dogProfile into one object for order creation
                        const orderData = {
                          selected_plan: currentPlan.id,
                          billing_type: selectedBillingType,
                          payment_method: selectedPaymentMethod,
                          use_shipping_as_billing: true,
                          ...profile,
                          ...dogProfile,
                        };

                        const createRes = await fetch(
                          `${API_URL}/api/direct-subscription-checkout/`,
                          {
                            method: "POST",
                            headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(orderData),
                          }
                        );

                        if (createRes.ok) {
                          toast.success("Subscription activated!");
                          location.reload();
                        } else {
                          const data = await createRes.json();
                          toast.error(data?.error || "Failed to switch plan");
                        }
                      } catch (err) {
                        toast.error("Server error");
                        console.error(err);
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-sm"
                  >
                    Switch to This Plan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPlan(index)}
              disabled={isSliding}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {currentPlan.isActive && (
        <div className="bg-white rounded-xl shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
          <div className="p-6 pb-4">
            <h3 className="text-lg md:text-xl font-semibold">
              Next Box Preview
            </h3>
            <p className="text-sm text-gray-600">
              Curated specially for your pup
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border hover:shadow-md transition-shadow duration-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {subscription?.next_box?.theme || "No upcoming box"}
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Estimated delivery: {subscription?.ship_date || "TBD"}
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200 text-white py-2 px-4 rounded-lg font-medium">
                View Full Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
