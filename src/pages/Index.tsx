import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HykrLogo } from "@/components/HykrLogo";
import HomeHeroMap from "@/components/HomeHeroMap";
import { Quote, User, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BeautifulLocationsMarquee from "@/components/BeautifulLocationsMarquee";

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("riders");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <header className="py-4 px-6 border-b border-gray-200">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <HykrLogo />
          
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="link" className="text-foreground hover:text-primary">How It Works</Button>
            <Button variant="link" className="text-foreground hover:text-primary">Safety</Button>
            <Button variant="link" className="text-foreground hover:text-primary">About Us</Button>
            <Button variant="link" className="text-foreground hover:text-primary">Help</Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary hidden md:inline-flex"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button 
              className="bg-primary hover:bg-hykr-blue-dark transition-colors"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </nav>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-[#cee6ff] to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Sustainable Urban <span className="text-primary">Mobility</span> for Everyone
            </h1>
            <p className="text-lg text-muted-foreground">
              Experience eco-friendly transportation with Hykr. Book a ride, track your carbon savings, and help build a greener future.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-hykr-blue-dark transition-colors text-lg"
                onClick={() => navigate("/login")}
              >
                Book a Ride
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary/10 text-lg"
                onClick={() => navigate("/driver-dashboard")}
              >
                Become a Driver
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in flex items-center justify-center">
            <HomeHeroMap />
          </div>
        </div>
      </section>
      
      {/* ------------- NEW "Change the Narrative" Section ------------- */}
      <section className="py-16 px-6 bg-[#f5fbff]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-hykr-blue mb-2">Change the Narrative of Long-Distance Journeys</h2>
          <p className="text-lg text-foreground">
            HYKR is here to change the narrative of long-distance journeys, making them more memorable and stress-free.
            <br />
            Say goodbye to environmental disturbances, flight delays, high travel costs, and all the discomforts that come with traditional travel.
          </p>
          <div className="flex justify-center mt-6">
            <Button
              size="lg"
              className="bg-primary hover:bg-hykr-blue-dark text-lg"
              onClick={() => navigate("/booking")}
            >
              Start Planning Your Trip
            </Button>
          </div>
        </div>
      </section>
      {/* ------------------------------------------------------------- */}

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Hykr</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform offers a modern, convenient way to get around while prioritizing sustainability and rider experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-secondary rounded-lg p-6 hover:shadow-md transition-shadow animate-slide-up">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Eco-Friendly Fleet</h3>
            <p className="text-muted-foreground">
              Our vehicles are electric or hybrid, reducing emissions with every trip you take.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-secondary rounded-lg p-6 hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-muted-foreground">
              Get to your destination quickly with our efficient routing and nearby driver allocation.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-secondary rounded-lg p-6 hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15v2" />
                <path d="M12 11v2" />
                <path d="M12 7v2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
            <p className="text-muted-foreground">
              Compare fares before booking and enjoy affordable rates with no hidden charges.
            </p>
          </div>
        </div>
      </section>
      
      {/* Tabbed Section */}
      <section className="py-16 px-6 bg-accent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Experience Hykr</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you're a rider looking for convenient transportation or a driver wanting to earn, Hykr has you covered.
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === "riders" 
                    ? "bg-primary text-white" 
                    : "bg-transparent text-foreground hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("riders")}
              >
                For Riders
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === "drivers" 
                    ? "bg-primary text-white" 
                    : "bg-transparent text-foreground hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("drivers")}
              >
                For Drivers
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {activeSection === "riders" ? (
              <>
                <div className="space-y-6 animate-slide-up order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-foreground">Get around with ease</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">1</div>
                      <div>
                        <div className="font-medium">Request a ride in seconds</div>
                        <div className="text-muted-foreground">Enter your destination and pickup location</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">2</div>
                      <div>
                        <div className="font-medium">Get matched with a nearby driver</div>
                        <div className="text-muted-foreground">Our system finds you the closest available vehicle</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">3</div>
                      <div>
                        <div className="font-medium">Track your ride in real-time</div>
                        <div className="text-muted-foreground">Monitor your driver's location and ETA on the map</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">4</div>
                      <div>
                        <div className="font-medium">Pay securely and rate your trip</div>
                        <div className="text-muted-foreground">Cashless payment and feedback system</div>
                      </div>
                    </li>
                  </ul>
                  <Button 
                    className="bg-primary hover:bg-hykr-teal-dark transition-colors"
                    onClick={() => navigate("/login")}
                  >
                    Book Your First Ride
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-xl order-1 md:order-2 animate-fade-in">
                  <img 
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1400&fit=crop" 
                    alt="Person using the Hykr app" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="rounded-lg overflow-hidden shadow-xl animate-fade-in">
                  <img 
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&fit=crop" 
                    alt="Hykr driver with car" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="space-y-6 animate-slide-up">
                  <h3 className="text-2xl font-bold text-foreground">Drive with Hykr</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">1</div>
                      <div>
                        <div className="font-medium">Flexible hours, consistent earnings</div>
                        <div className="text-muted-foreground">Drive when it works for you and earn competitive rates</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">2</div>
                      <div>
                        <div className="font-medium">Easy-to-use driver app</div>
                        <div className="text-muted-foreground">Navigate and manage rides with our intuitive platform</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">3</div>
                      <div>
                        <div className="font-medium">Weekly payments</div>
                        <div className="text-muted-foreground">Get paid directly to your bank account</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">4</div>
                      <div>
                        <div className="font-medium">Support when you need it</div>
                        <div className="text-muted-foreground">24/7 support team to help with any issues</div>
                      </div>
                    </li>
                  </ul>
                  <Button 
                    className="bg-primary hover:bg-hykr-teal-dark transition-colors"
                    onClick={() => navigate("/driver-dashboard")}
                  >
                    Start Driving
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* ------------- "Book a Ride" Section ------------- */}
      <section className="py-12 px-6 bg-[#eef8ff]">
        <div className="max-w-3xl mx-auto rounded-2xl shadow-xl bg-white/80 text-center p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-hykr-blue mb-3">
            Ready to Experience Seamless Travel?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Book your ride with Hykr and enjoy a comfortable, eco-friendly journey.
          </p>
          <Button
            size="lg"
            className="bg-hykr-blue hover:bg-hykr-blue-dark text-white text-lg"
            onClick={() => navigate("/booking")}
          >
            Book a Ride Now
          </Button>
        </div>
      </section>
      {/* -------------------------------------------------------- */}

      {/* ------------------- TESTIMONIALS SECTION ------------------- */}
      <section className="py-16 px-6 bg-[#f5fbff]">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Riders Say</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the difference Hykr makes in long-distance journeys, from stress-free travel to earth-friendly rides.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-4">
            <Quote className="w-10 h-10 text-hykr-blue mb-2" />
            <p className="text-lg text-foreground italic">
              "Hykr totally changed how I travel. It's comfortable and affordable—plus I love reducing my carbon footprint!"
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Avatar>
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=720&h=720&fit=crop" 
                  alt="Amara T." 
                  className="object-cover w-12 h-12 rounded-full"
                />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div>
                <span className="font-semibold text-hykr-blue">Amara T.</span>
                <span className="block text-xs text-muted-foreground">Rider</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-4">
            <Quote className="w-10 h-10 text-hykr-blue mb-2" />
            <p className="text-lg text-foreground italic">
              "No more worrying about delays or high costs. Hykr is reliable and my go-to for all long trips!"
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Avatar>
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=720&h=720&fit=crop" 
                  alt="Jide O." 
                  className="object-cover w-12 h-12 rounded-full"
                />
                <AvatarFallback>JO</AvatarFallback>
              </Avatar>
              <div>
                <span className="font-semibold text-hykr-blue">Jide O.</span>
                <span className="block text-xs text-muted-foreground">Family Traveler</span>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-4">
            <Quote className="w-10 h-10 text-hykr-blue mb-2" />
            <p className="text-lg text-foreground italic">
              "Hands down the best ride platform—easy app, friendly drivers, and great for the planet."
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Avatar>
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=720&h=720&fit=crop" 
                  alt="Lola S." 
                  className="object-cover w-12 h-12 rounded-full"
                />
                <AvatarFallback>LS</AvatarFallback>
              </Avatar>
              <div>
                <span className="font-semibold text-hykr-blue">Lola S.</span>
                <span className="block text-xs text-muted-foreground">Frequent Traveler</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ----------------- END TESTIMONIALS SECTION ------------------ */}

      {/* ------------------ BEAUTIFUL LOCATIONS MARQUEE ------------------ */}
      <BeautifulLocationsMarquee />
      {/* ----------------- END BEAUTIFUL LOCATIONS MARQUEE ------------------ */}

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary/20 to-[#cee6ff]/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Experience Hykr?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of satisfied users who choose eco-friendly urban mobility every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-hykr-blue-dark transition-colors"
              onClick={() => navigate("/login")}
            >
              Book a Ride
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => navigate("/driver-dashboard")}
            >
              Become a Driver
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <HykrLogo className="text-white mb-4" />
            <p className="text-gray-300">
              Reimagining urban mobility with eco-friendly transportation solutions.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.689.073-4.948.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Safety</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Download</h3>
            <div className="space-y-2">
              <a href="#" className="block">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
              </a>
              <a href="#" className="block">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Hykr. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
