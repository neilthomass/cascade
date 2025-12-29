import { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";
import {
  Loader2,
  Pencil,
  Trash2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Plus,
  Upload,
} from "lucide-react";
import { API_BASE } from "../../pages/admin/AdminPage";

interface Testimonial {
  id: number;
  name: string;
  email: string;
  property_address: string;
  testimonial_text: string;
  photo_url: string | null;
  submitted_at: string;
  status: "pending" | "approved" | "rejected";
  display_type: string | null;
  display_price: string | null;
  approved_at: string | null;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  // Edit dialog state
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editForm, setEditForm] = useState({
    testimonial_text: "",
    display_type: "",
    display_price: "",
  });
  const [saving, setSaving] = useState(false);
  const [editPhotoFile, setEditPhotoFile] = useState<File | null>(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState<string | null>(null);
  const [editPhotoRemoved, setEditPhotoRemoved] = useState(false);

  // Delete dialog state
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Create dialog state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    property_address: "",
    testimonial_text: "",
    display_type: "",
    display_price: "",
  });
  const [creating, setCreating] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), perPage: "20" });
      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      const response = await fetch(`${API_BASE}/testimonials?${params}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setTestimonials(data.data.items);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    }
    setLoading(false);
  }, [page, statusFilter]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleStatusChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    setPage(1);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setEditForm({
      testimonial_text: testimonial.testimonial_text,
      display_type: testimonial.display_type || "",
      display_price: testimonial.display_price || "",
    });
    setEditPhotoFile(null);
    setEditPhotoPreview(testimonial.photo_url);
    setEditPhotoRemoved(false);
  };

  const handleSaveEdit = async () => {
    if (!editingTestimonial) return;

    setSaving(true);
    try {
      // Build update payload
      const updatePayload: Record<string, unknown> = { ...editForm };

      // Handle photo changes
      if (editPhotoRemoved && !editPhotoFile) {
        // Photo was removed
        updatePayload.photo = null;
      } else if (editPhotoFile) {
        // New photo uploaded
        const photoBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(editPhotoFile);
        });
        updatePayload.photo = photoBase64;
      }

      const response = await fetch(`${API_BASE}/testimonials/${editingTestimonial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        setEditingTestimonial(null);
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Failed to update testimonial:", error);
    }
    setSaving(false);
  };

  const handleApprove = async (id: number) => {
    try {
      await fetch(`${API_BASE}/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: "approved" }),
      });
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to approve testimonial:", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await fetch(`${API_BASE}/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: "rejected" }),
      });
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to reject testimonial:", error);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    setDeleting(true);
    try {
      const response = await fetch(`${API_BASE}/testimonials/${deletingId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setDeletingId(null);
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
    setDeleting(false);
  };

  const handleCreate = async () => {
    if (!createForm.name || !createForm.property_address || !createForm.testimonial_text) return;

    setCreating(true);
    try {
      // Convert photo to base64 if provided
      let photoBase64: string | undefined;
      if (photoFile) {
        photoBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(photoFile);
        });
      }

      const response = await fetch(`${API_BASE}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...createForm,
          photo: photoBase64,
          status: "approved",
        }),
      });

      if (response.ok) {
        setCreateDialogOpen(false);
        setCreateForm({
          name: "",
          email: "",
          property_address: "",
          testimonial_text: "",
          display_type: "",
          display_price: "",
        });
        setPhotoFile(null);
        setPhotoPreview(null);
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Failed to create testimonial:", error);
    }
    setCreating(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPEG, PNG, and WebP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleEditPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPEG, PNG, and WebP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      return;
    }

    setEditPhotoFile(file);
    setEditPhotoPreview(URL.createObjectURL(file));
    setEditPhotoRemoved(false);
  };

  const handleRemoveEditPhoto = () => {
    setEditPhotoFile(null);
    setEditPhotoPreview(null);
    setEditPhotoRemoved(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage customer testimonials and reviews.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <Tabs value={statusFilter} onValueChange={handleStatusChange}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter} className="mt-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No testimonials found.
            </div>
          ) : (
            <>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testimonials.map((testimonial) => (
                      <TableRow key={testimonial.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {testimonial.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {testimonial.photo_url ? (
                              <img
                                src={testimonial.photo_url}
                                alt=""
                                className="w-10 h-10 object-cover rounded"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-gray-400" />
                              </div>
                            )}
                            <span className="text-sm">{testimonial.property_address}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(testimonial.status)}</TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(testimonial.submitted_at)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            {testimonial.status === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => handleApprove(testimonial.id)}
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleReject(testimonial.id)}
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEdit(testimonial)}
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setDeletingId(testimonial.id)}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    Showing {(pagination.page - 1) * pagination.perPage + 1} to{" "}
                    {Math.min(pagination.page * pagination.perPage, pagination.total)} of{" "}
                    {pagination.total} results
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === pagination.totalPages}
                      onClick={() => setPage(page + 1)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={!!editingTestimonial} onOpenChange={() => setEditingTestimonial(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
          </DialogHeader>

          {editingTestimonial && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>{editingTestimonial.name}</strong> &bull; {editingTestimonial.property_address}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Testimonial Text
                </label>
                <Textarea
                  value={editForm.testimonial_text}
                  onChange={(e) => setEditForm({ ...editForm, testimonial_text: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Display Type
                  </label>
                  <Input
                    value={editForm.display_type}
                    onChange={(e) => setEditForm({ ...editForm, display_type: e.target.value })}
                    placeholder="e.g., First-Time Buyer"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Display Price
                  </label>
                  <Input
                    value={editForm.display_price}
                    onChange={(e) => setEditForm({ ...editForm, display_price: e.target.value })}
                    placeholder="e.g., $720K"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Property Photo
                </label>
                <div className="flex items-center gap-4">
                  {editPhotoPreview ? (
                    <div className="relative">
                      <img
                        src={editPhotoPreview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveEditPhoto}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleEditPhotoChange}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        {editPhotoPreview ? "Change Photo" : "Upload Photo"}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTestimonial(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Are you sure you want to delete this testimonial? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Testimonial Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Testimonial</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Customer Name *
                </label>
                <Input
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Email (optional)
                </label>
                <Input
                  type="email"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Property Address *
              </label>
              <Input
                value={createForm.property_address}
                onChange={(e) => setCreateForm({ ...createForm, property_address: e.target.value })}
                placeholder="123 Main St, San Jose, CA"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Testimonial Text *
              </label>
              <Textarea
                value={createForm.testimonial_text}
                onChange={(e) => setCreateForm({ ...createForm, testimonial_text: e.target.value })}
                placeholder="Write the customer's testimonial..."
                rows={4}
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Property Photo
              </label>
              <div className="flex items-center gap-4">
                {photoPreview ? (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </span>
                  </Button>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Display Type
                </label>
                <Input
                  value={createForm.display_type}
                  onChange={(e) => setCreateForm({ ...createForm, display_type: e.target.value })}
                  placeholder="e.g., First-Time Buyer"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Display Price
                </label>
                <Input
                  value={createForm.display_price}
                  onChange={(e) => setCreateForm({ ...createForm, display_price: e.target.value })}
                  placeholder="e.g., $720K"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={creating || !createForm.name || !createForm.property_address || !createForm.testimonial_text}
            >
              {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Testimonial"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
