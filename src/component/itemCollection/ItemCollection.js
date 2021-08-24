import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import  photo  from '../assets/img/nophoto.png'

export const ItemCollection = ({catalog = [], onDelete}) => {
    
    const renderCollection = () => {
        return(
            <div>
                <div className="item-title">
                    <h1>Card Catalog</h1>
                </div>
                <div className="item-button">
                <p><Link to="/AddItem" className='btn'>add card</Link></p>
                </div>
                <div className='item-container'>
                    {catalog.map(itm =>(
                        <div key={itm.id} className='item-card'>
                            <img className="item item-img" src={photo} alt="default" />
                            <div className='item'>Title*: {itm.data().title}</div>
                            <div className='item'>Price*: {itm.data().price}$</div>
                            <div className='item-discribe'>About: {itm.data().discribe}</div>
                            <button className="btn delete-btn" onClick={() => onDelete(itm.id) }>delete card</button>
                            <Link className="btn" to={"/RedactItem" + itm.id}>RedactItem</Link>
                            {/* <button className="btn">redact card</button> */}
                        </div>
                    ))}
                </div>
                
            </div>
            
  
        )
    }

    return (
        <div>
            {renderCollection()}
        </div>
    )
}
