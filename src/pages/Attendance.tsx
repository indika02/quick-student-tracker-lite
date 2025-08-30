import { useState } from "react";
import DashboardLayout from "@/components/Layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, XCircle, Clock, Users } from "lucide-react";
import { mockStudents } from "@/utils/mockData";

interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
}

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    {
      id: "1",
      studentId: "1",
      date: selectedDate,
      status: "present",
      subject: "Mathematics"
    },
    {
      id: "2", 
      studentId: "2",
      date: selectedDate,
      status: "late",
      subject: "Mathematics"
    },
    {
      id: "3",
      studentId: "3", 
      date: selectedDate,
      status: "absent",
      subject: "Mathematics"
    }
  ]);

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => {
      const existingRecord = prev.find(record => 
        record.studentId === studentId && record.date === selectedDate
      );
      
      if (existingRecord) {
        return prev.map(record => 
          record.id === existingRecord.id 
            ? { ...record, status }
            : record
        );
      } else {
        return [...prev, {
          id: Date.now().toString(),
          studentId,
          date: selectedDate,
          status,
          subject: "Mathematics"
        }];
      }
    });
  };

  const getAttendanceStatus = (studentId: string) => {
    const record = attendance.find(a => 
      a.studentId === studentId && a.date === selectedDate
    );
    return record?.status || 'unmarked';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" />Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="w-3 h-3 mr-1" />Late</Badge>;
      default:
        return <Badge variant="outline">Unmarked</Badge>;
    }
  };

  const attendanceStats = {
    present: attendance.filter(a => a.status === 'present' && a.date === selectedDate).length,
    absent: attendance.filter(a => a.status === 'absent' && a.date === selectedDate).length,
    late: attendance.filter(a => a.status === 'late' && a.date === selectedDate).length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Attendance Management</h1>
            <p className="text-muted-foreground">Track and manage student attendance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Attendance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStudents.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Late</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance - Mathematics Class</CardTitle>
            <CardDescription>Mark attendance for {selectedDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudents.map((student) => {
                const status = getAttendanceStatus(student.id);
                return (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{student.firstName} {student.lastName}</h3>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(status)}
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={status === 'present' ? 'default' : 'outline'}
                          onClick={() => markAttendance(student.id, 'present')}
                          className="text-xs"
                        >
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant={status === 'late' ? 'default' : 'outline'}
                          onClick={() => markAttendance(student.id, 'late')}
                          className="text-xs"
                        >
                          Late
                        </Button>
                        <Button
                          size="sm"
                          variant={status === 'absent' ? 'destructive' : 'outline'}
                          onClick={() => markAttendance(student.id, 'absent')}
                          className="text-xs"
                        >
                          Absent
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;