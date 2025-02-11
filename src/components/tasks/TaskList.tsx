import { TaskProject } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";

type TaskListProps = {
  tasks: TaskProject[];
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

export default function TaskList({ tasks }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroup);

  return (
    <>
      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-10">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3 className={`capitalize text-xl font-light shadow bg-white p-3 mt-5 rounded-sm border-t-8 ${statusStyles[status]}`}>{statusTranslations[status]}</h3>
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
