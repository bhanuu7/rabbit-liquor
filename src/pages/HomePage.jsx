import { useState } from "react";
import { Wine, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/api/getProducts";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { reserveProduct } from "@/api/reserveProduct";
import { useInventorySocket } from "@/hooks/useInventerySocket";
const HomePage = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const { data = [], isLoading, error } = getProducts();
  const { mutate, isPending } = reserveProduct();
  useInventorySocket();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [reservationOpen, setReservationOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const categories = ["all", ...new Set(data.map((p) => p.category))];

  const filteredProducts = data.filter((product) => {
    const matchesSearch = product.item_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleNotifyMe = () => {
    console.log("handle notify me");
  };

  return (
    <div className="w-full flex flex-col">
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={() => {
                handleAddToCart(product);
              }}
              onNotifyMe={handleNotifyMe}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <Wine className="mb-4 size-16 text-muted-foreground" />
          <h3 className="mb-2 text-xl">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Dialogs // TO DO */}
      {/* <ReservationDialog
            product={selectedProduct}
            open={reservationOpen}
            onClose={() => setReservationOpen(false)}
          />
          <NotifyDialog
            product={selectedProduct}
            open={notifyOpen}
            onClose={() => setNotifyOpen(false)}
          /> */}
    </div>
  );
};

export default HomePage;
