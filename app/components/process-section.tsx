"use client"

export default function ProcessSection() {
  return (
    <div className="min-h-screen bg-white">
      {/* Large top spacer to ensure no overlap with navbar */}
      <div className="h-16 sm:h-20 lg:h-32 bg-white"></div>

      {/* Compact Process Steps Container with extra bottom padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 lg:space-y-12 pb-32 sm:pb-48 lg:pb-64">
        {/* Step 01 - Compact */}
        <div className="bg-gradient-to-r from-bhau to-blue-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
            <div className="text-white space-y-2 sm:space-y-3 lg:space-y-4 text-center lg:text-left">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">01</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Tell us about your best bud</h3>
              <p className="text-sm sm:text-base opacity-90">
                We build a box {"that's"} just as unique as your pup — from allergy-friendly snacks to toys designed for
                their playstyle.
              </p>
            </div>
            <div className="order-first lg:order-last">
              <img
                src="/bestbud.png?height=200&width=350"
                alt="Person with dog at computer"
                className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300 max-h-32 sm:max-h-40 lg:max-h-48 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Step 02 - Compact */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-12 border border-gray-100 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
            <div>
              <img
                src="/pickbudplan.png?height=200&width=350"
                alt="Dogs with BhauBox"
                className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300 max-h-32 sm:max-h-40 lg:max-h-48 object-cover"
              />
            </div>
            <div className="text-bhau space-y-2 sm:space-y-3 lg:space-y-4 text-center lg:text-left">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">02</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">{"Pick your pup's plan"}</h3>
              <p className="text-sm sm:text-base">
                We offer 6- or 12-month subscriptions. Not sure which one to choose? Ask your dog. {"(They'll"} probably
                say 12.) 
              </p>
            </div>
          </div>
        </div>

        {/* Step 03 - Compact */}
        <div className="bg-gradient-to-r from-bhau to-blue-400 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
            <div className="text-white space-y-2 sm:space-y-3 lg:space-y-4 text-center lg:text-left">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">03</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Unbox dog joy every month</h3>
              <p className="text-sm sm:text-base opacity-90">
                Discover new toys, treats, and adventures each month! Also your dog will start to think every package is
                for them. 
              </p>
            </div>
            <div className="order-first lg:order-last">
              <img
                src="/unboxbuddy.png?height=200&width=350"
                alt="Golden retriever with treats and toys"
                className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300 max-h-32 sm:max-h-40 lg:max-h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}