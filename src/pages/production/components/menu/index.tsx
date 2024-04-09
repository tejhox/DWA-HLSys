import Link from "next/link";

const Menu = () => {
  return (
    <div className="flex justify-center px-1.5 mt-2 h-full w-full lg:w-1/3">
      <div className="container w-full border-2 rounded-lg bg-gray-200 shadow-md shadow-gray-500/60 px-1 py-1 mb-1">
        <Link href="/daily-kpi" className="btn btn-sm btn-primary">
          Lihat KPI
        </Link>
      </div>
    </div>
  );
};

export default Menu;
