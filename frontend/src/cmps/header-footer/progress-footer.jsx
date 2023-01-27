import { BtnLink } from '../ui/buttons/btn-link'
import { BtnSquareBlack } from '../ui/buttons/btn-square-black'

export function ProgressFooter() {
  return (
    <div className='progress-footer main-layout full'>
      <BtnLink>Back</BtnLink>
      <BtnSquareBlack>Next</BtnSquareBlack>
    </div>
  )
}
