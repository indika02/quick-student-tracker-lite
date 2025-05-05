
import { useState } from "react";
import DashboardLayout from "@/components/Layout/Dashboard";
import StudentTable from "@/components/students/StudentTable";
import { Student, mockStudents } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Students = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setStudentToDelete(id);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      const studentName = students.find(s => s.id === studentToDelete);
      setStudents(students.filter((student) => student.id !== studentToDelete));
      setStudentToDelete(null);
      toast({
        title: "Student deleted",
        description: `${studentName?.firstName} ${studentName?.lastName} has been removed.`,
      });
    }
  };

  const cancelDelete = () => {
    setStudentToDelete(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage your students here</p>
        </div>

        <StudentTable students={students} onDelete={handleDelete} />

        <AlertDialog open={!!studentToDelete} onOpenChange={() => setStudentToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this student's record. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default Students;
