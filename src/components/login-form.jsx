"use client";

import axios from "axios";
import Icons from "./Icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {signIn} from "next-auth/react";
import { toast } from "sonner"
import { useRouter } from "next/navigation";



export default function LoginForm({ origin = "signIn" }) {
  const [loading , setLoading] = useState(false)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter()
  

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true)
    try{
      if (origin ==="signIn"){
        signIn("credentials" ,{
          email :data.email,
          password :data.password ,
          redirect:false,
        }).then((callback) =>{
          
          if( callback?.ok){
            console.log("Sign in successful");
            toast("Sign in successful")
            router.push("/")
          }
          else if(callback?.error){

            console.log("Sign in failed:", callback.error);
            toast.error("Sign in failed: " + callback.error)
          }
        })
      } else {
        const response = await axios.post("/api/auth/register", data)
        console.log(response)
        toast("Account created successfully. Please sign in.")  
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-8 rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
          {origin === "signIn" ? "Sign In" : "Sign Up"}
        </h2>
        {
          origin === "signUp" && (
            <Input id="name" type="text" placeholder="Name" {...register("name" , {required :true})} />
          )
        }

        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <Button type="submit" className="w-full">
          {origin === "signIn" ? "Sign In" : "Sign Up"}
        </Button>
        <Button onClick ={() => signIn("google", { callbackUrl: "/" }) } >
          <Icons.GoogleLogo className="w-5 h-5 mr-2" />
          {origin === "signIn" ? "Sign In with Google" : "Sign Up with Google"}
        </Button>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          {origin === "signIn" ? (
            <>
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign In
              </a>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
