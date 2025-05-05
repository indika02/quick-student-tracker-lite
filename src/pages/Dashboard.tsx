
import DashboardLayout from "@/components/Layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStudents } from "@/utils/mockData";
import { UserPlus, Users, Book } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const totalStudents = mockStudents.length;
  const averageGrade = calculateAverageGrade();
  const gradeDistribution = calculateGradeDistribution();

  function calculateAverageGrade() {
    const gradeMap: Record<string, number> = {
      'A+': 4.3, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    };

    const sum = mockStudents.reduce((acc, student) => {
      const gradeValue = gradeMap[student.grade] || 0;
      return acc + gradeValue;
    }, 0);

    return (sum / totalStudents).toFixed(2);
  }

  function calculateGradeDistribution() {
    const distribution: Record<string, number> = {};
    
    mockStudents.forEach(student => {
      const grade = student.grade.charAt(0); // Just take A, B, C, etc.
      distribution[grade] = (distribution[grade] || 0) + 1;
    });
    
    return distribution;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground pt-1">
                <Link to="/students" className="text-primary hover:underline">
                  View all students
                </Link>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageGrade}</div>
              <p className="text-xs text-muted-foreground pt-1">Average GPA across all students</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Student</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-md font-medium pb-2">Add a new student</div>
              <Link
                to="/students/new"
                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
              >
                <UserPlus className="mr-2 h-4 w-4" /> Add Student
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Breakdown of grades across all students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(gradeDistribution).map(([grade, count]) => (
                <div key={grade} className="flex items-center space-x-4">
                  <div className="font-medium w-10">{grade}:</div>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${(count / totalStudents) * 100}%` }} 
                      />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground w-10 text-right">
                    {Math.round((count / totalStudents) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
