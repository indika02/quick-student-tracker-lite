
import { useState } from "react";
import { Facility } from "../../utils/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface FacilityTableProps {
  facilities: Facility[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isAdmin: boolean;
}

const FacilityTable = ({ facilities, onDelete, onEdit, isAdmin }: FacilityTableProps) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState<string | null>(null);

  const handleView = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setFacilityToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (facilityToDelete) {
      onDelete(facilityToDelete);
      setIsDeleteDialogOpen(false);
      setFacilityToDelete(null);
    }
  };

  const formatFacilityType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facilities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No facilities found
                </TableCell>
              </TableRow>
            ) : (
              facilities.map((facility) => (
                <TableRow key={facility.id}>
                  <TableCell className="font-medium">{facility.name}</TableCell>
                  <TableCell>{formatFacilityType(facility.type)}</TableCell>
                  <TableCell>{facility.location}</TableCell>
                  <TableCell>{facility.capacity}</TableCell>
                  <TableCell>
                    <Badge variant={facility.isAvailable ? "default" : "outline"}>
                      {facility.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(facility)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    {isAdmin && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => onEdit(facility.id)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteClick(facility.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Facility Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Facility Details</DialogTitle>
          </DialogHeader>
          {selectedFacility && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Name:</span>
                <span className="col-span-2">{selectedFacility.name}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Type:</span>
                <span className="col-span-2">{formatFacilityType(selectedFacility.type)}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Location:</span>
                <span className="col-span-2">{selectedFacility.location}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Capacity:</span>
                <span className="col-span-2">{selectedFacility.capacity}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Status:</span>
                <span className="col-span-2">
                  <Badge variant={selectedFacility.isAvailable ? "default" : "outline"}>
                    {selectedFacility.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Created:</span>
                <span className="col-span-2">{selectedFacility.createdAt}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="font-medium">Description:</span>
                <div className="col-span-2">{selectedFacility.description}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this facility? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacilityTable;
