import { BtnLink } from '../ui/buttons/btn-link'
import { BtnSquareBlack } from '../ui/buttons/btn-square-black'
import { ProgressBar } from '../ui/progress-bar/progress-bar'

export function ProgressFooter({ currStep, setStepNum, ...props }) {
  return (
    <div className='progress-footer'>
      <ProgressBar currStep={currStep} numSteps={6} />
      <div className='nav  main-layout full'>
        <BtnLink
          onClick={() => {
            setStepNum((prev) => {
              prev--

              return Math.max(prev, 0)
            })
          }}>
          Back
        </BtnLink>
        <BtnSquareBlack
          onClick={() => {
            setStepNum((prev) => {
              prev++
              // console.log('prev:', prev)
              return Math.min(prev, 4)
            })
          }}>
          Next
        </BtnSquareBlack>
      </div>
    </div>
  )
}
