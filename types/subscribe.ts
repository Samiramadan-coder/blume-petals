import z from "zod";

export const subscribeFormSchema = z.object({
  email: z.email(),
});

export type SubscribeFormValues = z.infer<typeof subscribeFormSchema>;
