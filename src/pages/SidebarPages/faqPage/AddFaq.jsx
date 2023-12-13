import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import { MenuItem,InputAdornment,Typography } from "@mui/material";
// const [blogSubHeadingField, setBlogSubHeadingField] = useState([{ sub_head_title: "",sub_head_description:""}])

import { Button } from "@mui/material";
import Iconify from "../../../components/Iconify";
import palette from "../../../theme/palette";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CircularProgress from "@mui/material/CircularProgress";
import CustomizedSnackbars from "../../../global/Snackbar/CustomSnackbar";
import noImage from "../../../assests/No_image.svg";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";



function AddFaq({ handleClose }) {
  const [data, setData] = useState();
  const [searchData, setSearchData] = useState([]);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [render, setRender] = useState(false);
  const [search, setSearch] = useState("");


  // React editor Start
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  // React editor End

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);   
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/add_faq`,
        { title: title, description: description },
        { withCredential: true }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        // setMessage((prev) => ({
        //   ...prev,
        //   type: "success",
        //   message: "Blog Added Successfully !!",
        // }));
        // setSnackbarOpen(true);
        setData({
            title:'',
            description:''
        });
        // setBlogSubHeadingField([{sub_head_title: "",sub_head_description:""}])
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setLoading(false);
  };

  // ##################### SNACK BAR FUNCTIONs ##################
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  // ##################### SNACK BAR FUNCTIONs ##################

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


// blogs sub fields

// let addFormFields = () => {
//     setBlogSubHeadingField([...blogSubHeadingField, { sub_head_title: "",sub_head_description:""}])
//   }

//   let removeFormFields = (i) => {
//     let newFormValues = [...blogSubHeadingField];
//     newFormValues.splice(i, 1);
//     setBlogSubHeadingField(newFormValues)
//   }

   // SEARCH FOR PRODUCTS IN BLOGS
   const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/search/products/for/add/a/new/blog?search=${search}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log("res.data?.result-->",res);
        setSearchData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }; 

  return (
    <>
      {/* #################### LOADING SPINNER ######################## */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* #################### LOADING SPINNER ######################## */}
      {/* #################### SANCKBAR MESSAGE ######################## */}
      <CustomizedSnackbars
        onOpen={snackbarOpen}
        // type={message?.type}
        handleClose={handleCloseSnackbar}
        // message={message?.message}
      />

      {/* #################### SANCKBAR MESSAGE ######################## */}
      <div className="product-conatiner">
        <div className="addproducts_slider">
          <div className="slider_heading" >
            <h4>Add Faq</h4>
            <p>Add your Faq here</p>
          </div>
          <div className="close_edit_Category ">
            <HighlightOffIcon
            //   style={{ color: palette.primary.main }}
              onKeyDown={handleClose}
              onClick={handleClose}
              fontSize="large"
            />
            {/* <HighlightOffIcon style={{color:palette.primary.main}}  fontSize='large' /> */}
          </div>
          <div className="addproduct_img_and_details ">
            <div className="add_product_form add-category-innerbox" style={{width: '70%', justifyContent: 'center', alignItems: 'center'}}>
              <form onSubmit={handleSubmit}>

                <div className="add_product_label_input">
                  <label htmlFor=""> Faq Title </label>
                  <TextField
                    required
                    fullWidth
                    className="product_form_input"
                    id="outlined-basic"
                    name="blog_title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    // onChange={handleChange}
                    placeholder="Title "
                    variant="outlined"
                  />
                </div>

          
                <div className="add_product_label_input">
                  <label htmlFor=""> Faq Description </label>
                  <TextField
                    required
                    fullWidth
                    className="product_form_input"
                    id="outlined-basic"
                    name="blog_title"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    // onChange={handleChange}
                    placeholder="Description"
                    variant="outlined"
                  />
                </div>
            

                <div style={{ paddingTop: 20 }}>
                  <Button
                    variant="outlined"
                    style={{ marginRight: "10px" }}
                    onClick={handleClose}
                    startIcon={<Iconify icon="akar-icons:arrow-back" />}
                  >
                    {" "}
                    GO BACK{" "}
                  </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    style={{ padding: "6px 30px" }}
                    startIcon={<Iconify icon="ant-design:plus-outlined" />}
                  >
                    {" "}
                    SAVE{" "}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFaq;
