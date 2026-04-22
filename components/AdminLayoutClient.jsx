"use client";

import { usePathname } from "next/navigation";
import { AdminProvider } from "./Admincontext";
import ProtectedRoute from "./Adminprotect";

export default function AdminLayoutClient({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AdminProvider>
      {isLoginPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
    </AdminProvider>
  );
}