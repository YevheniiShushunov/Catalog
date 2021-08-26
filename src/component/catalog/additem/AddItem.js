import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db, storageRef} from '../../../firebase';
import { RequestState } from '../../requests/RequestState';

export const AddItem = () => {
    const [cardData, setCardData] = useState({
        title: '',
        img: null,
        price: '',
        discribe: '',
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

    const handleAddFile = async (e) => {
        const file = e.target.files[0];
        console.log(file.name);
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const readyfile = await fileRef.getDownloadURL();
        setCardData({...cardData, img: readyfile});             
    }
    
    const handlePostData = async () => {
        if(cardData.title.length < 20 || cardData.title.length > 60 ){alert('Название должно быть не менее 20 символов и не более 60' )}
        if(cardData.discribe.length > 200){alert('больше 200 символов')}
        if(cardData.price === ''){alert('поле Цена обязательно к заполнению')}
        if(rsStatus !== RequestState.request && cardData.title.length > 20 && cardData.title.length < 60 && cardData.discribe.length < 200 && cardData.price !== '' ){
            try{
                setRsStatus(RequestState.request);
                await db.collection("Catalog").doc().set(cardData);
                /* setCardData({
                    title: '',
                    image: '',
                    price: '',
                    discribe: '',
                    discount: false
                }); */
                setRsStatus(RequestState.success);
                history.push('/')
            }catch(e){
                console.log(e);
            }  
        }
        console.log("data sended");
    }
    console.log(cardData)
    return (
        <div className="addCart">
            <div className="card-block">
                <div>Add new item</div>
                <div>
                    Title: <input placeholder="name" value={cardData.title} onChange={handleChangeName} />
                </div>
                <div>
                    Photo: <input placeholder="photo" type='file' onChange={handleAddFile} />
                </div>
                <div>
                    Price : <input value={cardData.price} type='number' onChange={handleChangePrice} />
                </div>
                <div>
                    Discribe: <textarea value={cardData.discribe} onChange={handleChangeText} className="discribe"/>
                </div>
                <button disabled={RequestState === RequestState.request} onClick={handlePostData} className='btn'>Add Cart</button>
            </div>
        </div>
    )
}

