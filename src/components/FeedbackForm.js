import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextInput from './TextInput';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 250,
    },
  },
}))

export default function FeedbackForm() {

  const classes = useStyles()

  const validation = {
    name: new RegExp(/^[^"?!0-9<>()[\]/\\|.,;:\s@#$%^&*+=]*$/),
    phone: new RegExp(/^\+?[\d]{1,}$/),
    email: new RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/)
  }
  const [data, setData] = React.useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataArray = Object.entries(data)
    if (isEveryEntryValid(dataArray)) {
      console.log("Submitted data: " + dataArray.map(([key, element]) => key + ": " + element.value).join(", "))
    }
  }

  const isEveryEntryValid = (array) => {
    const isValidEntry = ([_, entry]) => entry.isValid === true
    return array.every(isValidEntry)
  }

  const onInput = (inputData) => {
    data[inputData.id] = { value: inputData.text, isValid: inputData.isValid }
    setData(data)
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextInput label="Имя" id="name" required={true} validation={validation.name} onInput={onInput} />
      <TextInput label="Фамилия" id="surname" required={true} validation={validation.name} onInput={onInput} />
      <TextInput label="Отчество" id="fathername" required={false} validation={validation.name} onInput={onInput} />
      <TextInput label="Телефон" id="phone" required={true} validation={validation.phone} onInput={onInput} />
      <TextInput label='Email' id="email" required={true} validation={validation.email} onInput={onInput} />
      <Button variant="contained" type="submit" >Submit</Button>
    </form>
  );
}