import React from 'react'

export default function Charter(props) {
    return (
        <div className="container mb-5 mt-3 box-per">
        <div className=''>
          <h3>Capitulos creados</h3>
          <div className="d-flex-per">
            {props.charter.map((itm) => (
              <div key={itm._id}>
                <button className="btn btn-outline-primary mx-1 my-1">
                {itm.charter} / {itm.verses.length} ver.
                </button>
              </div>
          ))}
          </div>
          
        </div>
       
      </div>
    )
}
