import {useState} from 'react'
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Showbanner from './Showbanner';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {AddBanner} from '../Services/api'

import {  useDispatch } from "react-redux";
import {createBanner} from '../action/BannerAction'

export default function Home() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
        title:"",
        color:"",
        description:"",
        location:"",
        background:""
        
  });

  const dispatch=useDispatch()

  const handleChange = event => {
    const {name, value} = event.target;

    setData({ ...data, [name]: value });
   console.log(data)
    }

    const handleSubmit = async (e) => {

     dispatch(createBanner(data))
      
		// try {
		// 	const res = await AddBanner(data);
    //   setData(res.data)
    //   handleClose();
		// 	window.location = "/";
		// } catch (error) {
			
		// 		console.log(error.response.data.message);
		// 	}
		
        
	};
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData("")
  };




  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Banner
      </Button>
      <Dialog  open={open} onClose={handleClose} >
        <DialogTitle>Add New</DialogTitle>
        <DialogContent sx={{width:"400px"}}>
          
          <TextField
            autoFocus
            name='title'
            label="Title"
            value={data.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogContent>
        <input type="color" name='color' value={data.color} onChange={handleChange}/>
          
          </DialogContent>
          <DialogContent>
        <TextField
            autoFocus
            name='description'
            label="Description"
            onChange={handleChange}
            value={data.description}
            fullWidth
            variant="outlined"
          />

        </DialogContent>
          <DialogContent>
          <InputLabel id="demo-simple-select-helper-label">Location</InputLabel>
          <Select fullWidth
          name="location"
          value={data.location}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
         
          <MenuItem value="Navarangpura">Navarangpura</MenuItem>
          <MenuItem value="Swastik Char">Swastik Char</MenuItem>
          <MenuItem value="Lal Darwaja">Lal Darwaja</MenuItem>
        </Select>

        </DialogContent>
        
        <DialogContent>
        <RadioGroup row name='background' value={data.background} onChange={handleChange}>
          <FormControlLabel value="inline"  control={<Radio />} label="inline" />
          <FormControlLabel value="outline"  control={<Radio />} label="outline" />
        </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
      <Showbanner />
    </div>
  );
}
