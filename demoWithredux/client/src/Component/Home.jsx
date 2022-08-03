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
import Showbanner from './Showbanner'

export default function Home() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
        title:"",
        color:"",
        description:"",
        location:"",
        
  });

  const handleChange = event => {
    const {name, value} = event.target;

    setData({ ...data, [name]: value });
   
    }

    const handleSubmit = async (e) => {
		e.preventDefault()
		try {
            
			const url = "http://localhost:8080/user";
			const res = await axios.post(url,data);
			// console.log(res.data);
      setData(res.data)
      
      handleClose();
			window.location = "/";
		} catch (error) {
			
				console.log(error.response.data.message);
			}
		
        
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
        <TextField
            autoFocus
            name='location'
            label="Location"
            onChange={handleChange}
            value={data.location}
            fullWidth
            variant="outlined"
          />

        </DialogContent>
        
        <DialogContent>
        <RadioGroup row>
        <FormControlLabel value="inline" onChange={handleChange} control={<Radio />} label="inline" />
        <FormControlLabel value="outline" onChange={handleChange}  control={<Radio />} label="outline" />
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
