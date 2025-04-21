
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HykrLogo } from "@/components/HykrLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Map from "@/components/Map";

// Mock data for trip history
const mockTripHistory = [
  {
    id: "trip-001",
    rider: "John Doe",
    origin: "Downtown",
    destination: "Airport",
    date: "2025-04-21",
    time: "14:30",
    amount: "$24.50",
    status: "completed",
  },
  {
    id: "trip-002",
    rider: "Alice Smith",
    origin: "Uptown",
    destination: "City Center",
    date: "2025-04-20",
    time: "15:45",
    amount: "$12.75",
    status: "completed",
  },
  {
    id: "trip-003",
    rider: "Bob Wilson",
    origin: "Central Park",
    destination: "Brooklyn",
    date: "2025-04-19",
    time: "16:15",
    amount: "$32.00",
    status: "completed",
  },
  {
    id: "trip-004",
    rider: "Emma Brown",
    origin: "SoHo",
    destination: "Queens",
    date: "2025-04-18",
    time: "17:30",
    amount: "$28.25",
    status: "canceled",
  },
  {
    id: "trip-005",
    rider: "James Miller",
    origin: "Brooklyn",
    destination: "Manhattan",
    date: "2025-04-17",
    time: "18:00",
    amount: "$18.50",
    status: "completed",
  },
];

// Mock data for earnings
const mockEarnings = [
  {
    id: "earn-001",
    period: "Today",
    trips: 3,
    amount: "$78.25",
    status: "pending",
  },
  {
    id: "earn-002",
    period: "Yesterday",
    trips: 5,
    amount: "$102.50",
    status: "paid",
  },
  {
    id: "earn-003",
    period: "Last Week",
    trips: 24,
    amount: "$465.75",
    status: "paid",
  },
  {
    id: "earn-004",
    period: "This Month",
    trips: 86,
    amount: "$1,248.90",
    status: "paid",
  },
];

// Mock driver data
const driverProfile = {
  name: "Michael Chen",
  photo: "https://randomuser.me/api/portraits/men/32.jpg",
  rating: 4.8,
  vehicle: "Toyota Prius",
  licensePlate: "ECO-8472",
  trips: 148,
  joined: "January 2025",
  status: "active",
};

