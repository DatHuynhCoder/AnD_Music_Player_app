import React from 'react'
import { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
  const [userid,setUserid] = useState('');
  const [username,setUsername] = useState('');
  const [useravatar, setUseravatar] = useState('');
  const [rerenderCxt, setRerenderCxt] = useState(false);

  return (
    <UserContext.Provider value={{userid,setUserid,username,setUsername,useravatar,setUseravatar,rerenderCxt,setRerenderCxt}}>
      {children}
    </UserContext.Provider>
  )
}

