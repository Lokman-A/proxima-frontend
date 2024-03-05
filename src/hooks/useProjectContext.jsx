import { useContext } from "react";
import { projectContext } from "../context/ProjectContext";

export const useProjectContext = () => {
  const context = useContext(projectContext);

  if (!context) {
    throw new Error("You must specify in project Context Provider");
  }
  return context;
};
