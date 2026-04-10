import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";
import { toast } from "sonner";
import { ArrowLeft, Trash2, ShoppingCart, Package } from "lucide-react";
import { reserveProduct } from "@/api/reserveProduct";
import BottleSVG, { CATEGORY_FALLBACK } from "@/components/BottleSVG";
import "./CartPage.css";

function CartItem({ item, addToCart, removeFromCart }) {
  const [imgError, setImgError] = useState(false);
  const fallback = CATEGORY_FALLBACK[item.product.category] || CATEGORY_FALLBACK.default;

  return (
    <div className="cp-item">
      {/* Thumbnail */}
      <div className="cp-item__thumb">
        {!imgError && item.product.image_url ? (
          <img
            src={item.product.image_url}
            alt={item.product.item_name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="cp-item__thumb-fallback">
            <BottleSVG
              color={fallback.color}
              label={item.product.category.toUpperCase()}
              isBeer={fallback.isBeer}
            />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="cp-item__details">
        <div className="cp-item__top">
          <div>
            <div className="cp-item__name">{item.product.item_name}</div>
            <div className="cp-item__meta">
              {item.product.volume || "750 ml"} · {item.product.alcoholContent || "40%"} ABV
            </div>
            <div className="cp-item__price-unit">${item.product.price}</div>
          </div>
          <button
            className="cp-item__remove"
            onClick={() => removeFromCart(item.product.id)}
            aria-label="Remove item"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div className="cp-item__bottom">
          <div className="cp-qty">
            <button className="cp-qty__btn" onClick={() => removeFromCart(item.product)}>−</button>
            <span className="cp-qty__count">{item.quantity}</span>
            <button className="cp-qty__btn" onClick={() => addToCart(item.product)}>+</button>
          </div>
          <span className="cp-item__total">
            ${item.product.price * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
}

function CartPage() {
  const navigate = useNavigate();
  const { mutate, isPending } = reserveProduct();
  const { cartProducts, addToCart, removeFromCart } = useCart();
  const { addReservation } = useStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const subtotal = 6969; // TO DO getCartTotal()
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = (e) => {
    e.preventDefault();
    const items = Object.values(cartProducts).map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
    mutate({
      user_name: "Bhanu",
      email: formData.email,
      phone: formData.phone,
      customer_name: formData.name,
      total_price: 2340,
      items,
    });
    toast.success("Reservation confirmed!", {
      description: `We've sent a confirmation email to ${formData.email}. Please pick up within 48 hours.`,
    });
    setFormData({ name: "", email: "", phone: "" });
    setCheckoutOpen(false);
    navigate("/home");
  };

  /* ── Empty state ─────────────────────────────────────────── */
  if (!cartProducts || Object.keys(cartProducts).length === 0) {
    return (
      <div className="cp-wrap">
        <div className="cp-empty">
          <div className="cp-empty__icon-wrap">
            <ShoppingCart size={40} />
          </div>
          <h2 className="cp-empty__title">Your cart is empty</h2>
          <p className="cp-empty__sub">
            Add some products to your cart to get started
          </p>
          <button className="cp-empty__btn" onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  /* ── Filled cart ─────────────────────────────────────────── */
  return (
    <div className="cp-wrap">
      {/* Page header */}
      <div className="cp-page-header">
        <button className="cp-back-btn" onClick={() => navigate("/products")}>
          <ArrowLeft size={13} />
          Back
        </button>
        <div className="cp-page-header__text">
          <p className="cp-page-header__pre">Your Selection</p>
          <h1 className="cp-page-header__title">
            Your <em>Cart</em>
          </h1>
        </div>
      </div>

      <div className="cp-grid">
        {/* ── Cart items panel ── */}
        <div className="cp-panel">
          <div className="cp-panel__header">
            <h2 className="cp-panel__title">Cart Items</h2>
          </div>
          <div className="cp-panel__body">
            {Object.values(cartProducts).map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
        </div>

        {/* ── Order summary panel ── */}
        <div className="cp-summary">
          <div className="cp-summary__header">
            <h2 className="cp-summary__title">Order Summary</h2>
          </div>
          <div className="cp-summary__body">
            <div className="cp-summary__row">
              <span className="cp-summary__label">Subtotal</span>
              <span className="cp-summary__value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="cp-summary__row">
              <span className="cp-summary__label">Tax (8%)</span>
              <span className="cp-summary__value">${tax.toFixed(2)}</span>
            </div>
            <div className="cp-summary__divider" />
            <div className="cp-summary__total-row">
              <span className="cp-summary__total-label">Total</span>
              <span className="cp-summary__total-value">${total.toFixed(2)}</span>
            </div>

            {/* Pickup info */}
            <div className="cp-pickup-box">
              <Package size={18} className="cp-pickup-box__icon" />
              <div>
                <div className="cp-pickup-box__title">Store Pickup Only</div>
                <div className="cp-pickup-box__desc">
                  Ready for pickup within 2 hours. Valid ID required (21+).
                </div>
              </div>
            </div>

            <button className="cp-reserve-btn" onClick={() => setCheckoutOpen(true)}>
              Reserve for Pickup
            </button>
          </div>
        </div>
      </div>

      {/* ── Checkout dialog ── */}
      {checkoutOpen && (
        <div className="cp-dialog-overlay" onClick={() => setCheckoutOpen(false)}>
          <div className="cp-dialog" onClick={(e) => e.stopPropagation()}>
            <div>
              <h2 className="cp-dialog__title">Complete Your Reservation</h2>
              <p className="cp-dialog__sub">
                Enter your details to reserve your items for pickup
              </p>
            </div>

            <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="cp-field">
                <label htmlFor="cp-name">Full Name</label>
                <input
                  id="cp-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="cp-field">
                <label htmlFor="cp-email">Email</label>
                <input
                  id="cp-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div className="cp-field">
                <label htmlFor="cp-phone">Phone Number</label>
                <input
                  id="cp-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Mini order summary */}
              <div className="cp-dialog__summary">
                <div className="cp-dialog__summary-row">
                  <span className="cp-dialog__summary-label">Subtotal</span>
                  <span className="cp-dialog__summary-value">${subtotal.toFixed(2)}</span>
                </div>
                <div className="cp-dialog__summary-row">
                  <span className="cp-dialog__summary-label">Tax (8%)</span>
                  <span className="cp-dialog__summary-value">${tax.toFixed(2)}</span>
                </div>
                <div className="cp-dialog__divider" />
                <div className="cp-dialog__total-row">
                  <span className="cp-dialog__total-label">Total</span>
                  <span className="cp-dialog__total-value">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="cp-dialog__note">
                <strong>Pickup Information</strong>
                <p>Please bring a valid ID showing you are 21+ when picking up your order within 48 hours.</p>
              </div>

              <div className="cp-dialog__footer">
                <button
                  type="button"
                  className="cp-dialog__cancel"
                  onClick={() => setCheckoutOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cp-dialog__confirm"
                  disabled={isPending}
                >
                  {isPending ? "Confirming…" : "Confirm Reservation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
