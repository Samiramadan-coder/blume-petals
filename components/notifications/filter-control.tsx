"use client";

import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import { tabs } from "@/constants/notifications";
import { parseAsString, useQueryState } from "nuqs";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function FilterControl() {
  const t = useTranslations("Notifications");

  const [queryParam, setQueryParam] = useQueryState(
    "type",
    parseAsString
      .withDefault("all")
      .withOptions({ history: "push", shallow: false }),
  );

  const [, setPageQueryParam] = useQueryState(
    "page",
    parseAsString
      .withDefault("1")
      .withOptions({ history: "push", shallow: false }),
  );

  return (
    <div>
      <Tabs
        className="w-full bg-transparent"
        value={queryParam}
        onValueChange={(value) => {
          setQueryParam(value);
          setPageQueryParam("1");
        }}
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
