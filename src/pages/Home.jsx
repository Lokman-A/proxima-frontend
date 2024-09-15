import { useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";
import { useProjectContext } from "../hooks/useProjectContext";

const Home = () => {
  const { projects, dispatch } = useProjectContext();

  useEffect(() => {
    const getAllProjects = async () => {
      const res = await fetch("http://localhost:3000/api/projects");

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_PROJECTS", payload: data });
      }
    };
    getAllProjects();
  }, []);
  return (
    <div className="home container mx-auto py-20 grid grid-cols-3 gap-10">
      <div className="left col-span-2">
        <h2 className="text-sky-400 text-4xl font-semibold mb-10">
          All Projects
        </h2>
        <div className="project-wrapper flex gap-10 flex-wrap">
          {projects &&
            // eslint-disable-next-line no-unused-vars
            projects.map((project, index) => (
              <ProjectDetails
                key={`${project._id}-${index}`}
                project={project}
              />
            ))}
        </div>
      </div>
      <div className="right">
        <ProjectForm />
      </div>
    </div>
  );
};

export default Home;
