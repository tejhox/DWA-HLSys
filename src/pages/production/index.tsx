import Profile from "./components/profile";
import Dekidaka from "./components/dekidaka";
import DekidakaTotal from "./components/dekidakaTotal";
import Container from "@/components/layout/container";
import { useEffect } from "react";
import { useAllStateContext } from "@/context/allStateContext";
import { useSessionContext } from "@/context/sessionContext";
import { useGetDataContext } from "@/context/getDataContext";

const ProductionPage = () => {
  const { fetchSession, session } = useSessionContext();
  const { getLastProfileDoc, getLastKpiDoc, getDekidaka, getDekidakaSum } =
    useGetDataContext();

  const { profileId, userDataName } = useAllStateContext();

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (userDataName) {
      getLastProfileDoc();
      getLastKpiDoc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataName]);

  useEffect(() => {
    if (profileId) {
      getDekidaka();
      getDekidakaSum();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  return (
    <Container
      contentClass={"min-h-screen lg:w-1/3"}
      content={
        <>
          <Profile />
          <DekidakaTotal />
          <Dekidaka />
        </>
      }
    />
  );
};

export default ProductionPage;
