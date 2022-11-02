import React from 'react'
import '../../styles/loadingIcon.css'
import logo from '../../images/loading_blue.gif'


const LoadingIcon = ({loading}) =>{
    return (
        <div >
            {loading?<img src={logo} style={{"width":"60px","margin-top":"-500px","margin-left":"150px"}} alt='spinner'></img>:<div></div>}
        </div>
    )
}

export default LoadingIcon
