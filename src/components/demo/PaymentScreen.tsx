import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PaymentScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onContinue, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Wait 2 seconds on success screen before proceeding
      setTimeout(() => {
        onContinue();
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Payment Information</CardTitle>
          <CardDescription>
            Complete your payment to secure your medical practice location
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isProcessing && !isSuccess ? (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456" 
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cardholder Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CVV</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground">
                  Process Payment
                </Button>
              </div>
            </form>
          ) : isProcessing ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
              <p className="text-lg font-medium text-gray-700">Processing your payment...</p>
              <p className="text-sm text-gray-500">This may take a few moments</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <p className="text-lg font-medium text-gray-700">Payment Successful!</p>
              <p className="text-sm text-gray-500">Redirecting to document management...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentScreen; 