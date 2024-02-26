import { currencyFormatter } from "../utils/currencyFormatter";

/* eslint-disable react/prop-types */
const ProjectDetails = ({ project }) => {
  return (
    <div className="project bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-xl flex flex-col gap-5 w-[30rem]">
      <div className="top">
        <span className="text-sky-400">ID: {project._id}</span>
        <h3 className="text-3xl font-medium text-slate-200">{project.title}</h3>
        <span className="uppercase text-xs tracking-widest text-slate-500 font-medium">
          {project.tech}
        </span>
      </div>
      <div className="middle text-slate-300 flex gap-10">
        <div className="left flex flex-col">
          <span> Budget: {currencyFormatter(project.budget)} </span>
          <span>
            Added on: {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <span>
            Last updated: {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="right flex flex-col ">
          <span>Manage: {project.manager}</span>
          <span>
            {" "}
            {`${project.dev === 1 ? "Developer" : "Developers"}`}: {project.dev}
          </span>
          <span>
            Duration:{" "}
            {`${project.duration} week${project.duration === 1 ? "" : "s"}`}
          </span>
        </div>
      </div>
      <div className="bottom flex gap-2">
        <div className="update-btn bg-sky-500 text-sky-200 font-medium py-1 rounded px-3 shadow-md hover:bg-sky-200 hover:text-sky-900 duration-300 cursor-pointer ">
          Update
        </div>
        <div className="delete-btn text-rose-500 border border-slate-500 py-1 px-3 rounded shadow-md hover:border-rose-500 hover:text-rose-50 duration-0 cursor-pointer">
          Delete
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
