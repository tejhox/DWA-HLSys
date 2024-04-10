import Profile from "./components/profile";
import Dekidaka from "./components/dekidaka";
import DekidakaTotal from "./components/dekidakaTotal";
import GeneralLayout from "@/components/layout/generalLayout";

const ProductionPage = () => {
  return (
    <GeneralLayout
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
