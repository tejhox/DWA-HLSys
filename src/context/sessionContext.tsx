import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";
import { useAllStateContext } from "./allStateContext";

type SessionContextValue = {
  session: any;
  fetchSession: () => Promise<void>;
};

const sessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export const SessionContextProvider = ({ children }: any) => {
  const { data: session } = useSession<any>();

  const { setUserData, setDateNow } = useAllStateContext();

  const fetchSession = async () => {
    try {
      if (session?.user) {
        setUserData(session.user);
        setDateNow(Date.now());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const contextValue: SessionContextValue = {
    session,
    fetchSession,
  };

  return (
    <sessionContext.Provider value={contextValue}>
      {children}
    </sessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(sessionContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
