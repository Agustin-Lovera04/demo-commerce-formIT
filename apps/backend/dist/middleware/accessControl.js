"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessControl = void 0;
const accessControl = (access = []) => {
    return (req, res, next) => {
        access = access.map(permission => permission.toLowerCase());
        if (access.includes("public")) {
            return next();
        }
        const userRole = req.user?.role?.toLowerCase();
        if (!userRole || !access.includes(userRole)) {
            res.setHeader("Content-Type", "application/json");
            return res
                .status(404)
                .json({ error: `Acceso denegado - '${req.user?.role}' no puede realizar esta acción.` });
        }
        next();
    };
};
exports.accessControl = accessControl;
//# sourceMappingURL=accessControl.js.map