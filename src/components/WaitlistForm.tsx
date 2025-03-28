
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const specialties = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrics",
  "Obstetrics & Gynecology",
  "Psychiatry",
  "Cardiology",
  "Dermatology",
  "Gastroenterology",
  "Orthopedics",
  "Neurology",
  "Other"
];

const WaitlistForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    specialty: '',
    currentSituation: '',
    additionalInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, specialty: value });
  };

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, currentSituation: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Insert data into Supabase
      const { error: supabaseError } = await supabase
        .from('waitlist_submissions')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          specialty: formData.specialty,
          current_situation: formData.currentSituation,
          additional_info: formData.additionalInfo
        });
        
      if (supabaseError) throw supabaseError;
      
      // Show success toast
      toast({
        title: "Waitlist Application Received",
        description: "Thank you for your interest! We'll be in touch soon about next steps.",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        specialty: '',
        currentSituation: '',
        additionalInfo: ''
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your application. Please try again.');
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-accent/20" id="waitlist">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Exclusive Physician Network
            </h2>
            <p className="text-xl text-gray-600">
              Be among the first physicians to transform your career with our practice ownership model.
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialty">Medical Specialty</Label>
              <Select value={formData.specialty} onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label>Current Practice Situation</Label>
              <RadioGroup value={formData.currentSituation} onValueChange={handleRadioChange} required>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Employed" id="employed" />
                  <Label htmlFor="employed">Employed Physician</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Resident/Fellow" id="resident" />
                  <Label htmlFor="resident">Resident/Fellow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Independent Practice" id="independent" />
                  <Label htmlFor="independent">Independent Practice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
              <Textarea 
                id="additionalInfo" 
                name="additionalInfo" 
                placeholder="Tell us about your practice goals, timeline, or any questions you have."
                value={formData.additionalInfo} 
                onChange={handleChange} 
                className="min-h-[100px]"
              />
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? "Submitting..." : "Apply to Join Waitlist"}
            </Button>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              By applying, you'll receive updates about our network launch and physician opportunities. We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
