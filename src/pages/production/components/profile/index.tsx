import { useSessionContext } from "@/context/sessionContext";
import { useProfileContext } from "../../../../context/profileContext";
import { useEffect, useState } from "react";

const Profile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
  } = useProfileContext();

  const { userData, userDataName, userDataNik } = useSessionContext();

  const { addProfile, updateProfile } = useProfileContext();

  const handleEdit = () => {
    setIsDisabled(false);
    setEditMode(true);
  };

  return (
    <div className="flex justify-center px-1.5 mt-3 h-full w-full lg:w-1/3">
      <div className="container w-full">
        <div className="container w-full border-2 border-gray-400 rounded-lg px-1 py-1">
          <div className="container flex flex-row w-full ps-2 pe-2 py-1 ">
            <p className="text-sm">Dekidaka</p>
            {userData ? (
              <p className="text-sm text-primary ms-auto">
                {userDataName} - {userDataNik}
              </p>
            ) : !userData ? (
              ""
            ) : (
              <p className="text-sm text-primary ms-auto">Loading...</p>
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
              {typeof window !== "undefined" && isMobile ? (
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
              )}
            </div>
          </div>
          <div className="container flex justify-between items-center w-full p-1">
            <div className="px-1">
              {!isFilled ? (
                <p className="text-sm text-primary ms-auto text-center">
                  Lengkapi Profile !
                </p>
              ) : isFilled ? (
                ""
              ) : (
                ""
              )}
            </div>
            <div>
              <button
                onClick={() => handleEdit()}
                className="btn btn-sm btn-outline">
                Edit
              </button>
              {!editMode ? (
                <button
                  onClick={addProfile}
                  className="btn btn-sm btn-outline ms-2"
                  disabled={isDisabled}>
                  Submit
                </button>
              ) : (
                ""
              )}
              {editMode ? (
                <button
                  onClick={updateProfile}
                  className="btn btn-sm btn-outline ms-2"
                  disabled={isDisabled}>
                  Submit
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
