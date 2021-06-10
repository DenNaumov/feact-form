import React from 'react'
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextInput from './TextInput';

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 250,
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1),
      width: 250,
    }
  },
  paper: {
    display: 'inline-block',
  },
}))

export default function FeedbackForm() {

  const classes = useStyles()
  const paperElevation = 4
  
  const validationMask = {
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
    <Paper className={classes.paper} elevation={paperElevation}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextInput label="Имя" id="name" required={true} validation={validationMask.name} onInput={onInput} />
        <TextInput label="Фамилия" id="surname" required={true} validation={validationMask.name} onInput={onInput} />
        <TextInput label="Отчество" id="fathername" required={false} validation={validationMask.name} onInput={onInput} />
        <TextInput label="Телефон" id="phone" required={true} validation={validationMask.phone} onInput={onInput} />
        <TextInput label='Email' id="email" required={true} validation={validationMask.email} onInput={onInput} />
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </Paper>
  );
}