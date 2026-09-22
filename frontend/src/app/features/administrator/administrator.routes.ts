import { Routes } from "@angular/router";
import { ReportComponent } from "./pages/report.component/report.component";
import { UsersAdminComponent } from "./pages/users.admin.component/users.admin.component";

export default [
  {
    path:'',
    component: UsersAdminComponent
  },
  {
    path:'report-items',
    component: ReportComponent
  }
] as Routes