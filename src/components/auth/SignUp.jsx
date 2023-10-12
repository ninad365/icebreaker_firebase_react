import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = ({ toggleForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Once the user is created, store the username in Firestore
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    email: email,
                    username: username,
                })
                    .then(() => {
                        console.log("User written to firestore");
                    })
                    .catch((error) => {
                        console.error("Error storing username and email:", error);
                    });

                console.log("User registered:", user);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
                <input
                    type="text" // Change input type to text for the username
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Sign Up</button>
                <p>
                    Already have an account?{' '}
                    <span className="sign-in-link" onClick={toggleForm}>
                        Sign In
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignUp;