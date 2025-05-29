"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { userAuth } from "./actions/cookiesauth";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userAuth();
      setUser(user);
    };

    fetchUser();
  }, []);

  console.log("User:", user);

  return (
    <>
      <div>homepage</div>
      {user ? <p>Welcome, {user.username}</p> : <p>Not logged in</p>}
      <Link href="/register">Sign up</Link>
    </>
  );
}
