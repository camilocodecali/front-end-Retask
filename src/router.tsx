import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/projects/CreateProjectView";
import ProjectsView from "@/views/projects/ProjectsView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";


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
                
            </Route>
            <Route element={<AuthLayout/>}>
                <Route path="/auth/login" element={<LoginView/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}