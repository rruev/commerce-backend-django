"use client";

import Cookies from 'js-cookie';
import { FormState } from '../lib/definitons';

export async function signin(state: FormState, formData: FormData) {


    const csrftoken = Cookies.get("csrftoken");
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("http://localhost:8000/login/", {
        method: "POST",
        credentials: "include",
        headers: { 
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken ?? "",
         },
        body: JSON.stringify({username, password})
    })

    const data = res.json();

    if (!res.ok) {
        return {
            message: "Login failed"
        }
    }
}

export async function userAuth() {
    
    const res = await fetch("http://localhost:8000/session/", {
        credentials: "include"
    });
  
    if (!res.ok) return null;
    return res.json();
  }