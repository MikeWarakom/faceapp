import React from 'react';
import './FaceRec.css';

const FaceRec = ({ imageUrl, box }) => {
    return(
       <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}></div>
            </div>
       </div>     
    );

}

export default FaceRec; 