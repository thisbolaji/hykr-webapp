
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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

// Mock data for rides
const mockRides = [
  {
    id: "ride-001",
    rider: "John Doe",
    driver: "Michael Chen",
    origin: "Downtown",
    destination: "Airport",
    date: "2025-04-21",
    time: "14:30",
    amount: "$24.50",
    status: "completed",
  },
  {
    id: "ride-002",
    rider: "Alice Smith",
    driver: "Sarah Johnson",
    origin: "Uptown",
    destination: "City Center",
    date: "2025-04-21",
    time: "15:45",
    amount: "$12.75",
    status: "in-progress",
  },
  {
    id: "ride-003",
    rider: "Bob Wilson",
    driver: "David Lee",
    origin: "Central Park",
    destination: "Brooklyn",
    date: "2025-04-21",
    time: "16:15",
    amount: "$32.00",
    status: "scheduled",
  },
  {
    id: "ride-004",
    rider: "Emma Brown",
    driver: "Lisa Wang",
    origin: "SoHo",
    destination: "Queens",
    date: "2025-04-21",
    time: "17:30",
    amount: "$28.25",
    status: "canceled",
  },
  {
    id: "ride-005",
    rider: "James Miller",
    driver: "Kevin Zhang",
    origin: "Brooklyn",
    destination: "Manhattan",
    date: "2025-04-21",
    time: "18:00",
    amount: "$18.50",
    status: "completed",
  },
];

// Mock data for drivers
const mockDrivers = [
  {
    id: "driver-001",
    name: "Michael Chen",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    vehicle: "Toyota Prius",
    rating: 4.8,
    trips: 148,
    earnings: "$1,245.75",
    status: "active",
  },
  {
    id: "driver-002",
    name: "Sarah Johnson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    vehicle: "Tesla Model 3",
    rating: 4.9,
    trips: 112,
    earnings: "$985.50",
    status: "active",
  },
  {
    id: "driver-003",
    name: "David Lee",
    photo: "https://randomuser.me/api/portraits/men/86.jpg",
    vehicle: "Hyundai Ioniq",
    rating: 4.7,
    trips: 95,
    earnings: "$842.25",
    status: "inactive",
  },
  {
    id: "driver-004",
    name: "Lisa Wang",
    photo: "https://randomuser.me/api/portraits/women/67.jpg",
    vehicle: "Nissan Leaf",
    rating: 4.6,
    trips: 78,
    earnings: "$712.80",
    status: "active",
  },
  {
    id: "driver-005",
    name: "Kevin Zhang",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    vehicle: "Chevy Bolt",
    rating: 4.7,
    trips: 86,
    earnings: "$798.40",
    status: "active",
  },
];

// Mock data for remittance
const mockRemittance = [
  {
    id: "rem-001",
    driver: "Michael Chen",
    date: "2025-04-20",
    amount: "$245.75",
    status: "paid",
  },
  {
    id: "rem-002",
    driver: "Sarah Johnson",
    date: "2025-04-20",
    amount: "$185.50",
    status: "pending",
  },
  {
    id: "rem-003",
    driver: "David Lee",
    date: "2025-04-19",
    amount: "$142.25",
    status: "paid",
  },
  {
    id: "rem-004",
    driver: "Lisa Wang",
    date: "2025-04-19",
    amount: "$112.80",
    status: "paid",
  },
  {
    id: "rem-005",
    driver: "Kevin Zhang",
    date: "2025-04-18",
    amount: "$198.40",
    status: "failed",
  },
];

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <HykrLogo />
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              AD
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex gap-3">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-10 w-[240px]"
              />
            </div>
            <Button className="bg-primary hover:bg-hykr-teal-dark transition-colors">
              Export Data
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Total Rides</p>
                  <h3 className="text-3xl font-bold mt-1">1,248</h3>
                  <p className="text-hykr-green text-sm mt-1">↑ 12% from last month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="M12 11h4" />
                    <path d="M12 16h4" />
                    <path d="M8 11h.01" />
                    <path d="M8 16h.01" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Total Revenue</p>
                  <h3 className="text-3xl font-bold mt-1">$12,450</h3>
                  <p className="text-hykr-green text-sm mt-1">↑ 8% from last month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Active Drivers</p>
                  <h3 className="text-3xl font-bold mt-1">42</h3>
                  <p className="text-hykr-green text-sm mt-1">↑ 4% from last month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                    <path d="M12 12v8" />
                    <path d="M8 16h8" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different management sections */}
        <Tabs defaultValue="rides" className="animate-fade-in">
          <TabsList className="mb-6">
            <TabsTrigger value="rides">Rides</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="remittance">Remittance</TabsTrigger>
          </TabsList>
          
          {/* Rides Tab */}
          <TabsContent value="rides" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-0">
                <CardTitle>Recent Rides</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Rider</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell className="font-medium">{ride.id}</TableCell>
                        <TableCell>{ride.rider}</TableCell>
                        <TableCell>{ride.driver}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">From:</span>
                            <span>{ride.origin}</span>
                            <span className="text-xs text-muted-foreground mt-1">To:</span>
                            <span>{ride.destination}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{ride.date}</div>
                          <div className="text-muted-foreground">{ride.time}</div>
                        </TableCell>
                        <TableCell>{ride.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(ride.status)}>
                            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Drivers Tab */}
          <TabsContent value="drivers" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-0">
                <CardTitle>Driver Management</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Trips</TableHead>
                      <TableHead>Earnings</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDrivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={driver.photo} alt={driver.name} />
                              <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-xs text-muted-foreground">{driver.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{driver.vehicle}</TableCell>
                        <TableCell className="flex items-center">
                          <svg className="w-4 h-4 text-hykr-green mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {driver.rating}
                        </TableCell>
                        <TableCell>{driver.trips}</TableCell>
                        <TableCell>{driver.earnings}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(driver.status)}>
                            {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                              </svg>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-hykr-warning">
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Remittance Tab */}
          <TabsContent value="remittance" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-0">
                <CardTitle>Remittance History</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference ID</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRemittance.map((remittance) => (
                      <TableRow key={remittance.id}>
                        <TableCell className="font-medium">{remittance.id}</TableCell>
                        <TableCell>{remittance.driver}</TableCell>
                        <TableCell>{remittance.date}</TableCell>
                        <TableCell>{remittance.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(remittance.status)}>
                            {remittance.status.charAt(0).toUpperCase() + remittance.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 3v1" />
                                <path d="M12 19v1" />
                                <path d="M5 12H4" />
                                <path d="M19 12h1" />
                                <path d="M3.6 3.6l.7.7" />
                                <path d="M16.1 16.1l.7.7" />
                                <path d="M16.8 3.6l-.7.7" />
                                <path d="M6.3 16.8l-.7.7" />
                                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                              </svg>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 14H3" />
                                <path d="M18 8H6" />
                                <path d="M18 17l3 3-3 3" />
                                <path d="M6 4l-3 3 3 3" />
                              </svg>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
