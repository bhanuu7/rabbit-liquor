import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Wine, Search, ChevronDown, ShoppingBag } from "lucide-react";
import { getProducts } from "@/api/getProducts";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { reserveProduct } from "@/api/reserveProduct";
import { products } from "@/utils";
import "./ProductsPage.css";

const PAGE_SIZE = 12;
const BATCH_SIZE = 8;

const ProductsPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data = [], isLoading, error } = getProducts();
  const { mutate, isPending } = reserveProduct();
  const [searchParams] = useSearchParams();
  const [categoryFilter, setCategoryFilter] = useState(
    () => searchParams.get("category") ?? "all"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const sentinelRef = useRef(null);
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Sync filter when URL param changes (e.g. navigating from Home categories)
  useEffect(() => {
    const cat = searchParams.get("category") ?? "all";
    setCategoryFilter(cat);
  }, [searchParams]);

  // Reset visible count when search/filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, categoryFilter]);

  // Hide banner + freeze toolbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.item_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((c) => c + BATCH_SIZE);
      setLoadingMore(false);
    }, 700);
  }, [loadingMore, hasMore]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const handleNotifyMe = () => {
    console.log("handle notify me");
  };

  return (
    <div className={`pp-page w-full flex flex-col${scrolled ? " pp-page--scrolled" : ""}`}>
      {/* Page header */}
      <div className="pp-page-header">
        <p className="pp-page-header__pre">Curated Collection</p>
        <h1 className="pp-page-header__title">
          Our <em>Products</em>
        </h1>
      </div>

      {/* Search and Filter */}
      <div className="pp-toolbar">
        <div className="pp-search">
          <Search className="pp-search__icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pp-search__input"
          />
        </div>
        <div className="pp-dropdown" ref={dropdownRef}>
          <button
            type="button"
            className={`pp-dropdown__toggle${dropdownOpen ? " pp-dropdown__toggle--open" : ""}`}
            onClick={() => setDropdownOpen((o) => !o)}
          >
            <span>
              {categoryFilter === "all" ? "All Categories" : categoryFilter}
            </span>
            <ChevronDown className="pp-dropdown__chevron" size={14} />
          </button>

          {dropdownOpen && (
            <ul className="pp-dropdown__menu">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className={`pp-dropdown__item${categoryFilter === category ? " pp-dropdown__item--active" : ""}`}
                    onClick={() => {
                      setCategoryFilter(category);
                      setDropdownOpen(false);
                    }}
                  >
                    {category === "all" ? "All Categories" : category}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="pp-reserve-btn" onClick={() => navigate("/cart")}>
          <ShoppingBag size={15} />
          Proceed to Reserve
        </button>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="pp-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNotifyMe={handleNotifyMe}
              />
            ))}
            {/* Skeleton placeholders while loading more */}
            {loadingMore && Array.from({ length: 4 }).map((_, i) => (
              <div key={`skel-${i}`} className="pp-skeleton" />
            ))}
          </div>
          {/* Sentinel for IntersectionObserver */}
          {hasMore && <div ref={sentinelRef} className="pp-sentinel" />}
        </>
      ) : (
        <div className="pp-empty">
          <Wine className="pp-empty__icon" size={56} />
          <h3 className="pp-empty__title">No products found</h3>
          <p className="pp-empty__sub">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
