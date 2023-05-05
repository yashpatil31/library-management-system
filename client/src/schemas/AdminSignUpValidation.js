import * as Yup from 'yup'

const usernameRegx = "^[A-Za-z][A-Za-z0-9_]{2,20}$"

const AdminSignUpValidation = Yup.object({
    username : Yup.string().matches(usernameRegx, "Contains only alphabets and underscore").required("Please Fill in the Username"),
    password : Yup.string().required("Please Fill in the Password")
})

export default AdminSignUpValidation;