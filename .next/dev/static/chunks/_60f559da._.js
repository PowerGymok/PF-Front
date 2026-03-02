(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/utils/PathRoutes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PATHROUTES",
    ()=>PATHROUTES
]);
var PATHROUTES = /*#__PURE__*/ function(PATHROUTES) {
    PATHROUTES["HOME"] = "/home";
    PATHROUTES["ABOUT"] = "/about";
    PATHROUTES["WORKOUTS"] = "/workouts";
    PATHROUTES["BOOKING"] = "/booking";
    PATHROUTES["MEMBERSHIPS"] = "/memberships";
    PATHROUTES["REGISTER"] = "/register";
    PATHROUTES["LOGIN"] = "/login";
    PATHROUTES["DASHBOARD"] = "/dashboard";
    return PATHROUTES;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/NavItems.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavItems",
    ()=>NavItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/PathRoutes.ts [app-client] (ecmascript)");
;
const NavItems = [
    {
        id: 1,
        nameToRender: "Home",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATHROUTES"].HOME
    },
    {
        id: 2,
        nameToRender: "About",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATHROUTES"].ABOUT
    },
    {
        id: 3,
        nameToRender: "Clases",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATHROUTES"].WORKOUTS
    },
    {
        id: 4,
        nameToRender: "Agendar",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATHROUTES"].BOOKING
    },
    {
        id: 5,
        nameToRender: "Membresias",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATHROUTES"].MEMBERSHIPS
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    dataUser: null,
    setDataUser: ()=>{},
    logOut: ()=>{},
    userInitial: null,
    isLoading: false,
    isProfileComplete: true,
    setIsProfileComplete: ()=>{}
});
const AuthProvider = ({ children })=>{
    _s();
    const [dataUser, setDataUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isProfileComplete, setIsProfileComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            try {
                const stored = localStorage.getItem("userSession");
                if (stored) {
                    const parsedData = JSON.parse(stored);
                    if (parsedData && parsedData.user) {
                        setDataUser(parsedData);
                    }
                }
            } catch (error) {
                console.error("Error loading stored user:", error);
                localStorage.removeItem("userSession");
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (dataUser) {
                localStorage.setItem("userSession", JSON.stringify(dataUser));
            }
        }
    }["AuthProvider.useEffect"], [
        dataUser
    ]);
    const logOut = ()=>{
        setDataUser(null);
        localStorage.removeItem("userSession");
    };
    const userInitial = dataUser?.user?.email ? dataUser.user.email.charAt(0).toUpperCase() : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            dataUser,
            setDataUser,
            logOut,
            userInitial,
            isLoading,
            isProfileComplete,
            setIsProfileComplete
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/contexts/AuthContext.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "Bt4Vv4oMAEcllLxNyGJddGBmNQc=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
};
_s1(useAuth, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/GymLogoComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    LOGO COMPONENT
  - Renderiza el logo corporativo en formato SVG.
  - Usa fill="currentColor" para adaptarse al color de texto del contenedor.
  - Props: acepta cualquier atributo estándar de <svg> (ej. width, height, className).
*/ __turbopack_context__.s([
    "GymLogoComponent",
    ()=>GymLogoComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function GymLogoComponent(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 183.99 81.43",
        fill: "currentColor",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M104.99,15.43v.4c-1.2.7-2.3,1.5-3.6,2.2-.9.5-1.1,1.2-.5,2,1.7-1.9,4.4-2.7,5.2-5.6.9,1.3,1.7.8,2.5.5,2.4-1.1,4.8-1.7,7.5-1.8,1.8,0,3.3.4,4.7,1.5,1.9,1.4,2.5,3.8,1.6,6-1.4,3.4-3.9,5.9-6.6,8.2-2.5,2.3-5.1,4.4-7.8,6.7,1.9,1.5,3.8,3.1,5.8,4.6,3.4,2.8,6.9,5.5,10.3,8.3.5.4.7,1.2,1.1,1.9-.4,0-.6.2-.9.2.8.7,1.5,1.3,2.1,2v.2h-.7c-2.6-1.3-5.4-2.5-7.9-4.1-3.8-2.4-7.4-5.1-11-7.7-.2-.2-.4-.3-.8-.6-.2.5-.3,1-.4,1.5-.7,3.7-1.3,7.3-1.9,11,0,.5-.2.9-1,1.1-1,.3-1.7,1.3-2.6,2-.3.2-.5.6-.8.9-1-1.9-.8-3.7-.4-5.5.2-1.2.4-2.5.6-4-.9.3-1.8.6-2.3.8v1.1c0,.2-.2.5-.3.7-.4,1-.8,1.8-2,2.3-1.9.7-3.8,1.6-5.6,2.5-2,1-3.9,2.2-5.8,3.4-.4.3-.6.9-.9,1.2-.2.2-.7.6-.7.5-.9-.9-2.6-.3-3.2-1.9-.2-.4-.9-.6-1.4-1-.3-1,.3-1.5,1.1-2,.3-.2.7-.6.8-1,.8-4.7,1.6-9.4,2.4-14.2v-.6c-.7,0-1.4,0-1.3-1.1,0-.2-.6-.4-.9-.6-.2,0-.4-.2-.7-.2.2-.3.2-.7.5-.8.9-.5,1.8-.9,2.7-1.5.4-.3.9-.8,1-1.2.6-2.3,1.1-4.6,1.6-6.8-.7-.5-1.2-.9-2-1.4h-1c.4-1.4.9-2.6,2.3-3,1.2-.4,2-1,2.2-2.4.2-1.2,1-1.4,2.2-.7.8.5,1.6.4,2.4,0,4-1.3,7.9-2.6,11.9-3.9.8-.2,1.6-.2,2.5-.3h0v.2h0ZM100.19,20.93h-.4c-3.2,1.2-6.4,2.5-9.6,3.7-.2.1-.6.4-.6.6-.4,2.2-.8,4.4-1.2,6.9,3.7-1.1,7.1-2.5,10.7-2.8v.3c-.4.2-.8.4-1.2.6.2.1.3.3.5.5-1.2.6-2.4,1.1-3.5,1.6v.2h1.6l.2.4c-1.6.8-3.1,1.7-4.7,2.4-1.4.6-2.8,1.1-4.2,1.7-.3,0-.6.5-.7.8-.9,3.7-1.8,7.3-2.6,11-.2.9-.2,1.9-.3,2.9,2.1-.9,4-1.9,5.9-2.6,2.8-1,5.7-1.9,8.6-2.8.5-.2.9-.3,1-1,.2-2,.6-3.9.9-5.9.2-.9.5-1.9.3-2.8-.2-1.2-.2-2.3.7-3.2h0c.7-3.6,1.3-7.2,2-10.7l-.2-.2c-1.1.8-2.2,1.6-3.5,2.6.2-.6.2-.9.3-1.2-.3,0-.6.1-.8.2.2-1.1.3-2.1.5-3.2h.3ZM107.59,29.83s.3.1.4.2c2.4-2.2,4.9-4.4,7.2-6.7,1.2-1.2,2.2-2.7,3.1-4.2.6-1,.3-1.5-.9-1.6h-.8c-2.1.5-4.3,1-6.4,1.5-.8.2-1,.6-1,1.4s0,1.6-.2,2.4c-.4,2.4-.9,4.8-1.4,7.1h0v-.1Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/GymLogoComponent.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M151.89,41.83h-.1c-1.6-.2-1.6,0-2.4,1.8-.7,1.4-1.8,2.7-2.9,3.9v-.7l3-12s0-.2.1-.3c.4-1.2.8-2.5,1.2-3.7v-.3c-.7-1.8-1.4-3.6-2.2-5.4-.3.1-.5.2-.8.4,0,1.1,0,1.2-1.2,1.7-.9.3-1.6.7-1.4,1.8,0,.4-.2,1-.3,1.4-1.5,6.5-2.9,13-4.4,19.5-.5,2.2-1,4.4-1.5,6.6,0,.3-.2.5-.3.8h-.3v-3.4c-.3.4-.4.7-.6,1-.4-1-.7-1.9-1.1-2.9-.3.4-.5.6-.9,1-.2-4,1-7.6,1-11.4-.9.9-1.7,1.9-2.7,2.8-2.2,2-4.7,3.1-7.7,2.3-2.6-.7-4.4-2.3-5.2-5-1.6-5.4-.7-10.6,1.1-15.7,2.6-7.1,6-13.8,10.7-19.8,1.4-1.8,3.1-3.4,4.8-4.8,2-1.6,4.2-1.8,6.7-.9,1.2.5,1.9,1.4,1.9,2.6.2,2.8-.3,5.3-2.2,7.6-.6.7-.8,1.6-1.3,2.4-.5.9-1.4,1.3-2.2.9-.6-.3-1-.8-.8-1.6.5-1.4,1-2.8,1.4-4.2.3-1,.4-2,.6-3.2-1.8.7-2.8,1.8-3.7,2.9-3.5,4.4-6.1,9.3-8.2,14.4-1.1,2.8-2.3,5.7-3,8.6-.6,2.3-.6,4.8-.7,7.2,0,1,.5,2,.9,2.9.5,1,1.2,1.2,2.3.6,2.8-1.5,4.9-3.9,6.8-6.3.6-.8,1.2-1.6,1.7-2.4.3-.5.5-1.1.7-1.7,0,0-.1-.2-.2-.2-1.1.4-2.1.8-3.2,1.2-1.4.5-1.8.4-2.6-.7-.2-.2-.4-.4-.6-.6-.3-.4-.8-.8-.7-1.1,0-.4.4-.9.8-1.1,2.9-1.3,5.9-2.6,8.9-3.8,1.8-.8,3.7-1.4,5.6-2.1.7-.2.8-.6.6-1.3-.5-1.7-1-3.4-1.5-5.1-.2-.6-.3-1.3-.3-1.9.1-1.7.3-1.5,1.8-1.3,2,.1,2.5,1.2,2.9,2.9.8,2.9,1.8,5.8,2.9,9,.9-2,1.6-3.8,2.5-5.5,1.9-3.7,3.8-7.4,5.8-11.2.3-.6.8-1.2,1.3-1.7.1,0,.4-.2.8-.3-.3.9-.5,1.7-.7,2.4h.2c.7-1.2,1.5-2.5,2.4-4,.1.4.2.6.2.8s0,.3-.1.7c.4-.4.6-.7,1-1.1,0,.5,0,.7-.1.8-.7,2-1.5,4-2.3,6-.8,2.1-1.5,4.2-2.7,6.1-1.5,2.5-2.6,5.1-3.9,7.6-2.2,4.2-3.3,8.8-4.4,13.4-.2,1-.7,1.8-1,2.8h-.2v-.1Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/GymLogoComponent.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6.79,77.33c0-.3-.2-.6,0-.6-.6.6-1.2,1.6-2,2.1s-1.1,1-1.4,1.8c0,.3-.5.5-.8.8,0-.3-.3-.7-.2-1,.5-3.2,1-6.4,1.5-9.6.8-5.1,1.5-10.2,2.3-15.2.6-3.8,1.5-7.5,2.2-11.3.9-4.9,1.7-9.7,2.5-14.6v-.7c-2.3,1.4-4.4,2.7-6.5,4-1.5,1-2,1-3-.5-.6-.8-1.7-1.4-1.3-2.6.2-.5.4-1.2.9-1.5,6.6-4.5,13.9-7.3,21.8-8.1,3.6-.4,7.4-.2,10.4,2.4,2.4,2.1,3.3,4.9,2.7,8-.7,3.6-2.4,6.7-4.5,9.6-4,5.7-8.9,10.3-14.3,14.6-1,.8-2.1,1-3.2,1.2-1.6.2-1.9.5-2.2,2-.5,2.3-1.1,4.6-1.6,7-.3,1.4-.3,2.9-.6,4.3-.5,2.7-1.2,5.3-1.8,7.9h-.9ZM12.89,50.73c.4-.2.6-.3.7-.4,5.7-4.2,10.6-9.3,14.5-15.2,1.2-1.8,2.4-3.8,2.6-6.1.1-1.4-.3-2.2-1.6-2.7-1.7-.7-3.5-1-5.4-.7-.9.1-1.9.5-2.7.3-2-.4-3.5,1-5.7,1.2,1.9,1.3,1.9,2.8,1.5,4.4-.3,1.3-.7,2.6-1,4-.9,4.2-1.8,8.3-2.6,12.5-.2.8-.2,1.7-.3,2.8h0v-.1Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/GymLogoComponent.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M51.49,29.23c.4.9.7,1.4,1.1,2.1,0-.6.2-1.1.2-1.5,2.2.6,2.1.6,2.2,2.7.2,5.4.3,10.8.5,16.2v1.1c.2-.3.3-.4.4-.5,1.5-3.7,2.9-7.4,4.3-11,.5-1.3.8-2.6,1.3-3.9.2-.5.8-1.1,1.4-1.3,1.9-.7,3.8.5,4,2.5.4,4,.7,8,1.1,12,0,.5,0,1,.3,1.6,3.7-11.1,6.8-22.4,12.6-32.7,0,.5-.2.9-.3,1.5.4-.6.7-1.1,1-1.7,0,0,.3.1.4.1-.3,1-.6,2.1-.8,3.1h0c1-2.2,1.9-4.4,2.9-6.7.2,0,.3,0,.4.1l-.5,2.3h0l.8-1.4h.2v.5c-1.4,3.8-2.8,7.6-4.1,11.5-2.1,6-4.1,12.1-6,18.2-1.6,5-3,10-4.5,15.1-.5,1.7-1,2-3,1.9-1.5,0-2.4-.8-2.7-2.2-.5-3-.9-6.1-1.4-9.1-.3-1.8-.5-3.7-.8-5.8-.6,1.3-1.1,2.3-1.5,3.4-1.7,4.7-3.4,9.4-5.1,14.2-.5,1.4-2.6,2-4.1,1.4-1.7-.7-1.9-2.1-1.9-3.6v-14.8c0-4.4.3-8.8.5-13.2,0-.6.5-1.3.9-2.1h.2Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/GymLogoComponent.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M179.49,35.13c-.5.4-.3,1.4-.7,1.8-.1,0-.3-.2-.4-.3-.1.7-.2,1.4-.4,2.1h-.3c0-.5-.1-1-.2-1.5h-.3c-.1-.2-.4-.4-.3-.7.1-2.3.3-4.7.5-7.1.2-3,.5-6,.6-9-.4,1.1-.9,2.2-1.3,3.2-1,2.5-2,5.1-2.9,7.7-.4,1-.9,1.8-2.1,1.7-1.6,0-2.6-.5-2.9-1.9-.6-2.4-1-4.8-1.5-7.3,0-.3-.1-.7-.4-1-.3,1.4-.6,2.9-1,4.3-.9,3.7-1.8,7.4-2.8,11.2-.1.5-.5.9-.7,1.3h-.4c-.1-.5-.3-1.1-.4-1.5-.9,2.2-1.9,4.6-2.8,7h-.2v-.6c.1-4,1.1-7.8,2-11.6,1.8-7.4,3.6-14.9,5.5-22.3.4-1.4.8-1.6,2.7-1.5,1.2,0,2,.6,2.1,1.9.3,3.2.4,6.4.6,9.6,0,1.3.3,2.5.4,3.8h.3c.9-2.3,1.9-4.6,2.8-6.9,1.5-3.8,2.9-7.5,4.3-11.3.3-.9.6-1.9,1.9-1.6,1.9.4,2.8,1.3,2.8,2.8s-.2,1.9-.3,2.8c-.5,4.9-1,9.8-1.6,14.6-.4,3.6-.8,7.2-1.2,10.7-.1.9-.8,1.4-1.2.9-.1,0-.2-.4-.2-.6v-.7h0Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/GymLogoComponent.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M49.09,43.93c0,3.3-1.4,6.1-2.7,8.9-.9,1.8-2,3.5-3,5.2-.2.3-.3.6-.5.9-1.1,3.4-3.3,5.7-6.5,7.4-2.1,1.1-3.8.9-5.7,0-2.4-1-3.1-3.1-3.5-5.5-.5-3.3.2-6.4,1-9.6,1.3-5,3.5-9.7,5.8-14.2.7-1.4,1.8-2.7,2.8-4,1-1.2,2.4-1.5,3.8-1.2.5,0,1,.6,1.5,1s.8,1,1.3,1.2c3.3,1.3,4.5,4.2,5.4,7.2.2.8.2,1.7.4,2.6h0l-.1.1ZM41.49,37.93c-.4.5-.6.8-.8,1.2-2.5,5-5,10.1-6.7,15.5-.7,2.3-1.4,4.6-.9,7,.2,1,.7,1.4,1.6.8.8-.6,1.7-1.3,2.2-2.2,2-3.9,3.9-7.8,5.1-12,.8-2.8.6-5.5.2-8.2,0-.6-.4-1.1-.8-1.9v-.2h.1Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/GymLogoComponent.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/GymLogoComponent.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = GymLogoComponent;
var _c;
__turbopack_context__.k.register(_c, "GymLogoComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/NavBarComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$NavItems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/NavItems.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/PathRoutes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GymLogoComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/GymLogoComponent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const NavBarComponent = ()=>{
    _s();
    const { dataUser, logOut, userInitial } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "w-full bg-black px-4 md:px-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between h-[70px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GymLogoComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GymLogoComponent"], {
                            className: "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                        }, void 0, false, {
                            fileName: "[project]/components/NavBarComponent.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/NavBarComponent.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsOpen(!isOpen),
                        className: "text-white md:hidden text-2xl",
                        children: "☰"
                    }, void 0, false, {
                        fileName: "[project]/components/NavBarComponent.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden md:flex gap-14 text-white text-md tracking-wide font-light",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$NavItems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavItems"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.route,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(" hover:text-gray-300 relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300", pathname === item.route && "after:w-full"),
                                children: item.nameToRender
                            }, item.id, false, {
                                fileName: "[project]/components/NavBarComponent.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/components/NavBarComponent.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex text-white gap-4",
                        children: dataUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATHROUTES"].DASHBOARD,
                                className: "w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center font-bold",
                                children: userInitial
                            }, void 0, false, {
                                fileName: "[project]/components/NavBarComponent.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATHROUTES"].LOGIN,
                            className: "text-md mr-4 hover:text-gray-300 relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300",
                            children: "Login"
                        }, void 0, false, {
                            fileName: "[project]/components/NavBarComponent.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/NavBarComponent.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/NavBarComponent.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden flex flex-col gap-4 pb-4 text-white uppercase text-md tracking-widest",
                children: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$NavItems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavItems"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.route,
                            onClick: ()=>setIsOpen(false),
                            className: "hover:text-gray-400",
                            children: item.nameToRender
                        }, item.id, false, {
                            fileName: "[project]/components/NavBarComponent.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-gray-700 pt-4",
                        children: dataUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATHROUTES"].DASHBOARD,
                                    onClick: ()=>setIsOpen(false),
                                    className: "block mb-2",
                                    children: [
                                        "Perfil (",
                                        userInitial,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/NavBarComponent.tsx",
                                    lineNumber: 87,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: logOut,
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/components/NavBarComponent.tsx",
                                    lineNumber: 94,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$PathRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATHROUTES"].LOGIN,
                            onClick: ()=>setIsOpen(false),
                            children: "Login"
                        }, void 0, false, {
                            fileName: "[project]/components/NavBarComponent.tsx",
                            lineNumber: 97,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/NavBarComponent.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/NavBarComponent.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/NavBarComponent.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(NavBarComponent, "QppMxJIMSm9ChnFbFH9uqfRiIYw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NavBarComponent;
const __TURBOPACK__default__export__ = NavBarComponent;
var _c;
__turbopack_context__.k.register(_c, "NavBarComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/decodeToken.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserIdFromToken",
    ()=>getUserIdFromToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jwt-decode/build/esm/index.js [app-client] (ecmascript)");
;
const getUserIdFromToken = (token)=>{
    try {
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jwtDecode"])(token);
        return decoded.sub;
    } catch  {
        return null;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/chat.services.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConversation",
    ()=>createConversation,
    "getMessagesByConversation",
    ()=>getMessagesByConversation,
    "getUserConversations",
    ()=>getUserConversations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const getUserConversations = async (userId, token)=>{
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3000")}/conversations/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error("Error obteniendo conversaciones");
    }
    return res.json();
};
const getMessagesByConversation = async (userId, conversationId, token)=>{
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3000")}/chat/conversations/${conversationId}/messages?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error("Error obteniendo mensajes");
    }
    return res.json();
};
const createConversation = async (coachId, token)=>{
    const res = await fetch(`${("TURBOPACK compile-time value", "http://localhost:3000")}/conversations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            coachId
        })
    });
    if (!res.ok) {
        throw new Error("Error creando conversación");
    }
    return res.json();
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/contexts/ChatContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatProvider",
    ()=>ChatProvider,
    "useChat",
    ()=>useChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$decodeToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/decodeToken.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$chat$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/chat.services.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const ChatContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const ChatProvider = ({ children })=>{
    _s();
    const { dataUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeConversation, setActiveConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const userId = dataUser?.token ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$decodeToken$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserIdFromToken"])(dataUser.token) : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatProvider.useEffect": ()=>{
            if (!dataUser?.token || !userId) return;
            const socketInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(`${("TURBOPACK compile-time value", "http://localhost:3000")}/chat`, {
                query: {
                    userId
                }
            });
            socketRef.current = socketInstance;
            socketInstance.on("connect", {
                "ChatProvider.useEffect": ()=>{
                    console.log("Conectado al chat");
                    setIsConnected(true);
                }
            }["ChatProvider.useEffect"]);
            socketInstance.on("disconnect", {
                "ChatProvider.useEffect": ()=>{
                    console.log("Desconectado del chat");
                    setIsConnected(false);
                }
            }["ChatProvider.useEffect"]);
            socketInstance.on("newMessage", {
                "ChatProvider.useEffect": (message)=>{
                    setMessages({
                        "ChatProvider.useEffect": (prev)=>[
                                ...prev,
                                message
                            ]
                    }["ChatProvider.useEffect"]);
                }
            }["ChatProvider.useEffect"]);
            socketInstance.on("connect_error", {
                "ChatProvider.useEffect": (err)=>{
                    console.error("Error socket:", err);
                }
            }["ChatProvider.useEffect"]);
            return ({
                "ChatProvider.useEffect": ()=>{
                    socketInstance.disconnect();
                }
            })["ChatProvider.useEffect"];
        }
    }["ChatProvider.useEffect"], [
        dataUser?.token,
        userId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatProvider.useEffect": ()=>{
            if (!dataUser?.token || !userId) return;
            const loadConversations = {
                "ChatProvider.useEffect.loadConversations": async ()=>{
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$chat$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserConversations"])(userId, dataUser.token);
                        setConversations(data);
                    } catch (error) {
                        console.error("Error cargando conversaciones:", error);
                    }
                }
            }["ChatProvider.useEffect.loadConversations"];
            loadConversations();
        }
    }["ChatProvider.useEffect"], [
        dataUser?.token,
        userId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatProvider.useEffect": ()=>{
            if (!activeConversation || !dataUser?.token || !userId) return;
            const loadMessages = {
                "ChatProvider.useEffect.loadMessages": async ()=>{
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$chat$2e$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMessagesByConversation"])(activeConversation.id, userId, dataUser.token);
                        setMessages(data);
                    } catch (error) {
                        console.error("Error cargando mensajes:", error);
                    }
                }
            }["ChatProvider.useEffect.loadMessages"];
            loadMessages();
        }
    }["ChatProvider.useEffect"], [
        activeConversation,
        dataUser?.token,
        userId
    ]);
    const sendMessage = (content)=>{
        if (!socketRef.current || !activeConversation) return;
        socketRef.current.emit("sendMessage", {
            conversationId: activeConversation.id,
            content
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatContext.Provider, {
        value: {
            conversations,
            activeConversation,
            messages,
            isConnected,
            setActiveConversation,
            sendMessage
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/contexts/ChatContext.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ChatProvider, "5dBV2VIYqaPcjjGu/PSEXZGlSC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ChatProvider;
const useChat = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ChatContext);
    if (!context) throw new Error("useChat debe usarse dentro de ChatProvider");
    return context;
};
_s1(useChat, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ChatProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/chat/componentes/BubbleMessages.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BubbleMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function BubbleMessage({ message, currentUserRole }) {
    const isMine = message.sender === currentUserRole;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex w-full mb-3 ${isMine ? "justify-end" : "justify-start"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `
          max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-md
          ${isMine ? "bg-gray-600 text-white rounded-br-sm" : "bg-gray-200 text-gray-800 rounded-bl-sm"}
        `,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm",
                    children: message.content
                }, void 0, false, {
                    fileName: "[project]/features/chat/componentes/BubbleMessages.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] mt-1 opacity-70 text-right",
                    children: message.createdAt
                }, void 0, false, {
                    fileName: "[project]/features/chat/componentes/BubbleMessages.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/features/chat/componentes/BubbleMessages.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/features/chat/componentes/BubbleMessages.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = BubbleMessage;
var _c;
__turbopack_context__.k.register(_c, "BubbleMessage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/chat/componentes/ChatWindow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatWindow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$chat$2f$componentes$2f$BubbleMessages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/chat/componentes/BubbleMessages.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ChatWindow() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: "1",
            content: "Hola En que podria ayudarte, soy la prueba de coach",
            sender: "coach",
            createdAt: "10:30"
        },
        {
            id: "2",
            content: "Me gustaria inscribirme",
            sender: "user",
            createdAt: "10:31"
        }
    ]);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentUserRole = "user";
    const sendMessage = ()=>{
        if (!newMessage.trim()) return;
        const message = {
            id: crypto.randomUUID(),
            content: newMessage,
            sender: currentUserRole,
            createdAt: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })
        };
        setMessages((prev)=>[
                ...prev,
                message
            ]);
        setNewMessage("");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatWindow.useEffect"], [
        messages
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-600 text-white p-4 font-semibold",
                children: "Coach PowerGym"
            }, void 0, false, {
                fileName: "[project]/features/chat/componentes/ChatWindow.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 bg-gray-100",
                children: [
                    messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$chat$2f$componentes$2f$BubbleMessages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            message: msg,
                            currentUserRole: currentUserRole
                        }, msg.id, false, {
                            fileName: "[project]/features/chat/componentes/ChatWindow.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/features/chat/componentes/ChatWindow.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/chat/componentes/ChatWindow.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: newMessage,
                        onChange: (e)=>setNewMessage(e.target.value),
                        placeholder: "Escribe un mensaje...",
                        className: "flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500",
                        onKeyDown: (e)=>e.key === "Enter" && sendMessage()
                    }, void 0, false, {
                        fileName: "[project]/features/chat/componentes/ChatWindow.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: sendMessage,
                        className: "bg-gray-600 text-white px-5 rounded-full hover:bg-blue-700 transition",
                        children: "Enviar"
                    }, void 0, false, {
                        fileName: "[project]/features/chat/componentes/ChatWindow.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/chat/componentes/ChatWindow.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/chat/componentes/ChatWindow.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(ChatWindow, "Gggn/Kntp7116COOBJjsYqBJ8DU=");
_c = ChatWindow;
var _c;
__turbopack_context__.k.register(_c, "ChatWindow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/chat/componentes/ChatFloating.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatFloating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$chat$2f$componentes$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/chat/componentes/ChatWindow.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ChatFloating() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(!open),
                className: "cursor-pointer fixed bottom-6 right-6 bg-gray-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-gray-800 transition z-50",
                children: "💬"
            }, void 0, false, {
                fileName: "[project]/features/chat/componentes/ChatFloating.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-24 right-6 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$chat$2f$componentes$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/features/chat/componentes/ChatFloating.tsx",
                    lineNumber: 21,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/chat/componentes/ChatFloating.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/chat/componentes/ChatFloating.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(ChatFloating, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = ChatFloating;
var _c;
__turbopack_context__.k.register(_c, "ChatFloating");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_60f559da._.js.map