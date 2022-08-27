import React from 'react'
import Title from '../../../components/Title'
import { useRouter } from 'next/router'
import Card from '../../../components/Card'
import axios from 'axios'

const Service = ({details}) => {

    const {service} = useRouter().query

  return (
    <main>
        <Title>{`${service} Services`}</Title>
        <section className="grid lg:grid-cols-3 gap-8 grid-cols-1 w-max mx-auto">
          {
            details.map((data,i)=>(
              <Card key={i} data={data} />
            ))
          }
        </section>
    </main>
  )
}

export default Service

export const getServerSideProps = async({query})=>{
  try{
    let {service} = query
    if(service == 'Vehicle' || service=='vehicle')service = 'driver'
    const details = await axios.get(`http://localhost:3000/api/${service}Details`)

    return {
        props:{
            details:details.data
        }
    }
}catch(err){
    return {
        redirect:{
            destination:'/',
            permanent:false
        }
    }
}

}