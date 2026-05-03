import { useState } from "react"
import { useForm } from "react-hook-form"
import {  useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Auth() {
    const [mode, setMode] = useState("signup")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState(null)
    const { signUp,  login } = useAuth()
    const navigate = useNavigate()

    function onSubmit(data) {
        setError(null);
        let result;
        if (mode === "signup") {
            result = signUp(data.email, data.password)
        }
        else {
            result = login(data.email, data.password)
        }

        if (result.success) {
            navigate("/")
        } else {
            setError(result.error)
        }
    }
    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="error-message"> {error}</div>}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label"> Email</label>
                            <input type="email" className="form-input" id="email" {...register("email", { required: "email is required" })} />
                            {errors.email && <span className="form-error">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label"> Password</label>
                            <input type="password" className="form-input" id="password" {...register("password", {
                                required: "password is required",
                                minLength: {
                                    value: 6,
                                    message: "password must be atleast 6 character"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "password must be atleast 12 character"
                                }
                            })} />
                            {errors.password && <span className="form-error">{errors.password.message}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-large"> {mode === "signup" ? "Sign Up" : "Login"}</button>
                    </form>
                    <div className="auth-switch">
                        {mode === "signup" ?
                            (<p>Already have an account? <span className="auth-link" onClick={() => setMode("login")}>Login</span></p>) :
                            (<p>Don't  have an account? <span className="auth-link" onClick={() => setMode("signup")}>Sign Up</span></p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}