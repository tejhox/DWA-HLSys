import Profile from "./components/profile";
import Dekidaka from "./components/dekidaka";
import { ProfileProvider } from "./components/profile/profileContext";
import { DekidakaProvider } from "./components/dekidaka/dekidakaContext";

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
