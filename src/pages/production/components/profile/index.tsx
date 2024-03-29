import { useSessionContext } from "@/context/sessionContext";
import { useProfileContext } from "../../../../context/profileContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faEllipsis } from "@fortawesome/free-solid-svg-icons";

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

  const {
    line,
    product,
    shift,
    date,
    isDisabled,
    setLine,
    setProduct,
    setShift,
    setDate,
    setIsDisabled,
    isFilled,
    isDeleteConfirmOpen,
  } = useProfileContext();

  const { userData, userDataName, userDataNik } = useSessionContext();

  const {
    addProfile,
    updateProfile,
    handleDeleteModal,
    modalDeleteConfirmation,
  } = useProfileContext();

  const handleEdit = () => {
    setIsDisabled(false);
    setEditMode(true);
  };

  return (
    <div className="flex justify-center px-1.5 mt-2 h-full w-full lg:w-1/3">
      <div className="container w-full relative">
        <div className="container w-full border-2 border-gray-400 rounded-lg px-1 py-1">
          <div className="container flex flex-row items-center w-full ps-2 pe-2 py-1 ">
            {userData ? (
              <p className="text-sm text-primary">
                {userDataName} - {userDataNik}
              </p>
            ) : !userData ? (
              ""
            ) : (
              <p className="text-sm text-primary">Loading...</p>
            )}
            <span className="ms-auto cursor-pointer" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faEllipsis} size="lg" />
            </span>
            {isMenuOpen && (
              <div className="absolute h-30 right-1.5 top-7 bg-neutral mt-2 rounded-md shadow-md border border-gray-200 z-50">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
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
          <div className="container flex w-full p-1 mt-1">
            <div className="container w-1/2">
              <select
                className="select select-bordered select-sm w-full max-w-xs mb-1"
                value={line}
                onChange={(e) => setLine(e.target.value)}
                disabled={isDisabled}>
                {line ? (
                  <option className="text-sm" value="">
                    Line
                  </option>
                ) : !line ? (
                  <option className="text-sm" value="">
                    Line
                  </option>
                ) : (
                  <option className="text-sm" value="">
                    Loading...
                  </option>
                )}
                <option value="ER01">ER 01</option>
                <option value="ER02">ER 02</option>
                <option value="ER03">ER 03</option>
                <option value="ER150">ER 150</option>
              </select>
              <select
                className="select select-bordered select-sm w-full max-w-xs"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                disabled={isDisabled}>
                {product ? (
                  <option>Produk</option>
                ) : !product ? (
                  <option>Produk</option>
                ) : (
                  <option className="text-sm" value="">
                    Loading...
                  </option>
                )}
                <option value="D14N">D14N</option>
                <option value="KS Hyundai">KS Hyundai</option>
              </select>
            </div>
            <div className="container w-1/2 ms-2">
              <select
                className="select select-bordered select-sm w-full max-w-xs mb-1"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                disabled={isDisabled}>
                {shift ? (
                  <option value="">Shift</option>
                ) : !shift ? (
                  <option value="">Shift</option>
                ) : (
                  <option className="text-sm" value="">
                    Loading...
                  </option>
                )}
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
                disabled={isDisabled}
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
          <div className="container flex justify-between items-center w-full p-1">
            <div className="flex items-center w-full justify-between">
              <div>
                <button
                  onClick={() => handleDeleteModal()}
                  className="btn btn-outline btn-error btn-sm">
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button
                  onClick={() => handleEdit()}
                  className="btn btn-outline btn-primary btn-sm ms-1.5">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
              <div>
                {!isFilled ? (
                  <p className="text-sm text-warning">Lengkapi Profile !</p>
                ) : isFilled ? (
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
                  className="btn btn-outline btn-success btn-sm">
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
