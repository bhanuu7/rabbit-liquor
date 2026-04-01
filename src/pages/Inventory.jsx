import { useState } from "react";
import { useNavigate } from "react-router";
import { useStore } from "../context/StoreContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import {
  ArrowLeft,
  Package,
  ShoppingBag,
  Bell,
  Plus,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";

export default function Inventory() {
  const navigate = useNavigate();
  const {
    products,
    reservations,
    notifyRequests,
    updateProduct,
    deleteProduct,
    addProduct,
    updateProductStock,
  } = useStore();
  const [editingProduct, setEditingProduct] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
    image: "",
    stock: 0,
    alcoholContent: "",
    volume: "",
    origin: "",
  });

  const handleUpdateStock = (productId, newStock) => {
    updateProductStock(productId, newStock);
    toast.success("Stock updated successfully");
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveEdit = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
      toast.success("Product updated successfully");
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
      toast.success("Product deleted");
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    addProduct(newProduct);
    setAddDialogOpen(false);
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      description: "",
      image: "",
      stock: 0,
      alcoholContent: "",
      volume: "",
      origin: "",
    });
    toast.success("Product added successfully");
  };

  const pendingReservations = reservations.filter(
    (r) => r.status === "pending",
  );
  const totalRevenue = reservations
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => {
      const product = products.find((p) => p.id === r.productId);
      return sum + (product ? product.price * r.quantity : 0);
    }, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-xl">Admin Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Products</CardTitle>
              <Package className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                {products.filter((p) => p.stock === 0).length} out of stock
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Pending Reservations</CardTitle>
              <ShoppingBag className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{pendingReservations.length}</div>
              <p className="text-xs text-muted-foreground">
                {reservations.length} total reservations
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Notify Requests</CardTitle>
              <Bell className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{notifyRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                Customers waiting for restock
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
            <TabsTrigger value="notify">Notify Requests</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">Product Management</h2>
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 size-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new product
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Name *</Label>
                      <Input
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Category *</Label>
                      <Input
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Price *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            stock: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={newProduct.image}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            image: e.target.value,
                          })
                        }
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label>Alcohol Content</Label>
                      <Input
                        value={newProduct.alcoholContent}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            alcoholContent: e.target.value,
                          })
                        }
                        placeholder="40%"
                      />
                    </div>
                    <div>
                      <Label>Volume</Label>
                      <Input
                        value={newProduct.volume}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            volume: e.target.value,
                          })
                        }
                        placeholder="750ml"
                      />
                    </div>
                    <div>
                      <Label>Origin</Label>
                      <Input
                        value={newProduct.origin}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            origin: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddProduct}>Add Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          {editingProduct?.id === product.id ? (
                            <Input
                              value={editingProduct.name}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  name: e.target.value,
                                })
                              }
                            />
                          ) : (
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="size-10 rounded object-cover"
                              />
                              <span>{product.name}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingProduct?.id === product.id ? (
                            <Input
                              value={editingProduct.category}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  category: e.target.value,
                                })
                              }
                            />
                          ) : (
                            product.category
                          )}
                        </TableCell>
                        <TableCell>
                          {editingProduct?.id === product.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              value={editingProduct.price}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  price: parseFloat(e.target.value) || 0,
                                })
                              }
                            />
                          ) : (
                            `$${product.price.toFixed(2)}`
                          )}
                        </TableCell>
                        <TableCell>
                          {editingProduct?.id === product.id ? (
                            <Input
                              type="number"
                              value={editingProduct.stock}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  stock: parseInt(e.target.value) || 0,
                                })
                              }
                              className="w-20"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  product.stock === 0
                                    ? "destructive"
                                    : product.stock <= 3
                                      ? "secondary"
                                      : "default"
                                }
                              >
                                {product.stock}
                              </Badge>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingProduct?.id === product.id ? (
                            <div className="flex justify-end gap-2">
                              <Button size="sm" onClick={handleSaveEdit}>
                                <Save className="size-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingProduct(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-4">
            <h2 className="text-2xl">Reservations</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center text-muted-foreground"
                        >
                          No reservations yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      reservations.map((reservation) => {
                        const product = products.find(
                          (p) => p.id === reservation.productId,
                        );
                        return (
                          <TableRow key={reservation.id}>
                            <TableCell>{product?.name || "Unknown"}</TableCell>
                            <TableCell>{reservation.customerName}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{reservation.customerEmail}</div>
                                <div className="text-muted-foreground">
                                  {reservation.customerPhone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{reservation.quantity}</TableCell>
                            <TableCell>
                              {new Date(
                                reservation.timestamp,
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  reservation.status === "completed"
                                    ? "default"
                                    : reservation.status === "cancelled"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {reservation.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notify Requests Tab */}
          <TabsContent value="notify" className="space-y-4">
            <h2 className="text-2xl">Restock Notifications</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date Requested</TableHead>
                      <TableHead>Current Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifyRequests.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center text-muted-foreground"
                        >
                          No notification requests
                        </TableCell>
                      </TableRow>
                    ) : (
                      notifyRequests.map((request) => {
                        const product = products.find(
                          (p) => p.id === request.productId,
                        );
                        return (
                          <TableRow key={request.id}>
                            <TableCell>{product?.name || "Unknown"}</TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>
                              {new Date(request.timestamp).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  product?.stock === 0
                                    ? "destructive"
                                    : "default"
                                }
                              >
                                {product?.stock || 0}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
