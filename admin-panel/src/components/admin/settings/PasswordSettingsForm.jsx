import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "../form/FormField";
import { inputClass } from "../form/inputStyles";

/**
 * Password change form. Standalone from ProfileSettingsForm since it
 * has its own success/error state and clears itself after a successful save.
 */
export default function PasswordSettingsForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (formData) => {
    setSuccessMessage("");
    setServerError("");
    setIsSubmitting(true);
    try {
      reset();
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <FormField label="Current Password" error={errors.currentPassword}>
        <input
          type="password"
          className={inputClass}
          {...register("currentPassword", {
            required: "Current password is required",
          })}
        />
      </FormField>

      <FormField label="New Password" error={errors.newPassword}>
        <input
          type="password"
          className={inputClass}
          {...register("newPassword", {
            required: "New password is required",
            minLength: { value: 8, message: "Must be at least 8 characters" },
          })}
        />
      </FormField>

      <FormField label="Confirm New Password" error={errors.confirmPassword}>
        <input
          type="password"
          className={inputClass}
          {...register("confirmPassword", {
            required: "Please confirm your new password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
        />
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
        {isSubmitting ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
