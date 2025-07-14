"use client"
import SlidingSubscriptionCards from '@/components/SlidingSubscriptionCards'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"


import {
  Calendar,
  ChevronDown,
  Clock,
  Edit,
  Gift,
  Heart,
  HelpCircle,
  History,
  LogOut,
  Menu,
  MessageCircle,
  Package,
  Send,
  Settings,
  User
} from "lucide-react"
import { useEffect, useState } from "react"

export default function PetDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [chatMessage, setChatMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0])
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [dog, setDog] = useState(null)
  const [boxHistory, setBoxHistory] = useState([]);
// const [subscription, setSubscription] = useState(null);
const [subscriptionStats, setSubscriptionStats] = useState<any>(null);
// const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0]);

const [userData, setUserData] = useState({
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
});


  // const stats = [
  //   {
  //     title: "Boxes Delivered",
  //     value: 12,
  //     icon: Package,
  //     color: "bg-blue-50 text-blue-600 border-blue-200",
  //     iconBg: "bg-blue-100",
  //     gradient: "from-blue-400 to-blue-600",
  //   },
  //   {
  //     title: "Toys Loved",
  //     value: 48,
  //     icon: Heart,
  //     color: "bg-pink-50 text-pink-600 border-pink-200",
  //     iconBg: "bg-pink-100",
  //     gradient: "from-pink-400 to-pink-600",
  //   },
  //   {
  //     title: "Treats Enjoyed",
  //     value: 24,
  //     icon: Gift,
  //     color: "bg-green-50 text-green-600 border-green-200",
  //     iconBg: "bg-green-100",
  //     gradient: "from-green-400 to-green-600",
  //   },
  //   {
  //     title: "Next Delivery",
  //     value: "null",
  //     icon: Calendar,
  //     color: "bg-orange-50 text-orange-600 border-orange-200",
  //     iconBg: "bg-orange-100",
  //     gradient: "from-orange-400 to-orange-600",
  //   },
  // ]

  const [stats, setStats] = useState([
  {
    title: "Boxes Delivered",
    value: 0,
    icon: Package,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    iconBg: "bg-blue-100",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    title: "Toys Loved",
    value: 0,
    icon: Heart,
    color: "bg-pink-50 text-pink-600 border-pink-200",
    iconBg: "bg-pink-100",
    gradient: "from-pink-400 to-pink-600",
  },
  {
    title: "Treats Enjoyed",
    value: 0,
    icon: Gift,
    color: "bg-green-50 text-green-600 border-green-200",
    iconBg: "bg-green-100",
    gradient: "from-green-400 to-green-600",
  },
  {
    title: "Until valid",
    value: "Loading...",
    icon: Calendar,
    color: "bg-orange-50 text-orange-600 border-orange-200",
    iconBg: "bg-orange-100",
    gradient: "from-orange-400 to-orange-600",
  },
]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Package },
    { id: "boxes", label: "My Boxes", icon: History },
    { id: "profile", label: "Dog Profile", icon: User },
    { id: "chat", label: "Vet Chat", icon: MessageCircle },
    { id: "account", label: "Account", icon: Settings },
  ]


const [subscription, setSubscription] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("access");
  if (!token) return;

  fetch(`${API_URL}/api/current-subscription/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ Subscription data:", data);
      setSubscription(data);
    })
    .catch((err) => {
      console.error("❌ Subscription fetch failed", err);
    });
}, []);

useEffect(() => {
  const token = localStorage.getItem("access");

  fetch(`${API_URL}/api/current-subscription/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const target = [
        data.total_boxes_delivered || 0,
        data.total_toys_delivered || 0,
        data.total_treats_delivered || 0,
      ];

      // Animate values
      target.forEach((num, i) => {
        let current = 0;
        const step = Math.ceil(num / 20);
        const interval = setInterval(() => {
          current += step;
          setAnimatedStats((prev) => {
            const copy = [...prev];
            copy[i] = current > num ? num : current;
            return copy;
          });
          if (current >= num) clearInterval(interval);
        }, 30);
      });

      // Update stats with real data
//       setStats((prev) => {
//   if (!prev || prev.length < 4) return prev; // prevent crash on first render

//   return [
//     { ...prev[0], value: target[0] },
//     { ...prev[1], value: target[1] },
//     { ...prev[2], value: target[2] },
//     { ...prev[3], value: data.ship_date || "N/A" },
//   ];
// });

          setStats((prev) => {
  if (!prev || prev.length < 4) return prev;

  const finalValue =
    data.remaining_months === 0
      ? `Next delivery ${data.next_billing}`
      : `${data.ship_date}`;

  return [
    { ...prev[0], value: data.total_boxes_delivered || 0 },
    { ...prev[1], value: data.total_toys_delivered || 0 },
    { ...prev[2], value: data.total_treats_delivered || 0 },
    { ...prev[3], value: finalValue },
  ];
});

      
    });
}, []);




  



