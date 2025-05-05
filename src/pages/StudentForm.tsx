
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/Layout/Dashboard";
import StudentFormComponent from "@/components/students/StudentForm";
import { Student, mockStudents } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

const StudentFormPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(id ? true : false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get current students state from localStorage if available
  const getCurrentStudents = (): Student[] => {
    try {
      const storedStudents = localStorage.getItem('currentStudents');
      return storedStudents ? JSON.parse(storedStudents) : mockStudents;
    } catch (e) {
      return mockStudents;
    }
  };

  useEffect(() => {
    if (id) {
      // Simulate API call delay
      const timer = setTimeout(() => {
        const currentStudents = getCurrentStudents();
        const foundStudent = currentStudents.find((s) => s.id === id);
        setStudent(foundStudent);
        setIsLoading(false);
        
        if (!foundStudent) {
          toast({
            title: "Student not found",
            description: "The requested student could not be found",
            variant: "destructive",
          });
          navigate("/students");
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [id, navigate, toast]);

  const handleSubmit = (formData: Omit<Student, "id">) => {
    // Simulate API call delay
    setTimeout(() => {
      const currentStudents = getCurrentStudents();
      
      if (id) {
        // Update existing student
        const updatedStudents = currentStudents.map(s => 
          s.id === id ? { ...formData, id } : s
        );
        
        // Save updated students list to localStorage
        localStorage.setItem('currentStudents', JSON.stringify(updatedStudents));
        
        toast({
          title: "Student updated",
          description: `${formData.firstName} ${formData.lastName}'s information has been updated.`,
        });
      } else {
        // Create new student with unique ID
        const newStudent = {
          ...formData,
          id: `${Date.now()}` // Simple unique ID
        };
        
        const updatedStudents = [...currentStudents, newStudent];
        
        // Save updated students list to localStorage
        localStorage.setItem('currentStudents', JSON.stringify(updatedStudents));
        
        toast({
          title: "Student added",
          description: `${formData.firstName} ${formData.lastName} has been added successfully.`,
        });
      }
      navigate("/students");
    }, 500);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading student data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{id ? "Edit Student" : "Add Student"}</h1>
          <p className="text-muted-foreground">
            {id ? "Update student information" : "Add a new student to the system"}
          </p>
        </div>
        
        <StudentFormComponent student={student} onSubmit={handleSubmit} />
      </div>
    </DashboardLayout>
  );
};

export default StudentFormPage;
