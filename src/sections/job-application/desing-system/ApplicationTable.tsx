import { applicationTableColumns } from "../config/applicationViewConfig";
import { Button } from "../../../shared/ui/button/Button";
import { TrashIcon } from "../../../shared/ui/Icon";
import { useAtomValue } from "jotai";
// import { viewJobsAtom } from "../../../shared/state/view-jobs.atom";
import { applicationsList } from "../../../lib/jobApplication/infraestructure/state/application.selectors";

export function ApplicationTable() {
  const applications = useAtomValue(applicationsList)
  // const jobsByStatus = useMemo(() => groupByStatus(jobs), [jobs]);

  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white rounded-lg bg-clip-border">
      <table className="table-auto border-collapse w-full min-w-max shadow-md">
        <thead>
          <tr>
            {applicationTableColumns.map((appColumn) => (
              <th
                key={`job-column-${appColumn.key}`}
                scope="col"
                className="p-4 text-left border-b border-slate-300 bg-slate-50 capitalize font-bold"
              >
                  {appColumn.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => {
            return (
              <tr key={`app-row-${app.id}`} className="bg-white even:bg-gray-50">
                <td className="p-4" scope="row">{app.job.title}</td>
                <td className="p-4" scope="row">{app.job.company}</td>
                {/* <td className="p-4" scope="row">{job.appliedAt.toDateString()}</td>
                <td className="p-4" scope="row">{job.status}</td> */}
                <td className="p-4" scope="row">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" icon={<TrashIcon />} />
                    <Button variant="ghost" text="editar" />
                    <Button variant="ghost" text="ver más" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
