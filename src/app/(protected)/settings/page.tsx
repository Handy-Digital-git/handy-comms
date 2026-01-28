import ContactsManager from "@/components/contacts-manager";
import NotificationsManager from "@/components/notifications-manager";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted">Manage workspace preferences and contacts.</p>
      </div>
      <div className="card p-4 md:p-6">
        <ContactsManager />
      </div>
      <div className="card p-4 md:p-6">
        <NotificationsManager />
      </div>
    </div>
  );
}
