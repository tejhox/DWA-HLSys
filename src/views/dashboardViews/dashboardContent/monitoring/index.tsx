import { useAllStateContext } from "@/context/allStateContext";
import { useGetDataContext } from "@/context/getDataContext";
import { useSessionContext } from "@/context/sessionContext";
import { DekidakaData } from "@/context/type/dataType";
import { faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const MonitoringViews = () => {
  const {
    profileData,
    kpiData,
    lineName,
    dekidakaData,
    dekidakaSumData,
    isDekidakaLoading,
    isEr01BtnActive,
    isEr02BtnActive,
    isEr03BtnActive,
    isEr150BtnActive,
  } = useAllStateContext();
  const { fetchSession, session } = useSessionContext();
  const { getFilteredMonitoringData, getFilteredMonitoringKpiData } =
    useGetDataContext();

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      await getFilteredMonitoringData(lineName);
      getFilteredMonitoringKpiData(lineName);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineName]);

  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date: Date) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const dayName = days[date.getDay()];

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${dayName}, ${day}/${month}/${year}`;
  };

  return (
    <div className="w-full">
      <div className="flex">
        <div className="flex flex-1 justify-between bg-blue-700 shadow shadow-gray-400 rounded py-2 px-3">
          <h1 className="text-xl font-bold text-white">
            {isEr01BtnActive
              ? "LINE ER 01"
              : isEr02BtnActive
              ? "LINE ER 02"
              : isEr03BtnActive
              ? "LINE ER 03"
              : isEr150BtnActive
              ? "LINE ER 150"
              : "-"}
          </h1>
          <h1 className="text-xl font-bold text-white">
            {profileData?.[0]?.shift ? `SHIFT ${profileData?.[0]?.shift}` : "-"}
          </h1>
        </div>
        <div className="flex flex-1 justify-between bg-violet-800 shadow shadow-gray-400 rounded py-2 px-3 ms-2">
          <h1 className="text-xl font-bold text-white">PRODUCT : </h1>
          <h1 className="text-xl font-bold text-white">
            {profileData?.[0]?.product ? profileData?.[0]?.product : "-"}
          </h1>
        </div>
        <div className="flex flex-1 bg-teal-600 justify-between items-center shadow shadow-gray-400 rounded py-2 px-3 ms-2">
          <p className="text-xl font-bold text-white">
            <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
            {formatDate(time)}
          </p>
          <p className="text-xl font-bold text-white">
            <FontAwesomeIcon icon={faClock} className="me-2" />
            {formatTime(time)}
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 h-full mt-1">
          <div className="border border-gray-300 shadow-md rounded p-1.5">
            <div className="w-full ps-1 pe-2 py-0.5">
              <h1 className="font-semibold">
                Leader : {profileData?.[0]?.leader}
              </h1>
            </div>
          </div>
          <div
            className="border border-gray-300 shadow-md rounded p-1.5 mt-1"
            style={{ height: "132px" }}>
            <div className="w-full ps-1 pe-2 py-1 ">
              <h1 className="font-semibold">Akumulasi</h1>
            </div>
            <hr className="border border-gray-400 " />
            <table className="table table-sm shadow-md shadow-gray-300/60 text-center mt-1.5">
              <thead className="border border-2">
                <tr className="bg-indigo-600">
                  <th className="border border-2 text-white">Plan</th>
                  <th className="border border-2 text-white">Aktual</th>
                  <th className="border border-2 text-white">Deviasi</th>
                  <th className="border border-2 text-white">Loss Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border-double border-2">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : (
                      dekidakaSumData?.totalPlan ?? "0"
                    )}
                  </td>
                  <td className="border-double border-2  text-blue-700">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : (
                      dekidakaSumData?.totalActual ?? "0"
                    )}
                  </td>
                  <td className="border-double border-2">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : (
                      dekidakaSumData?.totalDeviasi ?? "0"
                    )}
                  </td>
                  <td className="border-double border-2 text-error">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : (
                      `${dekidakaSumData?.totalLossTime ?? "0"}'`
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="border border-gray-300 shadow-md rounded p-1.5 mt-1"
            style={{ minHeight: "334px" }}>
            <div className="w-full ps-1 pe-2 py-1">
              <h1 className="font-semibold">Dekidaka</h1>
            </div>
            <hr className="border border-gray-400" />
            <div className="overflow-auto" style={{ maxHeight: "280px" }}>
              <table className="table table-sm text-center mt-2 mb-1">
                <thead className="border border-2">
                  <tr className="bg-indigo-600">
                    <th className="border border-2 text-white">Jam</th>
                    <th className="border border-2 text-white">Plan</th>
                    <th className="border border-2 text-white">Aktual</th>
                    <th className="border border-2 text-white">Deviasi</th>
                    <th className="border border-2 text-white">Loss Time</th>
                  </tr>
                </thead>
                <tbody>
                  {dekidakaData
                    ?.slice()
                    .reverse()
                    .map((item: DekidakaData, index: number) => (
                      <tr
                        className={`${
                          (item.lossTimeDetails.manCat?.man &&
                            item.lossTimeDetails.manCat.man > 0) ||
                          (item.lossTimeDetails.methodCat?.method &&
                            item.lossTimeDetails.methodCat.method > 0) ||
                          (item.lossTimeDetails.machineCat?.machine &&
                            item.lossTimeDetails.machineCat.machine > 0) ||
                          (item.lossTimeDetails.materialCat?.material &&
                            item.lossTimeDetails.materialCat.material > 0)
                            ? "bg-amber-200"
                            : "bg-white"
                        }`}
                        key={item.id}>
                        <td className="border border-2">{index + 1}</td>
                        <td className="border border-2">
                          {isDekidakaLoading ? (
                            <span className="loading loading-dots loading-xs"></span>
                          ) : (
                            item.plan
                          )}
                        </td>
                        <td className="border border-2 text-blue-700">
                          {isDekidakaLoading ? (
                            <span className="loading loading-dots loading-xs"></span>
                          ) : (
                            item.actual
                          )}
                        </td>
                        <td className="border border-2">
                          {isDekidakaLoading ? (
                            <span className="loading loading-dots loading-xs"></span>
                          ) : (
                            item.deviasi
                          )}
                        </td>
                        <td className="border border-2 text-error">
                          {isDekidakaLoading ? (
                            <span className="loading loading-dots loading-xs"></span>
                          ) : (
                            `${item.lossTime}'`
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full mt-1 ms-2" style={{ minWidth: "100px" }}>
          <div
            className="border border-gray-300 shadow-md rounded p-1.5"
            style={{ minHeight: "516px" }}>
            <div className="w-full ps-1 pe-2 py-1 ">
              <h1 className="font-semibold">Keterangan Loss Time</h1>
            </div>
            <hr className="border border-gray-400" />
            <div className="overflow-auto" style={{ maxHeight: "466px" }}>
              <table className="table table-zebra table-xs border-2 mt-2 mb-1">
                <thead className="bg-indigo-600">
                  <tr>
                    <th className="text-center text-white border-2">Jam</th>
                    <th className="text-center text-white border-2">Faktor</th>
                    <th className="text-center text-white border-2">
                      Loss Time
                    </th>
                    <th className="text-center text-white border-2">
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dekidakaData
                    ?.slice()
                    .reverse()
                    .map((item: DekidakaData, index: number) => (
                      <>
                        <tr key={item.id}>
                          <td className="text-center border-2" rowSpan={4}>
                            {index + 1}
                          </td>
                          <td
                            className={
                              item.lossTimeDetails.manCat?.man &&
                              item.lossTimeDetails.manCat.man > 0
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            Man
                          </td>
                          <td
                            className={
                              item.lossTimeDetails.manCat?.man &&
                              item.lossTimeDetails.manCat.man > 0
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            {item.lossTimeDetails.manCat?.man !== 0
                              ? `${item.lossTimeDetails.manCat?.man}'`
                              : "-"}
                          </td>
                          <td
                            className={
                              item.lossTimeDetails.manCat?.manNote &&
                              item.lossTimeDetails.manCat.manNote !== ""
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            {item.lossTimeDetails.manCat.manNote || "-"}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={
                              item.lossTimeDetails.machineCat?.machine &&
                              item.lossTimeDetails.machineCat.machine > 0
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            Machine
                          </td>
                          <td
                            className={
                              item.lossTimeDetails.machineCat?.machine &&
                              item.lossTimeDetails.machineCat.machine > 0
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            {item.lossTimeDetails.machineCat?.machine !== 0
                              ? `${item.lossTimeDetails.machineCat?.machine}'`
                              : "-"}
                          </td>
                          <td
                            className={
                              item.lossTimeDetails.machineCat?.machineNote &&
                              item.lossTimeDetails.machineCat.machineNote !== ""
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            {item.lossTimeDetails.machineCat?.machineNote ||
                              "-"}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={
                              item.lossTimeDetails.methodCat?.method &&
                              item.lossTimeDetails.methodCat.method > 0
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            Method
                          </td>
                          <td
                            className={
                              item.lossTimeDetails.methodCat?.method &&
                              item.lossTimeDetails.methodCat.method > 0
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            {item.lossTimeDetails.methodCat?.method !== 0
                              ? `${item.lossTimeDetails.methodCat?.method}'`
                              : "-"}
                          </td>
                          <td
                            className={
                              item.lossTimeDetails.methodCat?.methodNote &&
                              item.lossTimeDetails.methodCat.methodNote !== ""
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            {item.lossTimeDetails.methodCat?.methodNote || "-"}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={
                              item.lossTimeDetails.materialCat?.material &&
                              item.lossTimeDetails.materialCat.material > 0
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            Material
                          </td>
                          <td
                            className={
                              item.lossTimeDetails.materialCat?.material &&
                              item.lossTimeDetails.materialCat.material > 0
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            {item.lossTimeDetails.materialCat?.material !== 0
                              ? `${item.lossTimeDetails.materialCat?.material}'`
                              : "-"}
                          </td>
                          <td
                            className={
                              item.lossTimeDetails.materialCat?.materialNote &&
                              item.lossTimeDetails.materialCat.materialNote !==
                                ""
                                ? "bg-amber-200 text-center border-2"
                                : "text-center border-2"
                            }>
                            {item.lossTimeDetails.materialCat?.materialNote ||
                              "-"}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full mt-1 ms-2" style={{ minWidth: "100px" }}>
          <div
            className="border border-gray-300 shadow-md rounded p-1.5"
            style={{ minHeight: "516px" }}>
            <div className="w-full ps-1 pe-2 py-1 ">
              <h1 className="font-semibold">KPI Data</h1>
            </div>
            <hr className="border border-gray-400" />
            <div className="mt-2 overflow-auto" style={{ maxHeight: "456px" }}>
              <div className="border border-gray-300 bg-slate-50 rounded ps-2 pe-3 py-2">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">Efisiensi</h1>
                  <h1 className="font-semibold">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : kpiData?.[0]?.efficiencyDoc.efficiency !== undefined ? (
                      `${kpiData?.[0]?.efficiencyDoc.efficiency}%`
                    ) : (
                      "-"
                    )}
                  </h1>
                </div>
                <hr className="my-1 border-gray-300" />
                <ul className="ps-9">
                  <li className="list-disc text-sm">
                    <div className="flex justify-between">
                      <div className="flex mb-1">
                        <span>Waktu Tersedia (Menit)</span>
                        <span className="ms-1.5">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.efficiencyDoc.availableTime !==
                          undefined ? (
                          `${kpiData?.[0]?.efficiencyDoc.availableTime}'`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <span>Waktu Efektif (Menit)</span>
                        <span className="ms-4">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.efficiencyDoc.effectiveTime !==
                          undefined ? (
                          `${kpiData?.[0]?.efficiencyDoc.effectiveTime}'`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-300 bg-slate-50 rounded ps-2 pe-3 py-2 mt-1">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">Loss Time %</h1>
                  <h1 className="font-semibold">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : kpiData?.[0]?.lossTimeDoc.lossTimeRatio !==
                      undefined ? (
                      `${kpiData?.[0]?.lossTimeDoc.lossTimeRatio}%`
                    ) : (
                      "-"
                    )}
                  </h1>
                </div>
                <hr className="my-1 border-gray-300" />
                <ul className="ps-9">
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex mb-1">
                        <span>Waktu Tersedia (Menit)</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.lossTimeDoc.availableTime !==
                          undefined ? (
                          `${kpiData?.[0]?.lossTimeDoc.availableTime}'`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <span>Loss Time (Menit)</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.lossTimeDoc.lossTimeKpi !==
                          undefined ? (
                          `${kpiData?.[0]?.lossTimeDoc.lossTimeKpi}'`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-300 bg-slate-50 rounded ps-2 pe-3 py-2 mt-1">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">Pcs Per Hour</h1>
                  <h1 className="font-semibold">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : kpiData?.[0]?.pcsPerHourDoc.pcsPerHour !== undefined ? (
                      `${kpiData?.[0]?.pcsPerHourDoc.pcsPerHour}`
                    ) : (
                      "-"
                    )}
                  </h1>
                </div>
                <hr className="my-1 border-gray-300" />
                <ul className="ps-9">
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex mb-1">
                        <span>Total Produksi</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.pcsPerHourDoc.totalProduction !==
                          undefined ? (
                          `${kpiData?.[0]?.pcsPerHourDoc.totalProduction}`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <span>Waktu Efektif (Jam)</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.pcsPerHourDoc.effectiveHour !==
                          undefined ? (
                          `${kpiData?.[0]?.pcsPerHourDoc.effectiveHour}`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-300 bg-slate-50 rounded ps-2 pe-3 py-2 mt-1">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">Productivity (Unit/MHR)</h1>
                  <h1 className="font-semibold">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : kpiData?.[0]?.productivityDoc.unitPerManHrAct !==
                      undefined ? (
                      `${kpiData?.[0]?.productivityDoc.unitPerManHrAct}`
                    ) : (
                      "-"
                    )}
                  </h1>
                </div>
                <hr className="my-1 border-gray-300" />
                <ul className="ps-9">
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <span>Aktual Produksi</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.productivityDoc.actualPrd !==
                          undefined ? (
                          `${kpiData?.[0]?.productivityDoc.actualPrd}`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <span>Man</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.productivityDoc.man !== undefined ? (
                          `${kpiData?.[0]?.productivityDoc.man}`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <span>Hour</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.productivityDoc.hour !== undefined ? (
                          `${kpiData?.[0]?.productivityDoc.hour}`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <span>Man Hour</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.productivityDoc.manHour !==
                          undefined ? (
                          `${kpiData?.[0]?.productivityDoc.manHour}`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <span>Unit/MHR Aktual</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.productivityDoc.unitPerManHrAct !==
                          undefined ? (
                          `${kpiData?.[0]?.productivityDoc.unitPerManHrAct}`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-300 bg-slate-50 rounded ps-2 pe-3 py-2 mt-1">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">Cycle Time Actual</h1>
                  <h1 className="font-semibold">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : kpiData?.[0]?.cycleTimeActualDoc.cycleTimeAct !==
                      undefined ? (
                      `${kpiData?.[0]?.cycleTimeActualDoc.cycleTimeAct}`
                    ) : (
                      "-"
                    )}
                  </h1>
                </div>
                <hr className="my-1 border-gray-300" />
                <ul className="ps-9">
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <span>Waktu Efektif</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.cycleTimeActualDoc.effectiveTime !==
                          undefined ? (
                          `${kpiData?.[0]?.cycleTimeActualDoc.effectiveTime}`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                  <li className="list-disc text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <span>Total Produksi</span>
                        <span className="ms-1">:</span>
                      </div>
                      <span>
                        {isDekidakaLoading ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : kpiData?.[0]?.cycleTimeActualDoc.totalProduction !==
                          undefined ? (
                          `${kpiData?.[0]?.cycleTimeActualDoc.totalProduction}`
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringViews;
