import {DndContext, DragEndEvent} from '@dnd-kit/core'
import { Project,  TaskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTasks from "./DropTasks";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStatus } from '@/api/TaskAPI';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean
};

type GroupTasks = {
  [key: string]: TaskProject[];
};

const initialStatusGroup: GroupTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusStyles : {[key: string]: string} = {
  pending: 'border-t-status-pending',
  onHold: 'border-t-status-onHold',
  inProgress: 'border-t-status-progress',
  underReview: 'border-t-status-review',
  completed: 'border-t-status-complete',
}

export default function TaskList({ tasks, canEdit }: TaskListProps) {


  const params = useParams()
  const projectId = params.projectId!

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
      mutationFn: updateStatus,
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        toast.success(data);
        queryClient.invalidateQueries({queryKey: ["project",projectId]})
      },
    });

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroup);

  
  const handleDragEnd = async (e: DragEndEvent) => {
    const {over, active} = e
    if(over && over.id){
      const taskId = active.id.toString()
      const status = over.id as TaskStatus
      mutate({projectId, taskId, status})

      queryClient.setQueryData(['project', projectId],(prevData: Project) => {
          const updatedTasks = prevData.tasks.map((task)=> {
            if(task._id === taskId){
              return {...task, status}
            }
            return task

          })
          return {
            ...prevData,
            tasks: updatedTasks
          }

      })
    }

  }

  return (
    <>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-10">
        <DndContext onDragEnd={handleDragEnd}>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3 className={`capitalize text-xl font-light shadow bg-white p-3 mt-5 rounded-sm border-t-8 ${statusStyles[status]}`}>{statusTranslations[status]}</h3>
            <DropTasks status={status}/>
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
              )}
            </ul>
          </div>
        ))}
        </DndContext>
      </div>

    </>
  );
}
