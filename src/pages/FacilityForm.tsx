
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facility } from "../utils/mockData";
import DashboardLayout from "../components/Layout/Dashboard";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Form validation schema
const facilityFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["classroom", "laboratory", "library", "gymnasium", "cafeteria", "office", "other"], {
    required_error: "Please select a facility type",
  }),
  location: z.string().min(3, "Location must be at least 3 characters"),
  capacity: z.coerce.number().int().positive("Capacity must be a positive number"),
  isAvailable: z.boolean().default(true),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

type FacilityFormValues = z.infer<typeof facilityFormSchema>;

const FacilityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formError, setFormError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard");
      toast({
        title: "Access Denied",
        description: "Only administrators can manage facilities",
        variant: "destructive",
      });
    }
  }, [isAdmin, navigate, toast]);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FacilityFormValues>({
    resolver: zodResolver(facilityFormSchema),
    defaultValues: {
      name: "",
      type: "classroom",
      location: "",
      capacity: 0,
      isAvailable: true,
      description: "",
    },
  });

  useEffect(() => {
    if (id) {
      // Load facility data from localStorage for editing
      const storedFacilities = localStorage.getItem("facilities");
      if (storedFacilities) {
        const facilities: Facility[] = JSON.parse(storedFacilities);
        const facilityToEdit = facilities.find(facility => facility.id === id);
        
        if (facilityToEdit) {
          // Reset form with facility data
          form.reset({
            name: facilityToEdit.name,
            type: facilityToEdit.type,
            location: facilityToEdit.location,
            capacity: facilityToEdit.capacity,
            isAvailable: facilityToEdit.isAvailable,
            description: facilityToEdit.description,
          });
        } else {
          // Facility not found, redirect to facilities list
          navigate("/facilities");
          toast({
            title: "Facility not found",
            description: "The facility you're trying to edit doesn't exist",
            variant: "destructive",
          });
        }
      }
    }
  }, [id, form, navigate, toast]);

  const onSubmit = (values: FacilityFormValues) => {
    setFormError(null);
    try {
      const storedFacilities = localStorage.getItem("facilities");
      const facilities: Facility[] = storedFacilities ? JSON.parse(storedFacilities) : [];

      if (id) {
        // Update existing facility
        const updatedFacilities = facilities.map(facility => {
          if (facility.id === id) {
            return {
              ...facility,
              ...values,
            };
          }
          return facility;
        });

        localStorage.setItem("facilities", JSON.stringify(updatedFacilities));
        toast({
          title: "Facility updated",
          description: "The facility has been successfully updated",
        });
      } else {
        // Create new facility
        // Ensure all required fields are present by directly using values from the form
        const newFacility: Facility = {
          id: Date.now().toString(), // Generate a simple ID
          name: values.name,
          type: values.type,
          location: values.location,
          capacity: values.capacity,
          isAvailable: values.isAvailable,
          description: values.description,
          createdAt: new Date().toISOString().substring(0, 10),
        };

        localStorage.setItem("facilities", JSON.stringify([...facilities, newFacility]));
        toast({
          title: "Facility created",
          description: "The new facility has been successfully added",
        });
      }
      
      // Navigate back to facilities list
      navigate("/facilities");
    } catch (error) {
      setFormError("An error occurred while saving the facility.");
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{id ? "Edit Facility" : "Add New Facility"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {formError}
                </div>
              )}
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter facility name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a facility type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="classroom">Classroom</SelectItem>
                        <SelectItem value="laboratory">Laboratory</SelectItem>
                        <SelectItem value="library">Library</SelectItem>
                        <SelectItem value="gymnasium">Gymnasium</SelectItem>
                        <SelectItem value="cafeteria">Cafeteria</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter facility location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter capacity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isAvailable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Available</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a description of the facility"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate("/facilities")}>
                  Cancel
                </Button>
                <Button type="submit">
                  {id ? "Update Facility" : "Create Facility"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default FacilityForm;
