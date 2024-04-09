import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useSessionContext } from "@/context/sessionContext";
import { useGetDataContext } from "@/context/getDataContext";
import { useProfileContext } from "@/context/profileContext";

const Profile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const { line, product, shift, date, isDeleteConfirmOpen } =
    useProfileContext();

  const {
    isDisabled,
    isInputFilled,
    setLine,
    setProduct,
    setShift,
    setDate,
    setIsDisabled,
    switchProfileUi,
    setSwitchProfileUi,
    getLastProfile,
    getLastKpi,
    newProfile,
  } = useGetDataContext();

  const { userData, userDataName, userDataNik, session } = useSessionContext();

  useEffect(() => {
    if (session && userDataName) {
      getLastProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, userDataName]);

  const {
    addProfile,
    updateProfile,
    handleDeleteModal,
    modalDeleteConfirmation,
  } = useProfileContext();

  const handleEdit = () => {
    setIsDisabled(false);
    setSwitchProfileUi(false);
    setEditMode(true);
  };

  let formattedDate: any;
  if (date) {
    const rawDate = new Date(date).toLocaleDateString("en-GB");
    formattedDate = rawDate;
  }

  return (
    <div className="flex justify-center px-1.5 mt-2 h-full w-full lg:w-1/3">
      <div className="container w-full relative">
        <div className="container w-full border-2 rounded-lg bg-gray-200 shadow-md shadow-gray-500/60 px-1 py-1 mb-1">
          <div className="container flex flex-row items-center w-full ps-2 pe-2 py-1 ">
            {userData ? (
              <p className="text-sm text-blue-900">
                {userDataName} - {userDataNik}
              </p>
            ) : (
              <p className="text-sm text-primary">Loading...</p>
            )}
            <span className="ms-auto cursor-pointer" onClick={toggleMenu}>
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
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                    New
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                    Edit
                  </li>
                </ul>
              </div>
            )}
          </div>
          <hr className=" border border-gray-400" />
          <div
            className={
              !switchProfileUi ? "container flex w-full p-1 mt-1" : "hidden"
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
              {/* {typeof window !== "undefined" && isMobile ? (
                <input
                  placeholder="Tanggal"
                  className="input input-bordered input-sm w-full"
                  type="text"
                  onMouseOver={(event) => {
                    const target = event.target as HTMLInputElement;
                    target.type = "date";
                  }}
                  onMouseOut={(event) => {
                    const target = event.target as HTMLInputElement;
                    target.type = "text";
                  }}
                  id="date"
                  disabled={isDisabled}
                />
              ) : (
                <input
                  type="date"
                  placeholder="Tanggal"
                  className="input input-bordered input-sm w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isDisabled}
                />
              )} */}
            </div>
          </div>
          <div
            className={
              switchProfileUi ? "container flex w-full p-1 mt-1" : "hidden"
            }>
            <div className="container w-1/2">
              <input
                type="text"
                className="input input-bordered input-sm w-full max-w-xs mb-1"
                defaultValue={line}
                readOnly={isDisabled}
              />
              <input
                type="text"
                className="input input-bordered input-sm w-full max-w-xs mb-1"
                defaultValue={product}
                readOnly={isDisabled}
              />
            </div>
            <div className="container w-1/2 ms-2">
              <input
                type="text"
                className="input input-bordered input-sm w-full max-w-xs mb-1"
                defaultValue={shift}
                readOnly={isDisabled}
              />
              <input
                type="text"
                className="input input-bordered input-sm w-full max-w-xs mb-1"
                defaultValue={formattedDate}
                readOnly={isDisabled}
              />
            </div>
          </div>
          <div className="container flex justify-between items-center w-full p-1">
            <div className="flex items-center w-full justify-between">
              <div>
                <button
                  onClick={() => handleDeleteModal()}
                  className="btn btn-outline btn-error btn-sm"
                  disabled={!isInputFilled}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button
                  onClick={() => handleEdit()}
                  className="btn btn-outline btn-primary btn-sm ms-1.5"
                  disabled={!isInputFilled}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
              <div>
                {!isInputFilled ? (
                  <p className="text-sm text-warning">Lengkapi Profile !</p>
                ) : isInputFilled ? (
                  ""
                ) : (
                  ""
                )}
              </div>
              {!editMode ? (
                <button
                  onClick={addProfile}
                  disabled={isDisabled}
                  className="btn btn-outline btn-success btn-sm w-1/5">
                  <FontAwesomeIcon icon={faCheck} size="lg" />
                </button>
              ) : (
                ""
              )}
              {editMode ? (
                <button
                  onClick={updateProfile}
                  disabled={isDisabled}
                  className="btn btn-outline btn-success btn-sm w-1/5">
                  <FontAwesomeIcon icon={faCheck} size="lg" />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {isDeleteConfirmOpen && modalDeleteConfirmation()}
    </div>
  );
};
export default Profile;
