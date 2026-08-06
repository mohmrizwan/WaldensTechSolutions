import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { fetchBanner, createBanner, updateBanner } from "../api/bannerApi";
import FormField from "../components/admin/form/FormField";
import { inputClass, textareaClass } from "../components/admin/form/inputStyles";
import Loader from "../components/admin/Loader";



export default function Banner() {
  const [banner, setBanner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cards",
  });

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const bannerData = await fetchBanner();
        setBanner(bannerData);
        reset({
          ...defaultBannerData,
          ...bannerData,
          cards:
            bannerData?.cards?.length > 0
              ? bannerData.cards
              : defaultBannerData.cards,
        });
      } catch (error) {
        setServerError(
          "Unable to load banner settings. You can still edit the banner with defaults."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadBanner();
  }, [reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setServerError("");

    try {
      if (banner?.id || banner?._id) {
        const id = banner.id || banner._id;
        await updateBanner(id, data);
        setSuccessMessage("Banner updated successfully.");
      } else {
        const created = await createBanner(data);
        setBanner(created);
        setSuccessMessage("Banner created successfully.");
      }
    } catch (error) {
      setServerError(
        error?.response?.data?.message ||
          "Unable to save banner settings. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">Banner</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage the homepage banner, CTA buttons, and feature cards.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-surface-100/80 p-6 shadow-glass sm:p-8">
        {isLoading ? (
          <div className="flex justify-center py-14">
            <Loader size="lg" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {serverError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {serverError}
              </div>
            )}
            {successMessage && (
              <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                {successMessage}
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              <FormField label="Main Title" error={errors.title}>
                <input
                  type="text"
                  className={inputClass}
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
              </FormField>

              <FormField label="Highlighted Word" error={errors.highlight}>
                <input
                  type="text"
                  className={inputClass}
                  {...register("highlight", {
                    required: "Highlight text is required",
                  })}
                />
              </FormField>

              <FormField label="Subtitle" error={errors.subtitle}>
                <textarea
                  rows={4}
                  className={textareaClass}
                  {...register("subtitle", {
                    required: "Subtitle is required",
                  })}
                />
              </FormField>

              <FormField label="Primary CTA Text" error={errors.primaryCtaText}>
                <input
                  type="text"
                  className={inputClass}
                  {...register("primaryCtaText", {
                    required: "CTA text is required",
                  })}
                />
              </FormField>

              <FormField label="Primary CTA URL" error={errors.primaryCtaUrl}>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="/contact"
                  {...register("primaryCtaUrl")}
                />
              </FormField>

              <FormField label="Secondary CTA Text" error={errors.secondaryCtaText}>
                <input
                  type="text"
                  className={inputClass}
                  {...register("secondaryCtaText", {
                    required: "Secondary CTA text is required",
                  })}
                />
              </FormField>

              <FormField label="Secondary CTA URL" error={errors.secondaryCtaUrl}>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="/project"
                  {...register("secondaryCtaUrl")}
                />
              </FormField>
            </div>

            <div className="rounded-3xl border border-white/10 bg-surface-200/50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-100">Feature Cards</h2>
                  <p className="text-sm text-gray-400">
                    Edit the cards shown below the banner.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    append({
                      title: "",
                      value: "",
                      description: "",
                    })
                  }
                  className="rounded-lg border border-white/10 bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:border-accent hover:text-accent"
                >
                  Add Card
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-3xl border border-white/10 bg-surface-100/90 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-sm font-semibold text-gray-100">
                        Card {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-sm text-red-300 transition hover:text-red-100"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-4 mt-4 sm:grid-cols-2">
                      <FormField label="Card Title" error={errors.cards?.[index]?.title}>
                        <input
                          type="text"
                          className={inputClass}
                          {...register(`cards.${index}.title`, {
                            required: "Card title is required",
                          })}
                        />
                      </FormField>

                      <FormField label="Card Value" error={errors.cards?.[index]?.value}>
                        <input
                          type="text"
                          className={inputClass}
                          {...register(`cards.${index}.value`, {
                            required: "Card value is required",
                          })}
                        />
                      </FormField>

                      <FormField
                        label="Card Description"
                        error={errors.cards?.[index]?.description}
                      >
                        <textarea
                          rows={3}
                          className={textareaClass}
                          {...register(`cards.${index}.description`, {
                            required: "Card description is required",
                          })}
                        />
                      </FormField>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-dark disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Banner"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
