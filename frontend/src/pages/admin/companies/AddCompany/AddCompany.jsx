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
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../../components/loader/Loader";
import * as Yup from "yup";
import "./AddCompany.css";
import axios from "axios";

const AddCompany = () => {
  const formSchema = Yup.object().shape({
    vName: Yup.string().required("Name is required"),
    vCompanyType: Yup.string().required("Company type is required"),
  });

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      vName: "",
      vCompanyType: "",
    },

    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await axios
          .post("/companies", formik.values, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            toast.success(res.data.message);
          })
          .catch((err) => {
            console.log(err);
            toast(err.response.data.message);
          });
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="addcompanypage">
      {loading && <Loader />}
      <Typography variant="h4">Add Company</Typography>
      <form onSubmit={formik.handleSubmit} className="addcompanyform">
        <TextField
          error={formik.errors.vName && formik.touched.vName ? true : false}
          fullWidth
          id="outlined-error-helper-text"
          label="Name"
          helperText={
            formik.errors.vName && formik.touched.vName
              ? formik.errors.vName
              : " "
          }
          name="vName"
          onChange={formik.handleChange}
          value={formik.values.vName}
          className="customtextfield"
        />
        <FormControl
          fullWidth
          error={
            formik.errors.vCompanyType && formik.touched.vCompanyType
              ? true
              : false
          }
        >
          <InputLabel id="demo-simple-select-error-label">
            Company Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            label="Company Type"
            onChange={formik.handleChange}
            name="vCompanyType"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
            <MenuItem value="beauty">Beauty & Makup</MenuItem>
            <MenuItem value="grooming">Grooming</MenuItem>
          </Select>
          <FormHelperText>
            {formik.errors.vCompanyType && formik.touched.vCompanyType
              ? formik.errors.vCompanyType
              : " "}
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Company
        </Button>
      </form>
    </div>
  );
};

export default AddCompany;
