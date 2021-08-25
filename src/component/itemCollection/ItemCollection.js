import React, { useState } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import  photo  from '../assets/img/nophoto.png'
import { RedactItem } from '../catalog/RedactItem/RedactItem'


export const ItemCollection = ({catalog = [], onDelete, update}) => {
    const [modalActive, setModalActive] = useState(false);
    const [itemData, setItemData] = useState({
        title:'',
        price:'',
        discribe: '',
        image:''
    })
    const [load, setLoad] = useState(true)

    const openModal = (titleData, priceData, discribeData, idData) => {
        setLoad(true)
        setItemData((prevData) => ({...prevData,
            id: idData,
            image:'',
            title: titleData,
            price: priceData,
            discribe: discribeData
        }))
        setLoad(false)
        setModalActive(true);
    }

    const renderCollection = () => {
        return(
            <div>
                <div className="item-title">
                    <h1>Card Catalog</h1>
                </div>
                <div className="item-button">
                <p><Link to="/AddItem" className='btn'>add card</Link></p>
                </div>
                    <RedactItem 
                        active={modalActive} 
                        onActive={setModalActive} 
                        itemData={itemData} 
                        render={renderCollection} 
                        loading={load} 
                        onData={setItemData} 
                        update={update}/>        
                <div className='item-container'>
                    {catalog.map(itm =>(
                        <div key={itm.id} className='item-card'>
                            <img className="item item-img" src={photo} alt="default" />
                            <div className='item'>Title*: {itm.data().title}</div>
                            <div className='item'>Price*: {itm.data().price}$</div>
                            <div className='item-discribe'>About: {itm.data().discribe}</div>
                            <button className="btn delete-btn" onClick={() => onDelete(itm.id) }>delete card</button>
                            <button className='btn' onClick={() => openModal(itm.data().title, itm.data().price, itm.data().discribe, itm.id)}>RedactItem</button>
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
