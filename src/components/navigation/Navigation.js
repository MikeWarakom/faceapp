import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
        if (isSignedIn) {
            return (
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <p 
                        //ważne zmiana strony na kliknięcie
                        onClick={() => onRouteChange('signout')}
                        // 
                        className='f3 link dim black underline pa3 pointer'> Sign out </p>
                </nav>
            );
        } else {
            return (
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p 
                    //ważne zmiana strony na kliknięcie
                    onClick={() => onRouteChange('signin')}
                    // 
                    className='f3 link dim black underline pa3 pointer'> Sign in </p>
                <p 
                    //ważne zmiana strony na kliknięcie
                    onClick={() => onRouteChange('register')}
                    // 
                    className='f3 link dim black underline pa3 pointer'> Register </p>
                </nav>
            );      
        }
    }

export default Navigation;