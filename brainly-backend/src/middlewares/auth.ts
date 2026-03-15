import { clerkMiddleware, requireAuth, getAuth } from "@clerk/express";

// Global middleware — attach to app.use() in index.ts
export { clerkMiddleware, requireAuth, getAuth };