import { useAllStateContext } from "@/context/allStateContext";
import { DekidakaData } from "@/context/type/dataType";
import React from "react";

const LossTimeDetailTable = () => {
  const { dekidakaData } = useAllStateContext();

  const customStyle = {
    maxHeight: "398px",
    overflow: "auto",
  };

  return (
    <div
      className="bg-gray-50/80 shadow shadow-lg rounded-lg py-2 px-3 mt-1.5"
      style={{ height: "451px" }}>
      <h1 className="font-semibold">Loss Time Detail</h1>
      <hr className="border border-gray-400 mt-1" />
      <div
        className="shadow shadow-md shadow-gray-500/60 mt-2"
        style={customStyle}>
        <table className="table table-xs border-2 bg-gray-100">
          <thead className="bg-indigo-600">
            <tr>
              <th className="text-center text-white border-2">Jam</th>
              <th className="text-center text-white border-2">Faktor</th>
              <th className="text-center text-white border-2">Loss Time</th>
              <th className="text-center text-white border-2">Keterangan</th>
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
                          ? "bg-amber-300 text-center border-2"
                          : "text-center border-2"
                      }>
                      Man
                    </td>
                    <td
                      className={
                        item.lossTimeDetails.manCat?.man &&
                        item.lossTimeDetails.manCat.man > 0
                          ? "bg-amber-300 text-center border-2"
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
                          ? "bg-amber-300 text-center border-2"
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
                          ? "bg-amber-300 text-center border-2"
                          : "text-center border-2"
                      }>
                      Machine
                    </td>
                    <td
                      className={
                        item.lossTimeDetails.machineCat?.machine &&
                        item.lossTimeDetails.machineCat.machine > 0
                          ? "bg-amber-300 text-center border-2"
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
                          ? "bg-amber-300 text-center border-2"
                          : "text-center border-2"
                      }>
                      {item.lossTimeDetails.machineCat?.machineNote || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={
                        item.lossTimeDetails.methodCat?.method &&
                        item.lossTimeDetails.methodCat.method > 0
                          ? "bg-amber-300 text-center border-2"
                          : "text-center border-2"
                      }>
                      Method
                    </td>
                    <td
                      className={
                        item.lossTimeDetails.methodCat?.method &&
                        item.lossTimeDetails.methodCat.method > 0
                          ? "bg-amber-300 text-center border-2"
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
                          ? "bg-amber-300 text-center border-2"
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
                          ? "bg-amber-300 text-center border-2"
                          : "text-center border-2"
                      }>
                      Material
                    </td>
                    <td
                      className={
                        item.lossTimeDetails.materialCat?.material &&
                        item.lossTimeDetails.materialCat.material > 0
                          ? "bg-amber-300 text-center border-2"
                          : "text-center border-2"
                      }>
                      {item.lossTimeDetails.materialCat?.material !== 0
                        ? `${item.lossTimeDetails.materialCat?.material}'`
                        : "-"}
                    </td>
                    <td
                      className={
                        item.lossTimeDetails.materialCat?.materialNote &&
                        item.lossTimeDetails.materialCat.materialNote !== ""
                          ? "bg-amber-300 text-center border-2"
                          : "text-center border-2"
                      }>
                      {item.lossTimeDetails.materialCat?.materialNote || "-"}
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

{
  /* {dekidakaData
            ?.slice()
            .reverse()
            .map((item: DekidakaData, index: number) => (
              <tr className="hover" key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">
                  {`${item.lossTimeDetails?.manCat?.man}'`}
                </td>
                <td className="text-center">
                  {`${item.lossTimeDetails?.machineCat?.machine}'`}
                </td>
                <td className="text-center">
                  {`${item.lossTimeDetails?.methodCat?.method}'`}
                </td>
                <td className="text-center">
                  {`${item.lossTimeDetails?.materialCat?.material}'`}
                </td>
              </tr>
            ))} */
}

export default LossTimeDetailTable;
