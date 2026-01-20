import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <div className="grid min-h-screen bg-bg text-text" style={{ gridTemplateColumns: "auto 1fr" }}>
      <Sidebar signOutAction={signOut} />
      <div className="flex min-w-0 flex-col">
        <Topbar />
        <main className="w-full px-5 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
