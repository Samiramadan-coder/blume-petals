export type User = {
  email: string;
  email_verified_at: string | null;
  id: number;
  is_admin: boolean;
  is_wholesale: boolean;
  locale: string;
  name: string;
  phone: string;
  phone_verified_at: string | null;
  photo_path: string | null;
  photo_url: string | null;
};

export type Pagination = {
  current_page: number;
  from: number;
  has_more: boolean;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};
