import Link from "next/link";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faChartSimple,
  faCheck,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useSessionContext } from "@/context/sessionContext";
import { useGetDataContext } from "@/context/getDataContext";
import { useProfileContext } from "@/context/profileContext";
import { useAppStateContext } from "@/context/appStateContext";
import { useModalFunctionContext } from "@/context/modalFunctionContext";
import Container from "@/components/layout/container";

const Profile = () => {
  const {
    line,
    product,
    shift,
    date,
    isModalDeleteProfileOpen,
    isBtnClicked,
    isInputFilled,
    setLine,
    setProduct,
    setShift,
    setDate,
    isSwitchProfileUi,
    userData,
    userDataName,
    userDataNik,
    isLoading,
    isFormBlank,
    setIsMenuOpen,
    isMenuOpen,
    isEditMode,
    isCheckBtnDisabled,
  } = useAppStateContext();

  const { getLastProfile, getLastKpi } = useGetDataContext();

  const { fetchSession, session } = useSessionContext();

  const {
    addProfile,
    updateProfile,
    handleModalDeleteProfile,
    toggleOpenMenu,
    toggleEditProfile,
    newProfile,
  } = useProfileContext();

  const { modalDeleteProfileConfirmation, modalBlankFormWarning } =
    useModalFunctionContext();

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (userDataName) {
      getLastProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataName]);

  useEffect(() => {
    if (userDataName) {
      getLastKpi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataName]);

  let formattedDate: any;
  if (date) {
    const rawDate = new Date(date).toLocaleDateString("en-GB");
    formattedDate = rawDate;
  }

  return (
    <Container
      content={
        <div>
          <div className="container flex flex-row items-center w-full ps-2 pe-2 py-1 ">
            {userData ? (
              <p className="text-sm text-blue-900">
                {userDataName} - {userDataNik}
              </p>
            ) : (
              <p className="text-sm text-primary">Loading...</p>
            )}
            <span className="ms-auto cursor-pointer" onClick={toggleOpenMenu}>
              <FontAwesomeIcon icon={faEllipsis} size="lg" />
            </span>
            {isMenuOpen && (
              <div className="absolute h-30 right-1.5 top-7 bg-gray-400 mt-2 rounded-md shadow-md border border-white-200 z-50">
                <ul className="py-2">
                  <li
                    onClick={() => {
                      newProfile();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 text-gray-700 font-bold cursor-pointer text-sm">
                    Laporan Baru
                  </li>
                </ul>
              </div>
            )}
          </div>
          <hr className=" border border-gray-400" />
          <div
            className={
              !isSwitchProfileUi ? "container flex w-full p-1 mt-1" : "hidden"
            }>
            <div className="container w-1/2">
              <select
                className="select select-bordered select-sm w-full max-w-xs mb-1"
                value={line}
                onChange={(e) => setLine(e.target.value)}>
                <option className="text-sm" value="">
                  Line
                </option>
                <option value="ER01">ER01</option>
                <option value="ER02">ER02</option>
                <option value="ER03">ER03</option>
                <option value="ER150">ER150</option>
              </select>
              <select
                className="select select-bordered select-sm w-full max-w-xs"
                value={product}
                onChange={(e) => setProduct(e.target.value)}>
                <option>Produk</option>
                <option value="D14N">D14N</option>
                <option value="KS Hyundai">KS Hyundai</option>
              </select>
            </div>
            <div className="container w-1/2 ms-2">
              <select
                className="select select-bordered select-sm w-full max-w-xs mb-1"
                value={shift}
                onChange={(e) => setShift(e.target.value)}>
                <option value="">Shift</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <input
                type="date"
                placeholder="Tanggal"
                className="input input-bordered input-sm w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div
            className={
              isSwitchProfileUi ? "container flex w-full p-1 mt-1" : "hidden"
            }>
            <div className="container w-1/2">
              <input
                type="text"
                className="input input-bordered input-sm w-full max-w-xs mb-1"
                defaultValue={line}
                readOnly
              />
              <input
                type="text"
                className="input input-bordered input-sm w-full max-w-xs mb-1"
                defaultValue={product}
                readOnly
              />
            </div>
            <div className="container w-1/2 ms-2">
              <input
                type="text"
                className="input input-bordered input-sm w-full max-w-xs mb-1"
                defaultValue={shift}
                readOnly
              />
              <input
                type="text"
                className="input input-bordered input-sm w-full max-w-xs mb-1"
                defaultValue={formattedDate}
                readOnly
              />
            </div>
          </div>
          <div className="container flex justify-between items-center w-full p-1">
            <div className="flex items-center w-full justify-between">
              <div>
                <button
                  onClick={() => handleModalDeleteProfile()}
                  className="btn btn-outline btn-error btn-sm"
                  disabled={!isInputFilled}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button
                  onClick={() => toggleEditProfile()}
                  className="btn btn-outline btn-primary btn-sm ms-1.5"
                  disabled={!isInputFilled}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
              <div>
                {isBtnClicked && (!line || !product || !shift || !date) && (
                  <p className="text-sm text-warning">Lengkapi Profile !</p>
                )}
              </div>
              {!isEditMode ? (
                <button
                  onClick={addProfile}
                  disabled={isCheckBtnDisabled}
                  className="btn btn-outline btn-success btn-sm w-1/5">
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <FontAwesomeIcon icon={faCheck} size="lg" />
                  )}
                </button>
              ) : (
                ""
              )}
              {isEditMode ? (
                <button
                  onClick={updateProfile}
                  disabled={isCheckBtnDisabled}
                  className="btn btn-outline btn-success btn-sm w-1/5">
                  <FontAwesomeIcon icon={faCheck} size="lg" />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <hr className="border border-slate-300 mt-2" />
          <div className="py-1 px-1">
            <div className="container flex justify-end w-full">
              <Link
                href="/daily-kpi"
                className="btn btn-sm btn-outline btn-primary mt-1">
                KPI
                <FontAwesomeIcon icon={faChartSimple} className="mb-0.5" />
              </Link>
            </div>
          </div>
          {isModalDeleteProfileOpen && modalDeleteProfileConfirmation()}
          {isFormBlank && modalBlankFormWarning()}
        </div>
      }
    />
  );
};
export default Profile;
