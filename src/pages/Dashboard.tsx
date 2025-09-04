import { useState } from "react";
import { CollegeFinderForm } from "@/components/CollegeFinderForm";
import { CollegeComparison } from "@/components/CollegeComparison";
import { AppBottomNav } from "@/components/AppBottomNav";

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'finder' | 'comparison'>('finder');

  const renderContent = () => {
    switch (activeView) {
      case 'finder':
        return <CollegeFinderForm />;
      case 'comparison':
        return <CollegeComparison />;
      default:
        return <CollegeFinderForm />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="w-full min-h-screen">
        {renderContent()}
      </main>
      <AppBottomNav activeView={activeView} onViewChange={setActiveView} />
    </div>
  );
};

export default Dashboard;