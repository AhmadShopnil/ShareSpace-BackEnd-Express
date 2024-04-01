"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    var _a;
    let zodMessage = "";
    (_a = err.issues) === null || _a === void 0 ? void 0 : _a.forEach((issue) => {
        zodMessage = zodMessage + " " + issue.message;
    });
    const formatedIssues = err.issues.reduce((transformedIssues, issue) => {
        const field = issue.path[0];
        const message = issue.message;
        transformedIssues.push({ field, message });
        return transformedIssues;
    }, []);
    return {
        zodMessage,
        formatedIssues,
    };
};
exports.default = handleZodError;
