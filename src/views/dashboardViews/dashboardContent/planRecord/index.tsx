import React from "react";

const PlanRecord = () => {
  return (
    <div className="w-full ">
      <div className="flex flex-1 justify-between bg-blue-700 shadow shadow-gray-400 rounded py-2 px-3">
        <h1 className="text-xl font-bold text-white">Leader : -</h1>
        <div className="flex">
          <select className="select select-sm select-bordered">
            <option>Line</option>
            <option value="ER01">ER01</option>
            <option value="ER02">ER02</option>
            <option value="ER03">ER03</option>
            <option value="ER150">ER150</option>
          </select>
          <select className="select select-sm select-bordered ms-2">
            <option>Group</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>
      <div className="mt-2">
        <table className="table table-sm table-zebra border">
          <thead>
            <tr>
              <th>No</th>
              <th>Total Plan</th>
              <th>Total Aktual</th>
              <th>Total Loss Time</th>
              <th>Efisiensi</th>
              <th>Loss Time %</th>
              <th>Productivity</th>
              <th>Pcs/Hour</th>
              <th>Cycle Time Actual</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default PlanRecord;
