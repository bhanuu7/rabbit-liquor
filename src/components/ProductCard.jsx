import { useState } from "react";
import { ShoppingCart, Bell } from "lucide-react";
import { useCart } from "@/context/CartContext";
import BottleSVG, { CATEGORY_FALLBACK } from "@/components/BottleSVG";
import "./ProductCard.css";

export function ProductCard({ product, onNotifyMe }) {
  const isOutOfStock = product.stock_count === 0;
  const isLowStock = product.stock_count > 0 && product.stock_count <= 3;
  const { getProductCount, removeFromCart, addToCart } = useCart();
  const currentProductCount = getProductCount(product.id);
  const [imgError, setImgError] = useState(false);
  const fallback = CATEGORY_FALLBACK[product.category] || CATEGORY_FALLBACK.default;

  return (
    <div className="rl-pc">
      {/* Image */}
      <div className="rl-pc__img">
        {!imgError && product.image_url ? (
          <img
            src={product.image_url}
            alt={product.item_name}
            className="rl-pc__photo"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="rl-pc__bottle-fallback">
            <BottleSVG
              color={fallback.color}
              label={product.category.toUpperCase()}
              isBeer={fallback.isBeer}
            />
          </div>
        )}
        <span className="rl-pc__cat">{product.category}</span>
        {isOutOfStock && (
          <div className="rl-pc__oos-overlay">
            <span>Out of Stock</span>
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <span className="rl-pc__low-badge">Only {product.stock_count} left</span>
        )}
      </div>

      {/* Body */}
      <div className="rl-pc__body">
        <h3 className="rl-pc__name">{product.item_name}</h3>
        <p className="rl-pc__desc">{product.description}</p>
        <div className="rl-pc__meta">
          <span>{product.volume}</span>
          <span>·</span>
          <span>{product.alcoholContent} ABV</span>
        </div>
        <div className="rl-pc__price">${product.price}</div>
      </div>

      {/* Footer CTA */}
      <div className="rl-pc__footer">
        {isOutOfStock ? (
          <button
            className="rl-pc__btn rl-pc__btn--outline"
            onClick={() => onNotifyMe?.(product)}
          >
            <Bell size={14} />
            Notify When Available
          </button>
        ) : currentProductCount === 0 ? (
          <button
            className="rl-pc__btn rl-pc__btn--gold"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={14} />
            Add To Cart
          </button>
        ) : (
          <div className="rl-pc__qty">
            <button className="rl-pc__qty-btn" onClick={() => removeFromCart(product)}>−</button>
            <span className="rl-pc__qty-count">{currentProductCount}</span>
            <button className="rl-pc__qty-btn" onClick={() => addToCart(product)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}
