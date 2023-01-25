import { BtnSquareBlack } from '../cmps/ui/buttons/btn-square-black'
import { BtnSquareColor } from '../cmps/ui/buttons/btn-square-color'
import { BtnSquare } from '../cmps/ui/buttons/btn-square'
import { BtnNavRounded } from '../cmps/ui/buttons/btn-nav-rounded'
import { BtnNavRoundedBlack } from '../cmps/ui/buttons/btn-nav-rounded-black'
import { Heart } from '../cmps/ui/heart'
import { BtnSquareSecond } from '../cmps/ui/buttons/btn-square-second'

export function UI() {
  return (
    <div>
      <BtnSquareColor>BtnSquareColor</BtnSquareColor>
      <BtnSquare>BtnSquare</BtnSquare>
      <BtnSquareSecond>BtnSquareSecond</BtnSquareSecond>
      <BtnSquareBlack>BtnSquareBlack</BtnSquareBlack>

      <p>Nav buttons has active state like NavLink </p>
      <BtnNavRounded>BtnNavRounded</BtnNavRounded>
      <BtnNavRoundedBlack>BtnNavRoundedBlack</BtnNavRoundedBlack>
      <Heart />
    </div>
  )
}
