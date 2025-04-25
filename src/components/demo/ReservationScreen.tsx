
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ReservationScreenProps {
  location: any;
  onPaymentComplete: () => void;
}

const ReservationScreen: React.FC<ReservationScreenProps> = ({ 
  location, 
  onPaymentComplete 
}) => {
  if (!location) {
    location = {
      address: '123 Bee Street, Fort Lauderdale, FL',
      price: '$8,500 / month',
    };
  }
  
  // Calculate the reservation fee (10% of monthly rent)
  const monthlyPrice = parseInt(location.price.replace(/\D/g, ''));
  const reservationFee = monthlyPrice * 0.1;

  return (
    <div className="min-h-screen bg-background py-12 px-4 flex justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Complete Your Reservation</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Order Summary</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-medium">{location.address}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Rate:</span>
                <span className="font-medium">{location.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Reservation Fee (10%):</span>
                <span className="font-medium">${reservationFee.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold">Total Due Today:</span>
                  <span className="font-bold">${reservationFee.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Payment Method</h2>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg flex items-center">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">Saved Card</div>
                <div className="font-medium">•••• •••• •••• 4242</div>
                <div className="text-sm text-muted-foreground">Expires 12/27</div>
              </div>
              <Check className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button 
            onClick={onPaymentComplete}
            size="lg"
            className="px-8"
          >
            Pay ${reservationFee.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationScreen;
