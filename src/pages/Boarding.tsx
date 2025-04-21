
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HykrLogo } from "@/components/HykrLogo";
import Map from "@/components/Map";

// Mock data
const driverInfo = {
  id: "driver-2", 
  name: "Sarah Johnson", 
  rating: 4.9, 
  vehicleModel: "Tesla Model 3", 
  licensePlate: "ZRO-1234", 
  photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  eta: "2 min",
  lat: 40.715, 
  lng: -74.008, 
  type: 'driver' as const,
  status: 'selected' as const
};

const mockRiders = [
  { id: "rider-1", lat: 40.7128, lng: -74.006, type: 'rider' as const },
];

// Trip stages
enum TripStage {
  DRIVER_EN_ROUTE = "DRIVER_EN_ROUTE",
  ARRIVED = "ARRIVED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

const Boarding = () => {
  const navigate = useNavigate();
  const [tripStage, setTripStage] = useState<TripStage>(TripStage.DRIVER_EN_ROUTE);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimatedArrival, setEstimatedArrival] = useState(7); // minutes

  // Simulate trip progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (tripStage === TripStage.DRIVER_EN_ROUTE) {
      // Simulate driver arriving after 5 seconds
      timer = setTimeout(() => {
        setTripStage(TripStage.ARRIVED);
      }, 5000);
    } 
    else if (tripStage === TripStage.ARRIVED) {
      // Simulate trip starting after 3 seconds
      timer = setTimeout(() => {
        setTripStage(TripStage.IN_PROGRESS);
      }, 3000);
    }
    else if (tripStage === TripStage.IN_PROGRESS) {
      // Update progress every second
      timer = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1;
          // Update progress based on estimated trip duration (10 minutes)
          const newProgress = Math.min(100, (newTime / (10 * 60)) * 100);
          setProgress(newProgress);
          
          // Update estimated arrival time
          const newEstimated = Math.max(0, 10 - Math.floor(newTime / 60));
          setEstimatedArrival(newEstimated);
          
          // Complete trip after 10 seconds for demo purposes
          if (newTime >= 10) {
            setTripStage(TripStage.COMPLETED);
            clearInterval(timer);
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [tripStage]);

  // Trip status message based on current stage
  const getTripStatusMessage = () => {
    switch (tripStage) {
      case TripStage.DRIVER_EN_ROUTE:
        return "Your driver is on the way";
      case TripStage.ARRIVED:
        return "Your driver has arrived";
      case TripStage.IN_PROGRESS:
        return "You're on your way";
      case TripStage.COMPLETED:
        return "You've arrived at your destination";
      default:
        return "";
    }
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
        {/* Trip Status */}
        <Card className="h-fit lg:col-span-1 shadow-md border-none animate-slide-up">
          <CardContent className="pt-6 space-y-6">
            {/* Trip Stage Banner */}
            <div className={`p-4 rounded-lg ${
              tripStage === TripStage.COMPLETED 
                ? 'bg-hykr-green/20 text-hykr-green-dark' 
                : 'bg-primary/20 text-primary-foreground'
            }`}>
              <div className="flex items-center">
                {tripStage === TripStage.COMPLETED ? (
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-current border-r-transparent animate-spin mr-2"></div>
                )}
                <span className="font-medium">{getTripStatusMessage()}</span>
              </div>
              
              {tripStage === TripStage.IN_PROGRESS && (
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Trip progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="text-sm">
                    Estimated arrival in {estimatedArrival} {estimatedArrival === 1 ? 'minute' : 'minutes'}
                  </div>
                </div>
              )}
            </div>
            
            {/* Driver Details */}
            <div>
              <div className="text-lg font-semibold text-foreground mb-3">Your Driver</div>
              <div className="flex items-center">
                <img 
                  src={driverInfo.photoUrl} 
                  alt={driverInfo.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="ml-3">
                  <div className="font-medium">{driverInfo.name}</div>
                  <div className="text-muted-foreground text-sm flex items-center">
                    <svg className="w-4 h-4 text-hykr-green mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {driverInfo.rating}
                  </div>
                </div>
                <div className="ml-auto">
                  <Button variant="outline" size="sm" className="rounded-full h-10 w-10 p-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.17 8c-.55-.55-1.28-.83-2-.83-1.6 0-3 1.32-3 3 0 .34.06.67.17.97.37.87 1.19 1.59 2.25 1.78.48.09.98.05 1.44-.11.87-.31 1.59-1.11 1.78-2.08.21-1.07-.17-2.19-.97-2.62a2.97 2.97 0 0 0-.67-.11Z" />
                      <path d="M15.17 4c-.55-.55-1.28-.83-2-.83-1.6 0-3 1.32-3 3 0 .34.06.67.17.97.37.87 1.19 1.59 2.25 1.78.48.09.98.05 1.44-.11.87-.31 1.59-1.11 1.78-2.08.21-1.07-.17-2.19-.97-2.62a2.97 2.97 0 0 0-.67-.11Z" />
                      <path d="M10.17 18.66a1.86 1.86 0 0 0-1-.41c-1.1 0-2 .9-2 2 0 .34.09.66.24.94.29.6.92 1.02 1.64 1.02 1.1 0 2-.9 2-2 0-.21-.03-.41-.09-.59-.14-.87-.71-1.61-1.77-1.89-.08-.02-.15-.04-.22-.06-1.25-.31-2.16-1.08-2.16-2 0-.05 0-.09.01-.14.11-1.11 1.56-1.81 3.07-1.81.29 0 .57.03.84.09" />
                      <path d="M9 10c0-1.66 1.34-3 3-3h0c-1.66 0-3-1.34-3-3 0 1.66-1.34 3-3 3 1.66 0 3 1.34 3 3Z" />
                      <path d="M10 18a8 8 0 1 1 8-8" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full h-10 w-10 p-0 ml-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Vehicle Details */}
            <div className="p-4 bg-secondary rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vehicle</span>
                <span className="font-medium">{driverInfo.vehicleModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">License Plate</span>
                <span className="font-medium">{driverInfo.licensePlate}</span>
              </div>
            </div>
            
            {/* Trip Details */}
            <div className="space-y-2">
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
              </div>
            </div>
            
            {/* Carbon Footprint */}
            <div className="flex items-center justify-between text-sm bg-accent p-4 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-hykr-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M17 3v5h5" />
                  <path d="M3 9v3h3" />
                  <path d="M9 21a9 9 0 0 0 9-9 9.75 9.75 0 0 0-2.74-6.73L14 4" />
                </svg>
                <span>Carbon saved</span>
              </div>
              <div className="text-hykr-green-dark font-medium">1.23 kg CO₂</div>
            </div>
            
            {/* Action Buttons */}
            {tripStage === TripStage.COMPLETED ? (
              <Button 
                onClick={() => navigate("/")} 
                className="w-full bg-hykr-green hover:bg-hykr-green-dark transition-colors"
              >
                Return Home
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full border-primary text-primary hover:bg-primary/10"
              >
                Emergency Contact
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Map View */}
        <div className="lg:col-span-2 rounded-lg shadow-md h-[500px] md:h-[600px] overflow-hidden bg-white animate-fade-in">
          <Map 
            points={[
              ...mockRiders,
              driverInfo
            ]}
          />
          
          {/* Overlay for trip status */}
          <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg shadow-md border-l-4 border-primary">
            <div className="font-medium">{getTripStatusMessage()}</div>
            {tripStage === TripStage.IN_PROGRESS && (
              <div className="text-sm text-muted-foreground">
                Arrival in {estimatedArrival} {estimatedArrival === 1 ? 'minute' : 'minutes'}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Boarding;
