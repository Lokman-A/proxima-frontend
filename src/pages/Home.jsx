import { useEffect, useState } from "react";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const getProjects = async () => {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/projects/");
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setProjects(data);
        setLoading(false);
      };
      getProjects();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);
  return (
    <div className="home container mx-auto py-20 grid grid-cols-3 gap-10">
      <div className="left col-span-2">
        <h2 className="text-sky-400 text-4xl font-semibold mb-10">
          All Projects
        </h2>
        <div className="project-wrapper flex gap-10 flex-wrap">
          {projects &&
            projects.map((project) => (
              <ProjectDetails key={project._id} project={project} />
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
