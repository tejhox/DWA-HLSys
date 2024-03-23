import Profile from "./components/profile";
import Dekidaka from "./components/dekidaka";
import { ProfileProvider } from "../../context/profileContext";
import { DekidakaProvider } from "../../context/dekidakaContext";

const ProductionPage = () => {
  return (
    <>
      <ProfileProvider>
        <Profile />
        <DekidakaProvider>
          <Dekidaka />
        </DekidakaProvider>
      </ProfileProvider>
    </>
  );
};

export default ProductionPage;
