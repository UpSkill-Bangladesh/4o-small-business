
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Steps for the onboarding wizard
const STEPS = [
  'Business Information',
  'Business Type',
  'Location',
  'Industry',
  'Certifications'
];

const BusinessSetup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    dba: '',
    description: '',
    businessType: '',
    companyStructure: '',
    ein: '',
    address: '',
    city: 'New York',
    state: 'NY',
    zipCode: '',
    borough: '',
    industry: '',
    subIndustry: '',
    certifications: {
      mwbe: false,
      sbe: false,
      dbe: false,
      sdvob: false,
      vosb: false,
      none: true
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (name === 'none' && checked) {
      setFormData(prev => ({
        ...prev,
        certifications: {
          mwbe: false,
          sbe: false,
          dbe: false,
          sdvob: false,
          vosb: false,
          none: true
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        certifications: {
          ...prev.certifications,
          [name]: checked,
          none: name !== 'none' && checked ? false : prev.certifications.none
        }
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      completeSetup();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const completeSetup = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Setup complete!",
        description: "Your business profile has been created successfully.",
      });
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Business Information
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business/Legal Name</Label>
              <Input 
                id="businessName" 
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="XYZ Corporation"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dba">DBA (Doing Business As) <span className="text-gray-500 text-xs">(optional)</span></Label>
              <Input 
                id="dba" 
                name="dba"
                value={formData.dba}
                onChange={handleInputChange}
                placeholder="XYZ Services" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Input 
                id="description" 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of your business activities" 
                required
              />
            </div>
          </div>
        );
        
      case 1: // Business Type
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                onValueChange={(value) => handleSelectChange('businessType', value)}
                defaultValue={formData.businessType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="existing">Existing Business</SelectItem>
                  <SelectItem value="franchise">Franchise</SelectItem>
                  <SelectItem value="nonprofit">Nonprofit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyStructure">Company Structure</Label>
              <RadioGroup
                onValueChange={(value) => handleSelectChange('companyStructure', value)}
                defaultValue={formData.companyStructure}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sole_proprietorship" id="sole_proprietorship" />
                  <Label htmlFor="sole_proprietorship">Sole Proprietorship</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="llc" id="llc" />
                  <Label htmlFor="llc">LLC</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="corporation" id="corporation" />
                  <Label htmlFor="corporation">Corporation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partnership" id="partnership" />
                  <Label htmlFor="partnership">Partnership</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nonprofit" id="nonprofit" />
                  <Label htmlFor="nonprofit">Nonprofit</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ein">EIN (Employer Identification Number) <span className="text-gray-500 text-xs">(optional)</span></Label>
              <Input 
                id="ein" 
                name="ein"
                value={formData.ein}
                onChange={handleInputChange}
                placeholder="XX-XXXXXXX" 
              />
            </div>
          </div>
        );
        
      case 2: // Location
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input 
                id="address" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Business Street"
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  defaultValue="New York"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  defaultValue="NY" 
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input 
                  id="zipCode" 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="borough">Borough</Label>
                <Select
                  onValueChange={(value) => handleSelectChange('borough', value)}
                  defaultValue={formData.borough}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select borough" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manhattan">Manhattan</SelectItem>
                    <SelectItem value="brooklyn">Brooklyn</SelectItem>
                    <SelectItem value="queens">Queens</SelectItem>
                    <SelectItem value="bronx">Bronx</SelectItem>
                    <SelectItem value="staten_island">Staten Island</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 3: // Industry
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="industry">Primary Industry</Label>
              <Select
                onValueChange={(value) => handleSelectChange('industry', value)}
                defaultValue={formData.industry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="food_service">Food Service</SelectItem>
                  <SelectItem value="professional_services">Professional Services</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="arts">Arts & Entertainment</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.industry === 'retail' && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Retail Category</Label>
                <Select
                  onValueChange={(value) => handleSelectChange('subIndustry', value)}
                  defaultValue={formData.subIndustry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select retail category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clothing">Clothing & Apparel</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="grocery">Grocery</SelectItem>
                    <SelectItem value="furniture">Furniture & Home Goods</SelectItem>
                    <SelectItem value="specialty">Specialty Shop</SelectItem>
                    <SelectItem value="other_retail">Other Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {formData.industry === 'food_service' && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Food Service Type</Label>
                <Select
                  onValueChange={(value) => handleSelectChange('subIndustry', value)}
                  defaultValue={formData.subIndustry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select food service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Full-Service Restaurant</SelectItem>
                    <SelectItem value="quick_service">Quick Service Restaurant</SelectItem>
                    <SelectItem value="cafe">Café/Coffee Shop</SelectItem>
                    <SelectItem value="bar">Bar/Pub</SelectItem>
                    <SelectItem value="catering">Catering</SelectItem>
                    <SelectItem value="food_truck">Food Truck</SelectItem>
                    <SelectItem value="other_food">Other Food Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        );
        
      case 4: // Certifications
        return (
          <div className="space-y-5">
            <div>
              <Label htmlFor="certifications" className="block mb-4">
                Business Certifications (Select all that apply)
              </Label>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mwbe" 
                    checked={formData.certifications.mwbe}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('mwbe', checked as boolean)
                    } 
                  />
                  <Label htmlFor="mwbe">
                    M/WBE (Minority/Women-owned Business Enterprise)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sbe" 
                    checked={formData.certifications.sbe}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('sbe', checked as boolean)
                    } 
                  />
                  <Label htmlFor="sbe">
                    SBE (Small Business Enterprise)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dbe" 
                    checked={formData.certifications.dbe}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('dbe', checked as boolean)
                    } 
                  />
                  <Label htmlFor="dbe">
                    DBE (Disadvantaged Business Enterprise)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sdvob" 
                    checked={formData.certifications.sdvob}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('sdvob', checked as boolean)
                    } 
                  />
                  <Label htmlFor="sdvob">
                    SDVOB (Service-Disabled Veteran-Owned Business)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="vosb" 
                    checked={formData.certifications.vosb}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('vosb', checked as boolean)
                    } 
                  />
                  <Label htmlFor="vosb">
                    VOSB (Veteran-Owned Small Business)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="none" 
                    checked={formData.certifications.none}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('none', checked as boolean)
                    } 
                  />
                  <Label htmlFor="none">
                    None of the above
                  </Label>
                </div>
              </div>
            </div>
            
            {!formData.certifications.none && (
              <div className="bg-nyc-light p-4 rounded-lg border border-nyc-secondary/30">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Great!</span> After setup, we'll help you with certification applications and tracking. NYC Business Hub provides specialized guidance for each certification type.
                </p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-nyc-light flex flex-col py-8">
      <div className="container mx-auto px-4 flex-1">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-nyc-primary">
              Business Setup
            </h1>
            <p className="text-gray-600 mt-2">
              Let's set up your business profile
            </p>
          </div>
          
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {STEPS.map((step, index) => (
                <div key={index} className={`flex flex-col items-center`}>
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${index < currentStep ? 'bg-nyc-success text-white' : 
                      index === currentStep ? 'bg-nyc-primary text-white' : 
                      'bg-gray-200 text-gray-500'}
                  `}>
                    {index < currentStep ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs mt-2 hidden md:block">
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-gray-200"></div>
              </div>
              <div 
                className="absolute inset-0 flex items-center" 
                style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
              >
                <div className="h-1 w-full bg-nyc-primary"></div>
              </div>
            </div>
          </div>
          
          {/* Form content */}
          <Card className="shadow-lg">
            <CardContent className="pt-6 p-6">
              <h2 className="text-xl font-semibold mb-6">{STEPS[currentStep]}</h2>
              {renderStep()}
            </CardContent>
          </Card>
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={isLoading}
              className="bg-nyc-primary hover:bg-nyc-primary/90"
            >
              {currentStep === STEPS.length - 1 ? (
                isLoading ? 'Completing...' : 'Complete Setup'
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSetup;
