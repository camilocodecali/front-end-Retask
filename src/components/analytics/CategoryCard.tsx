import { getProjects } from "@/api/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";
import { getTasks } from "@/api/TaskAPI";


type CategoryCardProps = {
  projectCategory: string;
};

export default function CategoryCard({ projectCategory }: CategoryCardProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const {data:tasks, isLoading: isLoadingTasks} = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  })
console.log(tasks);


  const filterProjects = data?.filter(project => project.category === projectCategory)
 


  if (isLoading && isLoadingTasks) return <Spinner />;
  if (data)
    return (
      <div className="p-5 m-2 bg-white shadow-xl">
        <div className="uppercase font-bold text-center mb-5">
          {projectCategory}
        </div>
        <div className="flex ">
          <h3 className="font-bold">Proyectos:&nbsp;</h3> {filterProjects?.length}
        </div>
      </div>
    );
}
