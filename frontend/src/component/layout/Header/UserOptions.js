import React, { Fragment, useState } from 'react'
import "./userOption.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from '@material-ui/core/Backdrop';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch , useSelector } from 'react-redux';


function UserOptions({user}) {
    const {cartItems} = useSelector((state)=>state.cart);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert()
    const dispatch  = useDispatch();

    const options = [
         {icons: <ListAltIcon/> , name:"Orders", func :orders},
         {icons: <PersonIcon/> , name:"Profile", func : account},
         {icons: <ShoppingCartIcon
           style={{color: cartItems.length>0 ? "tomato" : "unset"}}
         /> , name:`Cart(${cartItems.length})`, func : cart},
         {icons: <ExitToAppIcon/> , name:"Logout", func :logoutUser},
    ]
    
    if(user?.role === "admin"){
        options.unshift({
            icons: <DashboardIcon/>,
            name : "dashboard",
            func:dashboard,
        });
    }
  
    function dashboard(){
        navigate("/admin/dashboard")
    }
    function orders(){
        navigate("/orders")
    }
    function account(){
        navigate("/account")
    }
    function cart(){
        navigate("/cart")
    }
    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully")
    }

    return (
        <Fragment>
            <Backdrop open = {open} style={{zIndex: "8"}}/>
            <SpeedDial 
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{zIndex: "11"}}
                open={open}
                direction='down'
                className='speedDial'
                icon = {
                    <img
                      className='speedDialIcon'
                      src={user?.avatar ? user.avatar.url: "./Profile.png"}
                      alt="Profile"
                    />
                }
              >
                
                {
                    options.map((item)=>(
                        <SpeedDialAction 
                        key = {item.name}
                        icon = {item.icons} 
                        tooltipTitle = {item.name}
                        onClick={item.func}
                        tooltipOpen ={window.innerWidth <=600 ? true : false}
                        />
                    ))
                }
            
            </SpeedDial>
        </Fragment>
    );
}

export default UserOptions;
