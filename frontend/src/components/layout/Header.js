import './Header.css'
import { Fragment } from 'react'
const Header = () => {
    return (
        <Fragment>
            <div className='header'>
                <div className='wrapper'>
                    <div className='header_left'>                      
                                <a href='#'><i className="fa fa-map-marker"></i>store locator</a>                         
                                <a href='#'><i className="fa fa-wrench"></i>bike repairs</a>                          
                                <a href='#'><i className="fa fa-user"></i>club 99</a>                            
                                <a href='#'><i className="fa fa-phone"></i>1999665444</a>                       
                    </div>
                    <div className='header_right'>                          
                                <a href='#'>signIn</a>
                                <span>or</span>
                                <a href='#'>join</a>                           
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default Header