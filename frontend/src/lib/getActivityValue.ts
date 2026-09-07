import type { Activity } from "@/features/activity/types/activity.types";

export function getActivityValue(activity: Activity) {
  const activityModule = activity.module;

  switch (activityModule) {
    case "grp":
      if (activity.group) return activity.group.name;
      if (activity.details) return activity.details["group"];
      return "Deleted Group.";
    case "exp":
      return `${activity.details?.title} of Rs. ${activity.details?.amount}`;
    case "set":
      return `Rs. ${activity.details?.amount}`;
    default:
      return "";
  }
}
