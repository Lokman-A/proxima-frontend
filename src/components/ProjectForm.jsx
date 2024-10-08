import { useState } from "react";
import { useProjectContext } from "../hooks/useProjectContext";

// eslint-disable-next-line react/prop-types
const ProjectForm = ({ project, setIsModalOpen, setIsOverlayOpen }) => {
  // eslint-disable-next-line react/prop-types
  const [title, setTitle] = useState(project ? project.title : "");
  // eslint-disable-next-line react/prop-types
  const [tech, setTech] = useState(project ? project.tech : "");
  // eslint-disable-next-line react/prop-types
  const [budget, setBudget] = useState(project ? project.budget : "");
  // eslint-disable-next-line react/prop-types
  const [duration, setDuration] = useState(project ? project.duration : "");
  // eslint-disable-next-line react/prop-types
  const [manager, setManager] = useState(project ? project.manager : "");
  // eslint-disable-next-line react/prop-types
  const [dev, setDev] = useState(project ? project.dev : "");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useProjectContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // data
    const projectObj = { title, tech, budget, duration, manager, dev };

    // if there is a no project
    if (!project) {
      // post req
      const res = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectObj),
      });
      const data = await res.json();

      // !res.ok, set error
      if (!res.ok) {
        setError(data.error);
        setEmptyFields(data.emptyFields);
      }

      // res.ok, reset
      if (res.ok) {
        setTitle("");
        setTech("");
        setBudget("");
        setDuration("");
        setManager("");
        setDev("");
        setError(null);
        setEmptyFields([]);

        dispatch({ type: "CREATE_PROJECT", payload: data });
      }
      return;
    }
    // if there is project
    if (project) {
      // post req
      const res = await fetch(
        `http://localhost:3000/api/projects/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectObj),
        }
      );
      const data = await res.json();

      // !res.ok, set error
      if (!res.ok) {
        setError(data.error);
        setEmptyFields(data.emptyFields);
      }

      // res.ok, reset
      if (res.ok) {
        setError(null);
        setEmptyFields([]);

        dispatch({ type: "UPDATE_PROJECT", payload: data });
        setIsModalOpen(false);
        setIsOverlayOpen(false);
      }
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form flex flex-col gap-5">
      <h2 className="text-4xl font-medium text-sky-400 mb-10">
        {project ? "Update project" : " Add a New Project"}
      </h2>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="title"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Project title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="e.g. e-commerce website"
          id="title"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("title")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="tech"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Technologies
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          type="text"
          placeholder="e.g. node.js, gsap, react, redux etc."
          id="tech"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("tech")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="budget"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Budget (in USD)
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="number"
          placeholder="e.g. 500"
          id="budget"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("budget")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="duration"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Duration (in weeks)
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          placeholder="e.g. e-commerce website"
          id="duration"
          className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("duration")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="manager"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Manager
        </label>
        <input
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          type="text"
          placeholder="e.g. John Doe"
          id="manager"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("manager")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="dev"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Developers
        </label>
        <input
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          type="number"
          placeholder="e.g. 5"
          id="dev"
          className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("dev") ? "border-rose-500" : "border-slate-500"
          }`}
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-300"
      >
        {project ? "Confirm Update" : "Add Project"}
      </button>
      {error && (
        <p className="bg-rose-500/10 rounded-lg p-5 text-red-500 border border-red-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default ProjectForm;
