import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type UserData = {
  nama: string;
  nik: string;
};

type SessionContextValue = {
  userData: UserData | null;
  userDataName: string;
  userDataNik: string;
  dateNow: any;
};

const sessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export const SessionContextProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const [dateNow, setDateNow] = useState<any>();
  const { data: session } = useSession<any>();

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
    userDataName: userData ? userData.nama : "",
    userDataNik: userData ? userData.nik : "",
    dateNow,
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
