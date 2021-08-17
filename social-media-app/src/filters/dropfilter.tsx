import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import axios from 'axios'

/*
Author: Eric Tran
Function: dropdown list filter

need to add select with npm i react-select
*/

/*
interface IState
@selectOptions: the array of data being held within posts
@id: the id of the post
@name: the person's name 
*/
interface IState{
  selectOptions : [],
  id: number,
  name: string

}

const DropDownFilter2 = (props: IState) => {
  //constructor data variables
  const [selectOptions, setSelectOptions] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  /*
  const getOptions:
  creates the axios request required to pull data from the database and also maps the data to id and name variables.
  res: fetches user data from the database using an axios request
  data: used to map the database
  options: loops through the database to retrieve id and name values
  */
  const getOptions = async () =>{
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    const data = res.data

    const options = data.map((d: { id: number; name: string; }) => ({
      "value" : d.id,
      "label" : d.name

    }))

    setSelectOptions(options)
  }
  /*
  const handleChange:
  changes the currently set filter 
  e: the object that will help assign our selected value in the dropdown menu to a option
  */
  const handleChange = (e: any) => {
    console.log(e)
    setId(e.value)
    setName(e.label)
  }
    /*
  useEffect (lifecycle method):
  initiates the action to retrieve data from the database through the getOptions function
  */
  useEffect(()=> {
    getOptions()
  })

  return(
      <div>
        <Select options={selectOptions} onChange={handleChange}/>
    <p>You have selected <strong>{name}</strong> whose id is <strong>{id}</strong></p>
      </div>
    
  )
}

export default DropDownFilter2;
