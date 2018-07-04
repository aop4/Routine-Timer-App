import { TaskComponent } from "./task/task.component";
import { StepComponent } from "./step/step.component";
import { EditStepComponent } from "./edit_step/edit-step.component";
import { EditTaskComponent } from "./edit_task/edit-task.component";
import { TaskListComponent } from "./list_tasks/tasklist.component";
import { TaskSelectorComponent } from "./list_tasks/task-selector/task-selector.component";
import { SettingsComponent } from "~/settings-page/settings.component";

export const routes = [
    { path: "", component: TaskListComponent },
    { path: "task", component: TaskComponent },
    { path: "task/edit", component: EditTaskComponent },
    { path: "settings", component: SettingsComponent }
];

export const navigatableComponents = [
    TaskComponent,
    StepComponent,
    EditStepComponent,
    EditTaskComponent,
    TaskListComponent,
    TaskSelectorComponent,
    SettingsComponent
];
