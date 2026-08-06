import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "../form/FormField";
import { inputClass } from "../form/inputStyles";
/**
 * Profile settings — name, email, avatar URL.
 * STATIC UI MODE: there is no session to read initial values from,
 * so the form simply starts empty.
 */
export default function ProfileSettingsForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", avatarUrl: "" },
  });

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <FormField label="Full Name" error={errors.name}>
        <input
          type="text"
          className={inputClass}
          {...register("name", { required: "Name is required" })}
        />
      </FormField>

      <FormField label="Email" error={errors.email}>
        <input
          type="email"
          className={inputClass}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          })}
        />
      </FormField>

      <FormField label="Avatar URL (optional)" error={errors.avatarUrl}>
        <input type="url" className={inputClass} {...register("avatarUrl")} />
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
