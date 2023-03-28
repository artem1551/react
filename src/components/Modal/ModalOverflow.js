import React from 'react';
import { Modal } from '@carbon/react';
import ModalAddPerson from './ModalAddPerson';
import axios from 'axios';


const ModalOverflow = ({
    setShow,
    show,
    openModalDelete,
    openModalView,
    openModalEdit,
    setShowModal,
    showModal,
    showDelete,
    setShowDelete,
    users,
    onModalClose,
  }) =>  {

    function deleteUser(users) {
        axios.delete('http://localhost:3000/user/' + users.id)
            .then(() => onModalClose());
        
    }    
  return (
   <div>
    {openModalDelete && (
        <Modal
        open={showDelete}
        danger
        modalHeading="Are you sure you want to delete this?"
        modalLabel="Delete user"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestClose={() => {setShowDelete(false)}}
        onRequestSubmit={() => {deleteUser(users)}}
    />
    )}
    {openModalView && (
            <Modal
            open={show}
            modalHeading="USER"
            modalLabel="View User"
            primaryButtonText="Save"
            secondaryButtonText="Cancel"
            onRequestClose={() => {setShow(false)}}
            onRequestSubmit={() => {setShow(false)}}
        >
            <div className='cc-modal__block'>
                <span>Name</span>
                <h2 className='cc-modal__title'>{users.name}</h2>
                <span>Email</span>
                <h2 className='cc-modal__title'>{users.email}</h2>
                <span>Birth day</span>
                <h2 className='cc-modal__title'>{users.birthDay}</h2>
                <span>Department</span>
                <h2 className='cc-modal__title'>{users.department}</h2>
            </div>
        </Modal>
    )}
    {openModalEdit && (
        
        <ModalAddPerson 
        onModalClose={onModalClose}
        users={users.id} 
        usersEmail={users.email} 
        usersName={users.name}
        usersBday={users.birthDay}
        usersDep={users.department}
        setShow={setShowModal} 
        show={showModal}
        btnName='Save'></ModalAddPerson>
    )}
   </div>
  );
}

export default ModalOverflow;
