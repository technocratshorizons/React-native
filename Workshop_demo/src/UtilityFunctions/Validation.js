
import * as MESSAGES from '../Constant'

export const RequiredValidation = (value, name) => {
    return (
        value ? undefined : (name + ' ' + MESSAGES.REQUIRED)
    )
}


export const EmailValidation = value => {
    return (
        value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? MESSAGES.INVALID_EMAIL : undefined
    )
}

export const ContactValidation = (value, name) => {
    return (
        (value && value.length < 10) ? (MESSAGES.INVALID) : undefined
    )
}

export const PasswordValidation = (value, name) => {
    return (
        (value && value.length < 6) ? (MESSAGES.MINIMUM_COUNT) : undefined
    )
}

export const ConfirmPassword = (value, confirmValue, name, ) => {
    return (
        (value != confirmValue) ? (MESSAGES.MATCH_ERR) : undefined
    )
}

export const VehicleNumberValidaiton = (VehicleNumber) => {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    return (
        // !(VehicleNumber.value.match(letterNumber)) ?
        //     "alphanumeric only." :
        (VehicleNumber.length < 6 ) ? MESSAGES.MAXNUMBER : undefined
    )
}