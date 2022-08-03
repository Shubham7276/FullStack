import {useEffect, useState, useRef} from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from "react-router-dom";

import {CSVLink} from 'react-csv'
import { DataGrid } from '@mui/x-data-grid';


export default function DataTable() {
   

    
    const [data, setData] = useState([]);
  
    const [open, setOpen] = useState(false);

    const columns = [
      { field: '_id', headerName: '_id', hide:true},

      { field: 'title', headerName: 'Title', width: 150,  },
      { field: 'color',
      headerName: 'color',
      renderCell: (params) => {
        return <input type="color" value={params.row.color} name='color' disabled/>
      }, },
      { field: 'description', headerName: 'Description', width: 140 },
      { field: 'location' ,headerName: 'Location', width: 140 },
      { field: 'background', headerName: 'Background', width: 150  },
      {
        field: 'update',
        headerName: 'Update',
        sortable: false,
        renderCell: (params) => {
          return <Button onClick={()=>handleClickOpen(params.id)} variant="contained">Update</Button>;
        },
      },
      {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        renderCell: (params) => {
          return <Button variant="contained" onClick={()=>deleteUser(params.id)} color='error'>Delete</Button>;
        },
      },
      
    ];
    
    const [update,setUpdate] = useState({
        title:"",
        color:"",
        description:"",
        location:"",
        background:""
    })

    const {_id} = update

    const handleClickOpen = async(id) => {
        setOpen(true);
       
		try {
            
			const url = "http://localhost:8080/banner/";
			const res = await axios.get(url+id); 
      setUpdate(res.data)
      
            
		} catch (error) {
			
				console.log(error.response.data.message);
			}
      };

      const handleChange = event => {
        const {name, value} = event.target;
    
        setUpdate({ ...update, [name]: value });
        
        }
    
      const handleClose = () => {
        setOpen(false);
        
      };
    
    useEffect(() => {
        const getallUser = async () => {
            try {
                
                const url = "http://localhost:8080/banner/allbanner";
                const res = await axios.get(url);
                // console.log(res.data);
                setData(res.data)
               
            } catch (error) {
                
                    console.log(error.response.data.message);
                }
            
            
        };
      
        getallUser();
        
    }, [])

    const clickUpdate = async (id,update)=>{
      try {
        const url = "http://localhost:8080/banner/" //incomplet Id is undefind so use static id 
        const res = await axios.put(url+id,update);
        setUpdate("")
        setOpen(false);
       console.log(res.data);
       

       
    } catch (error) {
        
    }
    }

    const deleteUser = async (Id) => {
       
        try {
            const url = "http://localhost:8080/banner/" //incomplet Id is undefind so use static id 
            const res = await axios.delete(url+Id);
            window.location.reload()
            
        } catch (error) {
            
        }
    }

    
    

  return (
      <>
     
      <CSVLink data={data}><Button variant="outlined">Export data to excel</Button></CSVLink>
    
      <Button variant="outlined">Export data to excel</Button>
      <div style={{ height: 631, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        getRowId ={(row) => row._id}
        rowsPerPageOptions={[5]}
        
      />
    </div>
    

        {/* updatde popup */}

        <Dialog  open={open} onClose={handleClose} >
        <DialogTitle>Add New</DialogTitle>
        <DialogContent sx={{width:"400px"}}>
          
          <TextField
            autoFocus
            name='title'
            label="Title"
            value={update.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogContent>
        <input type="color" name='color' 
        value={update.color} onChange={handleChange}
        />
        {update.color}
          
          </DialogContent>
          <DialogContent>
        <TextField
            autoFocus
            name='description'
            label="Description"
            onChange={handleChange}
            value={update.description}
            fullWidth
            variant="outlined"
          />

        </DialogContent>
          <DialogContent>
          <InputLabel id="demo-simple-select-helper-label">Location</InputLabel>
          <Select fullWidth
          name="location"
          value={update.location}
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
        <RadioGroup row name='background' value={update.background} onChange={handleChange}>
        <FormControlLabel value="inline"  control={<Radio />} label="inline" />
        <FormControlLabel value="outline"   control={<Radio />} label="outline" />
        </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>clickUpdate(_id,update)}>Save</Button>
        </DialogActions>
      </Dialog>
        </>
  );
}
