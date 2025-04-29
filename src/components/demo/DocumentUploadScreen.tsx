
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Upload, ChevronLeft, ChevronRight, X, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DocumentUploadScreenProps {
  onContinue: () => void;
}

const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = ({ onContinue }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLicenseUploaded, setIsLicenseUploaded] = useState(false);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleUploadClick = () => {
    setShowFileDialog(true);
  };

  const handleFileSelect = (file: string) => {
    setSelectedFile(file);
  };

  const handleConfirmSelection = () => {
    if (selectedFile) {
      setShowFileDialog(false);
      setIsUploading(true);
      setSelectedFile(null);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setIsLicenseUploaded(true);
          setIsUploading(false);
        }
      }, 200);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold mr-2">2</div>
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
                  <td className="py-3">Business EIN</td>
                  <td className="text-right">
                    <span className="inline-flex items-center text-green-600">
                      <Check className="mr-1 h-5 w-5" /> Verified
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Liability Insurance</td>
                  <td className="text-right">
                    <span className="inline-flex items-center text-green-600">
                      <Check className="mr-1 h-5 w-5" /> Verified
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Medical License</td>
                  <td className="text-right">
                    {isLicenseUploaded ? (
                      <span className="inline-flex items-center text-green-600">
                        <Check className="mr-1 h-5 w-5" /> Verified
                      </span>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleUploadClick}
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
                <p className="text-sm mb-2">Uploading Medical_License.pdf...</p>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" disabled>Back</Button>
          <Button onClick={onContinue} disabled={!isLicenseUploaded}>
            {isLicenseUploaded ? 'Continue' : 'Upload & Continue'}
          </Button>
        </div>
      </div>

      {/* File Selection Dialog */}
      {showFileDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[800px] h-[500px] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span>Documents</span>
                  <ChevronRight className="h-4 w-4" />
                  <span>Medical Practice</span>
                  <ChevronRight className="h-4 w-4" />
                  <span className="font-medium">License Documents</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowFileDialog(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* File Browser */}
            <div className="flex-1 p-4 overflow-auto">
              <div className="grid grid-cols-3 gap-4">
                {/* Legal Documents */}
                <div className="col-span-3">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">License Documents</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={`flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedFile === 'medical_license' ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => handleFileSelect('medical_license')}
                    >
                      <FileText className={`h-12 w-12 ${selectedFile === 'medical_license' ? 'text-primary' : 'text-gray-400'} mb-2`} />
                      <span className="text-sm font-medium text-center">medical_license.pdf</span>
                      <span className="text-xs text-gray-500">1.8 MB</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 cursor-not-allowed opacity-50">
                      <FileText className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-center">board_certification.pdf</span>
                      <span className="text-xs text-gray-500">2.4 MB</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 cursor-not-allowed opacity-50">
                      <FileText className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-center">insurance_certificate.pdf</span>
                      <span className="text-xs text-gray-500">3.2 MB</span>
                    </div>
                  </div>
                </div>

                {/* Practice Documents */}
                <div className="col-span-3">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Practice Documents</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 cursor-not-allowed opacity-50">
                      <FileText className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-center">business_plan.docx</span>
                      <span className="text-xs text-gray-500">1.5 MB</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 cursor-not-allowed opacity-50">
                      <FileText className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-center">equipment_list.xlsx</span>
                      <span className="text-xs text-gray-500">0.8 MB</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 cursor-not-allowed opacity-50">
                      <FileText className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-center">staff_credentials.pdf</span>
                      <span className="text-xs text-gray-500">2.1 MB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-100 px-4 py-3 flex justify-end gap-2 border-t">
              <Button variant="outline" onClick={() => {
                setShowFileDialog(false);
                setSelectedFile(null);
              }}>
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmSelection}
                disabled={!selectedFile}
              >
                Select
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadScreen;
