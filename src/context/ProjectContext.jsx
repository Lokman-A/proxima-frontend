import { createContext, useReducer } from "react";

const initialState = {
  projects: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export const projectReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };
    case "CREATE_PROJECT":
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload._id
        ),
      };
    case "UPDATE_PROJECT":
      // eslint-disable-next-line no-case-declarations
      const [existing] = state.projects.filter(
        (project) => project._id === action.payload._id
      );

      return {
        ...state,
        projects: [
          action.payload,
          ...state.projects.filter((project) => project._id !== existing._id),
        ],
      };
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const projectContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <projectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </projectContext.Provider>
  );
};
