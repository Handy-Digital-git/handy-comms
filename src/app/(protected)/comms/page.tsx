import { createClient } from "@/lib/supabase/server";
import CommsComposer from "@/components/comms-composer";
import GroupManager from "@/components/group-manager";

export default async function CommsPage() {
  // Server component wrapper; client components handle fetching internally
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Comms</h1>
      </div>
      <div className="card p-4 md:p-6">
        <CommsComposer />
      </div>
      <div className="card p-4 md:p-6">
        <GroupManager />
      </div>
    </div>
  );
}
