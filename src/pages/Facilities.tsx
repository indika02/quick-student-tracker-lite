
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockFacilities, Facility } from "../utils/mockData";
import DashboardLayout from "../components/Layout/Dashboard";
import FacilityTable from "../components/facilities/FacilityTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Facilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    // Load facilities from localStorage or use mock data
    const storedFacilities = localStorage.getItem("facilities");
    if (storedFacilities) {
      setFacilities(JSON.parse(storedFacilities));
    } else {
      setFacilities(mockFacilities);
      localStorage.setItem("facilities", JSON.stringify(mockFacilities));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedFacilities = facilities.filter(facility => facility.id !== id);
    setFacilities(updatedFacilities);
    localStorage.setItem("facilities", JSON.stringify(updatedFacilities));
    toast({
      title: "Facility deleted",
      description: "The facility has been successfully deleted.",
    });
  };

  const handleAddNew = () => {
    navigate("/facilities/new");
  };

  const handleEdit = (id: string) => {
    navigate(`/facilities/edit/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Facilities Management</h1>
        {isAdmin && (
          <Button onClick={handleAddNew}>
            <Plus className="mr-2" />
            Add New Facility
          </Button>
        )}
      </div>
      <FacilityTable 
        facilities={facilities} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
        isAdmin={isAdmin}
      />
    </DashboardLayout>
  );
};

export default Facilities;
