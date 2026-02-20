import { adminList } from "@/lib/data/admin-queries";

export default async function ContactUsPage() {
  const contacts = await adminList("contact_us");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Contact Us Submissions</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((c: any) => (
              <tr key={c.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{c.first_name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{c.last_name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{c.phone_number}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{c.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{c.text}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{new Date(c.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
