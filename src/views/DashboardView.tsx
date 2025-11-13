import CategoryCard from "@/components/analytics/CategoryCard";
import GeneralCard from "@/components/analytics/GeneralCard";
import MemberSlider from "@/components/analytics/MemberSlider";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/hooks/useAuth";


export default function DashboardView() {
  
  const projectCategories = [
    "web",
    "design",
    "Social Media",
    "Digital Strategy",
  ] as const;

  const { data: user, isLoading: authLoading } = useAuth();


  if (authLoading) return <Spinner />;

  if (user)
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectCategories.map((projectCategory) => (
            <CategoryCard
              key={projectCategory}
              projectCategory={projectCategory}
            />
          ))}
        </div>
        <div>
          <GeneralCard/>
        </div>
        <div>
          <MemberSlider/>
        </div>
        <div>
          <button>Crear proyecto</button>
          <button>Crear tarea</button>
          <button>Usuarios</button>
        </div>
      </>
    );
}
