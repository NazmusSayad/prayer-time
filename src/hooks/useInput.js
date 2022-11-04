import { useState } from 'react'

const invalidInputMsg = 'Invalid input'
const noReturnFromValidatorFnMsg =
  'Must return a Boolean or Array[Boolean, message] inside the validator function'
const parseParams = params => {
  params = [...params].reverse()
  const validatorFn = params[0] || (() => true)
  const defaultValue = params[1] || ''
  return [validatorFn, defaultValue]
}

export default function () {
  const [validatorFn, defaultValue] = parseParams(arguments)

  const [value, setValue] = useState(defaultValue)
  const [isTouched, setIsTouched] = useState(false)

  const valid = validatorFn(value)
  if (valid == undefined) throw new Error(noReturnFromValidatorFnMsg)
  const isValid = valid[0] ?? valid

  const hasError = isTouched && !isValid
  const error = hasError && (valid[1] || invalidInputMsg)

  const handler = {
    blur() {
      setIsTouched(true)
    },
    change(e) {
      setValue(e.target.value)
    },
  }

  return {
    value,
    isValid,
    error,
    handler,
    set: {
      value: setValue,
      isTouched: setIsTouched,
    },
    reset() {
      setIsTouched(false)
      setValue(defaultValue)
    },
  }
}
