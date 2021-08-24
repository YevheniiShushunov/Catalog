import React, { useState, useEffect } from 'react'
import { db } from '../../firebase';
import Header from './header/Header';
import { ItemCollection } from '../itemCollection/ItemCollection';
import { RequestState } from '../requests/RequestState';
import { Preloader } from '../preloader/Preloader';

const Catalog = () => {
    const [catalog, setCatalog] = useState([]);
    const [rsState, setRsState] = useState({
        get: RequestState.none,
        post: RequestState.none,
        delete: RequestState.none
    })
    
    const getCatalogData = async () => {
        if(rsState.get !== RequestState.request) {
            try{
                setRsState((prevState) => ({...prevState, get: Request.request}));
                const cat = [];
                const snaphot = await db.collection('Catalog').get();

                snaphot.forEach(doc => {
                    cat.push(doc);
                    return cat;
                });
                setCatalog(cat);
                setRsState((prevState) => ({...prevState, get: Request.succes}));
            }catch(e){
                console.log(e)
                setRsState((prevState) => ({...prevState, get: Request.fail}))
            }
        }
    }

    const deleteCatalog = async (id) => {
        if(rsState.delete !== RequestState.request){
            try{
                setRsState((prevState) => ({...prevState, delete: Request.request}));
                await db.collection('Catalog').doc(id).delete();
                setRsState((prevState) => ({...prevState, delete: Request.succes}));
                await getCatalogData();
            }catch(e){
                console.log(e);
                setRsState((prevState) => ({...prevState, delete: Request.fail}));
            }
        } 
    }

    useEffect(() => getCatalogData(), []);

        return (
        <div className="catalog">
            <Preloader inProgress={rsState.get === RequestState.request && rsState.delete === RequestState.request}>
                <ItemCollection catalog={catalog} onDelete={deleteCatalog} />
            </Preloader>
            
        </div>

    )
}

export default Catalog;