import CategoryCard from "@/components/analytics/CategoryCard";
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
      </>
    );
}
