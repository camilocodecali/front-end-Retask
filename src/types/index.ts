import {z} from "zod"

/**Tasks */
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])

export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    taskDescription: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    startDate: z.string(),
    endDate: z.string(),
    folderProject: z.string(),
})

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    taskName: true,
    taskDescription: true,
    status: true,
    startDate: true,
    endDate: true,
    folderProject: true
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'taskName' | 'taskDescription' | 'startDate' | 'endDate' | 'folderProject' >
export type TaskProject = z.infer<typeof taskProjectSchema>

/**Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    description: z.string(),
    clientName: z.string(),
    category: z.string(),
    tasks: z.array(taskProjectSchema),
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
        category: true,
        startDate: true,
        endDate: true,
        folderProject: true

    })

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'description' | 'clientName' | 'category' | 'startDate' | 'endDate' | 'folderProject'>
export type ProjectTableData = Pick<Project, '_id' | 'projectName' | 'startDate' |  'clientName' | 'endDate' >