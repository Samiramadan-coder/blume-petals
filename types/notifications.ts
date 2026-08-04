export type Notification = {
  id: string;
  type: "orders" | "promotions" | "system";
  title: string;
  body: string;
  link: string;
  order_id?: number;
  order_number?: number;
  read: boolean;
  read_at: string | null;
  created_at: string;
};
