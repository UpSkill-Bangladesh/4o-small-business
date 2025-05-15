
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, Plus } from "lucide-react";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample events data
const events = [
  {
    id: 1,
    title: 'Client Meeting - ABC Corp',
    date: new Date(2025, 4, 15, 10, 0),
    endDate: new Date(2025, 4, 15, 11, 30),
    type: 'meeting',
    location: 'Main Conference Room'
  },
  {
    id: 2,
    title: 'Team Standup',
    date: new Date(2025, 4, 15, 9, 0),
    endDate: new Date(2025, 4, 15, 9, 30),
    type: 'internal',
    location: 'Zoom Call'
  },
  {
    id: 3,
    title: 'Product Demo',
    date: new Date(2025, 4, 16, 14, 0),
    endDate: new Date(2025, 4, 16, 15, 0),
    type: 'meeting',
    location: 'Client Office'
  },
  {
    id: 4,
    title: 'Quarterly Tax Filing',
    date: new Date(2025, 4, 20, 0, 0),
    endDate: new Date(2025, 4, 20, 23, 59),
    type: 'deadline',
    location: ''
  },
  {
    id: 5,
    title: 'Marketing Strategy Session',
    date: new Date(2025, 4, 17, 13, 0),
    endDate: new Date(2025, 4, 17, 15, 0),
    type: 'internal',
    location: 'Marketing Department'
  }
];

const Calendar: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getTodayEvents = () => {
    const today = new Date();
    
    return events.filter(event => 
      event.date.getDate() === today.getDate() &&
      event.date.getMonth() === today.getMonth() &&
      event.date.getFullYear() === today.getFullYear()
    );
  };

  const getDateEvents = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    return events.filter(event => 
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const selectedDateEvents = getDateEvents(date);
  
  return (
    <div className="flex h-screen bg-gray-50">
      {!isMobile && <Sidebar />}
      {isMobile && (
        <Sidebar
          isMobile={true}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
          
          <h1 className="text-xl md:text-2xl font-semibold text-nyc-primary">
            Calendar
          </h1>
          
          <div className="flex items-center space-x-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="day" onValueChange={(value) => setView(value as 'day' | 'week' | 'month')} className="mb-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm">
                  {date ? formatDate(date) : 'Select Date'}
                </Button>
              </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {/* Calendar Sidebar */}
              <div className="col-span-1">
                <Card>
                  <CardContent className="p-4">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="pointer-events-auto"
                    />
                    <div className="mt-6 space-y-2">
                      <h3 className="text-sm font-medium">Event Types</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="default">Meeting</Badge>
                        <Badge variant="secondary">Internal</Badge>
                        <Badge variant="destructive">Deadline</Badge>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-4">Today's Events</h3>
                      {getTodayEvents().length === 0 ? (
                        <p className="text-sm text-gray-500">No events today</p>
                      ) : (
                        <div className="space-y-3">
                          {getTodayEvents().map(event => (
                            <div key={event.id} className="text-sm border-l-2 pl-2 py-1" style={{
                              borderColor: event.type === 'meeting' ? '#3A8DDE' : 
                                          event.type === 'internal' ? '#6E59A5' : 
                                          '#E74C3C'
                            }}>
                              <p className="font-medium">{event.title}</p>
                              <p className="text-gray-500">{formatTime(event.date)}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Calendar View */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle>{date ? formatDate(date) : 'Select a date'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="day" className="m-0">
                      {selectedDateEvents.length === 0 ? (
                        <div className="text-center py-10">
                          <h3 className="text-lg font-medium text-gray-500">No events scheduled</h3>
                          <p className="text-gray-400 mt-2">Click the "New Event" button to add one</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {selectedDateEvents.map((event) => (
                            <div key={event.id} className="flex border rounded-md overflow-hidden">
                              <div className="w-2" style={{
                                backgroundColor: event.type === 'meeting' ? '#3A8DDE' : 
                                                event.type === 'internal' ? '#6E59A5' : 
                                                '#E74C3C'
                              }}></div>
                              <div className="flex-1 p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{event.title}</h3>
                                    <p className="text-gray-500 text-sm">
                                      {formatTime(event.date)} - {formatTime(event.endDate)}
                                    </p>
                                  </div>
                                  <Badge variant={
                                    event.type === 'meeting' ? 'default' : 
                                    event.type === 'internal' ? 'secondary' : 
                                    'destructive'
                                  }>
                                    {event.type}
                                  </Badge>
                                </div>
                                
                                {event.location && (
                                  <p className="text-sm mt-2">
                                    <span className="text-gray-500">Location:</span> {event.location}
                                  </p>
                                )}
                                
                                <div className="flex mt-4 space-x-2">
                                  <Button variant="outline" size="sm">Edit</Button>
                                  <Button variant="ghost" size="sm" className="text-nyc-danger hover:text-nyc-danger/90">
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="week" className="m-0">
                      <div className="text-center py-10">
                        <h3 className="text-lg font-medium text-gray-500">Week view coming soon</h3>
                        <p className="text-gray-400 mt-2">This feature is under development</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="month" className="m-0">
                      <div className="text-center py-10">
                        <h3 className="text-lg font-medium text-gray-500">Month view coming soon</h3>
                        <p className="text-gray-400 mt-2">This feature is under development</p>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Calendar;
