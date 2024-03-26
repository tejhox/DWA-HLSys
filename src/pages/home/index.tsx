import React, { useState, useEffect } from "react";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  return (
    <div className="container w-1/2">
      {typeof window !== "undefined" && isMobile ? (
        <input
          placeholder="Date"
          className="textbox-n"
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
        />
      )}
    </div>
  );
};

export default Home;
