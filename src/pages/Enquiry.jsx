import * as React from "react";
import { useState, useRef, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  Toolbar,
  TextField,
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Button,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import LoadingSpinner from "../components/Spinner";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";
import OrderListToolbar from "../sections/@dashboard/orders/OrderListToolbar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Iconify from "../components/Iconify";
import { DateRangePicker } from "react-date-range";
import searchNotFound from "../assests/searchnotfound.gif";
import { addDays } from "date-fns";
import {
  convertDateForOrder,
  convertDate,
  getGapBetweenDates,
} from "../global/globalFunctions";
import SideDrawer from "../global/Drawer";
import ViewOrder from "./SidebarPages/orderpage/ViewOrder";
import ConfimModal from "../global/Modals/ConfimModal";
import CsvDownloadButton from "react-json-to-csv";
import palette from "src/theme/palette";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EnquiryPreview from "src/global/Modals/EnquiryPreview";

function createData(name, calories, fat, carbs, protein, amount, status) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    amount,
    status,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, "COD", 40, "pending"),
  createData("Donut", 452, 25.0, 51, "COD", 100, "cancel"),
  createData("Eclair", 262, 16.0, 24, "COD", 100, "delivered"),
  createData("Frozen yoghurt", 159, 6.0, 24, "COD", 100, "delivered"),
  createData("Gingerbread", 356, 16.0, 49, "COD", 10, "pending"),
  createData("Honeycomb", 408, 3.2, 87, "COD", 100, "pending"),
  createData("Ice cream sandwich", 237, 9.0, 37, "COD", 100, "pending"),
  createData("Jelly Bean", 375, 0.0, 94, "COD", 100, "processing"),
  createData("KitKat", 518, 26.0, 65, "COD", 20, "processing"),
  createData("Lollipop", 392, 0.2, 98, "COD", 100, "processing"),
  createData("Marshmallow", 318, 0, 81, "COD", 100, "pending"),
  createData("Nougat", 360, 19.0, 9, "COD", 100, "cancel"),
  createData("Oreo", 437, 18.0, 63, "COD", 100, "cancel"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "Phonember",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  // {
  //   id: "pro_code",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "Product CODE",
  // },
  {
    id: "product_name",
    numeric: true,
    disablePadding: false,
    label: "Product Name",
  },
  // {
  //   id: 'shippingAddress',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Shipping Address',
  // },

  {
    id: "Date & Time",
    numeric: true,
    disablePadding: false,
    label: "Date & Time",
  },
  {
    id: "message",
    numeric: true,
    disablePadding: false,
    label: "Message",
  },
  // {
  //   id: 'status',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Status',
  // },
  // {
  //   id: 'action',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Action',
  // },
  {
    id: "view",
    numeric: true,
    disablePadding: false,
    label: "View",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "none"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ textTransform: "uppercase" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref2 = useRef(null);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {`All Enquiries (${props.orderCount})`}
        </Typography>
      )}

      <Tooltip title="Filter list">
        <>
          {numSelected > 0 && (
            <Tooltip title="More">
              <IconButton>
                <MoreVertOutlinedIcon
                  style={{ cursor: "pointer" }}
                  ref={ref2}
                  onClick={() => setIsOpen2(true)}
                  fontSize="medium"
                />
                <Menu
                  open={isOpen2}
                  anchorEl={ref2.current}
                  onClose={() => setIsOpen2(false)}
                  PaperProps={{
                    sx: { width: 200, maxWidth: "100%" },
                  }}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    sx={{ color: "text.secondary" }}
                    onClick={() => props.setOpenDeleteConfimModal(true)}
                  >
                    <ListItemIcon>
                      <Iconify
                        icon="eva:trash-2-outline"
                        width={24}
                        height={24}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Delete Enquiries"
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </MenuItem>
                </Menu>
              </IconButton>
            </Tooltip>
          )}
        </>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filterName, setFilterName] = useState("");
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [drawerEditOrders, setDrawerEditOrders] = React.useState(false);
  const [openEnquiryPreview, setOpenEnquiryPreview] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState([]);
  const [orderIdForEdit, setOrderIdForEdit] = useState("");
  const [ordersCount, setOrdersCount] = useState(0);
  const [allOrders, setAllOrders] = useState();
  const [filters, setFilters] = useState({
    by_status: "all",
    recentDays: "All",
  });
  const [age, setAge] = React.useState("");
  const [openDeleteConfimModal, setOpenDeleteConfimModal] = useState(false);
  const [message, setMessage] = useState({ type: "", message: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [stateDate, setStateDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      startDate: "",
      endDate: "",
      key: "selection",
    },
  ]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // GET ALL ORDERS
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/get/all/orders`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setAllOrders(res?.data?.allOrders);
        // setOrdersCount(res?.data?.ordersCount);
        setOrderStatusFilter(res?.data?.order_status);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [render]);

  // SEARCH IN users TABLE
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/search/in/orders?search=${search}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setAllOrders(res?.data);
        // setOrdersCount(res.data?.length || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  console.log("filters?.by_status", filters);

  // FILTERS FOR Orders
  useEffect(() => {
    if (filters.by_status === "all" && filters.recentDays === "All") {
      setRender((prev) => !prev);
      return;
    }
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/filter/by/orders?by_status=${filters?.by_status}&date_from=${stateDate[0]?.startDate}&date_to=${stateDate[0]?.endDate}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setAllOrders(res?.data);
        // setOrdersCount(res?.data?.length);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [filters?.by_status, stateDate, filters?.recentDays]);

  //############################# HANDLE DELETE ORDER FUNCTION #############################
  const handleDleteOrders = async (value) => {
    console.log("VALUE FOR DELETE=>", value);
    await axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/delete/order/by/id`,
        { data: value },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setOpenDeleteConfimModal(false);
        setRender((prev) => !prev);
        if (res?.data?.status) {
          setMessage((prev) => ({
            ...prev,
            type: "success",
            message: "Enquiries Deleted Successfully !",
          }));
          setSnackbarOpen(true);
          setFilters((prev) => ({ ...prev, by_category: "all" }));
        }
        if (!res?.data?.status) {
          setMessage((prev) => ({
            ...prev,
            type: "error",
            message: "An Unexpected Error occur !",
          }));
          setSnackbarOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setOpenDeleteConfimModal(false);
      });
    setSelected([]);
  };
  //############################# HANDLE DELETE ORDER FUNCTION #############################

  //############################# CLOSE DELETE CONFIRM MODAL FUNCTION #############################
  const handleCloseConfimModal = () => {
    setOpenDeleteConfimModal(false);
    setIsOpen2(false);
  };
  //############################# CLOSE DELETE CONFIM MODAL FUNCTION #############################

  //############################# EDIT Order SIDE BAR DRAWER FUNCTION #############################
  const handleOpenEditOrderSidebar = () => {
    setDrawerEditOrders(true);
  };

  const handleCloseEditOrderSideBar = () => {
    setDrawerEditOrders(false);
    setRender((prev) => !prev);
  };
  //############################# EDIT Order SIDE BAR DRAWER FUNCTION #############################

  //====================== HANDLE Order status FILTER  ===========================
  const handleOrderStatusFilterChange = (e) => {
    if (e.target.value === "all") {
      setFilters((prev) => ({ ...prev, by_status: e.target.value }));
      setRender((prev) => !prev);
      return;
    }
    setFilters((prev) => ({ ...prev, by_status: e.target.value }));
  };
  //====================== HANDLE order status FILTER  ===========================

  // handle recent Order fucntion
  const handleRecentOrders = (value) => {
    console.log("+++++value=========", value);
    let date = new Date().toJSON().slice(0, 10);
    // console.log(date); // "2022-06-17"
    const currentDate = new Date().toDateString();
    // console.log("current Date",currentDate.length)
    const getCompareValue = `${value?.startDate}`;
    // console.log("getCompareValue",getCompareValue?.slice(0,15)?.length)

    // FOR SETTING TODAY IN DATE FILTER
    if (getCompareValue?.slice(0, 15) == `${currentDate}`) {
      // console.log("ENTERED")
      setFilters((prev) => ({ ...prev, recentDays: "Today" }));
      return;
    }
    const startDateGap = getGapBetweenDates(value?.endDate, value?.startDate);
    console.log("getGapBetweenDates", startDateGap);
    // FOR SETTING YESTERDAY IN DATE FILTER
    if (startDateGap == 1) {
      setFilters((prev) => ({ ...prev, recentDays: "Yesterday" }));
      return;
    }
    // FOR SETTING YESTERDAY IN DATE FILTER
    if (startDateGap == 7) {
      setFilters((prev) => ({ ...prev, recentDays: "Week" }));
      return;
    }
    // FOR SETTING YESTERDAY IN DATE FILTER
    if ((startDateGap == 30, 31, 29, 28)) {
      setFilters((prev) => ({ ...prev, recentDays: "Month" }));
      // return;
    }
    if ((startDateGap != 30, 31, 29, 28, 1, 7)) {
      // console.log("ELSE")
      setFilters((prev) => ({ ...prev, recentDays: "Custom" }));
    }

    if (filters.recentDays == "All") {
      setRender((prev) => !prev);
      return;
    }

    console.log(value);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allOrders?.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  let forDownloadOrders = [];
  allOrders?.map((value) => {
    // forDownloadOrders.push({...value,products:value?.products})
    value?.products?.map((prod, index) => {
      forDownloadOrders.push({ value, prod });
    });
  });

  console.log("forDownloadOrders", forDownloadOrders);

  function handleCloseEnquiryPreview() {
    setOpenEnquiryPreview(false);
  }

  function handleOpenEnquiryPreview(data) {
    setOpenEnquiryPreview(true);
    setPreviewData(data)
  }


  // Fetching Data
  const [minData, setMainData] = useState([]);

  const fetchData = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/get/enquiry`;
      const res = await axios.get(url);

      setMainData(res.data.data?.reverse());
      setOrdersCount(res.data.data?.length);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("minData======>>>",minData);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <LoadingSpinner loading={loading} />
      <EnquiryPreview
        open={openEnquiryPreview}
        previewData={previewData}
        handleClose={handleCloseEnquiryPreview}
      />
      <div className="custom-conatiner">
        {/*################ EDIT PRODUCT SIDEBAR  ################*/}
        <SideDrawer
          state={drawerEditOrders}
          toggleDrawerClose={handleCloseEditOrderSideBar}
          toggleDrawerOpen={handleOpenEditOrderSidebar}
          ComponentData={
            <ViewOrder
              handleClose={handleCloseEditOrderSideBar}
              orderId={orderIdForEdit}
            />
          }
        />
        {/*################ EDIT PRODUCT SIDEBAR  ################*/}
        {/* CONFIRM MODAL */}
        <ConfimModal
          open={openDeleteConfimModal}
          title="Delete"
          onYes={() => handleDleteOrders(selected)}
          message="Do you want to delete?"
          handleClose={handleCloseConfimModal}
        />
        {/* CONFIRM MODAL */}
        <Box sx={{ width: "100%" }}>
          <Paper elevation={3} sx={{ width: "100%", mb: 2, borderRadius: 1 }}>
            <div className="product-topbar-box vendor-topbar-box ">
              <h3 className=""> Enquiries</h3>
              <div className="product-topbar-btn">
                {/* <Button className='hide-mobile' variant="outlined"  startIcon={<Iconify icon="akar-icons:download" />}> 
      Export
         </Button> */}
              </div>
            </div>
            <div className="flex order-top-bar ">
              <form
                onSubmit={handleSearch}
                className="flex"
                style={{ width: "100%" }}
              >
                <TextField
                  id="outlined-basic"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  fullWidth
                  label="Search In Enquiries"
                  placeholder="Search Anything..."
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  sx={{ mx: 2, height: 54, px: 5 }}
                  variant="contained"
                  type="submit"
                >
                  Search
                </Button>
              </form>
              {/* <CsvDownloadButton className='download-table-xls-button'  data={allOrders} /> */}
              {/* <JsonToExcel
        title="Download as Excel"
        data={forDownloadOrders}
        fileName="sample-file"
      /> */}

              {/* <div className="order-toolbar-selectbox-1" >
   <FormControl fullWidth  >

      <TextField
        labelId="demo-select-small"
        id="demo-select-small"
        value={filters?.by_status}
        label="Filter By Status"
        style={{textTransform:'capitalize'}}
        select
        onChange={handleOrderStatusFilterChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <FilterAltOutlinedIcon />
            </InputAdornment>
          ),
        }}
      >

        <MenuItem style={{textTransform:'capitalize'}} value='all'>All</MenuItem>
        {orderStatusFilter?.map((value,index)=>(
          <MenuItem style={{textTransform:'capitalize'}} key={value?.id} value={value?.name}>{value?.name}</MenuItem>
          
        ))}
      </TextField>
      </FormControl>
   </div> */}

              {/* <div className="order-toolbar-selectbox-2" >
     <FormControl fullWidth  >
<TextField
        id="basic-button"
        InputProps={{
          
          startAdornment: (
            <InputAdornment position="start">
               <CalendarMonthIcon />
            </InputAdornment>
            
            
          ),
          endAdornment: (
            <InputAdornment position="end">
               <ArrowDropDownIcon />
            </InputAdornment>
            
            
          ),
          readOnly: true,
         
        }}
       
        label="Recent Orders"
        aria-readonly={true}
        value={filters?.recentDays}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickMenu}
        
      />
      

          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
         PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
           
          },
        }}
      >
        <div className='date-filter-box' >
        <DateRangePicker
 
 onChange={item => {setStateDate([item.selection])
  handleRecentOrders(item.selection)

  }}
 showSelectionPreview={false}
 showPreview={false}
 moveRangeOnFirstSelection={false}
 months={1}
 
 ranges={stateDate}
 direction="vertical"
/>
<div className='date-filter-reset-btn' >

<Button onClick={()=>{setFilters((prev)=>({...prev,recentDays:'All'}))
                                                              setStateDate([ {
                                                                
                                                                startDate: '',
                                                                endDate: '',
                                                                key: 'selection'
                                                              }])
                                                            }}  variant="contained" > Reset</Button>
                                                            </div>
        </div>



      </Menu>
      </FormControl>
     </div> */}

              {/* <div className='more-icon-btn' >
    <Tooltip title="Filter list">
            <>
       <MoreVertOutlinedIcon style={{cursor:"pointer"}} ref={ref2} onClick={() => setIsOpen2(true)} fontSize='medium' />
       <Menu
        open={isOpen2}
        anchorEl={ref2.current}
        onClose={() => setIsOpen2(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Customer" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={Link} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:download-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Download" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      </>

        </Tooltip>
       </div>
     <div className='more-text-btn'  >
      <Tooltip title="Filter list">
            <>
      <p  style={{display:"flex",justifyContent:"end"}} ref={ref} onClick={() => setIsOpen(true)} >More Option <ExpandMoreIcon /></p>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Customer" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={Link} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>

        </Tooltip>
     </div> */}
            </div>
          </Paper>

          <Paper elevation={3} sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar
              setOpenDeleteConfimModal={setOpenDeleteConfimModal}
              orderCount={ordersCount}
              numSelected={selected.length}
            />
            <TableContainer>
              <Table
                id="order-to-xls"
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={allOrders?.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {minData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      console.log(row);

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onClick={(event) => handleClick(event, row._id)}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>

                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row?.name}
                          </TableCell>
                          <TableCell align="center">{row?.phone_no} </TableCell>
                          {/* <TableCell
                            align="center"
                            style={{ textTransform: "capitalize" }}
                          >
                            {row?.product_detail?.product_code}
                          </TableCell> */}

                          <TableCell align="center">{row?.medicine}</TableCell>
                          <TableCell align="center">
                            {/* {new Date(row?.product_detail?.createdAt).getDate()}
                            /
                            {new Date(
                              row?.product_detail?.createdAt
                            ).getMonth()}
                            /
                            {new Date(
                              row?.product_detail?.createdAt
                            ).getFullYear()} */}
                            {convertDate(row?.createdAt)}
                            {/* {convertDate(row?.product_detail?.createdAt)} */}
                            -
                            {new Date(
                              row?.createdAt
                            ).getHours()}
                            :
                            {new Date(
                              row?.createdAt
                            ).getMinutes()}

{/* {new Date(row?.product_detail?.createdAt)}
{row?.product_detail?.createdAt.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})}

{row?.product_detail?.createdAt.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
})} */}


                          </TableCell>
                          <TableCell align="center">{row?.message}</TableCell>

                          <TableCell align="center">
                            <VisibilityIcon
                              style={{ cursor: "pointer" }}
                              fontSize="small"
                              onClick={() => handleOpenEnquiryPreview(row)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    </>
  );
}
