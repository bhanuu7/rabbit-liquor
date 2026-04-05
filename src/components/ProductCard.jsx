import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Bell } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product, onNotifyMe }) {
  const isOutOfStock = product.stock_count === 0;
  const isLowStock = product.stock_count > 0 && product.stock_count <= 3;
  const { getProductCount, removeFromCart, addToCart } = useCart();
  const currentProductCount = getProductCount(product.id);
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image_url}
          alt={product.item_name}
          className="size-full object-cover transition-transform group-hover:scale-105"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Badge variant="destructive" className="text-lg">
              Out of Stock
            </Badge>
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <Badge variant="secondary" className="absolute right-2 top-2">
            Only {product.stock_count} left
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h3 className="line-clamp-2">{product.item_name}</h3>
          </div>
        </div>
        <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{product.volume}</span>
          <span>•</span>
          <span>{product.alcoholContent} ABV</span>
        </div>
        <div className="mt-3">
          <span className="text-2xl">${product.price}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isOutOfStock ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onNotifyMe(product)}
          >
            <Bell className="mr-2 size-4" />
            Notify When Available
          </Button>
        ) : currentProductCount === 0 ? (
          <Button className="w-full" onClick={() => addToCart(product)}>
            <ShoppingCart className="mr-2 size-4" />
            Add To Cart
          </Button>
        ) : (
          <div className="w-full flex items-center justify-between rounded-md border px-2 py-1 bg-background">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(product)}
            >
              -
            </Button>

            <span className="font-medium">{currentProductCount}</span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => addToCart(product)}
            >
              +
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
