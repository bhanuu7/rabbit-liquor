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
  TriangleAlert,
} from "lucide-react";
import { getProducts } from "@/api/getProducts";
import { getOrders } from "@/api/getOrders";
import { OrderDetailsDialog } from "@/components/OrderDetailsDialog";
import { getOrderDetails } from "@/api/getOrderDetails";
import { updateProduct as updateProductAPI } from "@/api/updateProducts";

export default function Inventory() {
  const navigate = useNavigate();
  const { data: productsData = [], isLoading } = getProducts();
  const { data: ordersData = [] } = getOrders();
  const {
    products,
    reservations,
    notifyRequests,
    updateProduct,
    deleteProduct,
    addProduct,
    updateProductStock,
  } = useStore();
  const { mutate: updateProductsFn } = updateProductAPI();
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [orderDetailsDialog, setOrderDetailsDialog] = useState(false);
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

  const outOfStockItems = Object.values(productsData).filter(
    (product) => product.stock_count === 0,
  );
  const runningOutOfStockItems = Object.values(productsData).filter(
    (product) => product.stock_count <= 5 && product.stock_count > 0,
  );

  const handleUpdateStock = (productId, newStock) => {
    updateProductStock(productId, newStock);
    toast.success("Stock updated successfully");
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveEdit = () => {
    try {
      if (!editingProduct) return;

      // const res = await updateProductApi(editingProduct);

      // Optional: update local state/store
      updateProductsFn(editingProduct);
      // updateProduct(editingProduct.id, res.product);

      setEditingProduct(null);
      toast.success("Product updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
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

  const handleCloseOrderDetailsDialog = () => {
    setOrderDetailsDialog(false);
    setSelectedOrderId(null);
  };

  const FormattedBadge = ({ status }) => {
    if (status === "picked_up")
      return (
        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
          Complete
        </Badge>
      );
    else if (status === "order_placed")
      return (
        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          Active
        </Badge>
      );
    return (
      <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
        Cancelled
      </Badge>
    );
  };

  const handleOrderDetailsDialogClick = (orderId) => {
    setSelectedOrderId(orderId);
    setOrderDetailsDialog(!orderDetailsDialog);
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
    <div className="min-h-screen bg-background px-4 py-8">
      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Products</CardTitle>
            <Package className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{productsData.length}</div>
            <p className="text-xs text-muted-foreground">
              {outOfStockItems.length} out of stock
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Running Out</CardTitle>
            <TriangleAlert className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{runningOutOfStockItems.length}</div>
            <p className="text-xs text-muted-foreground">
              {runningOutOfStockItems.length} might go out of stock
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Reservations</CardTitle>
            <ShoppingBag className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{ordersData.length}</div>
            <p className="text-xs text-muted-foreground">
              {ordersData.length} total reservations
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
            {/* TO DO add original data from backend*/}
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
                  {productsData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {editingProduct?.id === product.id ? (
                          <Input
                            value={editingProduct.item_name}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                item_name: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image_url}
                              alt={product.item_name}
                              className="size-10 rounded object-cover"
                            />
                            <span>{product.item_name}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-left">
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
                      <TableCell className="text-left">
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
                          `$${product.price}`
                        )}
                      </TableCell>
                      <TableCell className="text-left">
                        {editingProduct?.id === product.id ? (
                          <Input
                            type="number"
                            value={editingProduct.stock_count}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                stock_count: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-20"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                product.stock_count === 0
                                  ? "destructive"
                                  : product.stock_count <= 3
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {product.stock_count}
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
                    <TableHead>User Name</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        No reservations yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    ordersData.map((reservation) => {
                      const product = productsData.find(
                        (p) => p.id === reservation.productId,
                      );
                      return (
                        <TableRow
                          key={reservation.id}
                          className="cursor-pointer"
                          onClick={() =>
                            handleOrderDetailsDialogClick(reservation.id)
                          }
                        >
                          <TableCell className="text-left">
                            {reservation.user_name}
                          </TableCell>
                          <TableCell className="text-left">
                            {reservation.customer_name}
                          </TableCell>
                          <TableCell className="text-left">
                            {reservation.email}
                          </TableCell>
                          <TableCell className="text-left">
                            {reservation.phone}
                          </TableCell>
                          <TableCell className="text-left">
                            {reservation.total_amount}
                          </TableCell>
                          <TableCell className="text-left">
                            <FormattedBadge status={reservation.status} />
                          </TableCell>
                          <TableCell className="text-left">
                            {new Date(
                              reservation.created_at,
                            ).toLocaleDateString()}
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
                      const product = productsData.find(
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
                                product?.stock === 0 ? "destructive" : "default"
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
      <OrderDetailsDialog
        key={selectedOrderId}
        open={orderDetailsDialog}
        onClose={handleCloseOrderDetailsDialog}
        orderId={selectedOrderId}
      />
    </div>
  );
}
