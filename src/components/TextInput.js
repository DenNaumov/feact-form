import React from 'react'
import { TextField } from '@material-ui/core';

export default function TextInput(props) {

  const [value, setValue] = React.useState({text: "", isValid: true})
  const [error, setError] = React.useState("")
  const validation = props.validation || new RegExp(/^\d*$/)
  
  const handleChange = (event) => {
    const text = event.target.value
    const isValid = validation.test(text)
    setValue({text: text, isValid: isValid})
    props.onInput({id: props.id, text: text, isValid: isValid})
  }

  const onBlur = () => {
    const isValid = value.isValid
    if (isValid) {
      setError('')
    } else {
      setError('Неверное значение')
    }
  }

  return <div>
    <TextField
      variant="standard"
      label={props.label}
      required={props.required}
      onChange={handleChange}
      onBlur={onBlur}
      helperText={error}
      error={Boolean(error)}
    /> 
  </div>
  }