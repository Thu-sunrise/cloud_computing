import { CLOUDINARY_BASE_URL } from "@/constants/cloudinary";

export const mapCustomerListFromApiToUI = (customers = []) =>
  customers.map((c, index) => ({
    id: c._id ?? `customer-${index}`,

    name: `${c.name?.firstName ?? ""} ${c.name?.lastName ?? ""}`.trim(),
    email: c.mail ?? "",

    avatar: c.avatarPublicId
      ? `${CLOUDINARY_BASE_URL}/${c.avatarPublicId}`
      : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name?.firstName ?? "User"}`,

    status: c.status === "active" ? "Active" : "Inactive",

    orders: 0,
    productsSold: 0,

    role: c.role ?? "Customer",
    failedLoginAttempt: c.failedLoginAttempts ?? 0,
    phone: c.phone ?? "",

    dob: c.dateOfBirth ? new Date(c.dateOfBirth).toISOString().slice(0, 10) : "",

    gender: c.gender === "male" ? "Male" : c.gender === "female" ? "Female" : "Other",

    address: c.address ?? "",
    ratingAvg: typeof c.stats?.avg === "number" ? Math.round(c.stats.avg * 10) / 10 : 0,
    ratingTotal: c.stats?.total ?? 0,
  }));
