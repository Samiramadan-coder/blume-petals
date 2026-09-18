"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { subscribe } from "@/lib/subscribe";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeFormSchema, SubscribeFormValues } from "@/types/subscribe";
import { Spinner } from "@/components/ui/spinner";

export default function SubscribeForm() {
  const t = useTranslations("AppFooter");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: SubscribeFormValues) => {
    const result = await subscribe(values);

    if (result.success) {
      toast.success(result.message);
      return;
    }

    if (result.success === false && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (!message) return;
        toast.error(message);
        setError(field as keyof SubscribeFormValues, {
          type: "server",
          message,
        });
      });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full max-w-sm overflow-hidden rounded-full border border-primary/30 bg-primary/10">
        <Input
          type="email"
          placeholder={t("EmailPlaceholder")}
          className="h-11 flex-1 border-0 bg-transparent px-5 text-[#e6dcd2] placeholder:text-[#e6dcd2]/60 focus-visible:ring-0"
          {...register("email")}
        />

        <Button
          type="submit"
          aria-label="Submit"
          className="h-11 rounded-full bg-primary text-foreground px-6"
        >
          {isSubmitting && <Spinner />} {t("Subscribe")}
        </Button>
      </div>
      <FieldError errors={[errors.email]} />
    </form>
  );
}