useEffect(() => {
  const fetchBoxHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/box-history/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      const data = await res.json();
      setBoxHistory(data);
    } catch (error) {
      console.error("Failed to fetch box history:", error);
    }
  };

  fetchBoxHistory();
}, []);


useEffect(() => {
  const fetchDog = async () => {
    try {
      const res = await fetch(`${API_URL}/api/dog/profile/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      const data = await res.json();
      setDog(data);
    } catch (err) {
      console.error("Error fetching dog profile", err);
    }
  };

  fetchDog();
}, []);



useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/profile-detail/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("❌ Error response:", res.status, errData);
        return;
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error("❌ Failed to fetch profile:", err);
    }
  };

  fetchProfile();
}, []);

const handleRating = async (boxId: number, rating: number) => {
  try {
    const token = localStorage.getItem("access");
    await fetch(`${API_URL}/api/rate-box/${boxId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating }),
    });

    // Update local state after rating
    setBoxHistory((prev) =>
      prev.map((box) =>
        box.id === boxId ? { ...box, rating } : box
      )
    );
  } catch (error) {
    console.error("Rating failed:", error);
  }
};



const handleSave = async () => {
  try {
    const res = await fetch(`${API_URL}/api/user/profile-detail/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("❌ Backend error:", errorData);
      throw new Error("Update failed");
    }

    const updated = await res.json();
    setUserData(updated);
    alert("✅ Profile updated!");
  } catch (err) {
    console.error("❌ Error saving profile:", err);
    alert("Something went wrong.");
  }
};





  // Loading animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  
  // Animate stats counter
  useEffect(() => {
    if (!isLoading) {
      stats.forEach((stat, index) => {
        if (typeof stat.value === "number") {
          let current = 0
          const increment = stat.value / 30
          const timer = setInterval(() => {
            current += increment
            if (current >= stat.value) {
              current = stat.value
              clearInterval(timer)
            }
            setAnimatedStats((prev) => {
              const newStats = [...prev]
              newStats[index] = Math.floor(current)
              return newStats
            })
          }, 50)
        }
      })
    }
  }, [isLoading])

  useEffect(() => {
  const token = localStorage.getItem("access");

  if (!token) {
    console.warn("⚠️ No access token found in localStorage");
    return;
  }

  fetch(`${API_URL}/api/current-subscription/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error("❌ Failed to fetch subscription", res.status);
        return null;
      }
      return res.json();
    })
    .then((data) => {
      if (data) {
        console.log("✅ Subscription loaded:", data);
        setSubscription(data);
      }
    })
    .catch((err) => console.error("❌ Error fetching subscription:", err));
}, []);



  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-200 rounded-xl h-64"></div>
        <div className="bg-gray-200 rounded-xl h-64"></div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div
      className={`space-y-6 md:space-y-8 transition-all duration-500 ${isLoading ? "opacity-0" : "opacity-100 animate-in slide-in-from-bottom-4"}`}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="animate-in fade-in-50 duration-700">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2 md:gap-3">
                Welcome back, <span className="text-indigo-600">{dog?.name || "Buddy"}</span>!
              <span className="text-2xl md:text-3xl animate-bounce">🐕</span>  </h1>

            <p className="text-base md:text-lg text-gray-600">
              Manage your buddy's subscription and see what's coming next
            </p>
          </div>

          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 flex-class">
  {stats.map((stat, index) => (
    <Card
      key={stat.title}
      className={`border-2 ${stat.color} hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer animate-in slide-in-from-bottom-4`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-3 md:p-6">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-2  gap-10">
          <div className="text-center md:text-left">
            <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
              {stat.title}
            </p>
            <p className="text-xl md:text-3xl font-bold">
              {typeof stat.value === "number" ? animatedStats[index] : stat.value}
            </p>
          </div>
          <div
            className={`p-2 md:p-3 rounded-full ${stat.iconBg} group-hover:scale-110 transition-transform duration-200`}
          >
            <stat.icon className="h-4 w-4 md:h-6 md:w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

            
          </div>

          <SlidingSubscriptionCards subscription={subscription} />
        </>
      )}
    </div>
  )

  
  const renderBoxes = () => (
  <div className="space-y-6 animate-in fade-in-50 duration-500">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Box History</h1>
      <p className="text-gray-600">See all the boxes your pup has received</p>
    </div>

    <div className="grid gap-4">
      {boxHistory.map((box, index) => (
        <Card
          key={box.id}
          className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-blue-100 p-3 rounded-full group-hover:scale-110 transition-transform duration-200">
                  <Package className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg">
                    {`${box.month}/${box.year}`} - {box.box_name}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">{box.box_theme}</p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end gap-2">
                <Badge variant="secondary" className="mb-0 md:mb-2">
                  {box.status}
                </Badge>
                {/* <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className={`h-4 w-4 transition-colors duration-200 ${
                        i < box.rating ? "fill-red-500 text-red-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div> */}
                <div className="flex items-center gap-1">
  {[...Array(5)].map((_, i) => (
    <Heart
      key={i}
      onClick={() => handleRating(box.id, i + 1)}
      className={`h-4 w-4 cursor-pointer transition-colors duration-200 ${
        i < box.rating ? "fill-red-500 text-red-500" : "text-gray-300"
      }`}
    />
  ))}
</div>

              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);


  const renderProfile = () => (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          {/* <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Buddy's Profile</h1>
           */}
           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {dog?.name || "Buddy"}'s Profile
          </h1>

          <p className="text-gray-600">Manage your dog's preferences and information</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            <Avatar className="h-20 w-20 md:h-24 md:w-24 hover:scale-110 transition-transform duration-200">
              {/* <AvatarImage src="/placeholder.svg?height=96&width=96" /> */}
                <AvatarImage src={dog?.image_url || "/placeholder.svg?height=96&width=96"} />

              <AvatarFallback className="text-xl md:text-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                🐕
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Buddy</h2>
              {/* <Badge className="mt-1">Golden Retriever</Badge>
               */}
                  <Badge className="mt-1">
              {dog?.breeds?.join(", ") || "Golden Retriever"}
            </Badge>

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Preferences</h3>
              <div className="space-y-4">
  {[
    { label: "Toy Type", value: dog?.toy_type || "Plush Toys" },
    { label: "Size", value: dog?.size || "Medium (30-60 lbs)" },
  ].map((item, index) => (
    <div
      key={item.label}
      className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 animate-in slide-in-from-left-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Label className="text-gray-600">{item.label}</Label>
      <Badge variant="secondary" className="hover:scale-105 transition-transform duration-200">
        {item.value}
      </Badge>
    </div>
  ))}
</div>

      
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Allergies & Restrictions</h3>
              <div className="space-y-3">
                {dog?.allergies?.length > 0 ? (
                dog.allergies.map((allergy, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:scale-105 transition-transform duration-200"
                  >
                    {allergy}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">No allergies specified</p>
              )}
                              <p className="text-sm text-gray-500 mt-4">
                Last updated: {dog?.updated_at ? new Date(dog.updated_at).toLocaleDateString() : "Not available"}
              </p>

              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderChat = () => (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Vet Chat</h1>
        <p className="text-gray-600">Get expert advice for your furry friend</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg">Quick Consultation</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Start Consultation
            </Button>
            <p className="text-sm text-gray-500 mt-3 text-center">Average response time: 5 minutes</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar className="hover:scale-110 transition-transform duration-200">
                <AvatarFallback className="bg-blue-100 text-blue-600">VS</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">BhauBox Specialist</CardTitle>
                {/* <p className="text-sm text-green-600 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Online
                </p> */}
                <div className="text-sm text-green-600 flex items-center gap-1">
  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
  Online
</div>

              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 md:h-96 p-4 md:p-6 overflow-y-auto space-y-4">
              <div className="flex gap-3 animate-in slide-in-from-left-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">VS</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs hover:shadow-md transition-shadow duration-200">
                  <p className="text-sm">
                    Hello! I'm your BhauBox specialist doctor. How can I help you and Buddy today?
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                </div>
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Type your message about Buddy..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <Button
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700 hover:scale-110 transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )


const renderAccount = () => (
  <div className="space-y-6 animate-in fade-in-50 duration-500">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Account Information</h1>
      <p className="text-gray-600">Manage your account details and preferences</p>
    </div>

    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email (read-only) */}
          <div className="space-y-2 animate-in slide-in-from-bottom-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" value={userData.email} readOnly className="bg-gray-50" />
          </div>

          {/* Full Name */}
          <div className="space-y-2 animate-in slide-in-from-bottom-4">
            <Label htmlFor="name">Full Name</Label>
            {/* <Input
              id="name"
              value={`${userData.first_name} ${userData.last_name}`.trim()}
              onChange={(e) => {
                const parts = e.target.value.split(" ");
                setUserData({
                  ...userData,
                  first_name: parts[0] || "",
                  last_name: parts.slice(1).join(" ") || "",
                });
              }}
            /> */}
            <Input
  id="name"
  value={
    [userData.first_name, userData.last_name].filter(Boolean).join(" ")
  }
  onChange={(e) => {
    const parts = e.target.value.trim().split(" ");
    setUserData({
      ...userData,
      first_name: parts[0] || "",
      last_name: parts.slice(1).join(" ") || "",
    });
  }}
/>

          </div>

          {/* Phone */}
          <div className="space-y-2 animate-in slide-in-from-bottom-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <Separator />

        {/* Shipping Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["address", "city", "state", "zip"].map((key, index) => (
              <div
                key={key}
                className="space-y-2 animate-in slide-in-from-bottom-4"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <Input
                  id={key}
                  value={userData[key]}
                  onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                  placeholder={`Enter your ${key}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);


  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "boxes":
        return renderBoxes()
      case "profile":
        return renderProfile()
      case "chat":
        return renderChat()
      case "account":
        return renderAccount()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                 src="/images/bhau-box-logo-new.png"
                 alt="BhauBox"
                 className="h-6 md:h-8 w-auto hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Right side navigation */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Get Help Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:scale-105 transition-all duration-200"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Get help
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                {/* <DropdownMenuContent align="end" className="w-48 animate-in slide-in-from-top-2">
                  <DropdownMenuItem className="hover:bg-gray-50 transition-colors duration-200">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-50 transition-colors duration-200">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    FAQ
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-50 transition-colors duration-200">
                    <Settings className="h-4 w-4 mr-2" />
                    Help Center
                  </DropdownMenuItem>
                </DropdownMenuContent> */}
                     <DropdownMenuContent align="end" className="w-48 animate-in slide-in-from-top-2">
                  <DropdownMenuItem className="hover:bg-gray-50 transition-colors duration-200" asChild>
                    <Link href="/contact-support" className="flex items-center w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-50 transition-colors duration-200" asChild>
                    <Link href="/faq" className="flex items-center w-full">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      FAQ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-50 transition-colors duration-200" asChild>
                    <Link href="/help-center" className="flex items-center w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Help Center
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                  >
                    <Avatar className="h-7 w-7 md:h-8 md:w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xs md:text-sm">JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">John Doe</span>
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setActiveTab("profile")}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setActiveTab("account")}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem className="text-red-600 focus:text-red-600 hover:bg-red-50 transition-colors duration-200">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
  onClick={() => {
    localStorage.removeItem("access"); // Or whatever token you're using
    localStorage.removeItem("refresh"); // Optional
    window.location.href = "/login"; // Or use next/router if preferred
  }}
  className="text-red-600 focus:text-red-600 hover:bg-red-50 transition-colors duration-200"
>
  <LogOut className="h-4 w-4 mr-2" />
  Logout
</DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Mobile Navigation */}
        <div className="md:hidden mb-6">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Menu className="h-4 w-4" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-2 mt-6">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    onClick={() => {
                      setActiveTab(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`justify-start gap-2 transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <nav className="mb-6 md:mb-8 hidden md:block">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item, index) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    : "hover:bg-gray-100"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </nav>

        <main className="transition-all duration-500">{renderContent()}</main>
      </div>
    </div>
  )
}
