import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Link } from "@/i18n/navigation";
import PageTitle from "../shared/page-title";
import { ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const accountItems = [
  { title: "Edit Profile", href: "/account/profile" },
  { title: "Saved Addresses", href: "/account/addresses" },
  { title: "Payment Methods", href: "/account/payment-methods" },
  { title: "Change Password", href: "/account/change-password" },
];

const preferencesItems = [
  { type: "locale", title: "Language" },
  { type: "email", title: "Email Notifications" },
  { type: "push", title: "Push Alerts" },
  { type: "sms", title: "SMS Alerts" },
];

const supportItems = [
  { title: "Help Center", href: "/account/help-center" },
  { title: "Contact Us", href: "/account/contact-support" },
  { title: "Privacy Policy", href: "/account/privacy-policy" },
  { title: "Terms of Service", href: "/account/terms-of-service" },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      <PageTitle title="Settings" />

      <Card className="shadow-sm bg-white py-6">
        <CardContent className="space-y-4 px-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Account
            </h2>

            <div className="border border-border rounded-md">
              {accountItems.map((item) => (
                <Item
                  key={item.href}
                  variant="default"
                  size="default"
                  className="h-12 hover:bg-primary/20! rounded-none! border-0 border-b border-border last:border-b-0"
                  asChild
                >
                  <Link href={item.href}>
                    <ItemContent>
                      <ItemTitle className="text-foreground text-sm md:text-base">
                        {item.title}
                      </ItemTitle>
                    </ItemContent>

                    <ItemActions>
                      <ChevronRightIcon className="size-5 text-muted-foreground" />
                    </ItemActions>
                  </Link>
                </Item>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Preferences
            </h2>

            <div className="border border-border rounded-md">
              {preferencesItems.map((item) => (
                <Item
                  key={item.title}
                  variant="default"
                  size="default"
                  className="h-12 hover:bg-primary/20! rounded-none! border-0 border-b border-border last:border-b-0"
                  asChild
                >
                  <div>
                    <ItemContent>
                      <ItemTitle className="text-foreground text-sm md:text-base">
                        {item.title}
                      </ItemTitle>
                    </ItemContent>

                    <ItemActions>
                      {item.type === "locale" ? (
                        <RadioGroup
                          defaultValue="en"
                          className="flex w-fit flex-row items-center gap-6"
                          orientation="horizontal"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="en" id="en" />
                            <Label htmlFor="en">En</Label>
                          </div>

                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="ar" id="ar" />
                            <Label htmlFor="ar">Ar</Label>
                          </div>
                        </RadioGroup>
                      ) : (
                        <Checkbox
                          id="terms-checkbox-2"
                          name="terms-checkbox-2"
                          defaultChecked
                        />
                      )}
                    </ItemActions>
                  </div>
                </Item>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Support
            </h2>

            <div className="border border-border rounded-md">
              {supportItems.map((item) => (
                <Item
                  key={item.href}
                  variant="default"
                  size="default"
                  className="h-12 hover:bg-primary/20! rounded-none! border-0 border-b border-border last:border-b-0"
                  asChild
                >
                  <Link href={item.href}>
                    <ItemContent>
                      <ItemTitle className="text-foreground text-sm md:text-base">
                        {item.title}
                      </ItemTitle>
                    </ItemContent>

                    <ItemActions>
                      <ChevronRightIcon className="size-5 text-muted-foreground" />
                    </ItemActions>
                  </Link>
                </Item>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
