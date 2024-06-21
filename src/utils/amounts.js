import { UP, DOWN } from 'utils/constants'
import { replaceAll } from './uiUtils'

export const potentialGain = (gamePool, fee, direction, tokenAmount = 0) => {
  //Payout Amount = Payout Ratio × Value Locked × (1 — Treasury Fee)
  let rawGain = 0
  let potentialPayout = 0
  let potentialPayoutStr = '0.00X'

  if (gamePool) {
    let poolUp = gamePool.up
    let poolDown = gamePool.down
    const tokenAmountNumber = Number(typeof tokenAmount === 'string' ? replaceAll(tokenAmount, ',', '') : tokenAmount)

    if (tokenAmountNumber) {
      if (direction === UP) {
        poolUp += tokenAmountNumber
      } else if (direction === DOWN) {
        poolDown += tokenAmountNumber
      }
    }

    const totalPool = poolUp + poolDown

    if (direction === UP) {
      potentialPayout = (totalPool / poolUp) * (1 - fee) || 0
      rawGain = potentialPayout * tokenAmountNumber * (1 - fee)
    } else if (direction === DOWN) {
      potentialPayout = (totalPool / poolDown) * (1 - fee) || 0
      rawGain = potentialPayout * tokenAmountNumber * (1 - fee)
    }

    if (potentialPayout === Infinity) {
      potentialPayoutStr = 'MAX'
    } else {
      potentialPayoutStr = potentialPayout.toFixed(2) + 'X'
    }
  }
  return {
    potentialRawGain: rawGain,
    potentialPayout: potentialPayoutStr
  }
}
