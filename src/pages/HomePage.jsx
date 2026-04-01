import { useState } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Wine, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { getProducts } from "@/api/getProducts";
import { ProductCard } from "@/components/ProductCard";
import { useInventorySocket } from "../hooks/useInventerySocket";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { reserveProduct } from "@/api/reserveProduct";
const HomePage = () => {
  const navigate = useNavigate();
  const result = useInventorySocket();

  const [searchQuery, setSearchQuery] = useState("");
  const { data = [], isLoading, error } = getProducts();
  const { mutate, isPending } = reserveProduct();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const handleReserve = (id) => {
    mutate(id);
  };

  const handleNotifyMe = () => {
    console.log("handle notify me");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SideBar />
        <div className="w-full flex flex-col">
          <header className="flex items-center border-b sticky">
            <SidebarTrigger />
            <Header isHeaderOnly={true} />
          </header>
          <main className="container mx-auto px-4 py-8">
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
                    onReserve={() => {
                      handleReserve(product.id);
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
          </main>

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
      </div>
    </SidebarProvider>
  );
};

export default HomePage;
