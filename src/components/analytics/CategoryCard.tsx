import { getProjects } from "@/api/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";

type CategoryCardProps = {
  projectCategory: string;
};

export default function CategoryCard({ projectCategory }: CategoryCardProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) return <Spinner />;
  if (data)
    return (
    <div className="p-5 m-2 bg-white shadow-xl">
        {projectCategory}

    </div>
)
}
