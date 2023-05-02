import {Link ,useNavigate} from "react-router-dom"
import {useState} from "react"


const Register = () => {



    const [ registerData,setRegisterData ] = useState({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:""

    })
    const navigate =useNavigate()


    const handleRegister=()=>{


      let isValid = isPasswordValid()
      
      if(isValid){
        delete registerData.confirmPassword;
        console.log("i am sending this data to backend ",JSON.stringify(registerData));
        // fetch("https://filmProduction/api/register",{
        //  method:"POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body:JSON.stringify(registerData)
        // })
    
         navigate("/admin");



      }else{
        alert("the password is incorrect")
      }
      


    }

    // function to check if the password is same 

    const isPasswordValid=()=>{
      if(registerData.password === registerData.confirmPassword){
        return true
      }else{
        return false
      }
    }


    const handleChangeInput=(event)=>{


        const name = event.target.name; //lastName
        const value = event.target.value ;// tan

        setRegisterData((prev)=>{
            return {...prev , [ name] :value  }
        })

    }





  return (
    <div className="loginBox">
    <div className="loginHeader">
      <h3>Get Registered </h3>
      <div className="loginHeaderInnerBox">
        <img
          width={"45px"}
          src="/images/logo.png"
          alt="logo"
          draggable={"false"}
        />
        <h3>
          <span className="appName_loginModal">Film</span> Production
        </h3>
      </div>
    </div>
    <div className="loginForm">
    <input
        required
        placeholder="FirstName"
        autoComplete="false"
        type="text"
        name="firstName"
        onChange={handleChangeInput}
      
      />
      <input
        required
        placeholder="LastName"
        autoComplete="false"
        onChange={handleChangeInput}
        type="text"
        name="lastName"
        id=""
      />
      <input
        required
        placeholder="Email Address"
        autoComplete="false"
        type="email"
        onChange={handleChangeInput}
        name="email"
        id=""
      />
     
      <input
        required
        placeholder="Password"
        onChange={handleChangeInput}
           autoComplete="false"
        type="password"
        name="password"
        id=""
      />
        
        <input
        required
        placeholder="confirm password"
        autoComplete="false"
        onChange={handleChangeInput}
        type="password"
        name="confirmPassword"
        id=""
      />
  
      <button className="mainBtns" onClick={handleRegister}>

        Register

      </button>
    </div>
    <div className="authBottomBox">
     <Link to="/login">
        <span
          span
          className="authBottomText"
          
          >
          Already have an account ? Click here
        </span>
            </Link>
    
    </div>
  </div>
  )
}

export default Register