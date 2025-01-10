'use client'

import { useForm } from "react-hook-form"


export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => console.log(data)


  console.log(watch("example")) 


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-700 flex flex-col'>
      <input defaultValue="test" {...register("example")} />

      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}


      <input type="submit" />
    </form>
  )
}