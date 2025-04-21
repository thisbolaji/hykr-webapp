
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { HykrLogo } from "@/components/HykrLogo";
import Map from "@/components/Map";

// Mock data for map points
const mockRiders = [
  { id: "rider-1", lat: 40.7128, lng: -74.006, type: 'rider' as const },
];

const mockDrivers = [
  { id: "driver-1", lat: 40.712, lng: -74.01, type: 'driver' as const, status: 'available' as const },
  { id: "driver-2", lat: 40.715, lng: -74.008, type: 'driver' as const, status: 'available' as const },
  { id: "driver-3", lat: 40.710, lng: -74.005, type: 'driver' as const, status: 'available' as const },
  { id: "driver-4", lat: 40.713, lng: -74.002, type: 'driver' as const, status: 'busy' as const },
];

const Booking = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [pickup, setPickup] = useState("Current Location");
  const [isSearchingForRide, setIsSearchingForRide] = useState(false);

  const handleFindRide = () => {
    setIsSearchingForRide(true);
    // Simulate finding a ride
    setTimeout(() => {
      navigate("/driver-allocation");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <HykrLogo />
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">My Rides</Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">Payments</Button>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Booking Form */}
        <Card className="h-fit lg:col-span-1 shadow-md border-none animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-foreground">Book a Ride</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="text-sm text-muted-foreground">Pick-up Location</Label>
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
                </svg>
                <Input
                  id="pickup"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10 bg-white border-input focus:border-primary"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm text-muted-foreground">Where are you going?</Label>
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                  className="pl-10 bg-white border-input focus:border-primary"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleFindRide} 
                className="w-full bg-primary hover:bg-hykr-teal-dark transition-colors"
                disabled={!destination || isSearchingForRide}
              >
                {isSearchingForRide ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Finding drivers...</span>
                  </div>
                ) : (
                  "Find a Ride"
                )}
              </Button>
            </div>
            
            {/* Ride Options - Would expand into fare comparison in a full app */}
            <div className="mt-6 space-y-3">
              <div className="text-sm font-medium text-foreground">Ride Options</div>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="flex flex-col items-center border-2 border-primary bg-accent hover:bg-accent/80 h-auto py-2">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                  <span className="text-xs mt-1">Standard</span>
                  <span className="text-xs font-semibold">$12.50</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center h-auto py-2">
                  <svg className="w-6 h-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="8" width="18" height="10" rx="2" />
                    <path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2" />
                  </svg>
                  <span className="text-xs mt-1">Premium</span>
                  <span className="text-xs font-semibold">$18.75</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center h-auto py-2">
                  <svg className="w-6 h-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v10" />
                    <path d="M16 13H8" />
                    <circle cx="8" cy="18" r="2" />
                    <circle cx="16" cy="18" r="2" />
                    <path d="M6 9h12l-2 4H8l-2-4z" />
                  </svg>
                  <span className="text-xs mt-1">XL</span>
                  <span className="text-xs font-semibold">$24.00</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map View */}
        <div className="lg:col-span-2 rounded-lg shadow-md h-[500px] md:h-[600px] overflow-hidden bg-white animate-fade-in">
          <Map 
            points={[...mockRiders, ...mockDrivers]}
          />
        </div>
      </main>
    </div>
  );
};

export default Booking;
