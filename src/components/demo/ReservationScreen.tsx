import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft } from 'lucide-react';

interface ReservationScreenProps {
  location: any;
  onPaymentComplete: () => void;
  onBack: () => void;
}

const ReservationScreen: React.FC<ReservationScreenProps> = ({ 
  location, 
  onPaymentComplete,
  onBack
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!location) {
    location = {
      address: '123 Bee Street, Fort Lauderdale, FL',
      price: '$2,500 / month',
    };
  }
  
  // Calculate the reservation fee (10% of monthly rent)
  const monthlyPrice = parseInt(location.price.replace(/\D/g, ''));
  const reservationFee = monthlyPrice * 0.1;

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing for 2 seconds
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Show success message for 2 seconds before proceeding
      setTimeout(() => {
        onPaymentComplete();
      }, 2000);
    }, 2000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
          <p className="text-gray-600 mb-4">Please wait while we process your payment...</p>
          <p className="text-sm text-gray-500">This will only take a moment</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your reservation has been confirmed.</p>
          <p className="text-sm text-gray-500">Redirecting to document management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 flex justify-center">
      <div className="max-w-3xl w-full">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Practice Selection
        </Button>

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
            onClick={handlePayment}
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
