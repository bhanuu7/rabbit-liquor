import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { toast } from "sonner";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Package,
} from "lucide-react";
import { reserveProduct } from "@/api/reserveProduct";

function CartPage() {
  const navigate = useNavigate();
  const { mutate, isPending } = reserveProduct();
  const { cartProducts, addToCart, removeFromCart } = useCart();
  const { addReservation } = useStore(); // TO DO
  const [checkoutOpen, setCheckoutOpen] = useState(false); // TO DO
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const subtotal = 6969;
  // TO DO getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleCheckout = (e) => {
    console.log("handle checkout clicked");
    e.preventDefault();

    const items = Object.values(cartProducts).map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
    const payload = {
      user_name: "Bhanu",
      email: formData.email,
      phone: formData.phone,
      customer_name: formData.name,
      total_price: 2340,
      items,
    };
    mutate({ ...payload });
    setFormData({ name: "", email: "", phone: "" });
    toast.success("Reservation confirmed!", {
      description: `We've sent a confirmation email to ${formData.email}. Please pick up within 48 hours.`,
    });

    clearCart();
    setCheckoutOpen(false);
    navigate("/home");
  };

  if (!cartProducts || Object.keys(cartProducts).length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Empty State */}
        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-muted">
              <ShoppingCart className="size-12 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-2xl">Your cart is empty</h2>
            <p className="mb-6 text-muted-foreground">
              Add some products to your cart to get started
            </p>
            <Button onClick={() => navigate("/home")}>Continue Shopping</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.values(cartProducts).map((item, index) => (
                  <div key={item.product.id}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="size-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start flex-col">
                              <h3 className="font-medium">
                                {item.product.item_name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                750 ml • {/* TO DO */}
                                {item.product.alcoholContent || 49} ABV
                              </p>
                              <p className="mt-1 font-medium">
                                ${item.product.price}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.product.id)}
                              className="shrink-0"
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-8"
                              onClick={() => removeFromCart(item.product)}
                            >
                              <Minus className="size-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-8"
                              onClick={() => addToCart(item.product)}
                              // TO DO  disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="size-3" />
                            </Button>
                          </div>
                          <p className="font-medium">
                            ${item.product.price * item.quantity}
                          </p>
                        </div>

                        {/* Stock Warning */}
                        {/* TO DO {item.quantity >= item.product.stock && (
                          <p className="mt-1 text-xs text-destructive">
                            Maximum available quantity
                          </p>
                        )} */}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-2xl font-medium">${total}</span>
                  </div>
                </div>

                {/* Info Box */}
                <div className="rounded-lg bg-muted p-4 text-sm">
                  <div className="flex gap-2">
                    <Package className="size-5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Store Pickup Only</p>
                      <p className="text-muted-foreground">
                        Ready for pickup within 2 hours. Valid ID required
                        (21+).
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setCheckoutOpen(true)}
                >
                  Reserve for Pickup
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Reservation</DialogTitle>
            <DialogDescription>
              Enter your details to reserve your items for pickup
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCheckout}>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="checkout-name">Full Name</Label>
                <Input
                  id="checkout-name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="checkout-email">Email</Label>
                <Input
                  id="checkout-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="checkout-phone">Phone Number</Label>
                <Input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Order Summary in Dialog */}
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="font-medium">Pickup Information</p>
                <p className="text-muted-foreground">
                  Please bring a valid ID showing you are 21+ when picking up
                  your order within 48 hours.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCheckoutOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Confirm Reservation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CartPage;
