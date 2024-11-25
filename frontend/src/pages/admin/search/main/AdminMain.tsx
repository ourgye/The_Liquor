import AddItemButton from "@/components/AddItemButton";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminMain() {
  return (
    <div className="px-4 md:px-8 space-y-2">
      <AddItemButton />
      <nav className="flex flex-row gap-4 justify-center py-2 text-base md:text-lg">
        <NavLink
          to={"search/liquor"}
          className={({ isActive, isPending }) => {
            return isPending
              ? "bg-slate-600"
              : isActive
              ? "font-semibold underline underline-offset-4"
              : "";
          }}
        >
          술
        </NavLink>
        <NavLink
          to={"search/producer"}
          className={({ isActive, isPending }) => {
            return isPending
              ? "bg-slate-600"
              : isActive
              ? "font-semibold underline underline-offset-4"
              : "";
          }}
        >
          생산자
        </NavLink>
        <NavLink
          to={"search/brand"}
          className={({ isActive, isPending }) => {
            return isPending
              ? "bg-slate-600"
              : isActive
              ? "font-semibold underline underline-offset-4"
              : "";
          }}
        >
          브랜드
        </NavLink>
        <NavLink
          to={"search/cardnews"}
          className={({ isActive, isPending }) => {
            return isPending
              ? "bg-slate-600"
              : isActive
              ? "font-semibold underline underline-offset-4"
              : "";
          }}
        >
          카드뉴스
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
