import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import FormField from "../form/FormField";
import { inputClass, textareaClass } from "../form/inputStyles";
import Loader from "../Loader";

/**
 * Site-wide settings — name, description, contact email, logo.
 * Fetches its own data on mount from the settings API.
 */
export default function WebsiteSettingsForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      siteName: "",
      siteDescription: "",
      contactEmail: "",
      logoUrl: "",
    },
  });

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const onSubmit = async (formData) => {
    setSuccessMessage("");
    setServerError("");
    setIsSubmitting(true);
    try {
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader size="lg" />
      </div>
    );
  }

  if (loadError) {
    return (
      <p className="max-w-lg rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
        {loadError}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <FormField label="Site Name" error={errors.siteName}>
        <input
          type="text"
          className={inputClass}
          {...register("siteName", { required: "Site name is required" })}
        />
      </FormField>

      <FormField label="Site Description" error={errors.siteDescription}>
        <textarea
          rows={3}
          className={textareaClass}
          {...register("siteDescription")}
        />
      </FormField>

      <FormField label="Contact Email" error={errors.contactEmail}>
        <input
          type="email"
          className={inputClass}
          {...register("contactEmail", {
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          })}
        />
      </FormField>

      <FormField label="Logo URL (optional)" error={errors.logoUrl}>
        <input type="url" className={inputClass} {...register("logoUrl")} />
      </FormField>

      {successMessage && (
        <p className="text-sm text-emerald-400">{successMessage}</p>
      )}
      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-dark disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
