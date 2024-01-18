import { Button } from '@/components/ui/Button'
import { CALL_STATUS } from '@/lib/constants'
import { useVapi } from '@/lib/hooks/useVapi'
import Lottie from 'lottie-react'
import { useState } from 'react'

import ActiveIcon from '../../../lottie-icons/active_icon.json'
import InactiveIcon from '../../../lottie-icons/inactive_icon.json'
import LoadingIcon from '../../../lottie-icons/loading_icon.json'

const ICONS_DATA = {
  [CALL_STATUS.ACTIVE]: ActiveIcon,
  [CALL_STATUS.INACTIVE]: InactiveIcon,
  [CALL_STATUS.LOADING]: LoadingIcon,
}

const buttonTextConfig = {
  [CALL_STATUS.ACTIVE]: 'Stop',
  [CALL_STATUS.LOADING]: 'Loading...',
  [CALL_STATUS.INACTIVE]: 'Start',
}

interface VapiButtonProps
  extends Pick<ReturnType<typeof useVapi>, 'isCallActive' | 'toggleCall'> {}

export function VapiButton(props: VapiButtonProps) {
  const { isCallActive, toggleCall } = props

  return (
    <Button
      asChild
      className="rounded-full cursor-pointer group p-10 transition-all bg-transparent hover:bg-transparent"
      disabled={isCallActive === CALL_STATUS.LOADING}
      onClick={toggleCall}
    >
      <Lottie
        animationData={ICONS_DATA[isCallActive]}
        style={{
          width: isCallActive === CALL_STATUS.LOADING ? 150 : 250,
          height: isCallActive === CALL_STATUS.LOADING ? 150 : 250,
          margin: isCallActive === CALL_STATUS.LOADING ? 50 : 0,
        }}
      />
    </Button>
  )
}