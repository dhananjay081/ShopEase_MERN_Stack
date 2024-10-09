import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
   const dispatch = useDispatch()
   const alert = useAlert();
   const navigate = useNavigate();
   const {error , products } = useSelector((state)=>state.products);

   const {error: deleteError , isDeleted }= useSelector(
      (state)=>state.product
   )

   const deleteProductHandler = (id)=>{
    dispatch(deleteProduct(id));
   }
   
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      alert.success("Product Delete Successfully");
      navigate("/admin/dashboard");
      dispatch({type: DELETE_PRODUCT_RESET})
    }
    

    dispatch(getAdminProducts());
  }, [dispatch, alert, error ,deleteError, navigate , isDeleted ]);
  
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 100, flex: 0.3 },  // Reduced width for Product ID
  
    {
      field: "name",
      headerName: "Name",
      minWidth: 150, // Reduced slightly
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,  // Reduced more
      flex: 0.2,
    },
  
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100, // Reduced for price readability
      flex: 0.3,
    },
  
    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 100, // Slightly reduced to fit edit and delete icons
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
  
            <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  
  
  const rows = [];
  
  products &&
  products.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.Stock,
      price: item.price,
      name: item.name,
    });
  });
  

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
           rows={rows}
           columns={columns}
            autoHeight
           pageSize={10}
           disableColumnResize
           disableColumnReorder
           rowHeight={40} 
             className="productListTable"
          />

        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;