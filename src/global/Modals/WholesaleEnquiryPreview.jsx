import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Iconify from 'src/components/Iconify';
import LoadingSpinner from 'src/components/Spinner';
import { LoadingButton } from '@mui/lab';
import imageImport from 'src/utils/imageImport';
import palette from 'src/theme/palette';
import { editable_config } from 'src/editable_config';
import { convertDate } from 'src/global/globalFunctions';
import { IconButton } from '@mui/material';

function WholesaleEnquiryPreview(props) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius:"10px 10px ",
    boxShadow: 24,
    p: 2,
  };

  
 
  
  return (
   <div >

      
      <Modal
   open={props.open}
   onClose={props.handleClose}
   aria-labelledby="modal-modal-title"
   aria-describedby="modal-modal-description"
   disableAutoFocus
      >
        <Fade in={props.open}>
          <Box sx={style}>
          <div className='image-guide-heading'  >
      <p>Wholesale Enquiry Preview</p>
      <IconButton onClick={props.handleClose} size='medium'  style={{color:'text.secondary'}} >
    <Iconify className='image-guide-line-close'  icon="ic:twotone-close" />
      </IconButton>
    </div>
    <div className='enquiry-content-box' > 
    <p className='enquiry-preview-detail' >Product Code : <span className='enquiry-details-preview-content' >CASXOIW00021</span> </p>
    <p className='enquiry-preview-detail' >Product Name : <span className='enquiry-details-preview-content' >Dabur Steam Inhalation Capsules</span> </p>
    <p className='enquiry-preview-detail' >Name : <span className='enquiry-details-preview-content' >Ram laal	</span> </p>
    <p className='enquiry-preview-detail' >Phone Number : <span className='enquiry-details-preview-content font-capitalize-case ' >+91-87990098987</span> </p>
    <p className='enquiry-preview-detail' >Date & Time : <span className='enquiry-details-preview-content' >23-August-2023,9:00 PM </span> </p>
    <p className='enquiry-preview-detail' >Message : </p>
   <div className='enquiry-message-box' > <p className='enquiry-details-preview-content font-capitalize-case ' > It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p></div>

         <div className='text-algin-center confirm-button-popup ' >
          {/* <Button variant='text' onClick={props.handleClose}  >{props.cancelBtnName}</Button> */}
         </div>
    </div>
          </Box>
        </Fade>
      </Modal>

   
        
   </div>
  )
}

export default WholesaleEnquiryPreview;