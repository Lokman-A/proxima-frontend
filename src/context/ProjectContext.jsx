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
