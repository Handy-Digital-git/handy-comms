module.exports = [
"[project]/Dev/comms-dash/src/app/favicon.ico.mjs { IMAGE => \"[project]/Dev/comms-dash/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Dev/comms-dash/src/app/favicon.ico.mjs { IMAGE => \"[project]/Dev/comms-dash/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Dev/comms-dash/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Dev/comms-dash/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Dev/comms-dash/src/app/(protected)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Dev/comms-dash/src/app/(protected)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TicketsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
;
;
function StatusBadge({ status }) {
    const map = {
        "In Progress": {
            bg: "bg-amber-50 border text-amber-700 border-amber-200",
            dot: "bg-amber-500"
        },
        Closed: {
            bg: "bg-emerald-50 border text-emerald-700 border-emerald-200",
            dot: "bg-emerald-500"
        },
        "On Hold": {
            bg: "bg-rose-50 border text-rose-700 border-rose-200",
            dot: "bg-rose-500"
        },
        Open: {
            bg: "bg-cyan-50 border text-cyan-700 border-cyan-200",
            dot: "bg-cyan-500"
        }
    };
    const key = status ?? "Open";
    const cfg = map[key] ?? map.Open;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: [
            "badge",
            cfg.bg
        ].join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: [
                    "h-2 w-2 rounded-full",
                    cfg.dot
                ].join(" ")
            }, void 0, false, {
                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            status ?? "N/A"
        ]
    }, void 0, true, {
        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function Pill({ label, tone = "muted" }) {
    const tones = {
        muted: "bg-card2 text-muted",
        green: "bg-emerald-50 text-emerald-700",
        amber: "bg-amber-50 text-amber-700",
        sky: "bg-sky-50 text-sky-700"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: [
            "tag border border-border",
            tones[tone]
        ].join(" "),
        children: label
    }, void 0, false, {
        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, this);
}
function formatTicketNo(n) {
    if (n == null || isNaN(n)) return "N/A";
    if (n < 10000) return `#${String(n).padStart(4, "0")}`;
    return `#${n}`;
}
function val(s) {
    return s && String(s).trim() ? String(s) : "N/A";
}
// Temporary front-end category until AI classification is added
function computeCategory(_r) {
    // Placeholder logic; always show N/A for now
    return "N/A";
}
// Temporary front-end status until AI / workflow is added
function computeStatus(_r) {
    return "Open"; // default
}
// Humanization helpers
function toTitle(str) {
    return str.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().toLowerCase().replace(/\b\w/g, (c)=>c.toUpperCase());
}
function formatApp(app) {
    const raw = val(app);
    if (raw === "N/A") return raw;
    const key = String(app).trim().toLowerCase();
    const map = {
        "collections_app": "Collections App",
        "lending_app": "Lending App"
    };
    return map[key] ?? toTitle(String(app));
}
function formatLocation(page) {
    const raw = val(page);
    if (raw === "N/A") return raw;
    const key = String(page).trim().toLowerCase();
    const map = {
        "customer_details": "Customer Details",
        "loans": "Loans"
    };
    return map[key] ?? toTitle(String(page));
}
function formatPhone(phone) {
    const raw = val(phone);
    if (raw === "N/A") return raw;
    let p = String(phone).replace(/[^\d+]/g, "");
    if (p.startsWith("+44")) return p;
    if (p.startsWith("44")) return "+" + p; // add leading +
    if (p.startsWith("0")) return "+44" + p.slice(1);
    if (p.startsWith("+")) return p; // some other E.164 already
    return "+44" + p; // default prefix
}
function pad(n) {
    return n.toString().padStart(2, "0");
}
function formatCreated(iso) {
    const raw = val(iso);
    if (raw === "N/A") return raw;
    const d = new Date(String(iso));
    if (isNaN(d.getTime())) return raw;
    const now = new Date();
    const dd = pad(d.getDate());
    const mm = pad(d.getMonth() + 1);
    const yyyy = d.getFullYear();
    const hh = pad(d.getHours());
    const min = pad(d.getMinutes());
    const sameDay = (a, b)=>a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (sameDay(d, now)) return `Today ${hh}:${min}`;
    if (sameDay(d, yesterday)) return `Yesterday ${hh}:${min}`;
    return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
}
async function TicketsPage() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const selectCols = "ticket_no, submitted_by_name, submitted_by_email, phone, app, page, priority, created_at, reason";
    const { data, error } = await supabase.from("contact_requests").select(selectCols).eq("reason", "IT").order("created_at", {
        ascending: false
    }).limit(200);
    const items = data ?? [];
    // Debug info to diagnose empty results
    const { count: totalTickets } = await supabase.from("contact_requests").select("*", {
        count: "exact",
        head: true
    });
    const { count: totalIT } = await supabase.from("contact_requests").select("*", {
        count: "exact",
        head: true
    }).eq("reason", "IT");
    const { data: sampleReasons } = await supabase.from("contact_requests").select("reason").limit(5);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-semibold",
                    children: "IT Tickets"
                }, void 0, false, {
                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-muted px-4 py-3 text-sm text-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "No IT tickets found."
                    }, void 0, false, {
                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1",
                        children: [
                            "Debug — total: ",
                            totalTickets ?? 0,
                            ", IT exact: ",
                            totalIT ?? 0,
                            error ? `, error: ${error.message}` : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this),
                    sampleReasons && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1",
                        children: [
                            "Reason samples: ",
                            sampleReasons.map((r)=>r.reason ?? "null").join(", ")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                        lineNumber: 164,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                lineNumber: 160,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full rounded-xl border border-border bg-bg shadow-sm overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full table-auto text-left text-[13px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-(--accent)/10 text-accent",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-(--accent)/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    className: "h-4 w-4 accent-accent",
                                                    "aria-label": "Select all"
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-5 text-[14px] font-semibold",
                                                children: "Ticket Number"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-5 text-[14px] font-semibold",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 178,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-5 text-[14px] font-semibold",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 179,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-5 text-[14px] font-semibold",
                                                children: "Phone"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 180,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-5 text-[14px] font-semibold",
                                                children: "App"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-5 text-[14px] font-semibold",
                                                children: "Location of Problem"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 182,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-5 text-[14px] font-semibold",
                                                children: "Category"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-5 text-[14px] font-semibold",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-5 text-[14px] font-semibold",
                                                children: "Priority"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-5 text-right text-[14px] font-semibold",
                                                children: "Created"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: items.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-t border-border hover:bg-card2/40",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2 align-middle",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        className: "h-4 w-4 accent-accent",
                                                        "aria-label": `Select ${t.ticket_no ?? i}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle",
                                                    children: formatTicketNo(t.ticket_no)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle truncate",
                                                    children: val(t.submitted_by_name)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle text-muted truncate",
                                                    children: val(t.submitted_by_email)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle text-muted truncate",
                                                    children: formatPhone(t.phone)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle text-muted truncate",
                                                    children: formatApp(t.app)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle text-muted truncate",
                                                    children: formatLocation(t.page)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                        label: computeCategory(t)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 58
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                        status: computeStatus(t)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 58
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle",
                                                    children: [
                                                        val(t.priority) === "High" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                            label: "High",
                                                            tone: "amber"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 52
                                                        }, this),
                                                        val(t.priority) === "Medium" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                            label: "Medium",
                                                            tone: "sky"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                            lineNumber: 205,
                                                            columnNumber: 54
                                                        }, this),
                                                        val(t.priority) === "Normal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                            label: "Normal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                            lineNumber: 206,
                                                            columnNumber: 54
                                                        }, this),
                                                        ![
                                                            "High",
                                                            "Medium",
                                                            "Normal"
                                                        ].includes(val(t.priority)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                            label: val(t.priority)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 81
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2 align-middle text-right text-muted",
                                                    children: formatCreated(t.created_at)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, `${t.ticket_no ?? i}-${t.created_at ?? ""}`, true, {
                                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "Showing ",
                                    items.length,
                                    " IT tickets"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-2 py-1 text-muted hover:text-text",
                                        children: "Previous"
                                    }, void 0, false, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-md border border-border bg-card2 px-2 py-1 text-xs text-muted",
                                        children: "01"
                                    }, void 0, false, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-md border border-border bg-card2 px-2 py-1 text-xs text-muted",
                                        children: "02"
                                    }, void 0, false, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-2 py-1 text-muted hover:text-text",
                                        children: "Next"
                                    }, void 0, false, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
}),
"[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__aa14148b._.js.map