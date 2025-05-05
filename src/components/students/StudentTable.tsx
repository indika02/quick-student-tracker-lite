
import { useState } from "react";
import { Student } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  ArrowDown, 
  ArrowUp,
  Edit, 
  Search, 
  Trash2, 
  UserPlus 
} from "lucide-react";
import { Link } from "react-router-dom";

interface StudentTableProps {
  students: Student[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

type SortField = keyof Pick<Student, 'firstName' | 'lastName' | 'email' | 'grade' | 'age'>;

const StudentTable = ({ students, onDelete, isLoading = false }: StudentTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("lastName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAndFilteredStudents = [...students]
    .filter(
      (student) =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.grade.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      // For numeric values
      const numA = Number(valueA);
      const numB = Number(valueB);
      return sortDirection === "asc" ? numA - numB : numB - numA;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4 inline" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4 inline" />
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link to="/students/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Link>
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center z-10">
            <div className="bg-card p-4 rounded-md shadow-lg">
              <p className="flex items-center">
                <RefreshCw className="animate-spin mr-2 h-4 w-4" />
                Refreshing data...
              </p>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="w-[180px] cursor-pointer"
                onClick={() => handleSort("firstName")}
              >
                First Name <SortIcon field="firstName" />
              </TableHead>
              <TableHead 
                className="w-[180px] cursor-pointer"
                onClick={() => handleSort("lastName")}
              >
                Last Name <SortIcon field="lastName" />
              </TableHead>
              <TableHead 
                className="cursor-pointer hidden md:table-cell"
                onClick={() => handleSort("email")}
              >
                Email <SortIcon field="email" />
              </TableHead>
              <TableHead 
                className="w-[100px] cursor-pointer text-center"
                onClick={() => handleSort("grade")}
              >
                Grade <SortIcon field="grade" />
              </TableHead>
              <TableHead 
                className="w-[80px] cursor-pointer text-center hidden sm:table-cell"
                onClick={() => handleSort("age")}
              >
                Age <SortIcon field="age" />
              </TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredStudents.length > 0 ? (
              sortedAndFilteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                  <TableCell className="text-center">{student.grade}</TableCell>
                  <TableCell className="text-center hidden sm:table-cell">{student.age}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/students/edit/${student.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onDelete(student.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentTable;
