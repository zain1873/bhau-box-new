"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChangeEvent, useEffect, useState } from "react"

interface DogCheckoutStepProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export default function DogCheckoutStep({ formData, updateFormData, onNext, onBack }: DogCheckoutStepProps) {
  // Payment and account states
  const [method, setMethod] = useState<string>(formData.paymentMethod || "cod")
  const [cardName, setCardName] = useState<string>(formData.cardName || "")
  const [cardNumber, setCardNumber] = useState<string>(formData.cardNumber || "")
  const [expDate, setExpDate] = useState<string>(formData.expDate || "")
  const [cvc, setCvc] = useState<string>(formData.cvc || "")
  const [emailOrLogin, setEmailOrLogin] = useState<string>(formData.emailOrLogin || "")
  const [receiveOffers, setReceiveOffers] = useState<boolean>(formData.receiveOffers || false)

  // Shipping address
  const [firstName, setFirstName] = useState<string>(formData.firstName || "")
  const [lastName, setLastName] = useState<string>(formData.lastName || "")
  const [company, setCompany] = useState<string>(formData.company || "")
  const [address, setAddress] = useState<string>(formData.address || "")
  const [address2, setAddress2] = useState<string>(formData.address2 || "")
  const [city, setCity] = useState<string>(formData.city || "")
  const [stateRegion, setStateRegion] = useState<string>(formData.stateRegion || "")
  const [zip, setZip] = useState<string>(formData.zip || "")
  const [country, setCountry] = useState<string>(formData.country || "United States")
  const [sameAsBilling, setSameAsBilling] = useState<boolean>(formData.sameAsBilling ?? true)
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
  setMethod(formData.paymentMethod || "cod");
}, [formData.paymentMethod]);

  // Sync formData
  useEffect(() => { updateFormData("paymentMethod", method) }, [method])
  useEffect(() => { updateFormData("cardName", cardName) }, [cardName])
  useEffect(() => { updateFormData("cardNumber", cardNumber) }, [cardNumber])
  useEffect(() => { updateFormData("expDate", expDate) }, [expDate])
  useEffect(() => { updateFormData("cvc", cvc) }, [cvc])
  useEffect(() => { updateFormData("emailOrLogin", emailOrLogin) }, [emailOrLogin])
  useEffect(() => { updateFormData("receiveOffers", receiveOffers) }, [receiveOffers])
  useEffect(() => { updateFormData("firstName", firstName) }, [firstName])
  useEffect(() => { updateFormData("lastName", lastName) }, [lastName])
  useEffect(() => { updateFormData("company", company) }, [company])
  useEffect(() => { updateFormData("address", address) }, [address])
  useEffect(() => { updateFormData("address2", address2) }, [address2])
  useEffect(() => { updateFormData("city", city) }, [city])
  useEffect(() => { updateFormData("stateRegion", stateRegion) }, [stateRegion])
  useEffect(() => { updateFormData("zip", zip) }, [zip])
  useEffect(() => { updateFormData("country", country) }, [country])
  useEffect(() => { updateFormData("sameAsBilling", sameAsBilling) }, [sameAsBilling])

  const handleNext = async () => {
    if (method === 'stripe') {
  try {
    const res = await fetch(`${API_URL}/api/create-checkout-session`, {
      method: 'POST',
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return;
    }
  } catch (err) {
    console.error("Stripe checkout error:", err);
  }
}

  const addressValid = firstName && lastName && address && city && stateRegion && zip
  const payValid = method === 'cod' || (cardName && cardNumber && expDate && cvc)

  if (!addressValid || !payValid) return

  const apiFormData = new FormData()
  apiFormData.append("email", formData.email)
  apiFormData.append("selected_plan", formData.plan)
  apiFormData.append("billing_type", formData.plan === '6_month' ? "prepaid" : "monthly")
  apiFormData.append("first_name", firstName)
  apiFormData.append("last_name", lastName)
  apiFormData.append("address", address)
  apiFormData.append("city", city)
  apiFormData.append("state", stateRegion)
  apiFormData.append("zip", zip)
  apiFormData.append("payment_method", method || "cod")

  console.log("📦 Final Order Checkout Data:", Object.fromEntries(apiFormData.entries()))

  try {
    const res = await fetch(`${API_URL}/api/checkout/`, {
      method: "POST",
      body: apiFormData
    })

    if (!res.ok) throw new Error("Checkout failed")

    const data = await res.json()
    console.log("✅ Order Response:", data)
    onNext()
  } catch (err) {
    console.error("❌ Error submitting order:", err)
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8">
        {/* Left: Checkout Form */}
        <div>
          <Card className="p-6 space-y-6">
            {/* Express Checkout & Login */}
            <div className="space-y-2">
              <h2 className="font-bold text-lg">Express checkout</h2>
              <p className="text-gray-600 text-sm">
                By continuing with your payment, you agree to the future charges listed on this page and the cancellation policy.
              </p>
              <Button size="sm" className="w-full">Continue with PayPal</Button>
              <p className="text-center text-sm">OR</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Contact</Button>
                <Button variant="outline" size="sm" className="flex-1">Log in</Button>
              </div>
              {emailOrLogin && (
                <p className="text-center text-sm text-gray-700">{emailOrLogin}</p>
              )}
            </div>

            {/* Offers Opt-in */}
            <div className="flex items-center">
              <input
                id="offers"
                type="checkbox"
                checked={receiveOffers}
                onChange={() => setReceiveOffers(prev => !prev)}
                className="mr-2"
              />
              <label htmlFor="offers" className="text-sm text-gray-700">
                Send me offers that keep my pup happy and dog jokes that make me chuckle.
              </label>
            </div>

            {/* Delivery Address */}
            <div className="space-y-4">
              <h2 className="font-bold text-lg">Delivery Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
                />
              </div>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Company (optional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
              />
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
              />
              <input
                type="text"
                value={address2}
                onChange={e => setAddress2(e.target.value)}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
              />
              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
                />
                <select
                  value={stateRegion}
                  onChange={e => setStateRegion(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
                >
                  <option value="">State / Region</option>
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option>Arizona</option>
                  {/* add more as needed */}
                </select>
                <input
                  type="text"
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                  placeholder="ZIP code"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
                />
              </div>
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                placeholder="Country"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
              />
              <p className="text-sm">
                <input
                  type="checkbox"
                  checked={sameAsBilling}
                  onChange={() => setSameAsBilling(prev => !prev)}
                  className="mr-2"
                />
                Use shipping address as billing address
              </p>
            </div>

            {/* Shipping Method */}
            <div className="space-y-2">
              <h2 className="font-bold text-lg">Shipping Method</h2>
              <p className="text-gray-600 text-sm">
                Enter your shipping address to view available shipping methods.
              </p>
            </div>

            {/* Payment Method */}
            {/* Payment Method */}
<div className="space-y-4">
  <h2 className="font-bold text-lg">Payment</h2>
  

  {/* Only COD Option */}
  <div className="grid sm:grid-cols-3 gap-4">
    <Card
  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
    formData.paymentMethod === 'stripe' ? 'ring-2 ring-bhau bg-blue-50' : 'hover:shadow-lg'
  }`}
  onClick={() => {
    updateFormData("paymentMethod", "stripe");
    setMethod("stripe");
  }}
>
  <CardContent className="p-4 text-center">
    <p className="font-semibold text-gray-800">Pay with Card (Stripe)</p>
  </CardContent>
</Card>


    <Card
      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
        formData.paymentMethod === 'cod' ? 'ring-2 ring-bhau bg-blue-50' : 'hover:shadow-lg'
      }`}
      onClick={() =>{ updateFormData("paymentMethod", "cod");
        setMethod("cod");
      }
      }
      
    >
      <CardContent className="p-4 text-center">
        <p className="font-semibold text-gray-800">Cash on Delivery</p>
      </CardContent>
    </Card>
  </div>
</div>


            {/* Submit */}
            <div className="pt-4">
              <Button
                onClick={handleNext}
                // disabled={
                //   !firstName || !lastName || !address || !city || !stateRegion || !zip || (method !== 'cod' && !(cardName && cardNumber && expDate && cvc))
                // }
                disabled={
  !firstName || !lastName || !address || !city || !stateRegion || !zip
}

                className="w-full bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full"
              >
                Submit Order
              </Button>
            </div>

            {/* Recurring disclaimer */}
            <p className="text-gray-600 text-xs mt-2">
              One or more items in your cart is a deferred or recurring purchase. By continuing with your payment, you agree that your payment method will automatically be charged at the price and frequency listed on this page until your subscription ends. All cancellations are subject to the cancellation policy.
            </p>
          </Card>
        </div>

        {/* Right: Order Summary */}
        <div>
          <Card className="p-6 space-y-6">
            <h2 className="font-bold text-lg">Order Summary</h2>
            <div className="overflow-y-auto max-h-60 space-y-4">
              {/* Example item */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded" />
                <div className="flex-1 space-y-1">
                  <p className="font-semibold">BARK 6 Month Subscription</p>
                  <p className="text-sm text-gray-600">Super Chewer / Small Dog / Obsessed: 3 Toys, 2 Treats, 1 Chew - Allergy Free</p>
                  <p className="text-sm text-gray-600">Delivered every month.</p>
                  <p className="text-sm text-gray-600">Dog Name: {formData.dogName}</p>
                </div>
                <p className="font-semibold">PKR 44,000</p>
              </div>
            </div>

            {/* Discount Code */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Discount code or gift card"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bhau"
              />
              <Button size="sm" variant="outline">Apply</Button>
            </div>

            {/* Cost Summary */}
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>PKR 44,000</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Calculated at next step</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span>PKR 44,000</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