const mockRideRequests = [
  {
    id: "req-001",
    rider: "Olivia Parker",
    pickup: "Grand Central Terminal",
    destination: "Brooklyn Bridge",
    distance: "3.2 miles",
    fare: "$14.50",
  },
  {
    id: "req-002",
    rider: "Ethan Wilson",
    pickup: "Central Park West",
    destination: "Metropolitan Museum",
    distance: "1.8 miles",
    fare: "$10.25",
  },
];

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showRideRequests, setShowRideRequests] = useState(false);
  const [currentTab, setCurrentTab] = useState("dashboard");

  // Status badge color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
      case "active":
        return "bg-hykr-green text-white";
      case "in-progress":
      case "pending":
        return "bg-primary text-white";
      case "scheduled":
        return "bg-blue-500 text-white";
      case "canceled":
      case "failed":
      case "inactive":
        return "bg-hykr-warning text-white";
      default:
        return "bg-secondary text-foreground";
    }
  };

  const handleRideRequestResponse = (accept: boolean, requestId: string) => {
    if (accept) {
      // In a real app, this would accept the ride and navigate to the trip screen
      console.log(`Accepted ride request ${requestId}`);
    } else {
      // Decline the ride request
      console.log(`Declined ride request ${requestId}`);
    }
    // Remove the request from the list
    setShowRideRequests(false);
  };

  const toggleDriverStatus = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      // Simulate receiving a ride request after going online
      setTimeout(() => {
        setShowRideRequests(true);
      }, 5000);
    } else {
      setShowRideRequests(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <HykrLogo />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch 
                id="driver-status" 
                checked={isOnline}
                onCheckedChange={toggleDriverStatus}
                className={isOnline ? "bg-hykr-green" : ""}
              />
              <Label htmlFor="driver-status" className="font-medium">
                {isOnline ? "Online" : "Offline"}
              </Label>
            </div>
            <Avatar>
              <AvatarImage src={driverProfile.photo} alt={driverProfile.name} />
              <AvatarFallback>{driverProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Driver Profile Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={driverProfile.photo} alt={driverProfile.name} />
              <AvatarFallback>{driverProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{driverProfile.name}</h1>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-hykr-green mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm">{driverProfile.rating}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-primary mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="text-sm">Joined {driverProfile.joined}</span>
                </div>
                <Badge className={getStatusColor(driverProfile.status)}>
                  {driverProfile.status.charAt(0).toUpperCase() + driverProfile.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button className="bg-primary hover:bg-hykr-teal-dark transition-colors">
              Vehicle Details
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Account Settings
            </Button>
          </div>
        </div>

        {/* Ride Request Overlay */}
        {showRideRequests && (
          <div className="mb-8 animate-slide-up">
            <Card className="border-2 border-primary shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2 animate-pulse-gentle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  New Ride Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRideRequests.map((request) => (
                  <div key={request.id} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>{request.rider.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{request.rider}</div>
                          <div className="text-sm text-muted-foreground">Est. fare: {request.fare}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{request.distance}</div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex">
                        <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="10" r="3" />
                          <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
                        </svg>
                        <div>
                          <div className="text-xs text-muted-foreground">Pick-up</div>
                          <div>{request.pickup}</div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <div>
                          <div className="text-xs text-muted-foreground">Destination</div>
                          <div>{request.destination}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-hykr-green hover:bg-hykr-green-dark"
                        onClick={() => handleRideRequestResponse(true, request.id)}
                      >
                        Accept
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-hykr-warning text-hykr-warning hover:bg-hykr-warning/10"
                        onClick={() => handleRideRequestResponse(false, request.id)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Today's Earnings</p>
                  <h3 className="text-3xl font-bold mt-1">$78.25</h3>
                  <p className="text-hykr-green text-sm mt-1">↑ 15% from yesterday</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Total Trips</p>
                  <h3 className="text-3xl font-bold mt-1">{driverProfile.trips}</h3>
                  <p className="text-hykr-green text-sm mt-1">↑ 8% from last month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Ride Acceptance</p>
                  <h3 className="text-3xl font-bold mt-1">92%</h3>
                  <p className="text-hykr-green text-sm mt-1">↑ 3% from last week</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map and Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map showing driver location and hotspots */}
          <div className="lg:col-span-2 h-[400px] rounded-lg overflow-hidden shadow-md animate-fade-in">
            <Map 
              points={[
                { id: "driver-current", lat: 40.7128, lng: -74.006, type: 'driver' as const, status: 'available' as const },
              ]}
            />
            <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md">
              <div className="text-sm font-medium">Current Area</div>
              <div className="text-lg font-bold text-primary">Manhattan, NY</div>
            </div>
          </div>
          
          {/* Tabs for earnings and trips */}
          <Card className="shadow-sm h-fit lg:col-span-1 animate-slide-up">
            <CardContent className="p-0">
              <Tabs defaultValue="earnings" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="earnings">Earnings</TabsTrigger>
                  <TabsTrigger value="trips">Trips</TabsTrigger>
                </TabsList>
                
                {/* Earnings Tab */}
                <TabsContent value="earnings" className="p-4 space-y-4">
                  {mockEarnings.map((earning) => (
                    <div key={earning.id} className="flex justify-between items-center p-3 border-b border-border">
                      <div>
                        <div className="font-medium">{earning.period}</div>
                        <div className="text-sm text-muted-foreground">{earning.trips} trips</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{earning.amount}</div>
                        <Badge className={`text-xs ${getStatusColor(earning.status)}`}>
                          {earning.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                {/* Trips Tab */}
                <TabsContent value="trips" className="p-4 space-y-4">
                  {mockTripHistory.slice(0, 4).map((trip) => (
                    <div key={trip.id} className="border-b border-border pb-3">
                      <div className="flex justify-between mb-1">
                        <div className="font-medium">{trip.rider}</div>
                        <div className="font-bold">{trip.amount}</div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {trip.date} · {trip.time}
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        <span className="text-primary">From:</span>
                        <span className="truncate">{trip.origin}</span>
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        <span className="text-primary">To:</span>
                        <span className="truncate">{trip.destination}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">View All Trips</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;
