import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { mockTimetable, mockFacilities } from "@/utils/mockData";
import { Clock, MapPin, User, Calendar, Building2 } from "lucide-react";

const StudentDashboard = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();

  if (!isAuthenticated || currentUser?.role !== 'student') {
    return <Navigate to="/" />;
  }

  const todaysTimetable = mockTimetable.filter(entry => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return entry.day === today;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-foreground">
                Student Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {currentUser.fullName}
              </span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="facilities">Lecture Halls</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todaysTimetable.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Classes scheduled for today
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Facilities</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockFacilities.filter(f => f.isAvailable).length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently available
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Class</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {todaysTimetable.length > 0 ? todaysTimetable[0].time : "No classes"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {todaysTimetable.length > 0 ? todaysTimetable[0].subject : "today"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes for today</CardDescription>
              </CardHeader>
              <CardContent>
                {todaysTimetable.length > 0 ? (
                  <div className="space-y-4">
                    {todaysTimetable.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{entry.subject}</span>
                            <span className="text-sm text-muted-foreground">
                              {entry.instructor}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {entry.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {entry.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No classes scheduled for today</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timetable" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Timetable</CardTitle>
                <CardDescription>Your complete class schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTimetable.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{entry.subject}</span>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="h-4 w-4 mr-1" />
                            {entry.instructor}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {entry.day}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {entry.time}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {entry.location}
                        </div>
                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                          {entry.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lecture Halls & Facilities</CardTitle>
                <CardDescription>Available facilities and their details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {mockFacilities.map((facility) => (
                    <div key={facility.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{facility.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          facility.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {facility.isAvailable ? 'Available' : 'Occupied'}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2" />
                          {facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {facility.location}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Capacity: {facility.capacity}
                        </div>
                        <p className="text-xs">{facility.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;