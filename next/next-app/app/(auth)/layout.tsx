import React from "react"
export default function({children}:{children:React.ReactNode}){
    return (
        <>
        <div className="p-1 border-b text-center mt-1   ">20% off for next 3 days</div>
        {children}
        </>
    )
}