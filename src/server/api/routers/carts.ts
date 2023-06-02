import { z } from 'zod';
import {
    createTRPCRouter, 
    publicProcedure 
} from "../trpc";

export const cartsRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                cart: z.string().min(1).max(10),
            })
        )
        .mutation(async ({ctx, input}) => {
            
        }),
})