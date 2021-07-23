import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
//Components
import Message from '../Message/Message'
import Loader from '../Loader/Loader'
//Default image
import no_image from '../../utils/img/modal/modal_no_image.png'
//Button logos
import { FiPhone } from 'react-icons/fi';
import { MdFavoriteBorder } from 'react-icons/md';
import yelpLogo from '../../utils/img/modal/yelp_logo.svg'
//Custom functions
import { addFavouriteLocal, getFavouritesLocal } from '../../utils/functions/favourites'
//Css
import './ParkingModal.css';
import './ParkingModalMobile.css';
//actions
import { getFavourite } from '../../actions/favourites_actions'


export default function ParkingModal( { match } ) {

    const apiURL = process.env.REACT_APP_API_URL
    const history = useHistory()
    const dispatch = useDispatch();

    const favouritesStoreData = useSelector((state) => (state.favouritesReducer ))

    const [modalState, setModalState] = useState({
        parkingDetails: null,
        loading: false,
    });
    const [messageState, setMessageState] = useState({
        state: false,
        text: '',
        color: '',
    });

    useEffect(
        () => {
            setModalState({
                ...modalState,
                loading: true,
            })
            const id = match.params.id
            async function getDetails(id) {
                try {
                    const response = await axios.get(apiURL + "/parkings/details", { 
                        params: {
                            id
                        }
                    })
                    setModalState({
                        ...modalState,
                        parkingDetails: response.data,
                        loading: false,
                    })
                } catch (error) {
                    setModalState({
                        ...modalState,
                        loading: false,
                    })
                }
            }
            getDetails(id)
        },
    // eslint-disable-next-line
    []);

    function handleExit(e) {
        if(e.currentTarget === e.target ) {
            history.goBack()
        }
    }

    function handleClick(e) {
        const addResponse = addFavouriteLocal(modalState.parkingDetails)
        if(addResponse.message) {
            return setMessageState({
                state: true,
                text: addResponse.message,
                color: 'red',
            })
        }
        setMessageState({
            state: true,
            text: `${modalState.parkingDetails.name} was successfully added to favourites`,
            color: 'green',
        })
        const newFavourites = getFavouritesLocal(favouritesStoreData)
        dispatch(getFavourite(newFavourites))
    }

    const dataArray = [
        {title: 'City: ', subtitle: modalState.parkingDetails?.city}, 
        {title: 'Rating: ', subtitle: modalState.parkingDetails?.rating}, 
        {title: 'State: ', subtitle: modalState.parkingDetails?.state}, 
        {title: 'Score: ', subtitle: modalState.parkingDetails?.score}, 
        {title: 'Country: ', subtitle: modalState.parkingDetails?.country}, 
        {title: 'Zip Code: ', subtitle: modalState.parkingDetails?.zip_code}, 
        {title: 'Reviews: ', subtitle: modalState.parkingDetails?.review_count}, 
        {title: 'Open: ', subtitle: modalState.parkingDetails?.open ? 'Yes' : 'No'}, 
    ]  

    return (
        <div onClick={handleExit} className='parking_modal_background'>
            <div className='parking_modal_container'>
                {
                    modalState.loading ? 
                    <Loader size={50} bgcolor={'#f3f3f3'} color={'#F8C342'} margin={'0rem 0rem 0rem 0rem'}/> :
                    <div className='parking_modal_content_container'>
                        <div className='parking_modal_left'>
                            <img src={modalState.parkingDetails?.photos[0] ? 
                            modalState.parkingDetails?.photos[0] :
                            no_image
                            } 
                            alt={modalState.parkingDetails?.name}/>
                        </div>
                        <div className='parking_modal_right'>
                            <button onClick={handleExit} className='parking_modal_close_button'>X</button>
                            <div className='parking_modal_title'>
                                <span >{modalState.parkingDetails?.name}</span>
                            </div>
                            <div className='parking_modal_data'>
                                <div className='parking_modal_address'>
                                    <span className='parking_modal_data_title'>Phone: </span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.display_phone ? modalState.parkingDetails?.display_phone : 'No registered'}</span>
                                </div>
                                <div className='parking_modal_address'>
                                    <span className='parking_modal_data_title'>Address: </span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.address}</span>
                                </div>
                                {
                                    dataArray.map( data => {
                                        return (
                                            <div key={`parking_modal_${data.title}`}>
                                                <span className='parking_modal_data_title'>{`${data.title} `} </span>
                                                <span className='parking_modal_data_content'>{`${data.subtitle}`}</span>
                                            </div>
                                        )
                                    } )
                                }                       
                            </div>
                            <div className='parking_modal_buttons'>
                                <button onClick={handleClick} className='parking_modal_button_fav'>
                                    <MdFavoriteBorder/>
                                    <span>Add</span>
                                </button>
                                <a href={`tel:${modalState.parkingDetails?.phone}`} className='parking_modal_button_phone'>
                                    <FiPhone/>
                                    <span>Contact</span>
                                </a>
                                <a className='parking_modal_button_yelp' href={modalState.parkingDetails?.url} target="_blank" rel="nofollow noopener noreferrer">
                                    <img src={yelpLogo} alt='Yelp_logo'/>
                                    <span>Visit</span>
                                </a>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {
               messageState.state ? 
               <Message messageState={messageState} setMessageState={setMessageState}/> :
               undefined
            }
            
        </div>
        );
  };