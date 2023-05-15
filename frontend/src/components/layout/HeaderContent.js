import './HeaderContent.css'
const HeaderContent = () => {
    return (
        <div className='headercontent'>
            <div className='wrapper'>
                <div className='headercontent_left'>
                    <img src="./img/logo.png" />
                </div>
                <div className='headercontent_right'>
                    <div className="search">
                        <input type="text" placeholder="Search your product here..." maxlength="128"></input>
                        <img src="./img/search-icon.png" alt="search"/>
                    </div>
                    <div className="cart"><img src="./img/cart.png" alt="cart"/></div>
                    
                </div>
            </div>
        </div>
    )
}

export default HeaderContent