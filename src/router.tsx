import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/projects/CreateProjectView";
import ProjectsView from "@/views/projects/ProjectsView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/users/RegisterView";
import UsersView from "./views/users/UsersView";
import EditUserView from "./views/auth/EditUserView";
import UserDetailsView from "./views/users/UserDetailsView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";


export default function router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path="/" element={<DashboardView/>} index/>
                <Route path="/projects" element={<ProjectsView/>}/>
                <Route path="/projects/create" element={<CreateProjectView/>}/>
                <Route path="/projects/:projectId/" element={<ProjectDetailsView/>}/>
                <Route path="/projects/:projectId/edit" element={<EditProjectView/>}/>
                <Route path="/projects/:projectId/team" element={<ProjectTeamView/>}/>
                <Route path="/users/register" element={<RegisterView/>}/>
                <Route path="/users/" element={<UsersView/>}/>
                <Route path="/users/:userId/" element={<UserDetailsView/>}/>
                <Route path="/users/:userId/edit" element={<EditUserView/>}/>

                <Route element={<ProfileLayout/>}>
                    <Route path="/profile" element={<ProfileView/>}/>
                    <Route path="/profile/password" element={<ChangePasswordView/>}/>
                </Route>
            </Route>
            <Route element={<AuthLayout/>}>
                <Route path="/auth/login" element={<LoginView/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}