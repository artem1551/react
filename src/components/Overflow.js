import React, {useState} from 'react';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';
import ModalOverflow from './Modal/ModalOverflow';
import axios from 'axios';

const Overflow = ({
  idElem,
  onModalClose,
}) =>  {

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [users, setUsers] = useState([]);


  function submitionForm(idElem) {
    axios.get('http://localhost:3000/user/' + idElem)
  .then(function (response) {
    setUsers(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
   }

  return (
   <div>
     <OverflowMenu ariaLabel="overflow-menu">
        <OverflowMenuItem itemText="View" onClick={() => {setShow(true); setOpenModalView(true); submitionForm(idElem)}}/>
        <OverflowMenuItem itemText="Edit" onClick={() => {setShowModal(true); setOpenModalEdit(true); submitionForm(idElem)}}/>
        <OverflowMenuItem itemText="Delete" onClick={() => {setShowDelete(true); setOpenModalDelete(true); submitionForm(idElem)}}/>
      </OverflowMenu>
      <ModalOverflow
       onModalClose={onModalClose} 
       users={users}
       openModalDelete={openModalDelete}
       openModalEdit={openModalEdit} 
       openModalView={openModalView} 
       show={show} 
       setShow={setShow}
       showModal={showModal} 
       setShowModal={setShowModal}
       showDelete={showDelete} 
       setShowDelete={setShowDelete}
      >
      </ModalOverflow>
   </div>
  );
}

export default Overflow;
