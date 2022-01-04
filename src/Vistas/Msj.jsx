import React from 'react'

export default function Msj(props) {
    return (
        <div className="msj-1">
            {
                <p>{props.msj.msj}</p>
            }
        </div>
    )
}
