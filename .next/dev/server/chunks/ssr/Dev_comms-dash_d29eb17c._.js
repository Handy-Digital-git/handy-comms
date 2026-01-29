module.exports = [
"[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$$RSC_SERVER_ACTION_0",
    ()=>$$RSC_SERVER_ACTION_0,
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00c5481ed55c83861ecc7481916bce1322cfebc3e2":"$$RSC_SERVER_ACTION_0"},"",""] */ var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Dev/comms-dash/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
const $$RSC_SERVER_ACTION_0 = async function signOut() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    await supabase.auth.signOut();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_0, "00c5481ed55c83861ecc7481916bce1322cfebc3e2", null);
async function DashboardPage() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])(); // ✅ await here
    const { data } = await supabase.auth.getUser();
    var signOut = $$RSC_SERVER_ACTION_0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen p-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-semibold",
                            children: "Dashboard"
                        }, void 0, false, {
                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-gray-600",
                            children: [
                                "Logged in as: ",
                                data.user?.email
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    action: signOut,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "rounded-md border px-3 py-2 text-sm hover:bg-gray-50",
                        "aria-label": "Log out",
                        children: "Log out"
                    }, void 0, false, {
                        fileName: "[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/Dev/comms-dash/.next-internal/server/app/(protected)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/Dev/comms-dash/src/app/(protected)/layout.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$app$2f28$protected$292f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/src/app/(protected)/layout.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$app$2f28$protected$292f$dashboard$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx [app-rsc] (ecmascript)");
;
;
}),
"[project]/Dev/comms-dash/.next-internal/server/app/(protected)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/Dev/comms-dash/src/app/(protected)/layout.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00c5481ed55c83861ecc7481916bce1322cfebc3e2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$app$2f28$protected$292f$dashboard$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_0"],
    "00fa09645ab4e27803e617b44e17f124db9215d197",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$app$2f28$protected$292f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_0"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f2e$next$2d$internal$2f$server$2f$app$2f28$protected$292f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$app$2f28$protected$292f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$app$2f28$protected$292f$dashboard$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Dev/comms-dash/.next-internal/server/app/(protected)/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/Dev/comms-dash/src/app/(protected)/layout.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$app$2f28$protected$292f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/src/app/(protected)/layout.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Dev$2f$comms$2d$dash$2f$src$2f$app$2f28$protected$292f$dashboard$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Dev/comms-dash/src/app/(protected)/dashboard/page.tsx [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=Dev_comms-dash_d29eb17c._.js.map