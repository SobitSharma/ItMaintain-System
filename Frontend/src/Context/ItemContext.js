import { createContext, useContext } from "react";

export const ItemContext = createContext({
    list:[],
    updateList:()=>{}
})


export const ContextProvider = ItemContext.Provider

export function UseItems(){
    return useContext(ItemContext)
}