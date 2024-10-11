import { response } from 'express';
import React, { useEffect } from 'react'

const new = () => {

  const fetchapi(()=>
    {
          return axios.post(...).then((res) => {
              console.log(`Got the response ${res.json()}`);
          }).catch((err) => {
              console.log(`Failure during invocation: ${JSON.stringify(err)}`);
          });
      }
    );
  /*  useEffect(()=>{
      setInterval(()=>
        for(int i=0;i<1000;i++){
            fetchapi();
        };
    )
    },[1000])
    */
    
    /**
     * t=limit
     * t1=5;
     * t2=40;
     * tx=x;
     * ty=[t1+t2+tx]
     */
    useEffect(()=>{
        try {
            fetchapi();
            if(t-ty>0){
                /** if t that is limit of request fetch ty is request that i fetcted till now if t-ty is greater than 0
                 * that means we can fetch more data so we will fetch data till it become zero
                 */
                return response=Data;
            }
        } catch (error) {
            console.log(error);
        }
    },[t])

  return (
    <div>
   
    </div>
  )
}

export default new

/*
https://chatgpt.com/share/6708e8b3-961c-8009-b2d7-8132c3d1b5b0
https://github.com/Harshsukhija24/found.git
*/ 