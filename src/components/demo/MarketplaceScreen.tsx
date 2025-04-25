import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { MapPin } from 'lucide-react';

interface MarketplaceScreenProps {
  onLocationSelect: (location: any) => void;
  onContinue: () => void;
}

const locationData = {
  id: 1,
  address: '123 Bee Street, Fort Lauderdale, FL',
  doctors: ['Dr. Smith', 'Dr. Lee', 'Dr. Patel'],
  price: '$8,500 / month',
  images: [
    '/lovable-uploads/b0d2383a-53cd-4cdf-9173-447ee47f096c.png',
    '/lovable-uploads/d279ab32-44e0-473f-bc4b-f419642be4d8.png',
  ]
};

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({ onLocationSelect, onContinue }) => {
  const [showLocationDetails, setShowLocationDetails] = useState(false);

  const handlePinClick = () => {
    setShowLocationDetails(true);
    onLocationSelect(locationData);
  };

  return (
    <div className={`min-h-screen flex ${showLocationDetails ? 'flex-col md:flex-row' : 'flex-col'}`}>
      {/* Map Header */}
      <div className="w-full bg-background border-b px-6 py-3 flex justify-center gap-4">
        <Button variant="outline" disabled>Buy</Button>
        <Button variant="outline" disabled>Lease</Button>
        <Button variant="default">Sublease</Button>
      </div>
      
      {/* Map section (adjusts width based on details panel) */}
      <div className={`w-full ${showLocationDetails ? 'md:w-[70%]' : 'w-full'} h-[calc(100vh-64px)] relative`}>
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          {/* Mock map container */}
          <div className="w-full h-full bg-gray-300 relative">
            <img 
              src="https://maps.googleapis.com/maps/api/staticmap?center=Fort+Lauderdale,FL&zoom=13&size=800x800&maptype=roadmap&key=AIzaSyBVvrihP-GJ0QpMVLBOA-QKSVhbkXn7pKo" 
              alt="Fort Lauderdale Map"
              className="w-full h-full object-cover opacity-70"
            />
            
            {/* Main pin that user must click */}
            <div 
              className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-pulse"
              onClick={handlePinClick}
            >
              <MapPin className="w-10 h-10 text-primary drop-shadow-md" strokeWidth={3} />
              
              {/* Tooltip */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg w-48 text-center">
                <p className="text-sm font-medium">Click here to view this location</p>
                <div className="arrow-down absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-white border-l-transparent border-r-transparent"></div>
              </div>
            </div>
            
            {/* Other inactive pins */}
            <div className="absolute left-[30%] top-[30%]">
              <MapPin className="w-6 h-6 text-gray-400" />
            </div>
            <div className="absolute left-[70%] top-[40%]">
              <MapPin className="w-6 h-6 text-gray-400" />
            </div>
            <div className="absolute left-[20%] top-[60%]">
              <MapPin className="w-6 h-6 text-gray-400" />
            </div>
            <div className="absolute left-[60%] top-[70%]">
              <MapPin className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Details panel (30% when visible) */}
      {showLocationDetails && (
        <div className="w-full md:w-[30%] p-4 bg-background overflow-y-auto">
          <Card className="animate-fade-in">
            <CardHeader className="p-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {locationData.images.map((image, i) => (
                    <CarouselItem key={i}>
                      <img 
                        src={image} 
                        alt={`Location view ${i+1}`} 
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </CardHeader>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Location Details</h2>
              <div className="space-y-2 mb-4">
                <div className="flex">
                  <span className="font-medium w-1/3">Address:</span>
                  <span>{locationData.address}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Current Doctors:</span>
                  <span>{locationData.doctors.length} ({locationData.doctors.join(', ')})</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Price:</span>
                  <span className="font-semibold">{locationData.price}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full">Book a Tour</Button>
              <Button onClick={onContinue} className="w-full">Confirm Space</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MarketplaceScreen;
