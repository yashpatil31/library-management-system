import styles from './AdminLogin.module.css';
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import AdminSignUpValidation from '../schemas/AdminSignUpValidation';

const initialValues = {
  username : '',
  password : ''
}

const AdminLogin = () => {
  const navigate = useNavigate()

  const PostData = async (e) => {
    const {username, password} = values

    const res = await fetch('/adminlogin',{
      method: "POST",
      headers: {
          "Content-type" : "application/json" 
      },
      body: JSON.stringify({
        username, password
      })
    })

    const data = await res.json()
    if(data.status === 201)
    {
      console.log("Registration Successfull")
      navigate('/admindashboard')
    }
    else{
      console.log("Registration Unuccessfull")
    }
  }

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema: AdminSignUpValidation,
    onSubmit : (values, action) => {
      console.log(values)
      PostData()
      action.resetForm();
    }
  })

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-modal']}>
        <h3 className={styles['modal-title']}>Admin Login</h3>
        <form onSubmit={handleSubmit}>
            <div className={styles['input-container']}>
            <label htmlFor="username" className={styles['input-label']}>Username</label>
            <input
                type="text"
                autoComplete="off"
                name="username"
                id="username"
                placeholder="Enter Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errors.username && touched.username ? (<p className={styles['form-error']}>{errors.username}</p>) : null}
            </div>
            <div className={styles['input-container']}>
            <label htmlFor="password" className={styles['input-label']}>Password</label>
            <input
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errors.password && touched.password ? (<p className={styles['form-error']}>{errors.password}</p>) : null}
            </div>
            <div className={styles['modal-button']}>
              <a href="#">
                Sign in as a User?
              </a>
              <button className={styles['input-button']} type='submit'>
                submit
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;