import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Plus, X } from "lucide-react";
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
            <div>
              <h2 className="text-section-title mb-4 text-foreground">What level of education are you planning to pursue?</h2>
              <p className="text-subtle mb-6 text-lg">Choose the degree level that matches your goals and aspirations</p>
              <Select value={formData.educationLevel} onValueChange={(value) => updateFormData('educationLevel', value)}>
                <SelectTrigger className="form-input text-lg h-14">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent className="bg-card border-2 border-border/60 rounded-xl shadow-xl">
                  {educationLevels.map(level => (
                    <SelectItem key={level} value={level} className="p-4 text-base hover:bg-accent/10 rounded-lg">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title mb-2">Academic Stream</h2>
              <p className="text-subtle mb-4">What field are you most interested in?</p>
              <Select value={formData.academicStream} onValueChange={(value) => updateFormData('academicStream', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select academic stream" />
                </SelectTrigger>
                <SelectContent>
                  {academicStreams.map(stream => (
                    <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title mb-2">Specific Majors / Subjects</h2>
              <p className="text-subtle mb-4">Select all majors that interest you</p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {majorOptions.map(major => (
                  <div key={major} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={formData.specificMajors.includes(major)}
                      onCheckedChange={() => {
                        if (formData.specificMajors.includes(major)) {
                          removeMajor(major);
                        } else {
                          updateFormData('specificMajors', [...formData.specificMajors, major]);
                        }
                      }}
                    />
                    <label className="text-sm">{major}</label>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder="Add custom major"
                  value={customMajor}
                  onChange={(e) => setCustomMajor(e.target.value)}
                />
                <Button onClick={addMajor} size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.specificMajors.map(major => (
                  <Badge key={major} variant="secondary" className="pr-1">
                    {major}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 ml-1"
                      onClick={() => removeMajor(major)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title mb-2">Program Structure Preference</h2>
              <p className="text-subtle mb-4">What type of program structure do you prefer?</p>
              <RadioGroup value={formData.programPreference} onValueChange={(value) => updateFormData('programPreference', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single-major" id="single" />
                  <Label htmlFor="single">Single-major program (e.g., B.Sc. Physics)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="double-major" id="double" />
                  <Label htmlFor="double">Double-major / Interdisciplinary program (e.g., Economics + Data Science)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="undecided" id="undecided" />
                  <Label htmlFor="undecided">Undecided / Open to recommendations</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title mb-2">Preferred Location</h2>
              <p className="text-subtle mb-4">Where would you like to study?</p>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input 
                    id="country"
                    placeholder="e.g., India, USA, Canada"
                    value={formData.location.country}
                    onChange={(e) => updateLocation('country', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input 
                    id="state"
                    placeholder="e.g., Karnataka, California"
                    value={formData.location.state}
                    onChange={(e) => updateLocation('state', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City / Region</Label>
                  <Input 
                    id="city"
                    placeholder="e.g., Bangalore, New York"
                    value={formData.location.city}
                    onChange={(e) => updateLocation('city', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="details">Additional location preferences</Label>
                  <Textarea 
                    id="details"
                    placeholder="e.g., Prefer colleges near tech hubs with good weather and startup ecosystem"
                    value={formData.location.freeText}
                    onChange={(e) => updateLocation('freeText', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title mb-2">Annual Tuition Budget</h2>
              <p className="text-subtle mb-4">What's your budget for annual tuition fees?</p>
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-2xl font-semibold">₹{formData.budget.selected.toLocaleString()}</span>
                </div>
                <Slider
                  value={[formData.budget.selected]}
                  onValueChange={updateBudget}
                  max={3000000}
                  min={50000}
                  step={25000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹50,000</span>
                  <span>₹30,00,000</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title mb-2">Type of College / University</h2>
              <p className="text-subtle mb-4">What type of institutions are you considering?</p>
              <div className="space-y-3">
                {collegeTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={formData.collegeType.includes(type)}
                      onCheckedChange={() => toggleCollegeType(type)}
                    />
                    <label className="text-sm">{type}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title mb-2">Entrance Exams & Eligibility</h2>
              <p className="text-subtle mb-4">Add any entrance exams you've taken or plan to take</p>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Select value={customExam.name} onValueChange={(value) => setCustomExam({...customExam, name: value})}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {examOptions.map(exam => (
                        <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input 
                    placeholder="Score/Rank"
                    value={customExam.score}
                    onChange={(e) => setCustomExam({...customExam, score: e.target.value})}
                    className="flex-1"
                  />
                  <Button onClick={addExam} size="icon" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.exams.map((exam, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{exam.name}: {exam.score}</span>
                      <Button 
                        onClick={() => removeExam(index)}
                        size="sm"
                        variant="ghost"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title mb-2">Describe Your Dream College</h2>
              <p className="text-subtle mb-4">Help us understand what you're looking for in a college experience</p>
              <Textarea
                placeholder="Do you want a college in a tech hub or a quiet rural area? Do you want strong placement and startup mentorship? Do you prefer big campuses or smaller ones?"
                value={formData.dreamCollegeDescription}
                onChange={(e) => updateFormData('dreamCollegeDescription', e.target.value)}
                rows={6}
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title mb-2">Anything Else You'd Like Us to Know</h2>
              <p className="text-subtle mb-4">Share any additional information that might help us find the perfect college for you</p>
              <Textarea
                placeholder="I want a campus with AI specialization, affordable fees, and strong startup mentorship. Preferably in Pune or Bangalore."
                value={formData.additionalInfo}
                onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                rows={6}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="form-step form-step-active">{renderStep()}</div>;
}