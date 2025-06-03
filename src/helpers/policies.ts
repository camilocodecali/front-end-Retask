import { Project, TeamMember } from "../types";

export const isManager = (managerId: Project['manager'], userId: TeamMember['_id']) => managerId._id === userId


export const isAdmin = (manager: Project['manager']) => manager.position === "admin"