import Link from "next/link";

const Menu = () => {
  return (
    <div className="p-2">
      <Link href="/daily-kpi" className="btn btn-sm btn-primary">
        Lihat KPI
      </Link>
    </div>
  );
};

export default Menu;
