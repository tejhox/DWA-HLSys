import Profile from "../../views/profile";
import Dekidaka from "../../views/dekidaka";
import DekidakaTotal from "../../views/dekidakaTotal";
import Container from "@/components/layout/container";
import { useEffect } from "react";
import { useAllStateContext } from "@/context/allStateContext";
import { useSessionContext } from "@/context/sessionContext";
import { useGetDataContext } from "@/context/getDataContext";
import KpiStats from "../../views/kpiStats";
import LossTimeDetailTable from "../../views/lossTimeDetailTable";

const ProductionPage = () => {
  const { fetchSession, session } = useSessionContext();
  const {
    getLastProfileDoc,
    getLastKpiDoc,
    getDekidaka,
    getDekidakaSum,
    getDailyKpi,
  } = useGetDataContext();

  const { profileId, userDataName, kpiId } = useAllStateContext();

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
    if (kpiId) {
      getDailyKpi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kpiId]);

  useEffect(() => {
    if (profileId) {
      getDekidaka();
      getDekidakaSum();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  return (
    <div className="flex max-h-screen">
      <Container
        contentClass={"lg:w-1/3"}
        content={
          <div>
            <Profile />
            <DekidakaTotal />
            <Dekidaka />
          </div>
        }
      />
      <Container
        contentClass={"hidden lg:block lg:min-h-screen lg:w-2/3"}
        content={
          <>
            <KpiStats />
            <LossTimeDetailTable />
          </>
        }
      />
    </div>
  );
};

export default ProductionPage;
