import React, { useEffect, useState } from "react";
import { fetchProjects } from "../api/projectApi";

const placeholderCards = [

];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchProjects({ page: 1, limit: 12 });
        setProjects(data);
      } catch (err) {
        setError("Unable to load projects right now. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const cards = isLoading ? placeholderCards : projects;

  return (
    <div className="projects-wrapper mx-auto px-7 mt-24">
      <div className="projects-inner">
        <div className="projects-head">
          <h3 className="text-3xl tracking-wider text-center font-space text-[#F4C95D]">
            OUR WORK
          </h3>
        </div>
        <div className="projects-title mt-4">
          <h2 className="text-6xl font-bold text-white font-space text-center">
            Projects built to move <br /> the needle, not just look good.
          </h2>
        </div>

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-center text-sm text-red-100">
            {error}
          </div>
        )}

        <div className="projects-grid mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((project, index) => {
            return (
              <div
                key={project._id || `placeholder-${index}`}
                className="group relative overflow-hidden rounded-2xl border border-[#24304A] bg-[#0B1220] transition-all duration-500 hover:border-[#F4C95D]/50"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={project.imageUrl || "/images/project-placeholder.png"}
                    alt={project.name || project.title || "Project"}
                    className={`h-full w-full object-cover transition-all duration-700 ${
                      project.imageUrl ? "" : "bg-[#192135]"
                    }`}
                  />
                  <div className="absolute inset-0 bg-[#0B1220]/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <a
                      href={project.projectUrl || "/project"}
                      target={
                        project.projectUrl?.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        project.projectUrl?.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      aria-label={`View ${project.name || project.title || "project"}`}
                      className="flex items-center gap-2 rounded-full border border-[#F4C95D] bg-[#0B1220]/80 px-4 py-2 text-xs font-space font-medium text-[#F4C95D] transition-colors hover:bg-[#F4C95D] hover:text-[#0B1220]"
                    >
                      <span>View Project</span>
                      <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tracking-widest uppercase text-[#F4C95D] font-space">
                      {project.category || "Web App"}
                    </span>
                    <i className="fa-solid fa-arrow-up-right text-sm text-[#B8C0D0] transition-all duration-500 group-hover:text-[#F4C95D] group-hover:rotate-45" />
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white font-space">
                    {project.name || project.title || "Project Name"}
                  </h3>
                  <p className="mt-1 text-[#B8C0D0] text-sm leading-6">
                    {project.description ||
                      "A polished project description will appear here once your projects are loaded."}
                  </p>
                </div>
              </div>
            );
          })}
          {!isLoading && projects.length === 0 && !error && (
            <div className="col-span-1 md:col-span-3 rounded-2xl border border-dashed border-[#24304A] bg-[#0B1220]/80 p-8 text-center text-sm text-[#B8C0D0]">
              No project listings are available yet. Add a project in the admin
              panel to populate this section.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
