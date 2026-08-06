import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import FormField from "../form/FormField";
import { inputClass, textareaClass } from "../form/inputStyles";

export default function ServiceFormModal({
  isOpen,
  onClose,
  service,
  onSubmit,
  isSubmitting,
}) {
  const isEditMode = !!service;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: service?.title || "",
        description: service?.description || "",
        icon: service?.icon || "",
      });
    }
  }, [isOpen, service, reset]);

  // Forward form data up to the parent page.
  const submitCall = async (data) => {
    await onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Service" : "Add Service"}
    >
      <form onSubmit={handleSubmit(submitCall)} className="space-y-4">
        <FormField label="Title" error={errors.title}>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Web Development"
            {...register("title", {
              required: "Title is required",
            })}
          />
        </FormField>

        <FormField label="Description" error={errors.description}>
          <textarea
            rows={4}
            className={textareaClass}
            placeholder="Briefly describe this service..."
            {...register("description", {
              required: "Description is required",
            })}
          />
        </FormField>

        <FormField label="icon" error={errors.icon}>
          <input
            type="text"
            className={inputClass}
            placeholder="fa-solid fa-bullseye"
            {...register("icon")}
          />
        </FormField>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-dark disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Add Service"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
