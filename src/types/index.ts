import {z} from "zod"


/**Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    description: z.string(),
    clientName: z.string(),
    category: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    folderProject: z.string(),
})
export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'description' | 'clientName' | 'category' | 'startDate' | 'endDate' | 'folderProject'>