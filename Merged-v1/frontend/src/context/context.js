import { createContext, useReducer } from "react";

// reducer

const Reducer = (state, action) => {
  switch (action.type) {
    case "setModalOpen":
      console.log("opening");
      return { ...state, modalOpen: true };
    case "setModalClose":
      console.log("closing");
      return { ...state, modalOpen: false };
    case "setUserData":
      return { ...state, userData: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };

    case "setError":
      return { ...state, loading: false, error: action.payload };

    case "pageRefresh":
      return { ...initialState, userData: state.userData };

    case "logout":
      return { ...state, userData: null };

    default:
      return state;
  }
};

// context

const initialState = {
  modalOpen: false,
  userData: null,
  loading: false,
  snackData: {
    text: "",
    open: false,
  },
  error: false,
  filteredResult: null,
};
export const userContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <userContext.Provider
      value={{
        loading: state.loading,
        snackData: state.snackData,
        error: state.error,
        userData: state.userData,
        modalOpen: state.modalOpen,
        currentAdoptionPet: state.currentAdoptionPet,
        dispatch: dispatch,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
