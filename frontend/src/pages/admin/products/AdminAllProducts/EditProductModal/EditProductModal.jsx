import React, { useEffect, useState } from "react";
import "./EditProductModal.css";
import Modal from "@mui/material/Modal";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProductsState } from "../../../../../redux/features/productSlice";
import Loader from "../../../../../components/loader/Loader";

const EditProductModal = ({ open, setOpen, p, setProducts }) => {
  const [product, setProduct] = useState({
    vTitle: "",
    fPrice: 0,
    tDescription: "",
    iSubCategoryId: "",
    iCategoryId: "",
    vImage: "",
  });
  const handleClose = () => setOpen(false);

  const { groups } = useSelector((state) => state.groupsState);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  useEffect(() => {
    // setLoading(true);
  }, [p]);

  const handleSubmit = async () => {
    await axios
      .put(`/products/${p.id}`, product)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        updateProducts(res.data.product);
      })
      .catch((err) => {
        toast.error(err.response.message || "Something went wrong");
        console.log(err);
      });
    // console.log(res.);

    handleClose();
  };

  const updateProducts = (pd) => {
    console.log(pd);
    setProducts((prevProducts) => {
      return prevProducts.map((p) => (p.id === pd.id ? pd : p));
    });
  };

  const handleGroupChange = (id) => {
    setCategories(groups[id - 1].Categories);
  };

  const handleCategoryChange = (v) => {
    setProduct({ ...product, iCategoryId: v.id });
    const category = categories.find((c) => c.id === v);
    setSubcategories(category.SubCategories);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="editmodaldiv">
          {loading ? (
            <Loader size="2rem" />
          ) : (
            <>
              <Typography component="h1" variant="h5">
                Edit product
              </Typography>
              <Container
                component="main"
                maxWidth="sm"
                sx={{
                  margin: 0,
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    // value={age}
                    sx={{
                      width: "100%",
                    }}
                    className="textfield"
                    defaultValue=""
                    label="Category"
                    onChange={(e) => handleGroupChange(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {groups?.map((g) => {
                      return <MenuItem value={g.id}>{g.vName}</MenuItem>;
                    })}
                    <MenuItem value="">
                      <Link
                        className="missingcategoryoption"
                        to="/admin/group/add"
                      >
                        Missing Group? Add One
                      </Link>
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    // value={age}
                    sx={{
                      width: "100%",
                    }}
                    className="textfield"
                    defaultValue=""
                    label="Category"
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories?.map((c) => {
                      return <MenuItem value={c.id}>{c.vName}</MenuItem>;
                    })}
                    <MenuItem value="">
                      <Link
                        className="missingcategoryoption"
                        to="/admin/categories/add"
                      >
                        Missing Category? Add One
                      </Link>
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Sub Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    // value={age}
                    sx={{
                      width: "100%",
                    }}
                    className="textfield"
                    defaultValue=""
                    label="Category"
                    onChange={(e) =>
                      setProduct((product) => ({
                        ...product,
                        iSubCategoryId: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {subcategories?.map((sc) => {
                      return <MenuItem value={sc.id}>{sc.vName}</MenuItem>;
                    })}
                    <MenuItem value="">
                      <Link
                        className="missingcategoryoption"
                        to="/admin/categories/add"
                      >
                        Missing Sucategory? Add One
                      </Link>
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  className="textfield"
                  onChange={(e) =>
                    setProduct((product) => ({
                      ...product,
                      vTitle: e.target.value,
                    }))
                  }
                  value={product.vTitle}
                />

                <TextField
                  margin="normal"
                  type="number"
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                  autoFocus
                  className="textfield"
                  onChange={(e) =>
                    setProduct((product) => ({
                      ...product,
                      fPrice: e.target.value,
                    }))
                  }
                  value={product.fPrice}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  autoFocus
                  className="textfield"
                  multiline
                  rows={5}
                  onChange={(e) =>
                    setProduct((product) => ({
                      ...product,
                      tDescription: e.target.value,
                    }))
                  }
                  value={product.tDescription}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="image"
                  label="Image Link"
                  name="image"
                  autoComplete="image"
                  className="textfield"
                  onChange={(e) =>
                    setProduct((product) => ({
                      ...product,
                      vImage: e.target.value,
                    }))
                  }
                  value={product.vImage}
                />

                {!loading && (
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Category
                    </InputLabel>
                    <Select
                      value={product.iCategoryId}
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      sx={{
                        width: "100%",
                      }}
                      defaultValue=""
                      className="textfield"
                      label="Category"
                      onChange={(e) =>
                        setProduct((product) => ({
                          ...product,
                          iCategoryId: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categories?.map((c) => {
                        return (
                          <MenuItem value={c.id} key={c.id}>
                            {c.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handleSubmit()}
                >
                  Edit Product
                </Button>
              </Container>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EditProductModal;
