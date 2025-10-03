import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Plus, X, GraduationCap, BookOpen, MapPin, DollarSign, Building, FileText, Target, MessageSquare, Award, Coins, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import type { FormData } from "./CollegeFinderForm";
import { currencies, type Currency } from "@/utils/currencies";
import { cn } from "@/lib/utils";

interface FormStepProps {
  step: number;
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}

export function FormStep({ step, formData, updateFormData }: FormStepProps) {
  const [customMajor, setCustomMajor] = useState('');
  const [customExam, setCustomExam] = useState({ name: '', score: '' });
  const [currencyOpen, setCurrencyOpen] = useState(false);


  const educationLevels = [
    "Undergraduate (Bachelor's)",
    "Postgraduate (Master's)",
    "Diploma / Advanced Diploma",
    "Certificate Course",
    "Ph.D. / Doctorate",
    "Others"
  ];

  const academicStreams = [
    "Science & Technology",
    "Commerce & Business", 
    "Arts / Humanities",
    "Law",
    "Medical & Healthcare",
    "Design / Creative Fields",
    "Vocational / Skill-based",
    "Undecided / Open to suggestions",
    "Others"
  ];

  const majorOptions = [
    "Computer Science",
    "Economics", 
    "Psychology",
    "Mechanical Engineering",
    "Journalism",
    "Fashion Design",
    "Law",
    "Architecture",
    "Biotechnology",
    "Artificial Intelligence / Data Science"
  ];

  const collegeTypes = [
    "Government / Public University",
    "Private University",
    "International Institution", 
    "Community College",
    "Doesn't matter / Open to all"
  ];

  const examOptions = [
    "JEE", "NEET", "SAT", "GRE", "GMAT", "CLAT", "CAT", "IELTS", "TOEFL"
  ];

  const addMajor = () => {
    if (customMajor && !formData.specificMajors.includes(customMajor)) {
      updateFormData('specificMajors', [...formData.specificMajors, customMajor]);
      setCustomMajor('');
    }
  };

  const removeMajor = (major: string) => {
    updateFormData('specificMajors', formData.specificMajors.filter(m => m !== major));
  };

  const addExam = () => {
    if (customExam.name && customExam.score) {
      updateFormData('exams', [...formData.exams, { ...customExam }]);
      setCustomExam({ name: '', score: '' });
    }
  };

  const removeExam = (index: number) => {
    updateFormData('exams', formData.exams.filter((_, i) => i !== index));
  };

  const updateLocation = (field: string, value: string) => {
    updateFormData('location', { ...formData.location, [field]: value });
  };

  const updateBudget = (value: number[]) => {
    updateFormData('budget', { ...formData.budget, selected: value[0] });
  };

  const toggleCollegeType = (type: string) => {
    const current = formData.collegeType;
    if (current.includes(type)) {
      updateFormData('collegeType', current.filter(t => t !== type));
    } else {
      updateFormData('collegeType', [...current, type]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 px-4">How can we help you today?</h2>
              <p className="text-muted-foreground text-xs sm:text-sm px-4">Choose what you'd like to do</p>
            </div>

            <div className="grid gap-3 max-w-lg mx-auto px-4">
              {/* AI Match Button - Primary Choice */}
              <button 
                className="w-full p-4 sm:p-5 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 hover:border-blue-300 hover:shadow-lg transition-all duration-300 active:scale-[0.98] group"
                onClick={() => updateFormData('actionType', 'match')}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">Find My Perfect Match</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">AI recommendations based on your profile</p>
                  </div>
                </div>
              </button>

              {/* Compare Colleges Button - Secondary Choice */}
              <button 
                className="w-full p-4 sm:p-5 rounded-2xl border-2 border-purple-200/60 bg-gradient-to-r from-purple-50/80 to-violet-50/80 dark:from-purple-950/20 dark:to-violet-950/20 hover:border-purple-300 hover:shadow-md transition-all duration-300 active:scale-[0.98] group"
                onClick={() => updateFormData('actionType', 'compare')}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Compare Colleges</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">Side-by-side comparison of specific colleges</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">What level of education are you planning to pursue?</h2>
              <p className="text-muted-foreground text-sm md:text-base">Choose the degree level that matches your goals and aspirations</p>
            </div>

            <div className="grid gap-3">
              {educationLevels.map((level, index) => {
                const isSelected = formData.educationLevel === level;
                return (
                  <Card 
                    key={level}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                      isSelected 
                        ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30' 
                        : 'border-border hover:border-violet-200'
                    }`}
                    onClick={() => updateFormData('educationLevel', level)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-violet-500 bg-violet-500' : 'border-muted-foreground'
                        }`}>
                          {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                        </div>
                        <span className="font-medium text-sm md:text-base">{level}</span>
                      </div>
                      {isSelected && (
                        <div className="text-violet-500 text-xs font-medium px-2 py-1 bg-violet-100 dark:bg-violet-900/50 rounded-full">
                          Selected
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Academic Stream</h2>
              <p className="text-muted-foreground text-sm md:text-base">What field are you most interested in?</p>
            </div>

            <div className="grid gap-3">
              {academicStreams.map((stream) => {
                const isSelected = formData.academicStream === stream;
                return (
                  <Card 
                    key={stream}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                      isSelected 
                        ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30' 
                        : 'border-border hover:border-violet-200'
                    }`}
                    onClick={() => updateFormData('academicStream', stream)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-violet-500 bg-violet-500' : 'border-muted-foreground'
                        }`}>
                          {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                        </div>
                        <span className="font-medium text-sm md:text-base">{stream}</span>
                      </div>
                      {isSelected && (
                        <div className="text-violet-500 text-xs font-medium px-2 py-1 bg-violet-100 dark:bg-violet-900/50 rounded-full">
                          Selected
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Specific Majors / Subjects</h2>
              <p className="text-muted-foreground text-sm md:text-base">Select all majors that interest you</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {majorOptions.map(major => {
                const isSelected = formData.specificMajors.includes(major);
                return (
                  <Card 
                    key={major}
                    className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                      isSelected 
                        ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30' 
                        : 'border-border hover:border-violet-200'
                    }`}
                    onClick={() => {
                      if (isSelected) {
                        removeMajor(major);
                      } else {
                        updateFormData('specificMajors', [...formData.specificMajors, major]);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected ? 'border-violet-500 bg-violet-500' : 'border-muted-foreground'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
                      </div>
                      <span className="font-medium text-sm">{major}</span>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="p-4 border-2 border-dashed border-violet-200 bg-violet-50/50 dark:bg-violet-950/20">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Add custom major"
                  value={customMajor}
                  onChange={(e) => setCustomMajor(e.target.value)}
                  className="flex-1 border-violet-200 focus:border-violet-500"
                />
                <Button 
                  onClick={addMajor} 
                  className="bg-violet-500 hover:bg-violet-600 text-white px-6"
                  disabled={!customMajor.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Major
                </Button>
              </div>
            </Card>

            {formData.specificMajors.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">Selected Majors:</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.specificMajors.map(major => (
                    <Badge 
                      key={major} 
                      className="bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-300 px-3 py-1"
                    >
                      {major}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-2 hover:bg-transparent"
                        onClick={() => removeMajor(major)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Program Structure Preference</h2>
              <p className="text-muted-foreground text-sm md:text-base">What type of program structure do you prefer?</p>
            </div>

            <div className="grid gap-4">
              {[
                { value: "single-major", label: "Single-major program", desc: "e.g., B.Sc. Physics" },
                { value: "double-major", label: "Double-major / Interdisciplinary program", desc: "e.g., Economics + Data Science" },
                { value: "undecided", label: "Undecided / Open to recommendations", desc: "We'll help you decide" }
              ].map((option) => {
                const isSelected = formData.programPreference === option.value;
                return (
                  <Card 
                    key={option.value}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                      isSelected 
                        ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30' 
                        : 'border-border hover:border-violet-200'
                    }`}
                    onClick={() => updateFormData('programPreference', option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-violet-500 bg-violet-500' : 'border-muted-foreground'
                        }`}>
                          {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                        </div>
                        <div>
                          <div className="font-medium text-sm md:text-base">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.desc}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="text-violet-500 text-xs font-medium px-2 py-1 bg-violet-100 dark:bg-violet-900/50 rounded-full">
                          Selected
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Preferred Location</h2>
              <p className="text-muted-foreground text-sm md:text-base">Where would you like to study?</p>
            </div>

            <div className="space-y-4">
               <Card className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="country" className="text-sm font-semibold text-violet-700 dark:text-violet-300">Country *</Label>
                    <Input 
                      id="country"
                      placeholder="e.g., India, USA, Canada"
                      value={formData.location.country}
                      onChange={(e) => updateLocation('country', e.target.value)}
                      className="mt-2 border-violet-200 focus:border-violet-500 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-semibold text-violet-700 dark:text-violet-300">State / Province</Label>
                    <Input 
                      id="state"
                      placeholder="e.g., Karnataka, California"
                      value={formData.location.state}
                      onChange={(e) => updateLocation('state', e.target.value)}
                      className="mt-2 border-violet-200 focus:border-violet-500 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-sm font-semibold text-violet-700 dark:text-violet-300">City / Region</Label>
                    <Input 
                      id="city"
                      placeholder="e.g., Bangalore, New York"
                      value={formData.location.city}
                      onChange={(e) => updateLocation('city', e.target.value)}
                      className="mt-2 border-violet-200 focus:border-violet-500 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="details" className="text-sm font-semibold text-violet-700 dark:text-violet-300">Additional location preferences</Label>
                    <Textarea 
                      id="details"
                      placeholder="e.g., Prefer colleges near tech hubs with good weather and startup ecosystem"
                      value={formData.location.freeText}
                      onChange={(e) => updateLocation('freeText', e.target.value)}
                      rows={3}
                      className="mt-2 border-violet-200 focus:border-violet-500 bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Preferred Currency</h2>
              <p className="text-muted-foreground text-sm md:text-base">Select your preferred currency for tuition fees</p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200">
              <div className="space-y-4">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-violet-200">
                  <div className="text-sm text-muted-foreground mb-2">Selected Currency</div>
                  <div className="text-3xl font-bold text-violet-600 mb-1">
                    {formData.currency.symbol} {formData.currency.code}
                  </div>
                  <div className="text-sm text-muted-foreground">{formData.currency.name}</div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-violet-700 dark:text-violet-300">Select Currency</Label>
                  <Popover open={currencyOpen} onOpenChange={setCurrencyOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={currencyOpen}
                        className="w-full justify-between border-violet-200 focus:border-violet-500 bg-white dark:bg-gray-800"
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-bold">{formData.currency.symbol}</span>
                          <span>{formData.currency.code} - {formData.currency.name}</span>
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-white dark:bg-gray-800 border-violet-200 z-50">
                      <Command className="bg-white dark:bg-gray-800">
                        <CommandInput placeholder="Search currency or country..." className="bg-white dark:bg-gray-800" />
                        <CommandList className="bg-white dark:bg-gray-800">
                          <CommandEmpty className="bg-white dark:bg-gray-800">No currency found.</CommandEmpty>
                          <CommandGroup className="bg-white dark:bg-gray-800">
                            {currencies.map((currency) => (
                              <CommandItem
                                key={currency.code}
                                value={`${currency.code} ${currency.name} ${currency.country}`}
                                onSelect={() => {
                                  updateFormData('currency', {
                                    code: currency.code,
                                    symbol: currency.symbol,
                                    name: currency.name
                                  });
                                  setCurrencyOpen(false);
                                }}
                                className="bg-white dark:bg-gray-800 hover:bg-violet-50 dark:hover:bg-violet-950/30"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.currency.code === currency.code ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                <div className="flex items-center gap-2">
                                  <span className="font-bold">{currency.symbol}</span>
                                  <span>{currency.code} - {currency.name}</span>
                                  <span className="text-xs text-muted-foreground">({currency.country})</span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="text-xs text-muted-foreground p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  💡 You can search by currency name or country. We've auto-detected your currency based on your location.
                </div>
              </div>
            </Card>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Annual Tuition Budget</h2>
              <p className="text-muted-foreground text-sm md:text-base">What's your budget for annual tuition fees?</p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200">
              <div className="text-center mb-6">
                <div className="text-4xl md:text-5xl font-bold text-violet-600 mb-2">
                  {formData.currency.symbol}{formData.budget.selected.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">per year ({formData.currency.code})</p>
              </div>
              
              <div className="space-y-6">
                <Slider
                  value={[formData.budget.selected]}
                  onValueChange={updateBudget}
                  max={3000000}
                  min={50000}
                  step={25000}
                  className="w-full [&>span:first-child]:bg-violet-200 [&>span:first-child]:h-3 [&>span:first-child]:rounded-full [&_[data-orientation=horizontal]]:bg-violet-500 [&_[data-orientation=horizontal]]:h-3 [&_[data-orientation=horizontal]]:rounded-full"
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded-full">{formData.currency.symbol}50K</span>
                  <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded-full">{formData.currency.symbol}3M</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    { label: "Budget Range", value: "Flexible" },
                    { label: "Includes", value: "Tuition only" },
                  ].map((item, index) => (
                    <div key={index} className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="font-semibold text-sm">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Type of College / University</h2>
              <p className="text-muted-foreground text-sm md:text-base">What type of institutions are you considering?</p>
            </div>

            <div className="grid gap-3">
              {collegeTypes.map(type => {
                const isSelected = formData.collegeType.includes(type);
                return (
                  <Card 
                    key={type}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                      isSelected 
                        ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30' 
                        : 'border-border hover:border-violet-200'
                    }`}
                    onClick={() => toggleCollegeType(type)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'border-violet-500 bg-violet-500' : 'border-muted-foreground'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
                        </div>
                        <span className="font-medium text-sm md:text-base">{type}</span>
                      </div>
                      {isSelected && (
                        <div className="text-violet-500 text-xs font-medium px-2 py-1 bg-violet-100 dark:bg-violet-900/50 rounded-full">
                          Selected
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Describe Your Dream College</h2>
              <p className="text-muted-foreground text-sm md:text-base">Help us understand what you're looking for in a college experience</p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200">
              <Textarea
                placeholder="Do you want a college in a tech hub or a quiet rural area? Do you want strong placement and startup mentorship? Do you prefer big campuses or smaller ones?"
                value={formData.dreamCollegeDescription}
                onChange={(e) => updateFormData('dreamCollegeDescription', e.target.value)}
                rows={8}
                className="border-violet-200 focus:border-violet-500 bg-white dark:bg-gray-800 text-base"
              />
              <div className="mt-3 text-xs text-muted-foreground">
                💡 The more specific you are, the better recommendations we can provide!
              </div>
            </Card>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Anything Else You'd Like Us to Know</h2>
              <p className="text-muted-foreground text-sm md:text-base">Share any additional information that might help us find the perfect college for you</p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200">
              <Textarea
                placeholder="I want a campus with AI specialization, affordable fees, and strong startup mentorship. Preferably in Pune or Bangalore."
                value={formData.additionalInfo}
                onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                rows={8}
                className="border-violet-200 focus:border-violet-500 bg-white dark:bg-gray-800 text-base"
              />
              <div className="mt-3 text-xs text-muted-foreground">
                🎯 Final thoughts? Special requirements? Let us know!
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="form-step form-step-active">{renderStep()}</div>;
}