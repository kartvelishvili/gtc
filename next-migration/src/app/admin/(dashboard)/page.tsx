import { requireAuth } from "@/lib/data/admin-queries";

export default async function AdminDashboardPage() {
  const session = await requireAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Welcome to Bolero & Co Admin Panel.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Logged in as: {session.user.email}
        </p>
      </div>
    </div>
  );
}
