import React from 'react'
import { useMediaQuery } from 'react-responsive'

const Portret = () => {

    const isPortrait = useMediaQuery({ orientation: 'portrait' })

    return isPortrait
}
export default Portret