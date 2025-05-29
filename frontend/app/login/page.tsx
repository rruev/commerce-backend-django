"use client";

import React, { useActionState, useEffect } from "react";
import { signin } from "../actions/cookiesauth";

export default function LogIn() {
    const [state, action, pending] = useActionState(signin, undefined);
    useEffect(() => {
        fetch('http://localhost:8000/csrf/', {
          credentials: 'include',
        });
      }, []);

    return (
        <form action={action}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="Username"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" placeholder="Password"/>
            </div>
            <div>
                <button disabled={pending} type="submit"> Sign in</button>
            </div>
            {state?.message && <p>{state.message}</p>}
        </form>
    )
}