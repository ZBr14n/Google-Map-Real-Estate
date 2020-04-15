import React, {useState,useEffect,useRef} from 'react'
import propertiesBuy from '../data/listingsData.js';
import '../Listings.css';
import {Modal} from 'react-bootstrap';



export default function Listings() {

    const [FilteredBuyData,setFilteredBuyData] = useState([]);
    const [show, setShow] = useState(false);


    // to be used in the modal
    const [savePrice, setSavePrice] = useState('');
    const [saveBD, setSaveBD] = useState('');
    const [saveBR, setSaveBR] = useState('');
    const [saveSize, setSaveSize] = useState('');
    const [saveADDR, setSaveADDR] = useState('');
    const [saveImage, setSaveImage] = useState('');

    const [priceClass, setPriceClass] = useState('lowest-price');
    
    useEffect(()=>{
        setFilteredBuyData(propertiesBuy)
    },[])
    
    const MapPropertiesBuy = () => {
        // return FilteredBuyData;
        let newData=[];
                
        if(priceClass==='lowest-price'){
            newData=FilteredBuyData.sort((a,b)=>{
                return Number((a.price).replace(/[^\d.]/g, '')) > Number((b.price).replace(/[^\d.]/g, ''));
            });
            setFilteredBuyData(newData);
            // setPriceClass('price')
            
        }
        if(priceClass==='highest-price'){
            newData=FilteredBuyData.sort((a,b)=>{
                return Number((a.price).replace(/[^\d.]/g, '')) < Number((b.price).replace(/[^\d.]/g, ''));
            });
            setFilteredBuyData(newData);
            // setPriceClass('price')
        }
        

        return FilteredBuyData.map((entry,index)=>{
            
            if(index < FilteredBuyData.length){
                return(
                    <>
                    <a onClick={()=>{
                        setShow(true)
                        setSavePrice(entry.price)
                        setSaveBD(entry.bedrooms)
                        setSaveBR(entry.bathrooms)
                        setSaveImage(entry.image)
                        setSaveADDR(entry.address)
                        setSaveSize(entry.size)
                    }}>


                    <div className="house-images" style={{background: `url(${entry.image}) no-repeat center center / cover`, width: '100%', height: '100%'}}>
                        <h3>{entry.price}</h3>
                        <p>{entry.bedrooms} {entry.bathrooms} {entry.size}</p>                            
                        <p>{entry.address}</p>
                    </div>
                    </a>
                                           
                        <Modal size={'lg'} show={show} onHide={()=>setShow(false)} className="special_modal">
                            <Modal.Header closeButton>
                                {/* <Modal.Title></Modal.Title> */}
                            </Modal.Header>
                            <Modal.Body>
                                <div style={{background: `url(${saveImage}) no-repeat center center / cover`, width: '100%', height: '100%'}}>                                

                                </div>
                            </Modal.Body>
                            <div className="modal-house-info" style={{paddingLeft: '10px',paddingBottom: '10px'}}>
                                <strong><h1>{savePrice}</h1></strong>
                                <h3><span>
                                    {saveBD} {' '} {saveBR} {' '} {saveSize}
                                </span><br />
                                {saveADDR}</h3>
                            </div>
                        </Modal>             
                                                                       
                                                         
                    </>
                    
                )
            }
        });           
    }

    const handleClick = (event) => {       
        setPriceClass(event.target.className);       
    }
    
    return (
        <div className="container-grid">
            <div className="grid-header">
                <h2>Real Estate Search Platform</h2>
                <p>{propertiesBuy.length} homes for sale</p>

                <div className="price-wrapper">
                    <span onClick={handleClick} className='lowest-price'>Lowest Price</span>
                    <span className="price-separator"></span>
                    <span onClick={handleClick} className='highest-price'>Highest Price</span>
                </div>
            </div>
            
  
            
            {/* create a div for the grid first, and then flex */}
            <MapPropertiesBuy />                
            

            
        </div>
    )
}
