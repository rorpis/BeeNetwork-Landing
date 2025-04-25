
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DocumentUploadScreenProps {
  onContinue: () => void;
}

const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = ({ onContinue }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLeaseUploaded, setIsLeaseUploaded] = useState(false);
  
  const handleUpload = () => {
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsLeaseUploaded(true);
        setIsUploading(false);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold mr-2">1</div>
            <h1 className="text-2xl font-semibold">Upload Documents</h1>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-full bg-primary rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2">Document</th>
                  <th className="text-right pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Articles of Incorporation</td>
                  <td className="text-right">
                    <span className="inline-flex items-center text-green-600">
                      <Check className="mr-1 h-5 w-5" /> Verified
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Insurance Certificate</td>
                  <td className="text-right">
                    <span className="inline-flex items-center text-green-600">
                      <Check className="mr-1 h-5 w-5" /> Verified
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Medical License</td>
                  <td className="text-right">
                    <span className="inline-flex items-center text-green-600">
                      <Check className="mr-1 h-5 w-5" /> Verified
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Business EIN</td>
                  <td className="text-right">
                    <span className="inline-flex items-center text-green-600">
                      <Check className="mr-1 h-5 w-5" /> Verified
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Lease Agreement</td>
                  <td className="text-right">
                    {isLeaseUploaded ? (
                      <span className="inline-flex items-center text-green-600">
                        <Check className="mr-1 h-5 w-5" /> Verified
                      </span>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleUpload}
                        disabled={isUploading}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload
                      </Button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {isUploading && (
              <div className="mt-4">
                <p className="text-sm mb-2">Uploading Lease_Agreement.pdf...</p>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" disabled>Back</Button>
          <Button onClick={onContinue} disabled={!isLeaseUploaded}>
            {isLeaseUploaded ? 'Continue' : 'Upload & Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadScreen;
