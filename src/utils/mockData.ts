export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  age: number;
  avatar?: string;
  enrollmentDate: string;
}

export const mockStudents: Student[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    grade: "A",
    age: 18,
    enrollmentDate: "2023-08-15"
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    grade: "B+",
    age: 17,
    enrollmentDate: "2023-09-01"
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    grade: "A-",
    age: 18,
    enrollmentDate: "2023-08-20"
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.w@example.com",
    grade: "B",
    age: 17,
    enrollmentDate: "2023-09-05"
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    grade: "A+",
    age: 19,
    enrollmentDate: "2023-08-10"
  }
];

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: 'admin' | 'teacher' | 'student';
}

export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    password: "password",
    fullName: "Admin User",
    role: "admin"
  },
  {
    id: "2",
    username: "teacher",
    password: "password",
    fullName: "Teacher User",
    role: "teacher"
  },
  {
    id: "3",
    username: "student",
    password: "student123",
    fullName: "Student User",
    role: "student"
  }
];

// Timetable interface and mock data for student dashboard
export interface TimetableEntry {
  id: string;
  subject: string;
  instructor: string;
  time: string;
  day: string;
  location: string;
  duration: string;
}

export const mockTimetable: TimetableEntry[] = [
  {
    id: "1",
    subject: "Mathematics",
    instructor: "Dr. Smith",
    time: "09:00 AM",
    day: "Monday",
    location: "Room 101",
    duration: "1 hour"
  },
  {
    id: "2",
    subject: "Physics",
    instructor: "Dr. Johnson",
    time: "11:00 AM",
    day: "Monday",
    location: "Lab 201",
    duration: "2 hours"
  },
  {
    id: "3",
    subject: "Chemistry",
    instructor: "Dr. Wilson",
    time: "02:00 PM",
    day: "Tuesday",
    location: "Lab 301",
    duration: "1.5 hours"
  },
  {
    id: "4",
    subject: "English Literature",
    instructor: "Ms. Brown",
    time: "10:00 AM",
    day: "Wednesday",
    location: "Room 205",
    duration: "1 hour"
  },
  {
    id: "5",
    subject: "Computer Science",
    instructor: "Mr. Davis",
    time: "01:00 PM",
    day: "Thursday",
    location: "Computer Lab",
    duration: "2 hours"
  }
];

export interface Facility {
  id: string;
  name: string;
  type: 'classroom' | 'laboratory' | 'library' | 'gymnasium' | 'cafeteria' | 'office' | 'other';
  location: string;
  capacity: number;
  isAvailable: boolean;
  description: string;
  createdAt: string;
}

export const mockFacilities: Facility[] = [
  {
    id: "1",
    name: "Main Auditorium",
    type: "classroom",
    location: "Building A, Floor 1",
    capacity: 200,
    isAvailable: true,
    description: "Large auditorium for conferences and large classes",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Chemistry Lab",
    type: "laboratory",
    location: "Science Building, Floor 2",
    capacity: 30,
    isAvailable: true,
    description: "Fully equipped chemistry laboratory",
    createdAt: "2024-02-10"
  },
  {
    id: "3",
    name: "Main Library",
    type: "library",
    location: "Central Building, Floor 1",
    capacity: 100,
    isAvailable: true,
    description: "Main student library with extensive collection",
    createdAt: "2024-01-05"
  }
];
