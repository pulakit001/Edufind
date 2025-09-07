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
import { Plus, X, GraduationCap, BookOpen, MapPin, DollarSign, Building, FileText, Target, MessageSquare, Award } from "lucide-react";
import { useState } from "react";
import type { FormData } from "./CollegeFinderForm";

interface FormStepProps {
  step: number;
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}

export function FormStep({ step, formData, updateFormData }: FormStepProps) {
  const [customMajor, setCustomMajor] = useState('');
  const [customExam, setCustomExam] = useState({ name: '', score: '' });

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
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How can we help you today?</h2>
              <p className="text-muted-foreground text-lg">Choose what you'd like to do with our AI-powered college assistant</p>
            </div>

            <div className="grid gap-6 max-w-2xl mx-auto">
              <Card 
                className="p-8 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30"
                onClick={() => updateFormData('actionType', 'match')}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-foreground mb-2">Find My Perfect Match</h3>
                    <p className="text-muted-foreground">Let AI analyze your profile and recommend the best colleges tailored to your preferences, goals, and qualifications</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-8 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30"
                onClick={() => updateFormData('actionType', 'compare')}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-foreground mb-2">Compare Colleges</h3>
                    <p className="text-muted-foreground">Get detailed AI-powered comparisons between specific colleges to help you make an informed decision</p>
                  </div>
                </div>
              </Card>
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
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Annual Tuition Budget</h2>
              <p className="text-muted-foreground text-sm md:text-base">What's your budget for annual tuition fees?</p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200">
              <div className="text-center mb-6">
                <div className="text-4xl md:text-5xl font-bold text-violet-600 mb-2">
                  ₹{formData.budget.selected.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">per year</p>
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
                  <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded-full">₹50K</span>
                  <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded-full">₹30L</span>
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

      case 7:
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

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Entrance Exams & Eligibility</h2>
              <p className="text-muted-foreground text-sm md:text-base">Add any entrance exams you've taken or plan to take</p>
            </div>
            
            <Card className="p-6 border-2 border-dashed border-violet-200 bg-violet-50/50 dark:bg-violet-950/20">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    placeholder="Exam name (e.g., JEE, NEET, SAT)"
                    value={customExam.name}
                    onChange={(e) => setCustomExam({...customExam, name: e.target.value})}
                    className="flex-1 border-violet-200 focus:border-violet-500"
                  />
                  <Input 
                    placeholder="Score/Rank"
                    value={customExam.score}
                    onChange={(e) => setCustomExam({...customExam, score: e.target.value})}
                    className="flex-1 border-violet-200 focus:border-violet-500"
                  />
                  <Button 
                    onClick={addExam} 
                    className="bg-violet-500 hover:bg-violet-600 text-white px-6"
                    disabled={!customExam.name.trim() || !customExam.score.trim()}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Exam
                  </Button>
                </div>
              </div>
            </Card>

            {formData.exams.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">Your Exam Scores:</h3>
                <div className="space-y-2">
                  {formData.exams.map((exam, index) => (
                    <Card key={index} className="p-4 bg-white dark:bg-gray-800 border-violet-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-violet-700 dark:text-violet-300">{exam.name}</div>
                          <div className="text-sm text-muted-foreground">Score: {exam.score}</div>
                        </div>
                        <Button 
                          onClick={() => removeExam(index)}
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
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