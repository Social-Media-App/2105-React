import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

/*
Author: Eric Tran and Christal Buetu Meba
Function: dropdown list filter
*/

//test variables
const IPostDetails1 = [
  {post: {
    postId: 1,
    postWrittenContent: "string",
    postImage: "string",
    postOwner: "IUser",
    date: "08/5/2021",
    groupId: 1,
  },
  comment: [],
  likeNumber:[{},{},{},{}],
  },
  {post: {
    postId: 2,
    postWrittenContent: "hello",
    postImage: "hello",
    postOwner: "hello",
    date: "08/18/2021",
    groupId: 2,
  },
  comment: [],
  likeNumber:[{}, {}, {}],
  },
  {post: {
    postId: 3,
    postWrittenContent: "IUser",
    postImage: "IUser",
    postOwner: "IUser",
    date: "09/8/2021",
    groupId: 3,
  },
  comment: [],
  likeNumber:[{}, {}],
  },
  {post: {
    postId: 4,
    postWrittenContent: "apple",
    postImage: "[]",
    postOwner: "apple",
    date: "10/19/2021",
    groupId: 4,
  },
  comment: [],
  likeNumber:[{}, {}],
  },
  {post: {
    postId: 5,
    postWrittenContent: "apple",
    postImage: "[]",
    postOwner: "apple",
    date: "09/8/2021",
    groupId: 5,
  },
  comment: [],
  likeNumber:[{}],
  },
  {post: {
  postId: 6,
  postWrittenContent: "apple",
  postImage: "[]",
  postOwner: "apple",
  date: "10/19/2021",
  groupId: 6,
  },
  comment: [],
  likeNumber:[],
  }
]

const DropDownFilter2 = (props:any) => {
  const [optionValue, setOptionValue] = useState(0);
  const [showOptions, setShowOptions] = React.useState(false);
  const [dateValue, onChange] = useState(new Date());
  //constructor for data variables
  const options = [
    {
      label: "Get Recent",
      value: "date",
    },
    {
      label: "Most Likes",
      value: optionValue,
    }
  ];

  const likeno = [
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
    {
      label: "5",
      value: 5
    },
    {
      label: "6",
      value: 6,
    },
    {
      label: "7",
      value: 7,
    },
    {
      label: "8",
      value: 8,
    },
  ];

  /*
  const handleChange:
  changes the currently set filter 
  e: the object that will help assign our selected value in the dropdown menu to a option
  */
  const handleChange = (e: any) => {
    if (e.target.value === options[0].value){
      setShowOptions(false)
    }else{
      setShowOptions(true)
    }
  }
  
  /*
  const dateChange:
  changes the date filter
  e: the object that will hold our date
  */
  const dateChange = (e: any) => {
    e = new Date (dateValue).toLocaleDateString()
    let newFilterDate = IPostDetails1.filter(
      (myValue)=>{
        return new Date(myValue.post.date)>=new Date (dateValue);
      }
    )
    console.log(newFilterDate)
  }

  /*
  const likeChange:
  changes the like filter
  e: the object that will help assign our selected value
  */
  const likeChange = (e: any) => {
    setOptionValue(e.target.value)
    let newFilterLikes = (IPostDetails1).filter(
      (myValue)=>{
        return myValue.likeNumber.length>=e.target.value;
      }
    )
    console.log(newFilterLikes)
  }
  

  return(
      <div>
        <select onChange = {handleChange}>
        {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
        </select>
        {!showOptions? 
          <div>
          <Calendar
          onChange={onChange}
          value={dateValue}
          />
          <button onClick = {dateChange}>submit</button>
          </div>  
          :
          null}
        {showOptions? 
          <select id = "likeCount" onChange = {likeChange}>
          {likeno.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
          </select>
          :
          null}
      </div>
  
  )
}

export default DropDownFilter2;
