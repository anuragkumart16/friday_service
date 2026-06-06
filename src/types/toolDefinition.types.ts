import { z } from "zod";

export interface ToolDef {
    name: string
    description: string
    schema: z.ZodType<any>
}