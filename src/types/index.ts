import {z} from "zod"

export const userPositionSchema = z.enum(["webDeveloper", "design", "socialMedia", "digitalStrategy", "projectManager", "comunityManager", "client", "general", "admin"])
export type UserPosition = z.infer<typeof userPositionSchema>

/**Auth user */
export const authSchema = z.object({
    email: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    name: z.string(),
    lastName: z.string(),
    identification: z.string(),
    phone: z.string(),
    position: userPositionSchema,
    confirmed: z.boolean(),
    token: z.string(),
    createdAt: z.string(),
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'lastName'| 'identification' | 'email' | 'phone' | 'position' | 'password' | 'password_confirmation'>
export type ConfirmEmail = Pick<Auth, 'email'>

/**Users */
export const userSchema = authSchema.pick({
    name: true,
    email: true,
    position: true,
}).extend({
    _id: z.string()
})

export const profileSchema = authSchema.pick({
    name: true,
    lastName: true,
    phone: true,
    email: true,
    position: true,
}).extend({
    _id: z.string()
})


export const dashboardUserSchema = z.array(
    authSchema.pick({
        name: true,
        lastName: true,
        identification: true,
        phone: true,
        email: true,
        position: true,
        confirmed: true,
        createdAt: true,
    }).extend({
        _id: z.string()
    })
)

export const userTableSchema = authSchema.pick({
    name: true,
    lastName: true,
    identification: true,
    phone: true,
    email: true,
    position: true,
    confirmed: true,
    createdAt: true,
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserTableData = z.infer<typeof userTableSchema>
export type Profile = z.infer<typeof profileSchema>
export type UserProfileForm = Pick<Profile, 'name' | 'lastName'  | 'phone'>

/**Notes */
export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note,'content'>

/**Tasks */
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    taskDescription: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    startDate: z.string(),
    endDate: z.string(),
    folderProject: z.string(),
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    notes: z.array(noteSchema.extend({
        createdBy: userSchema
    })),
    createdAt: z.string(),
    updatedAt: z.string(),
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
/**Team */
export const teamMemberSchema = authSchema.pick({
    name: true,
    lastName: true,
    email: true,
    identification: true,
    phone: true,
    position: true
}).extend({
    _id: z.string()
})
export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>

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
    manager: userSchema,
    team: z.array(userSchema)
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        startDate: true,
        clientName: true,
        endDate: true,
        manager: true

    })
)

export const editProjectSchema = projectSchema.pick({
        projectName: true,
        description: true,
        clientName: true,
        category: true,
        startDate: true,
        endDate: true,
        folderProject: true,

    })

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'description' | 'clientName' | 'category' | 'startDate' | 'endDate' | 'folderProject'>
export type ProjectTableData = Pick<Project, '_id' | 'projectName' | 'startDate' |  'clientName' | 'endDate' | 'manager' >

