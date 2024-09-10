import { z } from "zod";

export const StopsFormSchema = z.object({
  stops: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export const AirlinesFormSchema = z.object({
  airlines: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export const AirportsFormSchema = z.object({
  airports: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
