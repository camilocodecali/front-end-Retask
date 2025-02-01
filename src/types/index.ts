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

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        startDate: true,
        clientName: true,
        endDate: true

    })
)

export const editProjectSchema = projectSchema.pick({
        projectName: true,
        description: true,
        clientName: true,
        startDate: true,
        endDate: true,
        folderProject: true

    })

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'description' | 'clientName' | 'category' | 'startDate' | 'endDate' | 'folderProject'>
export type ProjectTableData = Pick<Project, '_id' | 'projectName' | 'startDate' |  'clientName' | 'endDate' >