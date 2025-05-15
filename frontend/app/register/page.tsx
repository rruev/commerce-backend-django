"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React, { useActionState } from "react";
import { signup } from "../actions/auth";

export default function LogIn() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="Username" defaultValue={String(state?.values?.username || '')} />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" defaultValue={String(state?.values?.email || '')} />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <label htmlFor="confirmation">Confirm Password</label>
        <input type="password" name="confirmation" id="confirmation" />
      </div>
      {state?.errors?.confirmation && <p>{state.errors.confirmation}</p>}
      <button disabled={pending} type="submit">
        Sign Up
      </button>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}