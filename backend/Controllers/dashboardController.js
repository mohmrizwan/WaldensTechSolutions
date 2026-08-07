import Service from "../Models/ServiceModel.js";
import Project from "../Models/ProjectModel.js";
import Contact from "../Models/ContactModel.js";
import Admin from "../Models/admin.js";

const getTrend = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

const getMonthlyCounts = async (Model, startDate) => {
  return Model.aggregate([
    { $match: { createdAt: { $gte: startDate }, ...(Model.modelName !== "Contact" ? { isActive: true } : {}) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
  ]);
};

export const getDashboardStats = async (_req, res) => {
  try {
    const now = new Date();
    const currentPeriodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousPeriodStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const chartStart = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const [totalServices, totalProjects, totalTeamMembers, totalContacts, currentCounts, previousCounts, chartCounts] =
      await Promise.all([
        Service.countDocuments({ isActive: true }),
        Project.countDocuments({ isActive: true }),
        Admin.countDocuments(),
        Contact.countDocuments(),
        Promise.all([
          Service.countDocuments({ isActive: true, createdAt: { $gte: currentPeriodStart } }),
          Project.countDocuments({ isActive: true, createdAt: { $gte: currentPeriodStart } }),
          Admin.countDocuments({ createdAt: { $gte: currentPeriodStart } }),
          Contact.countDocuments({ createdAt: { $gte: currentPeriodStart } }),
        ]),
        Promise.all([
          Service.countDocuments({ isActive: true, createdAt: { $gte: previousPeriodStart, $lt: currentPeriodStart } }),
          Project.countDocuments({ isActive: true, createdAt: { $gte: previousPeriodStart, $lt: currentPeriodStart } }),
          Admin.countDocuments({ createdAt: { $gte: previousPeriodStart, $lt: currentPeriodStart } }),
          Contact.countDocuments({ createdAt: { $gte: previousPeriodStart, $lt: currentPeriodStart } }),
        ]),
        Promise.all([
          getMonthlyCounts(Service, chartStart),
          getMonthlyCounts(Project, chartStart),
          getMonthlyCounts(Contact, chartStart),
        ]),
      ]);

    const chart = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const findCount = (counts) => counts.find((item) => item._id.year === year && item._id.month === month)?.count || 0;

      return {
        label: date.toLocaleString("en-US", { month: "short" }),
        services: findCount(chartCounts[0]),
        projects: findCount(chartCounts[1]),
        contacts: findCount(chartCounts[2]),
      };
    });

    return res.json({
      totalServices,
      totalProjects,
      totalTeamMembers,
      totalContacts,
      servicesTrend: getTrend(currentCounts[0], previousCounts[0]),
      projectsTrend: getTrend(currentCounts[1], previousCounts[1]),
      teamTrend: getTrend(currentCounts[2], previousCounts[2]),
      contactsTrend: getTrend(currentCounts[3], previousCounts[3]),
      chart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to load dashboard statistics", error: error.message });
  }
};

export const getRecentActivity = async (_req, res) => {
  try {
    const [services, projects, contacts] = await Promise.all([
      Service.find().sort({ updatedAt: -1 }).limit(5).lean(),
      Project.find().sort({ updatedAt: -1 }).limit(5).lean(),
      Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const activity = [
      ...services.map((service) => ({
        id: `service-${service._id}`,
        actor: "Service",
        message: `Updated ${service.title}`,
        date: service.updatedAt || service.createdAt,
      })),
      ...projects.map((project) => ({
        id: `project-${project._id}`,
        actor: "Project",
        message: `Updated ${project.name}`,
        date: project.updatedAt || project.createdAt,
      })),
      ...contacts.map((contact) => ({
        id: `contact-${contact._id}`,
        actor: "Contact",
        message: `New message from ${contact.name}`,
        date: contact.createdAt,
      })),
    ]
      .sort((first, second) => new Date(second.date) - new Date(first.date))
      .slice(0, 8)
      .map(({ date, ...item }) => ({
        ...item,
        time: new Date(date).toLocaleString(),
      }));

    return res.json(activity);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to load recent activity", error: error.message });
  }
};
