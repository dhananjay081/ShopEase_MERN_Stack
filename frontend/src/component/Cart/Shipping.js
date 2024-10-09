import React, {Fragment , useState} from 'react'
import "./Shipping.css"
import { useSelector , useDispatch } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartAction'
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import {Country , State}  from "country-state-city"
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

import CheckoutSteps from "../Cart/CheckoutSteps.js"
import { useNavigate } from 'react-router-dom';

function Shipping() {
    const dispatch =  useDispatch();
    const nevigate = useNavigate();
    const alert = useAlert();
    const {ShippingInfo} = useSelector((state)=>state.cart);

    const[address , setAddress ] = useState(ShippingInfo.address)
    const[city , setCity ] = useState(ShippingInfo.city)
    const[state , setState ] = useState(ShippingInfo.state)
    const[country , setCountry ] = useState(ShippingInfo.country)
    const[pinCode , setPinCode ] = useState(ShippingInfo.pinCode)
    const[phoneNo , setPhoneNo ] = useState(ShippingInfo.phoneNo)

    const ShippingSubmit = (e) =>{
        e.preventDefault();
        
        if(phoneNo.length < 10 || phoneNo.length > 10 ){
            alert.error("Phone Number should be 10 digit");
            return;
        }
        dispatch(
            saveShippingInfo({address , city , state , pinCode , phoneNo , country})
        );
        nevigate("/order/confirm");
    };
  return <Fragment>
            
            <MetaData title="Shipping Details"/>

              <CheckoutSteps activeStep={0}/>

            <div className='shippingContainer'>
                 <div className='shippingBox'>
                    <h2 className='shippingHeading'>Shipping Details</h2>

                    <form
                     className='shippingForm'
                       encType="multipart/form-data"
                       onSubmit={ShippingSubmit}
                    >
                        <div>
                            <HomeIcon/>
                             <input
                             type='text'
                             placeholder='Address'
                             required
                             value={address}
                             onChange={(e)=>setAddress(e.target.value)}
                             />
                        </div>

                        <div>
                            <LocationOnIcon/>
                             <input
                             type='text'
                             placeholder='City'
                             required
                             value={city}
                             onChange={(e)=>setCity(e.target.value)}
                             />
                        </div>

                        <div>
                            <PinDropIcon/>
                             <input
                             type='number'
                             placeholder='Pin Code'
                             required
                             value={pinCode}
                             onChange={(e)=>setPinCode(e.target.value)}
                             />
                        </div>

                        <div>
                            <PhoneIcon/>
                            <input
                             type='number'
                             placeholder='Phone Number'
                             required
                             value={phoneNo}
                             onChange={(e)=>setPhoneNo(e.target.value)}
                             />
                        </div>

                        <div>
                            <PublicIcon/>
                            <select
                             required
                             value={country}
                             onChange={(e)=>setCountry(e.target.value)}
                             > 
                               <option value="">Country</option>
                                {Country && Country.getAllCountries().map((item)=>(
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                             </select>
                        </div>
                            {country && (
                              <div><select
                              required
                              value={state}
                              onChange={(e)=> setState(e.target.value)}
                             >
                               <option value="">State</option>
                                { State && 
                                  State.getStatesOfCountry(country).map((item)=>(
                                     <option key={item.isoCode} value={item.isoCode}>
                                         {item.name}
                                     </option>
                                  ))}
                             </select>
                           </div>
                        )}
                        <input
                          type="submit"
                          value="Countiue"
                          className='shippingBtn'
                          disabled={state? false : true}
                        />
                    </form>
                 </div>
            </div>
         </Fragment>

}

export default Shipping