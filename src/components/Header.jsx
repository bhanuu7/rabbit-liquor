import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Wine, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import CartIcon from "./ShoppingCart";
import { useCart } from "@/context/CartContext";
export default function Header() {
  const { theme, setTheme } = useTheme();
  const { getCartCount } = useCart();
  return (
    <div className="rl-header w-full">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 h-16">
          <Wine className="size-7 rl-brand-icon" />
          <h1 className="rl-brand-title">Rabbit Liquor</h1>
        </div>

        {/* Right Side: Profile Dropdown */}
        <div className="flex items-center gap-x-4">
          <span className="rl-cart-icon">
            <CartIcon count={getCartCount()} />
          </span>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full ring-offset-2 hover:ring-2 hover:ring-purple-500 transition-all"
                >
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Profile"
                    />
                    <AvatarFallback>BT</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Bhanu Thanneru
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      bhanu@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  Dark Mode
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-slate-500" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Order History
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-600">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
