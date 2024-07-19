import { useAllStateContext } from "@/context/allStateContext";

const Sidebar = () => {
  const { userData, userDataName } = useAllStateContext();

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/5 min-h-full bg-gray-300/70 px-2">
        <div className="bg-white rounded p-3 mt-3">
          {userData ? <p className="font-bold">{userDataName}</p> : <p>tes</p>}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
