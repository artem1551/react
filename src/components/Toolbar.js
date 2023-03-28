import React, {useEffect, useState} from 'react';
import { 
    TableContainer,
    TableToolbar,
    TableToolbarSearch,
    TableToolbarContent,
    TableCell,
    TableRow,
    TableBody,
    TableHeader,
    TableHead,
    Table,
    DataTable,
    Button,
     } from '@carbon/react';
import { Add } from '@carbon/react/icons'
import {headerData} from '../components/sampleData'
import Overflow from './Overflow';
import ModalAddPerson from './Modal/ModalAddPerson';
import axios from 'axios';

const src = 'http://localhost:3000/user';

function Toolbar() {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(src)
  .then(function (response) {
    setUsers(response.data)
  })
  .catch(function (error) {
    console.log(error);
  })
  }, [])

  const onModalClose = () => {
    axios.get(src)
    .then(function (response) {
      setUsers(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
      <div>
        <DataTable rows={users} headers={headerData}>
      {({ rows, headers, getHeaderProps, getTableProps }) => (
        <TableContainer title="DataTable">
           <TableToolbar aria-label="data table toolbar">
          <TableToolbarContent>
            <TableToolbarSearch />
            <Button 
            renderIcon={props => <Add size={16} {...props} />}
            onClick={() => setShow(true)}
            >Add Person</Button>
          </TableToolbarContent>
        </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
                <TableHeader></TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} className={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                  <TableCell className={row.id}><Overflow onModalClose={onModalClose} idElem={row.id}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </DataTable>
     <ModalAddPerson btnName='Add' onModalClose={onModalClose} show={show} setShow={setShow} />
      </div>
  );
}

export default Toolbar;