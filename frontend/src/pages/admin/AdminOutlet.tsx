import { Outlet } from "react-router-dom";

export default function AdminOutlet() {
  return (
    <div className="pt-24">
      <Outlet />
    </div>
  );
}
