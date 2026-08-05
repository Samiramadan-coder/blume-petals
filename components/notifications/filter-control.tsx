"use client";

import { useTranslations } from "next-intl";
import { tabs } from "@/constants/notifications";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { parseAsString, useQueryState } from "nuqs";

export default function FilterControl() {
  const t = useTranslations("Notifications");

  const [queryParam, setQueryParam] = useQueryState(
    "status",
    parseAsString
      .withDefault("all")
      .withOptions({ history: "push", shallow: false }),
  );

  return (
    <div>
      <Tabs
        className="w-full bg-transparent"
        value={queryParam}
        onValueChange={setQueryParam}
      >
        <TabsList variant="line" className="h-10! space-x-6">
          {tabs(t).map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-sm px-0 cursor-pointer data-[state=active]:after:bg-primary! data-[state=active]:text-primary!"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Separator />
    </div>
  );
}
