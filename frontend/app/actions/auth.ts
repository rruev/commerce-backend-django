"use server";

import { FormState, SignupFormSchema } from "../lib/definitons";

export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmation:formData.get('confirmation'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            values: {
                username: formData.get('username'),
                email: formData.get('email')
            }
        }
    }
    
    try {
        const registerRes = await fetch("http://127.0.0.1:8000/register/", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(validatedFields.data)
        })

        const data = await registerRes.json();

        if (!registerRes.ok) {
            return {
                message: data.message || "Registration failed",
                values: {
                    username: formData.get('username'),
                    email: formData.get('email')
                }
            }
        };
      } catch (err: any) {
        return {
            message: "Something went wrong"
        };
      }
}