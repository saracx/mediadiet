import React, { Component } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";

export default class ResetPass extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            resetStart: true,
            verify: false,
            final: false,
        };
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    logResetStart(e) {
        e.preventDefault();
        if (!this.state.email) {
            return this.setState({
                error: "Please enter a valid email address",
            });
        }
        axios
            .post("/password/reset/start", this.state)
            .then(({ data }) => {
                if (data.error) {
                    this.setState({
                        error: data.error,
                    });
                } else {
                    this.setState({
                        resetStart: false,
                        verify: true,
                        error: false,
                    });
                }
            })
            .catch((err) => console.log("err in post at password/reset", err));
    }

    logResetVerify(e) {
        e.preventDefault();
        if (!this.state.code || !this.state.password) {
            this.setState({
                error: "Please fill out all the fields",
            });
        }
        axios
            .post("/password/reset/verify", this.state)
            .then(({ data }) => {
                if (data.error) {
                    return this.setState({
                        error: data.error,
                    });
                }
                console.log(data);
                this.setState({
                    error: false,
                    resetStart: false,
                    verify: false,
                    final: true,
                });
            })
            .catch((err) => console.log("err in post at password/reset", err));
    }

    render() {
        return (
            // <React.Fragment>
             <div id="signup-form">
                <h2>Reset Password</h2>
                {this.state.error && (
                    <p className="err">
                        Something went wrong! <br></br>
                        <b>🚨 {this.state.error}</b>
                    </p>
                )}

                {this.state.resetStart && (
                    <>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="email"
                            onChange={(e) => this.logChange(e)}
                        ></input>
                        <button
                            className="signup-button"
                            onClick={(e) => this.logResetStart(e)}
                        >
                            Get Code
                        </button>
                    </>
                )}

                {this.state.verify && (
                    <>
                        <label className="code">Enter your code</label>
                        <input
                            required
                            type="text"
                            name="code"
                            placeholder="code"
                            onChange={(e) => this.logChange(e)}
                        ></input>
                        <input
                            required
                            type="password"
                            name="password"
                            placeholder="new password"
                            onChange={(e) => this.logChange(e)}
                        ></input>
                        <button
                            className="signup-button"
                            onClick={(e) => this.logResetVerify(e)}
                        >
                            Reset Password
                        </button>
                    </>
                )}

                {this.state.final && (
                    <>
                        Success. Proceed to login:
                        <Link className="registration-links" to="/login">
                            Login
                        </Link>
                    </>
                )}

                
            <div className="registration-links">
                
                <Link to="/">Registration</Link>
            </div>
            {/* </React.Fragment> */}
            </div>
        );
    }
}
