
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { formatDate, getDeadlineStatus } from '../utils/formatters';
import { taxDeadlines } from '../data/mockData';

const TaxDeadlinesSection: React.FC = () => {
  return (
    <TabsContent value="tax-deadlines" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tax Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    deadline.type === 'federal' ? 'bg-blue-100' :
                    deadline.type === 'state' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <Calendar className={`h-5 w-5 ${
                      deadline.type === 'federal' ? 'text-blue-600' :
                      deadline.type === 'state' ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{deadline.title}</h4>
                    <p className="text-sm text-gray-500">Due: {formatDate(deadline.deadline)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={
                    getDeadlineStatus(deadline.deadline) === "overdue" ? "destructive" :
                    getDeadlineStatus(deadline.deadline) === "soon" ? "outline" : "secondary"
                  }>
                    {getDeadlineStatus(deadline.deadline) === "overdue" ? "Overdue" :
                     getDeadlineStatus(deadline.deadline) === "soon" ? "Due Soon" : "Upcoming"}
                  </Badge>
                  <Button variant="outline" size="sm">Prepare</Button>
                </div>
              </div>
            ))}
          </div>
          
          <AnnualChecklist />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

const AnnualChecklist: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Annual Checklist</h3>
      <div className="space-y-2">
        <div className="flex items-center p-3 border rounded-md">
          <input type="checkbox" id="w2" className="mr-3" />
          <label htmlFor="w2" className="text-sm">W-2 Forms (Deadline: January 31)</label>
        </div>
        <div className="flex items-center p-3 border rounded-md">
          <input type="checkbox" id="1099" className="mr-3" />
          <label htmlFor="1099" className="text-sm">1099 Forms (Deadline: January 31)</label>
        </div>
        <div className="flex items-center p-3 border rounded-md">
          <input type="checkbox" id="annualReturn" className="mr-3" />
          <label htmlFor="annualReturn" className="text-sm">Annual Tax Return (Deadline: April 15)</label>
        </div>
        <div className="flex items-center p-3 border rounded-md">
          <input type="checkbox" id="annualReport" className="mr-3" />
          <label htmlFor="annualReport" className="text-sm">Annual Report Filing (Deadline: Varies by state)</label>
        </div>
      </div>
    </div>
  );
};

export default TaxDeadlinesSection;
