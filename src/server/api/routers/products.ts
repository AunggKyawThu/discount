import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      take: 100,
    });

    return products;
  }),

  getProductsByIndustry: publicProcedure
    .input(z.object({ industryId: z.string() }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        where: { industryId: input.industryId },
      });

      if (!products) throw new TRPCError({ code: "NOT_FOUND" });

      return products;
    }),
  deleteByCode: publicProcedure
    .input(
      z.object({
        code: z.string().min(1).max(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.deleteMany({
        where: {
          code: input.code,
        },
      });
      return product;
    }),
  create: publicProcedure
    .input(
      z.object({
        industryId: z.string(),
        code: z.string().min(1).max(10),
        brand: z.string().min(1).max(10),
        description: z.string().min(1).max(100),
        imageSrc: z.string().url(),
        salePrice: z.number().multipleOf(0.01),
        costPrice: z.number().multipleOf(0.01),
        unit: z.string().min(2).max(5),
        packing: z.string().min(1).max(10),
        status: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.create({
        data: {
          industryId: input.industryId,
          code: input.code,
          brand: input.brand,
          description: input.description,
          imageSrc: input.imageSrc,
          salePrice: input.salePrice,
          costPrice: input.costPrice,
          unit: input.unit,
          packing: input.packing,
          status: input.status,
        },
      });
      return product;
    }),
  update: publicProcedure
    .input(
      z.object({
        industryId: z.string(),
        code: z.string().min(1).max(10),
        brand: z.string().min(1).max(10),
        description: z.string().min(1).max(100),
        imageSrc: z.string().url(),
        salePrice: z.number().multipleOf(0.01),
        costPrice: z.number().multipleOf(0.01),
        unit: z.string().min(2).max(5),
        packing: z.string().min(1).max(10),
        status: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.update({
        where: { code: input.code },
        data: {
          industryId: input.industryId,
          code: input.code,
          brand: input.brand,
          description: input.description,
          imageSrc: input.imageSrc,
          salePrice: input.salePrice,
          costPrice: input.costPrice,
          unit: input.unit,
          packing: input.packing,
          status: input.status,
        },
      });
      return product;
    }),
});
