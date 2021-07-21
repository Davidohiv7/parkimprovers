import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

import axios from 'axios'

import Loader from '../Loader/Loader'
import no_image from '../../utils/img/modal/modal_no_image.png'

import './ParkingModal.css';

export default function ParkingModal( { match} ) {

    const apiURL = process.env.REACT_APP_API_URL
    const history = useHistory()

    const [modalState, setModalState] = useState({
        parkingDetails: null,
        loading: false,
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
                    console.log(error)
                    setModalState({
                        ...modalState,
                        loading: false,
                    })
                }
            }
            getDetails(id)
        },
    []);

    function handleExit(e) {
        if(e.currentTarget == e.target ) {
            history.goBack()
        }
    }

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
                                <div>
                                    <span className='parking_modal_data_title'>City: </span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.city}</span>
                                </div>
                                <div>
                                    <span className='parking_modal_data_title'>Rating: </span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.rating}</span>
                                </div>
                                <div>
                                    <span className='parking_modal_data_title'>State: </span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.state}</span>
                                </div>
                                <div>
                                    <span className='parking_modal_data_title'>Score: </span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.score}</span>
                                </div>
                                <div>
                                    <span className='parking_modal_data_title'>Country: </span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.country}</span>
                                </div>
                                <div>
                                    <span className='parking_modal_data_title'>Zip Code: </span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.zip_code}</span>
                                </div>
                                <div>
                                    <span className='parking_modal_data_title'>Reviews: </span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.review_count}</span>
                                </div>
                                <div>
                                    <span className='parking_modal_data_title'>Open:</span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.open ? 'Yes' : 'No'}</span>
                                </div>
                                <div>
                                    <span className='parking_modal_data_title'>Phone: </span>
                                    <span className='parking_modal_data_content'>{modalState.parkingDetails?.display_phone ? modalState.parkingDetails?.display_phone : 'No registered'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        );
  };