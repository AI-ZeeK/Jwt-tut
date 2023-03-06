
import { IoMdMail } from "react-icons/io";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { CiUser, CiLock, CiFacebook,CiLinkedin } from "react-icons/ci";
import {IoMailOutline} from "react-icons/io5";
import { useState} from 'react'
function App() {
const [isSignUp, SetIsSignUp] = useState<boolean>(false)
const[formData, setFormData] = useState({
    name: '',
    email:'',
    password:''

})
const handleSignUpChange = () => {
console.log('sign up')
SetIsSignUp(true)
}
const handleSignInChange = () => {
console.log('sign in')
SetIsSignUp(false)
}
const handleChange = (e: MouseEvent) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value }))
    console.log(formData)
}
	return ( 
        <>
		<div className={`container ${isSignUp ? 'sign-up-mode' : ''}` }>
        <div className="forms-container">
            <div className="signin-signup">
                <form action="" className="sign-up-form">
                    <h2 className="title">Sign Up</h2>
                    <div className="input-field">
                        {/* <ion-icon name="person-outline"></ion-icon> */}
						<CiUser className='icon' />
                        <input type="text" placeholder="Username" name='name' value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        {/* <ion-icon name="mail-outline"></ion-icon> */}
						 <IoMailOutline  className='icon' />
                        <input type="email" placeholder="Email"  name='email' value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        {/* <ion-icon name="person-outline"></ion-icon> */}
                         <CiLock  className='icon' /> <input type="password" placeholder="Password"  name='password' value={formData.password} onChange={handleChange} />
                    </div>
                    <input type="submit" name="" id="" value="Sign up" className="btn solid" />

                    <p className="social-text">Or Sign up with social platforms</p>
                    <div className="social-media">
                        <a href="#" className="social-icon">
                            {/* <ion-icon name="logo-facebook"></ion-icon> */}
							<AiOutlineTwitter />
                        </a>
                        <a href="#" className="social-icon">
                            {/* <ion-icon name="logo-twitter"></ion-icon> */}
								<CiLinkedin />
                        </a>
                        <a href="#" className="social-icon">
                            {/* <ion-icon name="logo-google"></ion-icon> */}
							
						<AiFillGithub />
                        </a>
                        <a href="#" className="social-icon">
                            {/* <ion-icon name="logo-linkedin"></ion-icon> */}
								<CiFacebook />
                        </a>
                    </div>
                </form>
                <form action="" className="sign-in-form">
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        {/* <ion-icon name="person-outline"></ion-icon> */}
                        <CiUser className='icon' />
                        <input type="text" placeholder="Username" name='name' value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        {/* <ion-icon name="mail-outline"></ion-icon> */}
                        <CiLock  className='icon' />
                        <input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                    </div>
                    <input type="submit" name="" id="" value="Login" className="btn solid" />

                    <p className="social-text">Or Sign in with social platforms</p>
                    <div className="social-media">
					<a href="#" className="social-icon">
                            {/* <ion-icon name="logo-facebook"></ion-icon> */}
							<AiOutlineTwitter className='icon' />
                        </a>
                        <a href="#" className="social-icon">
                            {/* <ion-icon name="logo-twitter"></ion-icon> */}
								<CiLinkedin className='icon' />
                        </a>
                        <a href="#" className="social-icon">
                            {/* <ion-icon name="logo-google"></ion-icon> */}
							
						<AiFillGithub className='icon' />
                        </a>
                        <a href="#" className="social-icon">
                            {/* <ion-icon name="logo-linkedin"></ion-icon> */}
								<CiFacebook className='icon' />
                        </a>
                    </div>
                </form>
            </div>
        </div>

        <div className="panels-container">
            <div className="panel left-panel">
                <div className="content">
                    <h3>New Here ?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum omnis soluta dolore suscipit sit numquam id accusamus quod.</p>
                    <button onClick={handleSignUpChange}  className="btn transparent" id="sign-up-btn">Sign-up</button>
                </div>

                <img src="/img/log.svg" className="image" alt="" />
            </div>
            <div className="panel right-panel">
                <div className="content">
                    <h3>One of us ?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum omnis soluta dolore suscipit sit numquam id accusamus quod.</p>
                    <button  onClick={handleSignInChange}  className="btn transparent" id="sign-in-btn">Sign-in</button>
                </div>

                <img src="/img/register.svg" className="image" alt="" />
            </div>
        </div>


    </div>
        </>
	)
}

export default App;
