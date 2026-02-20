import { requireAuth } from "@/lib/data/admin-queries";
import Link from "next/link";
import { logoutAction } from "@/lib/actions/admin";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/product-categories", label: "Categories" },
  { href: "/admin/product-items", label: "Product Items" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/foods", label: "Foods" },
  { href: "/admin/management-team", label: "Management Team" },
  { href: "/admin/contact-us", label: "Contact Us" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h1 className="text-xl font-bold">Bolero Admin</h1>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded hover:bg-gray-700 transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                >
                  Logout
                </button>
              </form>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
