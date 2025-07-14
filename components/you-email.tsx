"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, ChevronLeft } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

interface DogAccountStepProps {
  formData: any
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

interface FieldErrors {
  [key: string]: string | string[]
}

export default function DogAccountStep({ formData, updateFormData, onNext, onBack }: DogAccountStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [email, setEmail] = useState<string>(formData.email || "")
  const [password, setPassword] = useState<string>(formData.password || "")
  const [confirmPassword, setConfirmPassword] = useState<string>(formData.confirmPassword || "")
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // Sync with parent form data
  useEffect(() => {
    updateFormData("email", email)
  }, [email, updateFormData])

  useEffect(() => {
    updateFormData("password", password)
  }, [password, updateFormData])

  useEffect(() => {
    updateFormData("confirmPassword", confirmPassword)
  }, [confirmPassword, updateFormData])

  // Clear field error when user types
  useEffect(() => {
    if (fieldErrors.email) {
      setFieldErrors(prev => ({ ...prev, email: "" }))
    }
  }, [email])

  useEffect(() => {
    if (fieldErrors.password) {
      setFieldErrors(prev => ({ ...prev, password: "" }))
    }
  }, [password])

  useEffect(() => {
    if (fieldErrors.password_confirm) {
      setFieldErrors(prev => ({ ...prev, password_confirm: "" }))
    }
  }, [confirmPassword])

  // Email validation
  const emailValid = useMemo(() => {
    return /^\S+@\S+\.\S+$/.test(email)
  }, [email])

  // Password strength evaluation
  const passwordScore = useMemo(() => {
    let score = 0
    if (password.length >= 8) score++         // length
    if (/[A-Z]/.test(password)) score++       // uppercase
    if (/[0-9]/.test(password)) score++       // number
    if (/[^A-Za-z0-9]/.test(password)) score++ // special char
    return score
  }, [password])

  const passwordStrength = useMemo(() => {
    if (passwordScore <= 1) return "Weak"
    if (passwordScore <= 3) return "Medium"
    return "Strong"
  }, [passwordScore])

  // Determine if all fields are valid (basic client-side validation)
  const isValid = email && password && confirmPassword

  const getAllergies = (): string => {
    if (!formData.dogAllergies || formData.dogAllergies.length === 0) {
      return "NONE";
    }
    
    // If "none" is selected, return NONE
    if (formData.dogAllergies.includes("none")) {
      return "NONE";
    }
    
    // Convert to uppercase and sort for consistency
    return formData.dogAllergies
      .filter((allergy: string) => allergy !== "none")
      .map((allergy: string) => allergy.toUpperCase())
      .sort()
      .join(',');
  };

  const handleNext = async () => {
    if (!isValid) return;
    
    setIsLoading(true);
    setApiError("");
    setFieldErrors({});

    try {
      // Debug: Log what we're sending
      console.log('Form data being sent:', {
        dogName: formData.dogName,
        dogGender: formData.gender,
        dogSize: formData.dogSize,
        dogAllergies: formData.dogAllergies,
        dogBreeds: formData.dogBreeds
      });
      
      // Prepare form data for API
      const apiFormData = new FormData();
      
      // Append all required fields
      apiFormData.append("email", email);
      apiFormData.append("password", password);
      apiFormData.append("password_confirm", confirmPassword);
      apiFormData.append("dog_name", formData.dogName || "");
      // apiFormData.append("dog_gender", formData.gender === "male" ? "M" : "F");
      // apiFormData.append("dog_size", formData.dogSize?.charAt(0).toUpperCase() || "M");
      apiFormData.append("dog_gender", formData.gender === "male" ? "boy" : "girl");
      apiFormData.append("dog_size", formData.dogSize);  // it should already be "small", "medium", or "large"
      // apiFormData.append("dog_birth_date", formatBirthDate());
      apiFormData.append("dog_birth_date", formData.dogBirthdate || formatBirthDate());
      apiFormData.append("dog_toy_preference", getToyPreference());
      apiFormData.append("dog_breeds", getDogBreeds());
      
      // Handle allergies
      const allergiesString = getAllergies();
      console.log('Allergies being sent:', allergiesString);
      apiFormData.append("dog_allergies", allergiesString);
      
      // Debug: Log FormData contents
      for (let [key, value] of apiFormData.entries()) {
        console.log(`${key}:`, value);
      }
      
      // Append dog photo if available
      if (formData.dogImage) {
        apiFormData.append("dog_photo", formData.dogImage);
      }

      // Submit to API with proper headers for FormData
      const response = await fetch(`${API_URL}/api/signup/`, {
        method: "POST",
        body: apiFormData,
        // Don't set Content-Type header - let the browser set it with boundary
      });
      
      const result = await response.json();
      if (response.ok) {
        // Store user ID and proceed
        updateFormData("user_id", result.user_id);
        onNext();
      } else {
        // Handle errors from Django
        if (result.field_errors) {
          // Set field-specific errors
          setFieldErrors(result.field_errors);
          
          // Also set general error if provided
          if (result.detail) {
            setApiError(result.detail);
          } else {
            // Create a general error message from field errors
            const firstError = Object.values(result.field_errors)[0];
            if (firstError) {
              if (Array.isArray(firstError)) {
                setApiError(firstError[0] || "Validation error");
              } else if (typeof firstError === 'object') {
                setApiError("Validation error occurred");
              } else {
                setApiError(String(firstError));
              }
            } else {
              setApiError("Please correct the errors below.");
            }
          }
        } else if (result.errors) {
          // Handle the original error format
          const errors: FieldErrors = {};
          for (const [field, fieldErrors] of Object.entries(result.errors)) {
            if (Array.isArray(fieldErrors)) {
              errors[field] = fieldErrors[0];
            } else {
              errors[field] = fieldErrors as string;
            }
          }
          setFieldErrors(errors);
          setApiError(result.detail || "Please correct the errors below.");
        } else {
          // Fallback error message
          setApiError(result.detail || result.message || "Signup failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get error message for a field
  const getFieldError = (fieldName: string): string => {
    const error = fieldErrors[fieldName];
    if (!error) return "";
    
    if (Array.isArray(error)) {
      return error[0] || "";
    } else if (typeof error === 'object') {
      // Handle object errors (shouldn't happen but just in case)
      return JSON.stringify(error);
    } else {
      return String(error);
    }
  };

  // Helper functions to format data for API
  const formatBirthDate = () => {
    if (!formData.dogBirthMonth || !formData.dogBirthYear) return "";
    
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const monthIndex = months.indexOf(formData.dogBirthMonth);
    const month = (monthIndex + 1).toString().padStart(2, "0");
    const day = formData.dogBirthDay?.padStart(2, "0") || "01";
    
    return `${formData.dogBirthYear}-${month}-${day}`;
  };

  const getToyPreference = () => {
    if (!formData.toy) return "P";
    return formData.toy === "squeaky" ? "P" : "D";
  };

  const getDogBreeds = () => {
    if (!formData.dogBreeds) return "";
    
    return formData.dogBreeds
      .map((breed: string) => breed === "other" ? formData.otherBreed : breed)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step 7 of 12</span>
            <span className="text-sm text-gray-600">58% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-bhau to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: '58%' }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 space-y-6">
          {/* General Error Alert */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Signup Failed</p>
                <p className="text-sm">{apiError}</p>
              </div>
            </div>
          )}

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">
              What is your email?
            </h2>
          </div>
          
          <div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email..."
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                getFieldError('email') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-bhau'
              }`}
            />
            {getFieldError('email') && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('email')}
              </p>
            )}
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">
              Set a Password
            </h2>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password..."
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                getFieldError('password') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-bhau'
              }`}
            />
            {getFieldError('password') && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('password')}
              </p>
            )}
            {password && !getFieldError('password') && (
              <div className="mt-2">
                <p className={`text-sm ${
                  passwordStrength === "Weak" ? "text-red-500" :
                  passwordStrength === "Medium" ? "text-yellow-500" : "text-green-500"
                }`}>Password Strength: {passwordStrength}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className={`h-2 rounded-full transition-all duration-300 ${
                    passwordStrength === "Weak" ? "bg-red-500 w-1/4" :
                    passwordStrength === "Medium" ? "bg-yellow-500 w-1/2" : "bg-green-500 w-full"
                  }`}></div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bhau mb-2">
              Confirm Password
            </h2>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password..."
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                getFieldError('password_confirm') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-bhau'
              }`}
            />
            {getFieldError('password_confirm') && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('password_confirm')}
              </p>
            )}
          </div>

          {/* Display all field errors for any other fields */}
          {Object.entries(fieldErrors).map(([field, error]) => {
            if (!['email', 'password', 'password_confirm'].includes(field) && error) {
              // Convert error to string properly
              let errorMessage = '';
              if (Array.isArray(error)) {
                errorMessage = error[0] || 'Invalid value';
              } else if (typeof error === 'object') {
                errorMessage = JSON.stringify(error);
              } else {
                errorMessage = String(error);
              }
              
              return (
                <p key={field} className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">{field}:</span> {errorMessage}
                </p>
              );
            }
            return null;
          })}

          <p className="text-gray-600 text-sm sm:text-base">
            By clicking "Continue", you agree to our Terms and Privacy Policy.
          </p>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <ChevronLeft size={16} />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isValid || isLoading}
              className="bg-gradient-to-r from-bhau to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2 min-w-[120px] justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}