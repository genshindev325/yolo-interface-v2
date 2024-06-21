import { LONGDASH } from 'utils/constants'
import { useConvertAmount } from 'utils/hooks'
import { weiToCrypto, trimString } from 'utils'

export const useWeiConvert = (isWei = true) => {
    const convert = useConvertAmount()
    const toCrypto = (weiAmount) => (weiAmount && weiToCrypto(weiAmount)) ?? 0

    const toCryptoAmount = (amount, currency) => amount ? trimString(isWei? toCrypto(amount) : amount) + " " + currency : LONGDASH
    const toFiatAmount = (amount, currency) => amount ? convert(isWei? toCrypto(amount) : amount, currency, 'USD') : '0'

    return { toCryptoAmount, toFiatAmount }
}