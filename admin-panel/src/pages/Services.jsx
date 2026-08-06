import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import ServiceCard from "../components/admin/ServiceCard";
import ServiceFormModal from "../components/admin/services/ServiceFormModal";
import ConfirmModal from "../components/admin/ConfirmModal";
import Pagination from "../components/admin/Pagination";
import PageSearchInput from "../components/admin/PageSearchInput";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { PAGE_SIZE } from "../utils/constants";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../api/serviceApi";

/**
 * Services page — full CRUD. Owns all state: list data, pagination,
 * search, and which modal (form/delete) is currently open.
 */
export default function Services() {
  const [services, setServices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formModal, setFormModal] = useState({ isOpen: false, service: null });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    service: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchServices({
        page: currentPage,
        limit: PAGE_SIZE,
        search: debouncedSearch,
      });
      setServices(result.data);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load services.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  // Reset to page 1 whenever the search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const getServiceId = (service) => service?._id || service?.id;

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (formModal.service) {
        await updateService(getServiceId(formModal.service), formData);
      } else {
        await createService(formData);
      }
      setFormModal({ isOpen: false, service: null });
      loadServices();
    } catch (err) {
      // In production this would surface a toast; kept minimal here
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    try {
      await deleteService(getServiceId(deleteModal.service));
      setDeleteModal({ isOpen: false, service: null });
      loadServices();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">Services</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage the services displayed on your site.
          </p>
        </div>
        <button
          onClick={() => setFormModal({ isOpen: true, service: null })}
          className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-dark"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      <div className="mt-6">
        <PageSearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search services..."
        />
      </div>

      <div className="mt-6">
        {isLoading && (
          <div className="flex justify-center py-14">
            <Loader size="lg" />
          </div>
        )}

        {!isLoading && error && (
          <p className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {!isLoading && !error && services.length === 0 && (
          <EmptyState
            title="No services found"
            description={
              debouncedSearch
                ? "Try a different search term."
                : "Add your first service to get started."
            }
          />
        )}

        {!isLoading && !error && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={(s) => setFormModal({ isOpen: true, service: s })}
                  onDelete={(s) => setDeleteModal({ isOpen: true, service: s })}
                />
              ))}
            </div>

            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>

      <ServiceFormModal
        isOpen={formModal.isOpen}
        onClose={() => setFormModal({ isOpen: false, service: null })}
        onSubmit={handleFormSubmit}
        service={formModal.service}
        isSubmitting={isSubmitting}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, service: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Service"
        description={`Are you sure you want to delete "${deleteModal.service?.title}"? This cannot be undone.`}
        isLoading={isSubmitting}
      />
    </div>
  );
}
