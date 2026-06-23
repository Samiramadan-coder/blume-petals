import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ProductSortSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-42 border-border py-5">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
          <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
          <SelectItem value="top-rated">Top Rated</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
