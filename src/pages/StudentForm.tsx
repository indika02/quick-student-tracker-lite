
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

  useEffect(() => {
    if (id) {
      // Simulate API call delay
      const timer = setTimeout(() => {
        const foundStudent = mockStudents.find((s) => s.id === id);
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
      if (id) {
        // Update existing student (would be an API call in a real app)
        toast({
          title: "Student updated",
          description: `${formData.firstName} ${formData.lastName}'s information has been updated.`,
        });
      } else {
        // Create new student (would be an API call in a real app)
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
