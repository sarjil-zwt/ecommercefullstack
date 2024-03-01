import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminAddProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updatePrduct,
} from "../../../../redux/features/productSlice";
import toast from "react-hot-toast";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CloudUpload } from "@mui/icons-material";

const AdminAddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    ...location.state,
    vTitle: "",
    tDescription: "",
    fPrice: "",
    fTax: "",
    iSubCategoryId: "",
    iCategoryId: "",
    iGroupId: "",
    iCompanyId: "",
    aImages: "",
  });
  const groupsState = useSelector((state) => state.groupsState);

  const [groups, setGroups] = useState(groupsState.groups);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get("/companies").then((res) => {
      setCompanies(res.data.companies);
    });

    console.log(location.state, "************");

    if (location?.state?.editing) {
      setProduct(location.state);
      console.log(
        groups[product.iGroupId - 1].Categories,
        "Categoriessssssssssssssssssssssssssssssssss"
      );
      setCategories(groups[product.iGroupId - 1].Categories);
      setSubcategories(
        groups[product.iGroupId - 1].Categories[product.iCategoryId - 1]
          .SubCategories
      );
      setEditing(true);
    }
  }, []);

  const formSchema = Yup.object().shape({
    vTitle: Yup.string().required("Product Title is required"),
    tDescription: Yup.string().required("Description is required"),
    fPrice: Yup.string().required("Price is required!"),
  });

  const formik = useFormik({
    initialValues: product,
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);

      console.log(formik.values);

      try {
        if (!editing) {
          axios
            .post("/products", formik.values, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log(res.data);
              dispatch(addProduct(res.data));
              toast.success("Product Added Successfully");
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.response.data.message || "Error");
            });
        } else {
          await axios
            .put(`/products/${location.state.id}`, formik.values)
            .then((res) => {
              dispatch(updatePrduct(res.data.product));
              toast.success("Product Updated Successfully");
              navigate(location.state.redirect);
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.response.data.message || "Error");
            });
        }
      } catch (err) {
        toast.error(err.response.data.message || "Error");
      } finally {
      }
    },
  });

  const handleGroupChange = (v) => {
    formik.setFieldValue("iGroupId", v);
    console.log(groups[v - 1]);
    setCategories(groups[v - 1].Categories);
    setSubcategories([]);
  };

  const handleCategoryChange = (v) => {
    formik.setFieldValue("iCategoryId", v);
    const category = categories.find((c) => c.id === v);
    setSubcategories(category.SubCategories);
  };

  const handleImagesChange = (e) => {
    const files = e.target.files;
    let images = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {};
        reader.readAsDataURL(files[i]);
        images.push(files[i]);
      }
    }

    formik.setFieldValue("aImages", images);
  };

  console.log(formik.values);
  return (
    <div className="addproductpage">
      <Typography component="h1" variant="h5">
        {editing ? "Edit" : "Add"} product
      </Typography>
      <form className="addproductdiv" onSubmit={formik.handleSubmit}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Company</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formik.values.iCompanyId}
            onChange={formik.handleChange}
            label="Company"
            name="iCompanyId"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {companies?.map((c) => {
              return (
                <MenuItem value={c.id} key={c.id}>
                  {c.vName}
                </MenuItem>
              );
            })}
            <MenuItem value="">
              <Link
                className="missingcategoryoption"
                to="/admin/categories/add"
              ></Link>
            </MenuItem>
          </Select>
          <FormHelperText>
            {formik.errors.iCompanyId && formik.touched.iCompanyId
              ? formik.errors.iCompanyId
              : " "}
          </FormHelperText>
        </FormControl>

        <FormControl sx={{ width: "100%", m: 0 }}>
          <InputLabel id="demo-simple-select-helper-label">Group</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formik.values.iGroupId}
            sx={{
              width: "100%",
              m: 0,
            }}
            className="textfield"
            label="Group"
            onChange={(e) => handleGroupChange(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {groups?.map((g) => {
              return (
                <MenuItem value={g.id} key={g.id}>
                  {g.vName}
                </MenuItem>
              );
            })}
            <MenuItem value="">
              <Link className="missingcategoryoption" to="/admin/group/add">
                Missing Group? Add One
              </Link>
            </MenuItem>
          </Select>
          <FormHelperText>
            {formik.errors.iGroupId && formik.touched.iGroupId
              ? formik.errors.iGroupId
              : " "}
          </FormHelperText>
        </FormControl>

        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formik.values.iCategoryId}
            label="Category"
            name="iCategoryId"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories?.map((c) => {
              return (
                <MenuItem value={c.id} key={c.id}>
                  {c.vName}
                </MenuItem>
              );
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
          <FormHelperText>
            {formik.errors.iGroupId && formik.touched.iGroupId
              ? formik.errors.iGroupId
              : " "}
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">
            Sub Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formik.values.iSubCategoryId}
            sx={{
              width: "100%",
            }}
            className="textfield"
            label="Sub Category"
            name="iSubCategoryId"
            onChange={formik.handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {subcategories?.map((sc) => {
              return (
                <MenuItem value={sc.id} key={sc.id}>
                  {sc.vName}
                </MenuItem>
              );
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
          <FormHelperText>
            {formik.errors.iGroupId && formik.touched.iGroupId
              ? formik.errors.iGroupId
              : " "}
          </FormHelperText>
        </FormControl>

        <TextField
          focused
          margin="normal"
          fullWidth
          id="title"
          label="Title"
          name="vTitle"
          autoComplete="title"
          className="textfield"
          onChange={formik.handleChange}
          value={formik.values.vTitle}
          error={formik.errors.vTitle && formik.touched.vTitle ? true : false}
          helperText={
            formik.errors.vTitle && formik.touched.vTitle
              ? formik.errors.vTitle
              : " "
          }
          sx={{
            m: 0,
          }}
        />

        <TextField
          focused
          margin="normal"
          type="number"
          fullWidth
          id="price"
          label="Price"
          name="fPrice"
          className="textfield"
          onChange={formik.handleChange}
          value={formik.values.fPrice}
          error={formik.errors.fPrice && formik.touched.fPrice ? true : false}
          helperText={
            formik.errors.fPrice && formik.touched.fPrice
              ? formik.errors.fPrice
              : " "
          }
          sx={{
            m: 0,
          }}
        />

        <TextField
          focused
          margin="normal"
          type="number"
          fullWidth
          id="tax"
          label="Tax in %"
          name="fTax"
          className="textfield"
          onChange={formik.handleChange}
          value={formik.values.fTax}
          error={formik.errors.fTax && formik.touched.fTax ? true : false}
          helperText={
            formik.errors.fTax && formik.touched.fTax ? formik.errors.fTax : " "
          }
          sx={{
            m: 0,
          }}
        />
        <TextField
          focused
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="tDescription"
          className="textfield"
          multiline
          rows={5}
          onChange={formik.handleChange}
          value={formik.values.tDescription}
          error={
            formik.errors.tDescription && formik.touched.tDescription
              ? true
              : false
          }
          helperText={
            formik.errors.tDescription && formik.touched.tDescription
              ? formik.errors.tDescription
              : " "
          }
          sx={{
            m: 0,
          }}
        />

        <input
          type="file"
          onChange={(e) => handleImagesChange(e)}
          multiple
          name="aImages"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 0,
            mb: 0,
          }}
        >
          {editing ? "Edit" : "Add"} Product
        </Button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
