import { query } from "@/convex/_generated/server";

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    console.log("get all users");
    return await ctx.db.query("users").collect();
  },
});
