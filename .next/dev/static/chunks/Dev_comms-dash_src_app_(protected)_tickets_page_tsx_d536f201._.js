(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TicketsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const seedTickets = [
    {
        id: "#245366",
        name: "Cameron Williamson",
        email: "jackson.graham@example.com",
        subject: "Wu qisjs fix",
        category: "Bug",
        status: "In Progress",
        priority: "High",
        created: "2 hours ago"
    },
    {
        id: "#245368",
        name: "Wade Warren",
        email: "jackson.graham@example.com",
        subject: "Ghdnu gljaw ouek",
        category: "Support",
        status: "In Progress",
        priority: "Normal",
        created: "5 hours ago"
    },
    {
        id: "#245370",
        name: "Guy Hawkins",
        email: "debra.holt@example.com",
        subject: "dsgtr ho",
        category: "Support",
        status: "Closed",
        priority: "High",
        created: "Jun 27, 2023"
    },
    {
        id: "#243678",
        name: "Jane Cooper",
        email: "willie.jennings@example.com",
        subject: "Ghdnu gljaw ouek",
        category: "Bug",
        status: "On Hold",
        priority: "Medium",
        created: "Jan 02, 2023 - 08:55"
    },
    {
        id: "#245380",
        name: "Brooklyn Simmons",
        email: "bill.sanders@example.com",
        subject: "Ghdnu gljaw ouek",
        category: "Support",
        status: "Closed",
        priority: "High",
        created: "Jan 03, 2023 - 14:45"
    },
    {
        id: "#245381",
        name: "Wade Warren",
        email: "sara.cruz@example.com",
        subject: "Wu qisjs fix",
        category: "Bug",
        status: "Closed",
        priority: "Normal",
        created: "Dec 18, 2022 - 19:25"
    },
    {
        id: "#245382",
        name: "Robert Fox",
        email: "tanya.hill@example.com",
        subject: "dgf sdgf ds",
        category: "General",
        status: "Closed",
        priority: "Normal",
        created: "Dec 18, 2022 - 22:30"
    },
    {
        id: "#245383",
        name: "Albert Flores",
        email: "nathan.roberts@example.com",
        subject: "Ghdnu gljaw ouek",
        category: "Products",
        status: "On Hold",
        priority: "Medium",
        created: "Dec 17, 2022 - 07:10"
    },
    {
        id: "#245384",
        name: "Jacob Jones",
        email: "sara.cruz@example.com",
        subject: "Wu qisjs fix",
        category: "Bug",
        status: "Closed",
        priority: "Normal",
        created: "Dec 16, 2022 - 11:22"
    },
    {
        id: "#223597",
        name: "Jerome Bell",
        email: "bill.sanders@example.com",
        subject: "Ghdnu gljaw ouek",
        category: "General",
        status: "Closed",
        priority: "Normal",
        created: "Dec 15, 2022 - 12:50"
    },
    {
        id: "#245677",
        name: "Wade Warren",
        email: "sara.cruz@example.com",
        subject: "Wu qisjs fix",
        category: "Bug",
        status: "Closed",
        priority: "Normal",
        created: "Dec 15, 2022 - 15:45"
    },
    {
        id: "#245678",
        name: "Robert Fox",
        email: "tanya.hill@example.com",
        subject: "Ghdnu gljaw ouek",
        category: "Products",
        status: "On Hold",
        priority: "High",
        created: "Dec 12, 2022 - 07:35"
    },
    {
        id: "#245645",
        name: "Albert Flores",
        email: "nathan.roberts@example.com",
        subject: "Ghdnu gljaw ouek",
        category: "Products",
        status: "On Hold",
        priority: "Medium",
        created: "Dec 12, 2022 - 17:25"
    },
    {
        id: "#245609",
        name: "Jacob Jones",
        email: "sara.cruz@example.com",
        subject: "Wu qisjs fix",
        category: "Bug",
        status: "Closed",
        priority: "Normal",
        created: "Dec 10, 2022 - 08:10"
    },
    {
        id: "#223507",
        name: "Jerome Bell",
        email: "bill.sanders@example.com",
        subject: "Ghdnu gljaw ouek",
        category: "General",
        status: "Closed",
        priority: "High",
        created: "Dec 09, 2022 - 16:00"
    }
];
function StatusBadge({ status }) {
    const map = {
        "In Progress": {
            bg: "bg-amber-50 border-amber-200 text-amber-700",
            dot: "bg-amber-500"
        },
        Closed: {
            bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
            dot: "bg-emerald-500"
        },
        "On Hold": {
            bg: "bg-rose-50 border-rose-200 text-rose-700",
            dot: "bg-rose-500"
        },
        Open: {
            bg: "bg-cyan-50 border-cyan-200 text-cyan-700",
            dot: "bg-cyan-500"
        }
    };
    const cfg = map[status];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: [
            "badge",
            cfg.bg
        ].join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: [
                    "h-2 w-2 rounded-full",
                    cfg.dot
                ].join(" ")
            }, void 0, false, {
                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            status
        ]
    }, void 0, true, {
        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
function Pill({ label, tone = "muted" }) {
    const tones = {
        muted: "bg-card2 text-muted",
        green: "bg-emerald-50 text-emerald-700",
        amber: "bg-amber-50 text-amber-700",
        sky: "bg-sky-50 text-sky-700"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: [
            "tag border border-border",
            tones[tone]
        ].join(" "),
        children: label
    }, void 0, false, {
        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
        lineNumber: 69,
        columnNumber: 10
    }, this);
}
_c1 = Pill;
function TicketsPage() {
    _s();
    const [perPage, setPerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(15);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Tickets");
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TicketsPage.useMemo[filtered]": ()=>filter === "All Tickets" ? seedTickets : seedTickets.filter({
                "TicketsPage.useMemo[filtered]": (t)=>t.status === filter
            }["TicketsPage.useMemo[filtered]"])
    }["TicketsPage.useMemo[filtered]"], [
        filter
    ]);
    const items = filtered.slice(0, perPage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-muted",
                                children: "Entries Per Page"
                            }, void 0, false, {
                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "h-8 rounded-md border border-border bg-card px-2 text-sm outline-none",
                                value: perPage,
                                onChange: (e)=>setPerPage(Number(e.target.value)),
                                children: [
                                    10,
                                    15,
                                    25,
                                    50
                                ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: n,
                                        children: n
                                    }, n, false, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: "h-8 rounded-md border border-border bg-card px-2 text-sm outline-none",
                            value: filter,
                            onChange: (e)=>setFilter(e.target.value),
                            children: [
                                "All Tickets",
                                "Open",
                                "In Progress",
                                "Closed",
                                "On Hold"
                            ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: v,
                                    children: v
                                }, v, false, {
                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-border bg-bg shadow-sm overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full text-left text-[13px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-indigo-50/60 text-muted",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-border/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    className: "h-4 w-4 accent-accent",
                                                    "aria-label": "Select all"
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 116,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-3 font-medium",
                                                children: "S.No"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-3 font-medium",
                                                children: "Ticket ID"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-3 font-medium",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-3 font-medium",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 122,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-3 font-medium",
                                                children: "Subject"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-3 font-medium",
                                                children: "Category"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-3 font-medium",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-3 font-medium",
                                                children: "Priority"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-right font-medium",
                                                children: "Created"
                                            }, void 0, false, {
                                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: items.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-t border-border hover:bg-card2/40",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2 align-middle",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        className: "h-4 w-4 accent-accent",
                                                        "aria-label": `Select ${t.id}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                        lineNumber: 134,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle text-muted",
                                                    children: String(i + 1).padStart(2, "0")
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle",
                                                    children: t.id
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle",
                                                    children: t.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle text-muted",
                                                    children: t.email
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle text-muted",
                                                    children: t.subject
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                        label: t.category
                                                    }, void 0, false, {
                                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 58
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                        status: t.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 58
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-2 align-middle",
                                                    children: [
                                                        t.priority === "High" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                            label: "High",
                                                            tone: "amber"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 47
                                                        }, this),
                                                        t.priority === "Medium" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                            label: "Medium",
                                                            tone: "sky"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                            lineNumber: 145,
                                                            columnNumber: 49
                                                        }, this),
                                                        t.priority === "Normal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                            label: "Normal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-2 align-middle text-right text-muted",
                                                    children: t.created
                                                }, void 0, false, {
                                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, t.id, true, {
                                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "Showing 1 to ",
                                    items.length,
                                    " of ",
                                    300
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-2 py-1 text-muted hover:text-text",
                                        children: "Previous"
                                    }, void 0, false, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium text-white",
                                        children: "01"
                                    }, void 0, false, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-md border border-border bg-card2 px-2 py-1 text-xs text-muted",
                                        children: "02"
                                    }, void 0, false, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-md border border-border bg-card2 px-2 py-1 text-xs text-muted",
                                        children: "03"
                                    }, void 0, false, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-2 py-1 text-muted hover:text-text",
                                        children: "Next"
                                    }, void 0, false, {
                                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Dev/comms-dash/src/app/(protected)/tickets/page.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(TicketsPage, "0dgGwh+53DE4N36GV9c2PBiYpSg=");
_c2 = TicketsPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "StatusBadge");
__turbopack_context__.k.register(_c1, "Pill");
__turbopack_context__.k.register(_c2, "TicketsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Dev_comms-dash_src_app_%28protected%29_tickets_page_tsx_d536f201._.js.map