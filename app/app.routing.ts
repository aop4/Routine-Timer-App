import { TaskComponent } from "./pages/task/task.component";
import { StepComponent } from "./pages/step/step.component";
import { EditStepComponent } from "./pages/edit_step/edit-step.component";
import { EditTaskComponent } from "./pages/edit_task/edit-task.component";
import { TaskListComponent } from "./pages/list_tasks/tasklist.component";
import { TaskSelectorComponent } from "./pages/list_tasks/task-selector/task-selector.component";
import { SettingsComponent } from "~/pages/settings-page/settings.component";

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
