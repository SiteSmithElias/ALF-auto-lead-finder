import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { getProfile, updateProfile, uploadAvatar } from "../../../api/profile";
import type { Profile } from "../../../types/profile";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { getMediaUrl } from "../../../utils/media";

export default function ProfileCard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setForm({
          name: data.name ?? "",
          email: data.email ?? "",
          companyName: data.company_name ?? "",
        });
        setAvatarPreview(getMediaUrl(data.avatar_url));
      } catch {
        setStatus("Unable to load your profile right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setStatus(null);

    try {
      const updated = await updateProfile({
        name: form.name,
        email: form.email,
        company_name: form.companyName || null,
      });

      setProfile(updated);
      setForm({
        name: updated.name ?? "",
        email: updated.email ?? "",
        companyName: updated.company_name ?? "",
      });
      setAvatarPreview(getMediaUrl(updated.avatar_url));
      window.dispatchEvent(new Event("profile-updated"));
      setStatus("Profile updated successfully.");
    } catch {
      setStatus("Unable to save your profile right now.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setStatus(null);

    try {
      const updated = await uploadAvatar(file);
      setProfile(updated);
      setAvatarPreview(getMediaUrl(updated.avatar_url));
      window.dispatchEvent(new Event("profile-updated"));
      setStatus("Profile photo updated.");
    } catch {
      setStatus("Unable to upload your photo right now.");
    } finally {
      event.target.value = "";
    }
  };

  const initials = (profile?.name || "ALF User")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <Card>
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">
          Profile
        </h2>

        {isLoading ? (
          <p className="text-sm text-[var(--muted)]">
            Loading profile...
          </p>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[var(--primary)] text-2xl font-bold text-white">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Photo
                </Button>

                <p className="text-sm text-[var(--muted)]">
                  PNG, JPG, or WebP
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-[var(--muted)]">
                  Name
                </label>

                <Input
                  value={form.name}
                  onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[var(--muted)]">
                  Email
                </label>

                <Input
                  value={form.email}
                  placeholder="Add your email"
                  onChange={(value) => setForm((current) => ({ ...current, email: value }))}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[var(--muted)]">
                  Company
                </label>

                <Input
                  value={form.companyName}
                  placeholder="Add your company"
                  onChange={(value) => setForm((current) => ({ ...current, companyName: value }))}
                />
              </div>
            </div>

            {status ? (
              <p className="text-sm text-[var(--muted)]">{status}</p>
            ) : null}

            <Button type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Profile"}
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
