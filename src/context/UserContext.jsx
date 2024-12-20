import React from 'react'
import { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
  const [userid,setUserid] = useState('');

  return (
    <UserContext.Provider value={{userid,setUserid}}>
      {children}
    </UserContext.Provider>
  )
}

