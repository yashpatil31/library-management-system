import styles from './AdminLogin.module.css';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AdminSignUpValidation from '../../schemas/AdminSignUpValidation';

const initialValues = {
  email: '',
  password: ''
}

const AdminLogin = () => {
  const navigate = useNavigate()

  // const PostData = async (e) => {
  //   const { email, password } = values

    // const res = await fetch('/api/users/login',{
    //   method: "POST",
    //     headers: {
    //         "Content-type" : "application/json" 
    //     },
    //     body: JSON.stringify({
    //       email, password
    //     })
    //   })

    //   const data = await res.json()
    //   console.log(data.status)
    //   if(data.status === 200)
    //   {
    //     console.log("Registration Successfull")
    //     navigate('/admindashboard')
    //   }
    //   else{
    //     console.log("Registration Unuccessfull")
    //   }
    // }

    const onSubmit = async (values, action) => {
        const res = await axios.post("http://localhost:5000/api/users/login", values).catch(err => {
          if (err && err.response) {
            console.log("Error: ", err);
          }
        });
        action.resetForm();

        if (res && res.data) {
          console.log(res.data.message)
        }
      }

      const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: AdminSignUpValidation,
        onSubmit
      })
    

      return (
        <div className={styles['login-container']}>
          <div className={styles['login-modal']}>
            <h3 className={styles['modal-title']}>Admin Login</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles['input-container']}>
                <label htmlFor="email" className={styles['input-label']}>Email</label>
                <input
                  type="text"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (<p className={styles['form-error']}>{errors.email}</p>) : null}
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