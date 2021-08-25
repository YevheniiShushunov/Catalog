import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../../firebase';
import { RequestState } from '../../requests/RequestState';
import '../../../App.css'

export const RedactItem = ({active, onActive, itemData, update, onData}) => {
       
    const id = itemData.id

    console.log(itemData);
    
    const [ rsStatus, setRsStatus] = useState(RequestState.none);
    const history = useHistory();

    
    console.log(itemData.title);
    
    const handleChangeName = (e) => {
        return onData({...itemData, title: e.target.value})
    }

    const handleChangePrice = (e) => {
        if(e.target.value >= 0){
            return onData({...itemData, price: e.target.value});
        }
    }

    const handleChangeText = (e) => {
        return onData({...itemData, discribe: e.target.value})
    }

    const handleAddFile = (e) => {
        return onData({...itemData, image: e.target.value})
    }
    


    
    const handlePostData = async () => {
        if(itemData.title.length < 20 || itemData.title.length > 60 ){alert('Название должно быть не менее 20 символов и не более 60' )}
        if(itemData.discribe.length > 200){alert('больше 200 символов')}
        if(itemData.price === ''){alert('поле Цена обязательно к заполнению')}
        if(rsStatus !== RequestState.request && itemData.title.length > 20 && itemData.title.length < 60 && itemData.discribe.length < 200 && itemData.price !== '' ){
            try{
                setRsStatus(RequestState.request);
                await db.collection("Catalog").doc(id).update(itemData);
                onData({
                    title: '',
                    price: '',
                    discribe: '',
                    image: '',
                    discount: false
                });
                setRsStatus(RequestState.success);
                onActive(false);
                update();

            }catch(e){
                console.log(e);
            }  
        }
        console.log("data sended");
    }
    
    
    
    return (
        <div className={active ? "redact-card active" : "redact-card"}>
            <div className="redact-card__content">
                <div>Add new item</div>
                <div>
                    Title: <input placeholder="name" value={itemData.title} onChange={handleChangeName} />
                </div>
                
                <div>
                    Price : <input value={itemData.price} type='number' onChange={handleChangePrice} />
                </div>
                <div>
                    Discribe: <textarea value={itemData.discribe} onChange={handleChangeText} className="discribe"/>
                </div>
                <button  onClick={handlePostData} className='btn'>Save Change</button>
                <button onClick={() => onActive(false)} className="btn">Close window</button>
            </div>
        </div>
    )
}

