import { createTRPCRouter } from "~/server/api/trpc";
import { 
  productsRouter, 
  branchesRouter,
  cartsRouter } from "~/server/api/routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  products: productsRouter,
  branches: branchesRouter,
  carts: cartsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
