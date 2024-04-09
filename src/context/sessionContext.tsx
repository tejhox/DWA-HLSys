import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type UserData = {
  id: string;
  nama: string;
  nik: string;
  lastProfileId: string;
};

type SessionContextValue = {
  userData: UserData | null;
  userDataId: string;
  userDataName: string;
  userDataNik: string;
  userLastProfileId: string;
  dateNow: any;
  session: any;
  fetchSession: () => Promise<void>;
};

const sessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export const SessionContextProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const [dateNow, setDateNow] = useState<any>();
  const { data: session } = useSession<any>();

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
    userData: userData,
    userDataId: userData ? userData.id : "",
    userDataName: userData ? userData.nama : "",
    userDataNik: userData ? userData.nik : "",
    userLastProfileId: userData ? userData.lastProfileId : "",
    dateNow,
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
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};
