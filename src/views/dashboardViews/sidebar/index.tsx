import { useAllStateContext } from "@/context/allStateContext";
import { useGetDataContext } from "@/context/getDataContext";
import {
  faCaretRight,
  faChartLine,
  faFilePen,
  faSortDown,
  faTableList,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Sidebar = () => {
  const {
    userData,
    userDataName,
    isDekidakaLoading,
    isEr01BtnActive,
    isEr02BtnActive,
    isEr03BtnActive,
    isEr150BtnActive,
    setIsEr01BtnActive,
    setIsEr02BtnActive,
    setIsEr03BtnActive,
    setIsEr150BtnActive,
    isMonitoringBtnActive,
    setIsMonitoringBtnActive,
    setIsMonitoringSubBtnActive,
    isKpiBtnActive,
    setIsKpiBtnActive,
    setLineName,
    isPlanRecordBtnActive,
    setIsPlanRecordBtnActive,
  } = useAllStateContext();

  const handleMonitoringBtn = () => {
    setIsMonitoringBtnActive(!isMonitoringBtnActive);
  };

  const handleEr01Btn = async () => {
    setIsEr01BtnActive(true);
    setIsEr02BtnActive(false);
    setIsEr03BtnActive(false);
    setIsEr150BtnActive(false);
    setLineName("ER01");
    setIsMonitoringSubBtnActive(true);
    setIsPlanRecordBtnActive(false);
    setIsKpiBtnActive(false);
  };
  const handleEr02Btn = async () => {
    setIsEr02BtnActive(true);
    setIsEr01BtnActive(false);
    setIsEr03BtnActive(false);
    setIsEr150BtnActive(false);
    setLineName("ER02");
    setIsMonitoringSubBtnActive(true);
    setIsPlanRecordBtnActive(false);
    setIsKpiBtnActive(false);
  };
  const handleEr03Btn = () => {
    setIsEr03BtnActive(true);
    setIsEr01BtnActive(false);
    setIsEr02BtnActive(false);
    setIsEr150BtnActive(false);
    setLineName("ER03");
    setIsMonitoringSubBtnActive(true);
    setIsPlanRecordBtnActive(false);
    setIsKpiBtnActive(false);
  };
  const handleEr150Btn = () => {
    setIsEr150BtnActive(true);
    setIsEr01BtnActive(false);
    setIsEr02BtnActive(false);
    setIsEr03BtnActive(false);
    setLineName("ER150");
    setIsMonitoringSubBtnActive(true);
    setIsPlanRecordBtnActive(false);
    setIsKpiBtnActive(false);
  };
  const handleKpiBtn = () => {
    setIsKpiBtnActive(true);
    setIsEr150BtnActive(false);
    setIsEr01BtnActive(false);
    setIsEr02BtnActive(false);
    setIsEr03BtnActive(false);
    setIsPlanRecordBtnActive(false);
    setIsMonitoringSubBtnActive(false);
  };

  const handlePlanRecordBtn = () => {
    setIsPlanRecordBtnActive(true);
    setIsKpiBtnActive(false);
    setIsEr150BtnActive(false);
    setIsEr01BtnActive(false);
    setIsEr02BtnActive(false);
    setIsEr03BtnActive(false);
    setIsMonitoringSubBtnActive(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-indigo-700 shadow-md py-5 ps-2 pe-3 relative">
        {userData ? (
          <p className="text-white font-bold">{userDataName}</p>
        ) : (
          <span className="loading loading-dots loading-xs"></span>
        )}
        <div className="badge badge-accent">Admin</div>
      </div>
      <div className="px-2 py-3 text-gray-300 text-center font-semibold shadow-md bg-indigo-800 font-rajdhani">
        Navigation Menu
      </div>
      <ul>
        <li
          onClick={handleMonitoringBtn}
          className="flex justify-between items-center hover:bg-indigo-700 cursor-pointer p-2">
          <span className="text-white text-lg font-semibold">
            <FontAwesomeIcon icon={faTv} className="me-2" />
            Monitoring
          </span>
          {isMonitoringBtnActive ? (
            <FontAwesomeIcon
              icon={faSortDown}
              className="text-white me-2  -mt-1"
            />
          ) : (
            <FontAwesomeIcon icon={faCaretRight} className="text-white me-2" />
          )}
        </li>
        <div className={`${isMonitoringBtnActive ? "ps-9 pe-1" : "hidden"}`}>
          <ul className="my-0.5">
            <li
              onClick={isDekidakaLoading ? undefined : handleEr01Btn}
              className={`${
                isEr01BtnActive
                  ? "bg-indigo-600 cursor-pointer text-sm text-white ps-2 py-2 rounded"
                  : "hover:bg-indigo-800 cursor-pointer text-sm text-white ps-2 py-2 rounded"
              } `}>
              ER 01
            </li>
            <li
              onClick={isDekidakaLoading ? undefined : handleEr02Btn}
              className={`${
                isEr02BtnActive
                  ? "bg-indigo-600 cursor-pointer text-sm text-white ps-2 py-2 rounded"
                  : "hover:bg-indigo-800 cursor-pointer text-sm text-white ps-2 py-2 rounded"
              } `}>
              ER 02
            </li>
            <li
              onClick={isDekidakaLoading ? undefined : handleEr03Btn}
              className={`${
                isEr03BtnActive
                  ? "bg-indigo-600 cursor-pointer text-sm text-white ps-2 py-2 rounded"
                  : "hover:bg-indigo-800 cursor-pointer text-sm text-white ps-2 py-2 rounded"
              } `}>
              ER 03
            </li>
            <li
              onClick={isDekidakaLoading ? undefined : handleEr150Btn}
              className={`${
                isEr150BtnActive
                  ? "bg-indigo-600 cursor-pointer text-sm text-white ps-2 py-2 rounded"
                  : "hover:bg-indigo-800 cursor-pointer text-sm text-white ps-2 py-2 rounded"
              } `}>
              ER 150
            </li>
          </ul>
        </div>
        <hr className="border-gray-400" />
        <li
          onClick={isDekidakaLoading ? undefined : handleKpiBtn}
          className={`${
            isKpiBtnActive
              ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white text-lg font-semibold p-2"
              : "hover:bg-indigo-700 cursor-pointer text-white text-lg font-semibold p-2"
          } `}>
          <span>
            <FontAwesomeIcon icon={faChartLine} className="me-3" />
            KPI
          </span>
        </li>
        <hr className="border-gray-400" />
        <li
          onClick={isDekidakaLoading ? undefined : handlePlanRecordBtn}
          className={`${
            isPlanRecordBtnActive
              ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white text-lg font-semibold p-2"
              : "hover:bg-indigo-700 cursor-pointer text-white text-lg font-semibold p-2"
          } `}>
          <span>
            <FontAwesomeIcon icon={faTableList} className="me-3" />
          </span>
          Plan Record
        </li>
        <hr className="border-gray-400" />
        {isDekidakaLoading ? (
          <li className="hover:bg-indigo-700 cursor-pointer text-white text-lg font-semibold p-2 opacity-50">
            <span>
              <FontAwesomeIcon icon={faFilePen} className="me-2" />
            </span>
            Production
          </li>
        ) : (
          <Link href="/production">
            <li className="hover:bg-indigo-700 cursor-pointer text-white text-lg font-semibold p-2">
              <span>
                <FontAwesomeIcon icon={faFilePen} className="me-2" />
              </span>
              Production
            </li>
          </Link>
        )}
        <hr className="border-gray-400" />
      </ul>
    </div>
  );
};

export default Sidebar;
