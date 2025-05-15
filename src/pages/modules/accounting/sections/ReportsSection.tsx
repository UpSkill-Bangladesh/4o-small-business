
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

const ReportsSection: React.FC = () => {
  const reports = [
    {
      title: "Income Statement",
      description: "Year-to-date financial report",
      icon: <FileText className="h-8 w-8 text-nyc-primary" />,
      color: "text-nyc-primary"
    },
    {
      title: "Balance Sheet",
      description: "Current financial position",
      icon: <FileText className="h-8 w-8 text-nyc-secondary" />,
      color: "text-nyc-secondary"
    },
    {
      title: "Sales Tax Report",
      description: "Quarterly sales tax summary",
      icon: <FileText className="h-8 w-8 text-nyc-tertiary" />,
      color: "text-nyc-tertiary"
    },
    {
      title: "1099 Summary",
      description: "Contractor payment report",
      icon: <FileText className="h-8 w-8 text-nyc-warning" />,
      color: "text-nyc-warning"
    },
    {
      title: "W-2 Forms",
      description: "Employee wage reports",
      icon: <FileText className="h-8 w-8 text-nyc-success" />,
      color: "text-nyc-success"
    },
    {
      title: "Expense Report",
      description: "Categorized expense summary",
      icon: <FileText className="h-8 w-8 text-nyc-danger" />,
      color: "text-nyc-danger"
    },
  ];

  return (
    <TabsContent value="reports" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Tax Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report, index) => (
              <ReportCard 
                key={index}
                title={report.title}
                description={report.description}
                icon={report.icon}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, icon }) => {
  return (
    <Card className="border shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {icon}
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <Button size="sm" variant="outline">Generate</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsSection;
