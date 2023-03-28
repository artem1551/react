import React, {useState, useEffect} from 'react';
import { 
    Modal, 
    TextInput, 
    Select,
    SelectItem,
} from '@carbon/react';
import { useForm} from "react-hook-form";
import axios from 'axios';

const ModalAddPerson = ({
    setShow,
    show,
    users,
    usersEmail,
    usersName,
    usersBday,
    usersDep,
    onModalClose,
    btnName
  }) =>  {

    const { register, handleSubmit, reset, setValue, formState: { errors }  } = useForm({mode: 'onChange', defaultValues: {
      name: '',
      email: '',
      birthDay: '',
      select: '',
    }});
    const [data, setData] = useState("");

    useEffect(() => {
      setValue('name', usersName)
      setValue('email', usersEmail)
      setValue('birthDay', usersBday)
      setValue('select', usersDep)
    }, [usersName, usersEmail, usersBday, usersDep, setValue])

   function submitionForm(data) {
      axios.post('http://localhost:3000/user', {
        name: data.name,
        email: data.email,
        birthDay: `${data.birthDay}`,
        department: data.select
      })
      .then(function (response) {
        reset()
        console.log(response);

         onModalClose()
          setShow(!show)

      })
      .catch(function (error) {
        console.log(error);
      });
   }

   

  function submitionPatch(data) {
    axios.patch('http://localhost:3000/user/' + users, {
      name: data.name,
      email: data.email,
      birthDay: data.birthDay,
      department: data.select
    })
    .then(function (response) {
      console.log(response);
      onModalClose()
      setShow(!show)
    })
    .catch(function (error) {
      console.log(error);
    });
 }

  return (
    <Modal
      open={show}
      modalHeading="Modal user"
      modalLabel="User"
      primaryButtonText={btnName}
      secondaryButtonText="Cancel"
      onRequestClose={() => {setShow(false)}}
      onRequestSubmit={handleSubmit((data) => {
        setData(JSON.stringify(data));
        if(users) {
          submitionPatch(data)
        } else {
          submitionForm(data);
        }

      })}
      >
      <TextInput
        data-modal-primary-focus
        id="text-input-1"
        type="text"
        labelText="Name"
        placeholder="Your name"
        defaultValue={usersName}
        {...register("name", { required: true, pattern: /[a-zA-Z]/})}
      />
      {errors.name && <p className='cc-modal__text-error'>Please check the Name must be English</p>}
      <TextInput
      id="text-input-2"
        type="email"
        labelText="Email"
        placeholder="Your email"
        {...register("email", 
        { 
            required: true,  
            pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
        })}
      />
      {errors.email && <p className='cc-modal__text-error'>Please check the Email</p>}
      
    {/* <Controller
      control={control}
      name="test"
      render={({ field: { onChange, onBlur, value, ref } }) => (
      <DatePicker datePickerType="single" dateFormat="d/m/y" locale='en' >
          <DatePickerInput  
          onBlur={onBlur}
          onChange={onChange}
          selected={value}
          id="date-picker-input-id-start"
          placeholder="dd/mm/yyyy"
          labelText="Birth Day"
          size="md"
          // defaultValue={usersBday}
          {...register("birthDay", { required: true })}
          />
          
      </DatePicker>
      )}
      /> */}
    <label className='cc-modal__date-label'>Birth day</label>
    <input className='cc-modal__date' type='date' {...register("birthDay", { required: true })}/>
    {errors.birthDay && <p className='cc-modal__text-error'>This is required</p>}
      <Select id="select-1"
        labelText="Department"
        {...register("select", { required: true })}>
      <SelectItem
          disabled
          hidden
          value='Select'
          text="Choose an option"
        />
        <SelectItem value="A1" text="A 1" />
        <SelectItem value="B2" text="B 2" />
        <SelectItem value="C3" text="C 3" />
      </Select>
      {errors.select && <p className='cc-modal__text-error'>This is required</p>}
    </Modal>
    
  );
}

export default ModalAddPerson;
