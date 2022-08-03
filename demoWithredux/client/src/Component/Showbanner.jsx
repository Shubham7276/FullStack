import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Button } from '@mui/material';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import ReactPaginate from 'react-paginate';

export default function DataTable() {
   
    // const _export = React.useRef(null);

    // const excelExport = () => {
    //   if (_export.current !== null) {
    //     _export.current.save();
    //   }
    // };

    const [data, setData] = useState([]);
    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState();
    const [pageCount, setPageCount] = useState();

    
    const [update,setUpdate] = useState({
        color:"",
        location:""
    })

    const handleClickOpen = async() => {
        setOpen(true);
        
		try {
            
			const url = "http://localhost:8080/user/";
			const res = await axios.put(url+"62e1252dcbe2cdc30f23288d",update); //incomlet Id is undefind so use static id 
			console.log(res.data);
            
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
                
                const url = "http://localhost:8080/user/allusers";
                const res = await axios.get(url);
                // console.log(res.data);
                setData(res.data)
               
            } catch (error) {
                
                    console.log(error.response.data.message);
                }
            
            
        };


      
        getallUser();
        currentuser();
    }, [])

    const currentuser = ()=>{
        data.map((d)=>(
            console.log(d)
        ))
    }
console.log(user);

    const deleteUser = async () => {
        
        try {
            const url = "http://localhost:8080/user/"+"62e1252dcbe2cdc30f23288d"; //incomlet Id is undefind so use static id 
            const res = await axios.delete(url);
            
        } catch (error) {
            
        }
    }

    const handlePageClick = async (event)=>{
      setPage(event.selected + 1)
    };
    useEffect(()=>{
      const pagenation = async()=>{
        const Page = page;
        const url = "http://localhost:8080/user/"
        const res = await axios.get(url+Page)
        setPageCount(data.numberOfPages)
      }
      pagenation()
    },[pageCount,page])
    

  return (
      <>
      
    <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">id</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Colour</TableCell>
            <TableCell align="center">Discription</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Update</TableCell>
            <TableCell align="center">Delete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
       {data?.map((d,index)=>(
         
          <TableRow key={d._id}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">{d.title}</TableCell>
              <TableCell align="center">{d.color}</TableCell>
              <TableCell align="center">{d.description}</TableCell>
              <TableCell align="center">{d.location}</TableCell>
              <TableCell align="center"><Button variant="contained" onClick={handleClickOpen}>Update</Button></TableCell>
              <TableCell align="center"><Button variant="contained" onClick={deleteUser}>Delete</Button></TableCell>
          </TableRow>
          
       ))

       }
        
        </TableBody>
        </Table>
        <ReactPaginate 
        previousLabel={'<<'}
        nextLabel={'>>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
        renderOnZeroPageCount={null}
      />
    

        {/* updatde popup */}

        <Dialog  open={open} onClose={handleClose} >
        <DialogTitle>Add New</DialogTitle>
        <DialogContent sx={{width:"400px"}}>
          
          <TextField
            autoFocus
            name='title'
            label="Title"
            // value={data.title}
            // onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogContent>
        <input type="color" name='color' 
        value={update.color} onChange={handleChange}
        />
          
          </DialogContent>
          <DialogContent>
        <TextField
            autoFocus
            name='description'
            label="Description"
            // onChange={handleChange}
            // value={data.description}
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
            value={update.location}
            fullWidth
            variant="outlined"
          />

        </DialogContent>
        
        <DialogContent>
        <RadioGroup row>
        <FormControlLabel value="inline"  control={<Radio />} label="inline" />
        <FormControlLabel value="outline"   control={<Radio />} label="outline" />
        </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickOpen}>Save</Button>
        </DialogActions>
      </Dialog>
        </>
  );
}
