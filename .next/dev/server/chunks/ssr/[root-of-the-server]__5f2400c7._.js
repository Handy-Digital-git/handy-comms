module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(protected)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(protected)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(protected)/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
;
;
async function DashboardPage({ searchParams }) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Total tickets
    const { count: totalTickets } = await supabase.from("contact_requests").select("*", {
        count: "exact",
        head: true
    });
    // Resolved tickets = any status EXCEPT "Open" and "Unable to Balance"
    const { count: resolvedTickets } = await supabase.from("contact_requests").select("*", {
        count: "exact",
        head: true
    }).not("status", "in", '("Open","Unable to Balance")').not("status", "is", null);
    // Open tickets = status IN ("Open", "Unable to Balance")
    const { count: openTickets } = await supabase.from("contact_requests").select("*", {
        count: "exact",
        head: true
    }).in("status", [
        "Open",
        "Unable to Balance"
    ]);
    // Static demo data for now (mix of dynamic + placeholder)
    const stats = [
        {
            label: "Total Tickets",
            value: totalTickets ?? 0,
            change: "+12%"
        },
        {
            label: "Resolved Tickets",
            value: resolvedTickets ?? 0,
            change: "+15%"
        },
        {
            label: "Open Tickets",
            value: openTickets ?? 0,
            change: "-9%"
        }
    ];
    // Ticket Volume Tracker data (hooked up)
    const rangeRaw = (searchParams?.range ?? "weekly").toString().toLowerCase();
    const range = rangeRaw === "monthly" ? "monthly" : "weekly";
    // Fetch created_at for required window and aggregate in-memory
    if (range === "weekly") {
        const now = new Date();
        const endUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)); // exclusive end (tomorrow 00:00 UTC)
        const startUtc = new Date(endUtc);
        startUtc.setUTCDate(endUtc.getUTCDate() - 7); // last 7 days
        const { data: createdRows } = await supabase.from("contact_requests").select("created_at").gte("created_at", startUtc.toISOString()).lt("created_at", endUtc.toISOString());
        const buckets = Array(7).fill(0); // oldest..newest
        (createdRows ?? []).forEach((r)=>{
            const d = new Date(r.created_at);
            const idx = Math.floor((+d - +startUtc) / (24 * 3600 * 1000));
            if (idx >= 0 && idx < 7) buckets[idx]++;
        });
        // Labels for the last 7 days (Sun..Sat abbreviations aligned to buckets)
        const dayNames = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ];
        const labels = Array.from({
            length: 7
        }, (_, i)=>{
            const date = new Date(startUtc);
            date.setUTCDate(startUtc.getUTCDate() + i);
            return dayNames[date.getUTCDay()];
        });
        var volume = {
            labels,
            values: buckets
        };
    } else {
        // monthly: last 12 months including current month
        const now = new Date();
        const startMonthUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
        const startUtc = new Date(Date.UTC(startMonthUtc.getUTCFullYear(), startMonthUtc.getUTCMonth() - 11, 1));
        const endUtc = new Date(Date.UTC(startMonthUtc.getUTCFullYear(), startMonthUtc.getUTCMonth() + 1, 1)); // next month start
        const { data: createdRows } = await supabase.from("contact_requests").select("created_at").gte("created_at", startUtc.toISOString()).lt("created_at", endUtc.toISOString());
        const buckets = Array(12).fill(0); // oldest..newest
        (createdRows ?? []).forEach((r)=>{
            const d = new Date(r.created_at);
            const monthsDiff = (d.getUTCFullYear() - startUtc.getUTCFullYear()) * 12 + (d.getUTCMonth() - startUtc.getUTCMonth());
            if (monthsDiff >= 0 && monthsDiff < 12) buckets[monthsDiff]++;
        });
        const shortMonths = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        const labels = Array.from({
            length: 12
        }, (_, i)=>{
            const date = new Date(Date.UTC(startUtc.getUTCFullYear(), startUtc.getUTCMonth() + i, 1));
            return shortMonths[date.getUTCMonth()];
        });
        var volume = {
            labels,
            values: buckets
        };
    }
    // activities built dynamically below
    // --- Helpers ---
    function toTitle(str) {
        if (!str) return "";
        return String(str).replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().toLowerCase().replace(/\b\w/g, (c)=>c.toUpperCase());
    }
    function formatApp(app) {
        if (!app) return null;
        const key = String(app).trim().toLowerCase();
        const map = {
            collections_app: "Collections App",
            lending_app: "Lending App"
        };
        return map[key] ?? toTitle(app);
    }
    function truncate(s, n = 120) {
        if (!s) return "";
        const t = s.trim();
        if (t.length <= n) return t;
        return t.slice(0, n - 1).trimEnd() + "…";
    }
    function relTime(iso) {
        if (!iso) return "";
        const d = new Date(iso);
        const now = new Date();
        const ms = now.getTime() - d.getTime();
        const sec = Math.max(1, Math.floor(ms / 1000));
        const min = Math.floor(sec / 60);
        const hr = Math.floor(min / 60);
        const day = Math.floor(hr / 24);
        if (day > 0) return `${day}d ago`;
        if (hr > 0) return `${hr}h ago`;
        if (min > 0) return `${min}m ago`;
        return `${sec}s ago`;
    }
    function shortDate(iso) {
        if (!iso) return "";
        const d = new Date(iso);
        return d.toLocaleDateString("en-GB", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }
    // Pill badge renderer
    function Tag({ label }) {
        const key = label.trim().toLowerCase();
        let cls = "inline-flex items-center rounded-full border px-3 py-1 text-[11px]";
        // Priority tones
        if (key === "high") cls += " bg-rose-50 border-rose-200 text-rose-700";
        else if (key === "medium") cls += " bg-amber-50 border-amber-200 text-amber-700";
        else if (key === "low") cls += " bg-emerald-50 border-emerald-200 text-emerald-700";
        else cls += " bg-card2 border-border text-muted"; // default for location/agent
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: cls,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
            lineNumber: 155,
            columnNumber: 12
        }, this);
    }
    function routeFor(reason) {
        const key = (reason ?? "").toString().trim().toLowerCase();
        if (key === "bank") return "/bank-transfers";
        if (key === "agent pay in" || key === "agent pay-in") return "/agent-pay-in";
        if (key === "admin") return "/admin";
        return "/tickets";
    }
    // --- Fetch recent tickets and build activity + board ---
    const { data: recentTickets } = await supabase.from("contact_requests").select("ticket_no, submitted_by_name, status, priority, created_at, reason, description, app, page").order("created_at", {
        ascending: false
    }).limit(30);
    const recent = (recentTickets ?? []).map((r)=>{
        const id = `#${r.ticket_no != null ? String(r.ticket_no).padStart(4, "0") : "----"}`;
        const reasonKey = (r.reason ?? "").toString().trim().toLowerCase();
        const isAPI = reasonKey === "agent pay in" || reasonKey === "agent pay-in";
        const tags = [];
        if (r.priority) tags.push(toTitle(r.priority)); // Priority badge
        if (r.page) tags.push(toTitle(r.page)); // Location of error badge
        if (isAPI && r.submitted_by_name) tags.push(`Agent: ${r.submitted_by_name}`); // Agent name for Agent Pay In
        return {
            id,
            title: toTitle(r.reason) || toTitle(r.page) || "Support Ticket",
            status: r.status ?? "Open",
            tags,
            excerpt: truncate(r.description) || "",
            author: r.submitted_by_name || "Team",
            time: relTime(r.created_at),
            created_at: r.created_at,
            href: routeFor(r.reason)
        };
    });
    const activities = recent.slice(0, 2);
    const isOpenish = (s)=>{
        const a = (s ?? "").toString();
        return a === "Open" || a === "Unable to Balance" || a === "Pending" || a === "";
    };
    const openItems = recent.filter((r)=>isOpenish(r.status)).slice(0, 5).map((r)=>({
            title: r.title,
            desc: r.excerpt,
            tags: r.tags,
            date: shortDate(r.created_at),
            href: r.href
        }));
    const progressItems = recent.filter((r)=>(r.status ?? "") === "In Progress").slice(0, 5).map((r)=>({
            title: r.title,
            desc: r.excerpt,
            tags: r.tags,
            date: shortDate(r.created_at),
            href: r.href
        }));
    const archivedItems = recent.filter((r)=>[
            "Resolved",
            "Closed"
        ].includes(r.status ?? "")).slice(0, 5).map((r)=>({
            title: r.title,
            desc: r.excerpt,
            tags: r.tags,
            date: shortDate(r.created_at),
            href: r.href
        }));
    const columns = [
        {
            title: `Open (${openItems.length})`,
            items: openItems
        },
        {
            title: `In Progress (${progressItems.length})`,
            items: progressItems
        },
        {
            title: `Archived (${archivedItems.length})`,
            items: archivedItems
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold",
                        children: "Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "muted mt-1",
                        children: "Overview of support operations"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-4 md:grid-cols-3",
                children: stats.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-muted",
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-end justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat",
                                        children: s.value
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                        lineNumber: 236,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-accent",
                                        children: s.change
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 235,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s.label, true, {
                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-4 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card p-4 lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium",
                                        children: "Ticket Volume Tracker"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        method: "get",
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                name: "range",
                                                defaultValue: range,
                                                className: "rounded-md border border-border bg-card px-2 py-1 text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "weekly",
                                                        children: "Weekly"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "monthly",
                                                        children: "Monthly"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                lineNumber: 249,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "text-xs rounded-md border border-border bg-card px-2 py-1",
                                                children: "Apply"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                lineNumber: 253,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6",
                                children: [
                                    (()=>{
                                        const max = Math.max(1, ...volume.values);
                                        const chartHeight = range === "weekly" ? 320 : 240; // px
                                        const scale = chartHeight; // 1:1 scale to container height
                                        const barWidth = range === "weekly" ? 22 : 14; // px
                                        const cols = volume.values.length;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid items-end gap-4",
                                            style: {
                                                height: `${chartHeight}px`,
                                                gridTemplateColumns: `repeat(${cols}, minmax(24px, 1fr))`
                                            },
                                            children: volume.values.map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative group flex flex-col items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-lg w-full bg-(--accent) border border-(--accent)",
                                                            style: {
                                                                height: `${Math.max(2, Math.round(v / max * scale))}px`
                                                            },
                                                            "aria-label": `${v} tickets`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                            lineNumber: 271,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pointer-events-none absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-card border border-border text-xs px-2 py-1 rounded shadow",
                                                            style: {
                                                                bottom: "100%",
                                                                marginBottom: 8
                                                            },
                                                            children: [
                                                                v,
                                                                " ticket",
                                                                v === 1 ? "" : "s"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[12px] text-muted",
                                                            children: volume.labels[i]
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                            lineNumber: 265,
                                            columnNumber: 17
                                        }, this);
                                    })(),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-accent font-medium",
                                                children: volume.values[volume.values.length - 1] ?? 0
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                lineNumber: 291,
                                                columnNumber: 15
                                            }, this),
                                            " today"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                        lineNumber: 290,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium",
                                        children: "Recent Support Activity"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "text-xs text-muted hover:underline",
                                        href: "/tickets",
                                        children: "See all activities"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                        lineNumber: 298,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 space-y-4",
                                children: activities.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: a.href,
                                        className: "rounded-lg border border-border p-3 block hover:bg-card2/40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium",
                                                        children: [
                                                            "Ticket ",
                                                            a.id
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "tag",
                                                        children: a.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                lineNumber: 303,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 text-sm",
                                                children: a.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                lineNumber: 307,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 flex flex-wrap gap-2",
                                                children: a.tags.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                                        label: t
                                                    }, t, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                lineNumber: 308,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "muted mt-2",
                                                children: a.excerpt
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 text-xs text-muted",
                                                children: [
                                                    a.author,
                                                    " • ",
                                                    a.time
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, a.id, true, {
                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-medium",
                                children: "Ticket Status Board"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 324,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "text-xs text-muted hover:underline",
                                href: "/tickets",
                                children: "See all activities"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
                        children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-border bg-bg p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 text-sm font-medium",
                                        children: col.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: col.items.map((it, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: it.href,
                                                className: "card-muted p-3 block hover:bg-card2/40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium",
                                                        children: it.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "muted mt-1",
                                                        children: it.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 flex flex-wrap gap-2",
                                                        children: it.tags.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                                                label: t
                                                            }, t, false, {
                                                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 text-[11px] text-muted",
                                                        children: [
                                                            "Last Update: ",
                                                            it.date
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                                lineNumber: 333,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, col.title, true, {
                                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                                lineNumber: 329,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(protected)/dashboard/page.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/(protected)/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(protected)/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5f2400c7._.js.map