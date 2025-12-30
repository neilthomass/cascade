import { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
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
  Plus,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import { API_BASE, getAuthHeaders } from "../../pages/admin/AdminPage";

interface AgentBio {
  id: number;
  name: string;
  title: string | null;
  photo_url: string | null;
  bio_text: string | null;
  email: string | null;
  phone: string | null;
  certifications: string[];
  specialties: string[];
  years_experience: number | null;
  social_links: Record<string, string>;
  languages: string[];
  areas_served: string[];
  education: string[];
  awards: string[];
  display_order: number;
  is_active: boolean;
  lifetime_sales: string | null;
  avg_sale_price: string | null;
  clients_count: number | null;
  dre_number: string | null;
  created_at: string;
  updated_at: string;
}

interface AgentForm {
  name: string;
  title: string;
  bio_text: string;
  email: string;
  phone: string;
  certifications: string;
  specialties: string;
  years_experience: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  languages: string;
  areas_served: string;
  education: string;
  awards: string;
  is_active: boolean;
  lifetime_sales: string;
  avg_sale_price: string;
  clients_count: string;
  dre_number: string;
}

const emptyForm: AgentForm = {
  name: "",
  title: "",
  bio_text: "",
  email: "",
  phone: "",
  certifications: "",
  specialties: "",
  years_experience: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  languages: "",
  areas_served: "",
  education: "",
  awards: "",
  is_active: true,
  lifetime_sales: "",
  avg_sale_price: "",
  clients_count: "",
  dre_number: "",
};

export function AgentsManager() {
  const [agents, setAgents] = useState<AgentBio[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit/Create dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AgentBio | null>(null);
  const [form, setForm] = useState<AgentForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  // Photo upload state
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Delete dialog state
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAgents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/agents`, {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setAgents(data.data.items);
      }
    } catch (error) {
      console.error("Failed to fetch agents:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const handleCreate = () => {
    setEditingAgent(null);
    setForm(emptyForm);
    setPhotoPreview(null);
    setPhotoFile(null);
    setDialogOpen(true);
  };

  const handleEdit = (agent: AgentBio) => {
    setEditingAgent(agent);
    setForm({
      name: agent.name,
      title: agent.title || "",
      bio_text: agent.bio_text || "",
      email: agent.email || "",
      phone: agent.phone || "",
      certifications: agent.certifications.join(", "),
      specialties: agent.specialties.join(", "),
      years_experience: agent.years_experience?.toString() || "",
      linkedin: agent.social_links.linkedin || "",
      instagram: agent.social_links.instagram || "",
      facebook: agent.social_links.facebook || "",
      languages: agent.languages.join(", "),
      areas_served: agent.areas_served.join(", "),
      education: agent.education.join(", "),
      awards: agent.awards.join(", "),
      is_active: agent.is_active,
      lifetime_sales: agent.lifetime_sales || "",
      avg_sale_price: agent.avg_sale_price || "",
      clients_count: agent.clients_count?.toString() || "",
      dre_number: agent.dre_number || "",
    });
    setPhotoPreview(agent.photo_url ? getPhotoUrl(agent.photo_url) : null);
    setPhotoFile(null);
    setDialogOpen(true);
  };

  const getPhotoUrl = (photoPath: string) => {
    // Preserve local paths and full URLs
    if (photoPath.startsWith("/") || photoPath.startsWith("http")) return photoPath;
    // R2 keys go through the admin worker
    return `${API_BASE}/photo/${encodeURIComponent(photoPath)}`;
  };

  const parseCommaSeparated = (value: string): string[] => {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;

    setSaving(true);
    try {
      const socialLinks: Record<string, string> = {};
      if (form.linkedin) socialLinks.linkedin = form.linkedin;
      if (form.instagram) socialLinks.instagram = form.instagram;
      if (form.facebook) socialLinks.facebook = form.facebook;

      const payload = {
        name: form.name,
        title: form.title || null,
        bio_text: form.bio_text || null,
        email: form.email || null,
        phone: form.phone || null,
        certifications: parseCommaSeparated(form.certifications),
        specialties: parseCommaSeparated(form.specialties),
        years_experience: form.years_experience ? parseInt(form.years_experience) : null,
        social_links: socialLinks,
        languages: parseCommaSeparated(form.languages),
        areas_served: parseCommaSeparated(form.areas_served),
        education: parseCommaSeparated(form.education),
        awards: parseCommaSeparated(form.awards),
        is_active: form.is_active,
        lifetime_sales: form.lifetime_sales || null,
        avg_sale_price: form.avg_sale_price || null,
        clients_count: form.clients_count ? parseInt(form.clients_count) : null,
        dre_number: form.dre_number || null,
      };

      let agentId: number;

      if (editingAgent) {
        // Update existing agent
        const response = await fetch(`${API_BASE}/agents/${editingAgent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to update agent");
        agentId = editingAgent.id;
      } else {
        // Create new agent
        const response = await fetch(`${API_BASE}/agents`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to create agent");
        const data = await response.json();
        agentId = data.data.id;
      }

      // Upload photo if selected
      if (photoFile) {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = reader.result as string;
          await fetch(`${API_BASE}/agents/${agentId}/photo`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
            body: JSON.stringify({ photo: base64 }),
          });
          fetchAgents();
        };
        reader.readAsDataURL(photoFile);
      } else {
        fetchAgents();
      }

      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to save agent:", error);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    setDeleting(true);
    try {
      const response = await fetch(`${API_BASE}/agents/${deletingId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        setDeletingId(null);
        fetchAgents();
      }
    } catch (error) {
      console.error("Failed to delete agent:", error);
    }
    setDeleting(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Agents</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage agent profiles and bios.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Agent
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : agents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No agents found.</p>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Agent
          </Button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {agent.photo_url ? (
                        <img
                          src={getPhotoUrl(agent.photo_url)}
                          alt={agent.name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{agent.name}</div>
                        {agent.title && (
                          <div className="text-sm text-gray-500">{agent.title}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {agent.email && <div className="text-gray-900">{agent.email}</div>}
                      {agent.phone && <div className="text-gray-500">{agent.phone}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    {agent.years_experience ? (
                      <span className="text-sm text-gray-600">
                        {agent.years_experience} years
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {agent.is_active ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(agent)}
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setDeletingId(agent.id)}
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
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAgent ? "Edit Agent" : "Add New Agent"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Photo
              </label>
              <div className="flex items-center gap-4">
                {photoPreview ? (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-full"
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
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
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

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Name *
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Title
                </label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Broker / Owner"
                />
              </div>
            </div>

            {/* DRE Number */}
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                DRE Number
              </label>
              <Input
                value={form.dre_number}
                onChange={(e) => setForm({ ...form, dre_number: e.target.value })}
                placeholder="e.g., 01234567"
              />
              <p className="text-xs text-gray-500 mt-1">California Real Estate License Number</p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Phone
                </label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(408) 555-0123"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Bio
              </label>
              <Textarea
                value={form.bio_text}
                onChange={(e) => setForm({ ...form, bio_text: e.target.value })}
                placeholder="Agent biography and background..."
                rows={4}
              />
            </div>

            {/* Stats Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Stats (shown on profile)</h4>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Years
                  </label>
                  <Input
                    type="number"
                    value={form.years_experience}
                    onChange={(e) => setForm({ ...form, years_experience: e.target.value })}
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Lifetime Sales
                  </label>
                  <Input
                    value={form.lifetime_sales}
                    onChange={(e) => setForm({ ...form, lifetime_sales: e.target.value })}
                    placeholder="$1B+"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Avg Sale
                  </label>
                  <Input
                    value={form.avg_sale_price}
                    onChange={(e) => setForm({ ...form, avg_sale_price: e.target.value })}
                    placeholder="$1.8M"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Clients
                  </label>
                  <Input
                    type="number"
                    value={form.clients_count}
                    onChange={(e) => setForm({ ...form, clients_count: e.target.value })}
                    placeholder="350"
                  />
                </div>
              </div>
            </div>

            {/* Certifications & Specialties */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Certifications
                </label>
                <Input
                  value={form.certifications}
                  onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                  placeholder="CRS, GRI, ABR (comma separated)"
                />
                <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Specialties
                </label>
                <Input
                  value={form.specialties}
                  onChange={(e) => setForm({ ...form, specialties: e.target.value })}
                  placeholder="Luxury Homes, First-Time Buyers"
                />
                <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
              </div>
            </div>

            {/* Languages & Areas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Languages
                </label>
                <Input
                  value={form.languages}
                  onChange={(e) => setForm({ ...form, languages: e.target.value })}
                  placeholder="English, Spanish, Mandarin"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Areas Served
                </label>
                <Input
                  value={form.areas_served}
                  onChange={(e) => setForm({ ...form, areas_served: e.target.value })}
                  placeholder="Cupertino, Sunnyvale, San Jose"
                />
              </div>
            </div>

            {/* Education & Awards */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Education
                </label>
                <Input
                  value={form.education}
                  onChange={(e) => setForm({ ...form, education: e.target.value })}
                  placeholder="UC Berkeley, Stanford MBA"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Awards
                </label>
                <Input
                  value={form.awards}
                  onChange={(e) => setForm({ ...form, awards: e.target.value })}
                  placeholder="Top Producer 2023, President's Circle"
                />
              </div>
            </div>

            {/* Social Links */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Social Links
              </label>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  placeholder="LinkedIn URL"
                />
                <Input
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  placeholder="Instagram URL"
                />
                <Input
                  value={form.facebook}
                  onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                  placeholder="Facebook URL"
                />
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="rounded border-gray-300"
              />
              <label htmlFor="is_active" className="text-sm text-gray-700">
                Active (visible on website)
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !form.name.trim()}>
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : editingAgent ? (
                "Save Changes"
              ) : (
                "Create Agent"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Agent</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Are you sure you want to delete this agent? This action cannot be undone.
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
    </div>
  );
}
