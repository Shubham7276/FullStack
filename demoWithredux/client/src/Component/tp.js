import {useEffect , useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];



export default function DataTable() {

    const [data, setData] = useState([]);
    const rows = [
        data.map((d)=>(
            d.title
        ))
  
    ];
    useEffect(() => {
        const getallUser = async () => {
            try {
                
                const url = "http://localhost:8080/user/allusers";
                const res = await axios.get(url);
                // console.log(res.data);
                setData(res.data)
                console.log(res.data);
                // window.location = "/";
            } catch (error) {
                
                    console.log(error.response.data.message);
                }
            
            
        };
      
        getallUser();
    }, [])
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
