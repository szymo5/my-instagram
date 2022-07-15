import React from 'react'

import {Stack} from '@mui/material'
import {Rings} from 'react-loader-spinner'

const Loader = () => {
  return (
    <Stack width="350px" justifyContent="center" alignItems="center">
        <Rings color="#0095f6"/>
    </Stack>

  )
}

export default Loader