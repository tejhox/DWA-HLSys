import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Profile = () => {
  const [docId, setDocId] = useState<string>("");
  const [line, setLine] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [dateNow, setDateNow] = useState<any>("");
  const { data: session } = useSession<any>();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        if (session?.user) {
          setUserData(session.user);
          setDateNow(Date.now());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSession();
  }, [session]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const storedLastDocId = localStorage.getItem("lastDocId") || "";
        if (storedLastDocId) {
          const [username, id] = storedLastDocId.split("_");
          if (session?.user && userData) {
            if (username === userData.nama) {
              const response = await axios.get(`/api/getProfileData?id=${id}`);
              setLine(response.data.line);
              setProduct(response.data.product);
              setShift(response.data.shift);
              setDate(response.data.date);
              console.log(response.data);
            } else {
              console.log("Username tidak cocok");
            }
          }
        } else {
          console.log("Data tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  const addProfile = async () => {
    const leaderGroups = {
      "Bowo Dwi": "1",
      "Ocza Aurellia": "2",
    };
    const group = leaderGroups[userData.nama as keyof typeof leaderGroups];

    if (group) {
      try {
        const response = await axios.post("/api/addProfileData", {
          line,
          group,
          leader: userData.nama,
          product,
          shift,
          date,
        });
        const { docId } = response.data;
        localStorage.setItem("lastDocId", `${userData.nama}_${docId}`);
        const lastDocId = localStorage.getItem("lastDocId") || "";
        setDocId(lastDocId || "");

        console.log("Profile data submitted successfully with ID :", docId);
        setIsDisabled(true);

        if (docId) {
          const response = await axios.get(`/api/getDekidakaId?id=${docId}`);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    } else {
      console.log("Line bukan ER01");
    }
  };

  return (
    <div className="flex justify-center px-3 mt-3 h-full w-full lg:w-1/3">
      <div className="container w-full">
        <div className="container w-full border rounded-lg px-1 py-1">
          <div className="container flex flex-row w-full ps-2 pe-2 py-1 ">
            <p className="text-sm">Dekidaka</p>
            {userData ? (
              <p className="text-sm text-primary ms-auto">
                {userData.nama} - {userData.nik}
              </p>
            ) : (
              <p className="text-sm text-primary ms-auto">Loading...</p>
            )}
          </div>
          <hr />
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
                ) : (
                  <option className="text-sm" value="">
                    Loading...
                  </option>
                )}
                <option value="ER 01">ER 01</option>
                <option value="ER 02">ER 02</option>
                <option value="ER 03">ER 03</option>
                <option value="ER 150">ER 150</option>
              </select>
              <select
                className="select select-bordered select-sm w-full max-w-xs"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                disabled={isDisabled}>
                {product ? (
                  <option>Produk</option>
                ) : (
                  <option>Loading...</option>
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
                  <option value="">Produk</option>
                ) : (
                  <option value="">Loading...</option>
                )}
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <input
                type="date"
                placeholder="Tanggal"
                className="input input-bordered input-sm w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className="container flex justify-end w-full p-1">
            <button
              onClick={() => setIsDisabled(false)}
              className="btn btn-sm btn-outline">
              Edit
            </button>
            <button
              onClick={addProfile}
              className="btn btn-sm btn-outline ms-2"
              disabled={isDisabled}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
