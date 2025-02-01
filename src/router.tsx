import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/projects/CreateProjectView";
import ProjectsView from "@/views/projects/ProjectsView";
import EditProjectView from "./views/projects/EditProjectView";


export default function router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path="/" element={<DashboardView/>} index/>
                <Route path="/projects" element={<ProjectsView/>}/>
                <Route path="/projects/create" element={<CreateProjectView/>}/>
                <Route path="/projects/edit" element={<EditProjectView/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}