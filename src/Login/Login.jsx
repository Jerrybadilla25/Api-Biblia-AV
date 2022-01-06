import React from 'react';


export default function Login(props) {



  


    return (
        <div className='login'>
            <form action="" className='form-login' onSubmit={props.getUser}>
                <div className='d-flex-login-col mb-5'>
                    <h4>Sign in to your account</h4>
                    <h6>Join the Api Reina Valera 1960</h6>
                    <h6>API-BIBLIA-AV</h6>
                </div>
                <div className='d-flex-login-col'>
                    
                    <input type="text" className='login-input'
                    placeholder='Email'
                    name="email"
                    onChange={props.datosFormLogin}
                    />
                </div>
                <div className='d-flex-login-col'>
                    
                    <input type="password" className='login-input' 
                    placeholder='Password'
                    name="password"
                    onChange={props.datosFormLogin}
                    />
                </div>
                <div className='d-flex-login-col'>
                    <button 
                    className='btn-login'
                    type='submit'
                    >Login</button>
                </div>
            </form>
           
        </div>
    )
}
