
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HykrLogo } from "@/components/HykrLogo";
import Map from "@/components/Map";

// Mock driver data
const mockDrivers = [
  { 
    id: "driver-1", 
    name: "Michael Chen", 
    rating: 4.8, 
    vehicleModel: "Toyota Prius", 
    licensePlate: "ECO-8472", 
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    eta: "3 min",
    lat: 40.712, 
    lng: -74.01, 
    type: 'driver' as const, 
    status: 'available' as const 
  },
  { 
    id: "driver-2", 
    name: "Sarah Johnson", 
    rating: 4.9, 
    vehicleModel: "Tesla Model 3", 
    licensePlate: "ZRO-1234", 
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    eta: "5 min",
    lat: 40.715, 
    lng: -74.008, 
    type: 'driver' as const, 
    status: 'available' as const 
  }
];

const mockRiders = [
  { id: "rider-1", lat: 40.7128, lng: -74.006, type: 'rider' as const },
];

const DriverAllocation = () => {
  const navigate = useNavigate();
  const [selectedDriver, setSelectedDriver] = useState<typeof mockDrivers[0] | null>(null);
  const [showUnavailableMessage, setShowUnavailableMessage] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(15);
  const [unavailableDriverId, setUnavailableDriverId] = useState<string | null>(null);

  // When the component loads, randomly select a driver
  useEffect(() => {
    const initialDriver = mockDrivers[0];
    setSelectedDriver(initialDriver);
    
    // Simulate a scenario where the first driver becomes unavailable
    const timer = setTimeout(() => {
      setShowUnavailableMessage(true);
      setUnavailableDriverId(initialDriver.id);
      
      // Start countdown
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // Select a new driver after countdown
            setSelectedDriver(mockDrivers[1]);
            setShowUnavailableMessage(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(countdownInterval);
      };
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleConfirmRide = () => {
    navigate("/boarding");
  };

  const handleCancel = () => {
    navigate("/booking");
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
        {/* Driver Details */}
        <Card className="h-fit lg:col-span-1 shadow-md border-none animate-slide-up">
          <CardContent className="pt-6">
            {/* Driver Unavailable Alert */}
            {showUnavailableMessage && (
              <div className="mb-6 p-4 rounded-lg bg-hykr-warning/10 border border-hykr-warning text-hykr-warning animate-pulse-gentle">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="font-medium">Driver is no longer available</p>
                    <p className="text-sm">Finding a new driver for you in {countdown} seconds...</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-xl font-semibold text-foreground mb-4">Your Driver</div>
            
            {selectedDriver && (
              <div className={`space-y-4 transition-opacity duration-300 ${unavailableDriverId === selectedDriver.id && showUnavailableMessage ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex items-center">
                  <div className="relative">
                    <img 
                      src={selectedDriver.photoUrl} 
                      alt={selectedDriver.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-hykr-green text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
                      {selectedDriver.rating}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <div className="font-medium text-lg">{selectedDriver.name}</div>
                    <div className="text-muted-foreground text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="M4.93 4.93l1.41 1.41" />
                        <path d="M17.66 17.66l1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="M6.34 17.66l-1.41 1.41" />
                        <path d="M19.07 4.93l-1.41 1.41" />
                      </svg>
                      ETA: {selectedDriver.eta}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-secondary rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle</span>
                    <span className="font-medium">{selectedDriver.vehicleModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License Plate</span>
                    <span className="font-medium">{selectedDriver.licensePlate}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm bg-accent p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-hykr-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Eco-friendly vehicle</span>
                  </div>
                  <div className="text-hykr-green-dark">-15% emissions</div>
                </div>
              </div>
            )}
            
            <div className="mt-6 space-y-2">
              <div className="text-sm text-muted-foreground">Trip Details</div>
              <div className="p-4 bg-secondary rounded-lg space-y-3">
                <div className="flex">
                  <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
                  </svg>
                  <div>
                    <div className="text-xs text-muted-foreground">Pick-up</div>
                    <div>Current Location</div>
                  </div>
                </div>
                
                <div className="flex">
                  <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <div className="text-xs text-muted-foreground">Destination</div>
                    <div>Central Park, New York</div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-2 flex justify-between">
                  <div className="text-muted-foreground">Estimated fare</div>
                  <div className="font-medium">$12.50</div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-2">
            <Button 
              onClick={handleConfirmRide} 
              className="w-full bg-primary hover:bg-hykr-teal-dark transition-colors"
              disabled={showUnavailableMessage}
            >
              Confirm Ride
            </Button>
            <Button 
              onClick={handleCancel} 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/10"
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>

        {/* Map View */}
        <div className="lg:col-span-2 rounded-lg shadow-md h-[500px] md:h-[600px] overflow-hidden bg-white animate-fade-in">
          <Map 
            points={[
              ...mockRiders,
              ...(selectedDriver ? [{
                ...selectedDriver,
                status: unavailableDriverId === selectedDriver.id && showUnavailableMessage 
                  ? 'busy' as const 
                  : 'selected' as const
              }] : []),
              ...(showUnavailableMessage && unavailableDriverId === mockDrivers[0].id 
                ? [{ ...mockDrivers[1], status: 'available' as const }] 
                : [])
            ]}
          />
        </div>
      </main>
    </div>
  );
};

export default DriverAllocation;
