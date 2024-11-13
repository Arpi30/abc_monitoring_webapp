import React from 'react'
import NofounddataIMG from '../../Assets/img/nofoundimg.jpg'
import {Image} from 'react-bootstrap';

const NoFoundData = () => {
    return (
        <div>
            <div>Sorry, no Data found</div>
            <Image src={NofounddataIMG} rounded />
        </div>
    )
}

export default NoFoundData