export default async function DashboardPage() {
  // Static demo data for now
  const stats = [
    { label: "Total Tickets", value: 245, change: "+12%" },
    { label: "Resolved Tickets", value: 180, change: "+15%" },
    { label: "Pending Tickets", value: 45, change: "-9%" },
    { label: "Response Time", value: "2.4 hrs", change: "10x faster" },
  ];

  const activities = [
    {
      id: "#4021",
      title: "Login Issue",
      status: "Resolved",
      tags: ["Urgent", "Technical"],
      excerpt:
        "The customer was unable to access their account after initiating a password reset.",
      author: "Sarah K.",
      time: "1h ago",
    },
    {
      id: "#3987",
      title: "Billing Error",
      status: "Pending",
      tags: ["Billing"],
      excerpt: "Customer charged twice for subscription.",
      author: "Team",
      time: "2h ago",
    },
  ];

  const columns = [
    {
      title: "Open Tickets (2)",
      items: [
        {
          title: "Password Reset Failure",
          desc:
            "Several users are unable to reset their passwords due to a repeated timeout issue on the authentication server.",
          tags: ["Urgent", "Technical"],
          date: "Sep 9, 2025",
        },
        {
          title: "Billing Error",
          desc:
            "A customer reported being charged twice for the same monthly subscription.",
          tags: ["Billing", "High-Priority"],
          date: "Sep 3, 2025",
        },
      ],
    },
    {
      title: "Resolve Tickets (2)",
      items: [
        {
          title: "Mobile APP Crash",
          desc:
            "Android users experienced an app crash immediately after logging in due to a null pointer exception in callback.",
          tags: ["Technical", "Mobile"],
          date: "Sep 14, 2025",
        },
        {
          title: "Subscriptions Upgrade Issue",
          desc:
            "User upgrade from Basic to Premium redirected to an error page after payment due to misconfigured webhook.",
          tags: ["Billing", "Account"],
          date: "Sep 18, 2025",
        },
      ],
    },
    {
      title: "Archived (1)",
      items: [
        {
          title: "Email Notifications Delay",
          desc:
            "System-generated emails delayed by over 12 hours due to a queue backlog in the mail service.",
          tags: ["System", "UX/UI"],
          date: "Sep 24, 2025",
        },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="muted mt-1">Overview of support operations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <div className="text-sm text-muted">{s.label}</div>
            <div className="mt-2 flex items-end justify-between">
              <div className="stat">{s.value}</div>
              <div className="text-xs text-accent">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">Ticket Volume Tracker</div>
            <select className="rounded-md border border-border bg-card px-2 py-1 text-xs">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="mt-6">
            {/* Simple bar chart placeholder */}
            <div className="flex items-end gap-3 h-40">
              {[30, 22, 26, 70, 24, 28, 20].map((v, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-8 rounded-md bg-card2" style={{ height: `${v * 0.9}px` }} />
                  <div className="text-[10px] text-muted">{"SMTWTFS"[i]}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm"><span className="text-accent font-medium">+18%</span> this week vs last week</div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">Recent Support Activity</div>
            <a className="text-xs text-muted hover:underline" href="#">See all activities</a>
          </div>
          <div className="mt-4 space-y-4">
            {activities.map((a) => (
              <div key={a.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">Ticket {a.id}</div>
                  <span className="tag">{a.status}</span>
                </div>
                <div className="mt-1 text-sm">{a.title}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <p className="muted mt-2">{a.excerpt}</p>
                <div className="mt-3 text-xs text-muted">{a.author} • {a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket board */}
      <div className="card p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-medium">Ticket Status Board</div>
          <a className="text-xs text-muted hover:underline" href="#">See all activities</a>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title} className="rounded-xl border border-border bg-bg p-3">
              <div className="mb-2 text-sm font-medium">{col.title}</div>
              <div className="space-y-3">
                {col.items.map((it, idx) => (
                  <div key={idx} className="card-muted p-3">
                    <div className="text-sm font-medium">{it.title}</div>
                    <p className="muted mt-1">{it.desc}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {it.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <div className="mt-2 text-[11px] text-muted">Last Update: {it.date}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
