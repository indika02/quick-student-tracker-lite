import { useState } from "react";
import DashboardLayout from "@/components/Layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Plus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  students: number;
  maxStudents: number;
  schedule: string;
  duration: string;
  status: 'active' | 'inactive' | 'completed';
  description: string;
  startDate: string;
  endDate: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    name: "Advanced Mathematics",
    code: "MATH301",
    instructor: "Dr. Smith",
    students: 25,
    maxStudents: 30,
    schedule: "Mon, Wed, Fri 9:00 AM",
    duration: "3 months",
    status: "active",
    description: "Advanced mathematical concepts including calculus and linear algebra",
    startDate: "2024-01-15",
    endDate: "2024-04-15"
  },
  {
    id: "2", 
    name: "Physics Laboratory",
    code: "PHYS201",
    instructor: "Dr. Johnson",
    students: 18,
    maxStudents: 20,
    schedule: "Tue, Thu 2:00 PM",
    duration: "4 months",
    status: "active",
    description: "Hands-on physics experiments and practical applications",
    startDate: "2024-02-01",
    endDate: "2024-05-31"
  },
  {
    id: "3",
    name: "Computer Science Fundamentals",
    code: "CS101",
    instructor: "Mr. Davis",
    students: 30,
    maxStudents: 35,
    schedule: "Mon, Wed 1:00 PM",
    duration: "6 months",
    status: "active",
    description: "Introduction to programming and computer science concepts",
    startDate: "2024-01-01",
    endDate: "2024-06-30"
  },
  {
    id: "4",
    name: "Chemistry Basics",
    code: "CHEM101",
    instructor: "Dr. Wilson",
    students: 22,
    maxStudents: 25,
    schedule: "Tue, Fri 10:00 AM",
    duration: "4 months",
    status: "completed",
    description: "Basic chemistry principles and laboratory techniques",
    startDate: "2023-09-01",
    endDate: "2023-12-31"
  }
];

const Courses = () => {
  const [courses] = useState<Course[]>(mockCourses);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');

  const filteredCourses = courses.filter(course => 
    filterStatus === 'all' || course.status === filterStatus
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const courseStats = {
    total: courses.length,
    active: courses.filter(c => c.status === 'active').length,
    completed: courses.filter(c => c.status === 'completed').length,
    totalStudents: courses.reduce((sum, course) => sum + course.students, 0)
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Course Management</h1>
            <p className="text-muted-foreground">Manage courses and curriculum</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseStats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{courseStats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{courseStats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Enrolled</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseStats.totalStudents}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
          >
            All Courses
          </Button>
          <Button
            variant={filterStatus === 'active' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('active')}
            size="sm"
          >
            Active
          </Button>
          <Button
            variant={filterStatus === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('completed')}
            size="sm"
          >
            Completed
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <CardDescription className="font-mono text-sm">{course.code}</CardDescription>
                  </div>
                  {getStatusBadge(course.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{course.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Instructor: {course.instructor}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Duration: {course.duration}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-sm">
                    <span className="font-medium">{course.students}/{course.maxStudents}</span>
                    <span className="text-muted-foreground"> students</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Link to={`/attendance`}>
                      <Button size="sm">
                        Attendance
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Courses;