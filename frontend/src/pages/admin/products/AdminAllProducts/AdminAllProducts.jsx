import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import toast from "react-hot-toast";
import {
  VisibilityOffOutlined,
  VisibilityOutlined,
  Edit,
  Delete,
} from "@mui/icons-material";
import "./AdminAllProducts.css";
import Loader from "../../../../components/loader/Loader";
import ImageModal from "./ImageModal/ImageModal";
import EditProductModal from "./EditProductModal/EditProductModal";
import CustomNotFound from "../../../../components/CustomNotFound/CustomNotFound";
import {
  setProductsState,
  deleteProduct,
} from "../../../../redux/features/productSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminAllProducts = () => {
  const [viewImage, setViewImage] = useState(false);
  const [currentViewImages, setCurrentViewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchparams] = useSearchParams();

  const products = useSelector((state) => state.productState.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function loadProducts() {
      try {
        const res = await axios.get("/products");
        dispatch(setProductsState(res.data.products));
      } catch (error) {
        toast.error(
          error.response?.message || "Something went wrong in getting products"
        );
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleImageView = (images) => {
    setCurrentViewImages(images);
    setViewImage(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct({ ...product });
    setEditModal(true);
  };

  const searchProduct = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteProduct = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`/products/${id}`);
      dispatch(deleteProduct(id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product?.vTitle?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      product?.tDescription
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase()) ||
      product?.SubCategory?.vName
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="adminallproducts">
      {loading ? (
        <Loader size="3rem" />
      ) : (
        <>
          <ImageModal
            open={viewImage}
            setOpen={setViewImage}
            images={currentViewImages}
          />
          {/* <EditProductModal
            open={editModal}
            setOpen={setEditModal}
            p={{ ...currentProduct }}
          /> */}
          <Typography component="h1" variant="h5">
            All Products
          </Typography>
          <Paper
            sx={{
              width: "80%",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              height: "80%",
            }}
          >
            <TextField
              margin="normal"
              sx={{ width: 400 }}
              label="Search"
              onChange={searchProduct}
            />
            <TableContainer
              sx={{ height: "70vh" }}
              className="aaptablecontainer"
            >
              {filteredProducts.length > 0 ? (
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  sx={{ borderBottom: "none" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ textAlign: "center" }}>Id</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Title</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Description
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Category
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Image</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((product) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={product.id}
                        >
                          <TableCell sx={{ textAlign: "center" }}>
                            {product.id}
                          </TableCell>
                          <TableCell
                            sx={{ maxWidth: 400, textAlign: "justify" }}
                          >
                            <p className="aapttitle">{product.vTitle}</p>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {product.fPrice}
                          </TableCell>
                          <TableCell
                            sx={{ maxWidth: 400, textAlign: "justify" }}
                          >
                            <p className="description">
                              {product.tDescription}
                            </p>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {product.SubCategory?.vName || "-"}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <VisibilityOutlined
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                console.log(product.ProductImageItems);
                                handleImageView(product.ProductImageItems);
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <div className="aapactionbtns">
                              <Edit
                                sx={{
                                  color: "#1976d2",
                                  transition: "0.2s all",
                                  "&:hover": { color: "#3c52b2" },
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigate(`/admin/products/edit`, {
                                    state: {
                                      ...product,
                                      redirect: "/admin/products/all",
                                      editing: true,
                                    },
                                  });
                                }}
                              />
                              {deletingId === product.id ? (
                                <Loader size="1rem" />
                              ) : (
                                <Delete
                                  sx={{
                                    color: "#ff5e5e",
                                    transition: "0.2s all",
                                    "&:hover": { color: "#e35454" },
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleDeleteProduct(product.id)
                                  }
                                />
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <CustomNotFound message="No products Found" />
              )}
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}
    </div>
  );
};

export default AdminAllProducts;
