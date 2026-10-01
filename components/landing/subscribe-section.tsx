"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { http } from "@/lib/http";
import CountUp from "react-countup";
import { Spinner } from "../ui/spinner";
import { FieldError } from "../ui/field";
import { useForm } from "react-hook-form";
import LandingTitle from "./landing-title";
import { subscribe } from "@/lib/subscribe";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as motion from "motion/react-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LandingSubtitle from "./landing-subtitle";
import { zodResolver } from "@hookform/resolvers/zod";
import { alternateX, reveal, stagger } from "@/lib/motion";
import { useLocale, useTranslations } from "next-intl";
import { subscribeFormSchema, SubscribeFormValues } from "@/types/subscribe";

type Stats = {
  average_rating: string;
  bouquets_designed: number;
  emirates_delivered: number;
  happy_customers: number;
  reviews_count: number;
};

export default function SubscribeSection() {
  const locale = useLocale();
  const t = useTranslations("LandingSubscribeSection");
  const numberLocale = locale === "ar" ? "ar-EG" : "en-US";
  const reduceMotion = useReducedMotion();
  const [statsData, setStatsData] = useState<Stats | null>(null);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await http.get<{ data: Stats }>("/api/v1/stats");
        setStatsData(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const stats = [
    {
      key: "BouquetsDesigned",
      end: statsData?.bouquets_designed ?? 0,
      suffix: "+",
    },
    {
      key: "AverageRating",
      end: parseFloat(statsData?.average_rating ?? "0"),
      decimals: 1,
      suffix: "★",
    },
    {
      key: "EmiratesDelivered",
      end: statsData?.emirates_delivered ?? 0,
    },
    {
      key: "HappyCustomers",
      end: statsData?.happy_customers ?? 0,
      suffix: "+",
    },
  ];

  return (
    <section>
      <div className="border-y border-[#d8cfc3] bg-border">
        <div className="container grid max-w-7xl gap-10 py-16 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.key}
              {...reveal({
                x: alternateX(index),
                delay: stagger(index),
                amount: 0.35,
              })}
            >
              <div
                className={cn(
                  "text-4xl font-bold text-foreground lg:text-5xl",
                  {
                    "font-heading": locale === "en",
                  },
                )}
              >
                <CountUp
                  end={item.end}
                  decimals={item.decimals ?? 0}
                  duration={reduceMotion ? 0.01 : 1.5}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                  formattingFn={(value) => {
                    const digits = new Intl.NumberFormat(numberLocale, {
                      minimumFractionDigits: item.decimals ?? 0,
                      maximumFractionDigits: item.decimals ?? 0,
                    }).format(value);

                    return `${digits}${item.suffix ?? ""}`;
                  }}
                />
              </div>

              <p className="mt-4 text-sm text-foreground">
                {t(`Stats.${item.key}`)}
              </p>

              <div className="mx-auto mt-4 h-px w-10 bg-foreground" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#e6dcd2e0] backdrop-blur-xs">
        <div className="container max-w-7xl py-24 text-center">
          <LandingSubtitle className="mb-6">{t("Eyebrow")}</LandingSubtitle>

          <LandingTitle className="mb-6">{t("Title")}</LandingTitle>

          <motion.div {...reveal({ x: 10, amount: 0.3 })}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-foreground">
              {t("Description")}
            </p>

            <motion.form
              {...reveal({ y: 8, delay: 0.06, amount: 0.5 })}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mx-auto mt-9 flex max-w-md overflow-hidden rounded-full bg-white">
                <Input
                  type="email"
                  autoComplete="email"
                  aria-label={t("EmailAria")}
                  placeholder={t("EmailPlaceholder")}
                  className="h-12 flex-1 border-0 bg-white px-6 text-foreground shadow-none focus-visible:ring-0"
                  {...register("email")}
                />

                <Button
                  type="submit"
                  className="h-12 w-35 cursor-pointer rounded-full bg-secondary text-secondary-foreground hover:bg-secondary"
                >
                  {isSubmitting && <Spinner />} {t("PrimaryCta")}
                </Button>
              </div>
              <FieldError errors={[errors.email]} />
            </motion.form>

            <motion.p
              {...reveal({ delay: 0.12 })}
              className="mt-4 text-xs text-foreground"
            >
              {t("Disclaimer")}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
