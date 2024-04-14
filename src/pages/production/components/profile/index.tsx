import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faChartSimple,
  faCheck,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useProfileContext } from "@/context/profileContext";
import { useAllStateContext } from "@/context/allStateContext";
import { useModalFunctionContext } from "@/context/modalFunctionContext";
import Wrapper from "@/components/layout/wrapper";
import { useEffect, useRef } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";

const Profile = () => {
  const {
    addProfile,
    updateProfile,
    handleModalDeleteProfile,
    toggleOpenMenu,
    toggleEditProfile,
    newProfile,
  } = useProfileContext();

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
    isProfileLoading,
    isFormBlank,
    setIsMenuOpen,
    isMenuOpen,
    isEditMode,
    isCheckBtnDisabled,
    dekidakaData,
  } = useAllStateContext();

  const { modalDeleteProfileConfirmation, modalBlankFormWarning } =
    useModalFunctionContext();

  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownMenuRef]);

  let formattedDate: any;
  if (date) {
    const rawDate = new Date(date).toLocaleDateString("en-GB");
    formattedDate = rawDate;
  }

  return (
    <Wrapper
      content={
        <div>
          <div className="container flex flex-row items-center w-full ps-1 pe-2 py-1 ">
            {userData ? (
              <p className="text-sm text-blue-900">
                {userDataName} - {userDataNik}
              </p>
            ) : (
              <p className="text-sm text-primary">Loading...</p>
            )}
            <span
              className="hover:text-sky-700 ms-auto cursor-pointer z-10"
              onClick={toggleOpenMenu}>
              <FontAwesomeIcon icon={faEllipsis} size="lg" />
            </span>
            {isMenuOpen && (
              <div
                ref={dropdownMenuRef}
                className="absolute h-30 right-1.5 top-7 bg-gray-50 mt-2 rounded-md shadow-md shadow-indigo-900/60 border border-white-200 z-50">
                <ul>
                  <li
                    onClick={() => {
                      newProfile();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 text-gray-600 font-bold cursor-pointer text-sm">
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
                className="select select-bordered select-sm w-full max-w-xs overflow-y-auto"
                value={product}
                onChange={(e) => setProduct(e.target.value)}>
                <option>Produk</option>
                <option value="D14N">D14N</option>
                <option value="D91/92L">D91/92L</option>
                <option value="D26H">D26H</option>
                <option value="D26L">D26L</option>
                <option value="KS Regular">KS Regular</option>
                <option value="KS Cross">KS Cross</option>
                <option value="D55L">D55L</option>
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
              isSwitchProfileUi ? "container flex w-full px-1 mt-2" : "hidden"
            }>
            <>
              <div className="container w-1/2">
                <input
                  type="text"
                  className="input input-bordered input-sm w-full max-w-xs mb-1"
                  value={line}
                  readOnly
                />
                <input
                  type="text"
                  className="input input-bordered input-sm w-full max-w-xs mb-1"
                  value={product}
                  readOnly
                />
              </div>
              <div className="container w-1/2 ms-2">
                <input
                  type="text"
                  className="input input-bordered input-sm w-full max-w-xs mb-1"
                  value={shift}
                  readOnly
                />
                <input
                  type="text"
                  className="input input-bordered input-sm w-full max-w-xs mb-1"
                  value={formattedDate}
                  readOnly
                />
              </div>
            </>
          </div>
          <div className="container flex justify-between items-center w-full p-1">
            <div className="flex items-center w-full justify-between">
              <div>
                <button
                  onClick={() => handleModalDeleteProfile()}
                  className="btn btn-outline btn-error shadow-md shadow-gray-500/40 btn-sm"
                  disabled={!isInputFilled}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button
                  onClick={() => toggleEditProfile()}
                  className={`btn btn-outline btn-warning ${
                    isEditMode
                      ? "focus:bg-yellow-600 focus:text-white focus:border-none"
                      : ""
                  } shadow-md shadow-gray-500/40 btn-sm ms-1.5`}
                  disabled={!isInputFilled}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
              {!isEditMode ? (
                <button
                  onClick={addProfile}
                  disabled={isCheckBtnDisabled}
                  className="btn btn-outline btn-success shadow-md shadow-gray-500/40 btn-sm w-20">
                  {isProfileLoading ? (
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
                  className="btn btn-outline btn-success shadow-md shadow-gray-500/40 btn-sm w-20">
                  {isProfileLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <FontAwesomeIcon icon={faPen} />
                  )}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <hr className="border border-slate-300 mt-2" />
          <div className="flex items-center py-1 px-1">
            <div className="flex w-1/2">
              {isBtnClicked && (!line || !product || !shift || !date) && (
                <p className="text-sm text-orange-600">Lengkapi Profile !</p>
              )}
            </div>
            <div className="flex justify-end w-1/2 ">
              <Link
                href="/production/daily-kpi"
                className={
                  !dekidakaData || dekidakaData.length === 0
                    ? "btn-disabled btn btn-sm btn-outline border-indigo-800 text-indigo-800 hover:bg-indigo-800 hover:border-indigo-800 shadow-md shadow-gray-500/40 mt-1 w-20"
                    : "btn btn-sm btn-outline border-indigo-800 text-indigo-800 hover:bg-indigo-800 hover:border-indigo-800 shadow-md shadow-gray-500/40 mt-1 w-20"
                }>
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
