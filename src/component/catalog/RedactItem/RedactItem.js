import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../../firebase';
import { RequestState } from '../../requests/RequestState';

export const RedactItem = ({name, price, discribe, img}) => {
    const [cardData, setCardData] = useState({
        title: name,
        price: price,
        discribe: discribe,
        image: img,
        discount: false
    });
    
    const [ rsStatus, setRsStatus] = useState(RequestState.none);
    const history = useHistory();

    

    const handleChangeName = (e) => {
        return setCardData({...cardData, title: e.target.value})
    }

    const handleChangePrice = (e) => {
        if(e.target.value >= 0){
            return setCardData({...cardData, price: e.target.value});
        }
    }

    const handleChangeText = (e) => {
        return setCardData({...cardData, discribe: e.target.value})
    }

    const handleAddFile = (e) => {
        return setCardData({...cardData, image: e.target.value})
    }
    console.log(cardData)
    
    const handlePostData = async () => {
        if(cardData.title.length < 20 || cardData.title.length > 60 ){alert('Название должно быть не менее 20 символов и не более 60' )}
        if(cardData.discribe.length > 200){alert('больше 200 символов')}
        if(cardData.price === ''){alert('поле Цена обязательно к заполнению')}
        if(rsStatus !== RequestState.request && cardData.title.length > 20 && cardData.title.length < 60 && cardData.discribe.length < 200 && cardData.price !== '' ){
            try{
                setRsStatus(RequestState.request);
                await db.collection("Catalog").doc().update(cardData);
                setCardData({
                    title: '',
                    price: '',
                    discribe: '',
                    image: '',
                    discount: false
                });
                setRsStatus(RequestState.success);
                history.push('/')
            }catch(e){
                console.log(e);
            }  
        }
        console.log("data sended");
    }

    return (
        <div className="addCart">
            <div className="card-block">
                <div>Add new item</div>
                <div>
                    Title: <input placeholder="name" value={cardData.title} onChange={handleChangeName} />
                </div>
                <div>
                    Photo: <input placeholder="photo" type='file' value={cardData.image} onChange={handleAddFile} />
                </div>
                <div>
                    Price : <input value={cardData.price} type='number' onChange={handleChangePrice} />
                </div>
                <div>
                    Discribe: <textarea value={cardData.discribe} onChange={handleChangeText} className="discribe"/>
                </div>
                <button  onClick={handlePostData} className='btn'>Add Cart</button>
            </div>
        </div>
    )
}

