import  React, { useEffect } from 'react';
import { styled } from '@mui/system';
import  './DashboardManagers.css';

import {
TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function DashBoardManagers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const token = localStorage.getItem("token")

  const {data , isLoading} = useQuery(getDashBoardManager,"getDashBoardManager")

  useEffect(()=>{
    getDashBoardManager()
  })

  function getDashBoardManager(){
    
    axios.get("https://meetingss.onrender.com/dashboard/getAllManagers",{
      headers:{
        token:token
      }
    }).
    then((response)=>{
      console.log(response);
    
        if (response.data.success) {
        }else{

        }
      }
    ).catch((error)=>{
      console.error(error);
    })
  }

  return <>
    <div className="main bg-danger d-flex justify-content-center align-items-center">
      <div className="container parent-dash p-2 d-flex justify-content-center ">
        
<Root sx={{ maxWidth: '100%', width: 2000 ,  }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Acceptance</th>
            <th>
             Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {(data
            ? data.data.managers?.map((manager,idx) => (
            <tr key={idx}>
              <td style={{ width: 270 , border:0  }}>{manager.UserName}</td>
              <td style={{ width: 270 , border:0 }} align="right">
                {manager.first_name+' '+manager.last_name}
              </td>
              <td style={{ width: 270 , border:0 }} align="right">
                {manager.E_mail}
              </td>
              <td style={{ width: 250 , border:0 }} align="right">
                {manager.fat}
              </td>
              <td style={{ width: 250 , border:0 }} align="right">
              <button className='btn btn-danger'>
              Delete
              </button> 
              </td>

            </tr>
          )):"")}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
      </div>
    </div>
    
  
  </>
  
}

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
