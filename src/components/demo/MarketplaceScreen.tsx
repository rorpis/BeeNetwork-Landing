import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, MapPin, Search, Star, TrendingDown, Users } from 'lucide-react';
import Map from './Map';
import useEmblaCarousel from 'embla-carousel-react';

// Fort Lauderdale coordinates
const FORT_LAUDERDALE_COORDS: [number, number] = [26.1224, -80.1373];

interface MarketplaceScreenProps {
  onLocationSelect: (location: any) => void;
  onContinue: () => void;
}

const locationData = {
  id: 1,
  address: '123 Bee Street, Fort Lauderdale, FL',
  doctors: [
    { name: 'Dr. Smith', specialty: 'Cardiologist', rating: 4.8, reviews: 124 },
    { name: 'Dr. Lee', specialty: 'Neurologist', rating: 4.9, reviews: 89 },
    { name: 'Dr. Patel', specialty: 'Pediatrician', rating: 4.7, reviews: 156 }
  ],
  price: '$8,500',
  marketComparison: '20% below market average',
  publishedDate: '8 days ago',
  amenities: ['Modern Equipment', 'Parking Available', 'Break Room'],
  images: [
    '/lovable-uploads/b0d2383a-53cd-4cdf-9173-447ee47f096c.png',
    '/lovable-uploads/d279ab32-44e0-473f-bc4b-f419642be4d8.png',
  ]
};

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({ onLocationSelect, onContinue }) => {
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const handlePinClick = () => {
    setShowLocationDetails(true);
    onLocationSelect(locationData);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Enhanced Header with Filters */}
      <div className="w-full bg-background border-b px-6 py-3">
        <div className="flex items-center gap-8">
          <div className="w-[300px]">
            <div className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Fort Lauderdale, FL</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
            </div>
          </div>
          
          <div className="flex-1 flex items-center gap-4">
            {/* Lease type segmented control */}
            <div className="bg-muted p-1 rounded-lg flex items-center">
              <Button 
                variant="ghost" 
                className="text-muted-foreground px-6 rounded-md transition-colors hover:bg-transparent disabled:hover:bg-transparent" 
                disabled
              >
                Buy
              </Button>
              <Button 
                variant="ghost" 
                className="text-muted-foreground px-6 rounded-md transition-colors hover:bg-transparent disabled:hover:bg-transparent" 
                disabled
              >
                Lease
              </Button>
              <Button 
                variant="default" 
                className="px-6 shadow-sm"
              >
                Sublease
              </Button>
            </div>

            {/* Filter buttons */}
            <div className="flex-1 flex items-center justify-end gap-4">
              <Button variant="ghost" className="text-muted-foreground w-[120px] justify-between" disabled>
                <span>Amenities</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button variant="ghost" className="text-muted-foreground w-[120px] justify-between" disabled>
                <span>Rent</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button variant="ghost" className="text-muted-foreground w-[120px] justify-between" disabled>
                <span>Size</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="text-muted-foreground w-[120px]" disabled>All Filters</Button>
              <Button variant="ghost" className="text-muted-foreground w-[100px]" disabled>Clear</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area with map and details panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map section */}
        <div className={`${showLocationDetails ? 'w-[60%]' : 'w-full'} relative`}>
          <div className="absolute inset-0">
            <Map onPinClick={handlePinClick} />
          </div>
        </div>
        
        {/* Details panel */}
        {showLocationDetails && (
          <div className="w-[40%] bg-background border-l flex flex-col max-h-full">
            <div className="flex-1 overflow-y-auto">
              <Card className="border-0 rounded-none h-full">
                <CardHeader className="p-0 relative">
                  <Badge className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground">
                    <CalendarDays className="w-3 h-3 mr-1" />
                    {locationData.publishedDate}
                  </Badge>
                  <Carousel 
                    className="w-full relative"
                    ref={emblaRef}
                  >
                    <CarouselContent>
                      {locationData.images.map((image, i) => (
                        <CarouselItem key={i} className="basis-full">
                          <div className="relative">
                            <img 
                              src={image} 
                              alt={`Location view ${i+1}`} 
                              className="w-full h-64 object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="absolute bottom-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">
                        <span className="text-xs">{currentSlide + 1} / {locationData.images.length}</span>
                      </Badge>
                    </div>
                  </Carousel>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Address Section */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <h2 className="text-xl font-bold">{locationData.address}</h2>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {locationData.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline">{amenity}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{locationData.price}</span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-emerald-600">
                      <TrendingDown className="w-4 h-4" />
                      {locationData.marketComparison}
                    </div>
                  </div>

                  {/* Doctors Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">Current Practitioners</h3>
                    </div>
                    <div className="space-y-4">
                      {locationData.doctors.map((doctor, index) => (
                        <div key={index} className="bg-secondary/10 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{doctor.name}</h4>
                              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-xs" disabled>
                              See Bio
                            </Button>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-sm">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{doctor.rating}</span>
                            <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 sticky bottom-0 bg-background border-t p-4">
                  <Button variant="outline" className="w-full">Book a Tour</Button>
                  <Button onClick={onContinue} className="w-full">Confirm Space</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceScreen;
