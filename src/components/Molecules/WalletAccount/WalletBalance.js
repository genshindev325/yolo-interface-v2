import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { LONGDASH, YOLO } from 'utils/constants'
import { selectWalletAddress, selectWalletBalance } from 'redux/selectors'
import { Tooltip } from 'components/Atoms/Tooltip'
import { getWeb3Utils } from 'utils/web3.utils'
import { reduxWalletActions } from 'redux/actions'
import { useWeiConvert } from 'utils/hooks'

export const WalletBalance = () => {
    const { toFiatAmount } = useWeiConvert(false);
    const { totalBalance, tokenBalance, userBalance } = useSelector(selectWalletBalance())
    const address = useSelector(selectWalletAddress())
    const dispatch = useDispatch()

    const onUserWithdraw = () => {
        const web3Utils = getWeb3Utils()
        const userBalanceVal = userBalance.toString()
        const txData = { amount: web3Utils.toWei(userBalanceVal) }
        dispatch(reduxWalletActions.withdrawUserBalance(txData, address))
    }
    return (
        <BalanceWrapper>
            <Balance>
                <h4>
                    <span>Total Balance</span> 
                    <Tooltip>
                        <TotalsBreakdown>
                            <ul>
                                <li className='title'> Wallet Balance </li>
                                <li> {toFiatAmount(tokenBalance, YOLO)} <YoloCurrency>( {tokenBalance? `${tokenBalance.toFixed(2)} ${YOLO}` : LONGDASH} )</YoloCurrency></li>
                            </ul>
                            <ul className='explanation'>
                                <li>Your YOLO balance in the ERC20 contract</li>
                            </ul>
                            <ul>
                                <li className='title'> App Balance </li>
                                <li> {toFiatAmount(userBalance, YOLO)} <YoloCurrency>( {userBalance? `${userBalance.toFixed(2)} ${YOLO}` : LONGDASH} )</YoloCurrency></li>
                            </ul>
                            <ul className='explanation'>
                                <li>Your YOLO balance held within the Users contract</li>
                            </ul>
                        </TotalsBreakdown>
                    </Tooltip>
                </h4>
                <CurrencyWrapper>
                    <Tooltip container={totalBalance ? `${totalBalance.toFixed(2)} ${YOLO}` : LONGDASH}>
                        <CurrencyType>{toFiatAmount(totalBalance, YOLO)}</CurrencyType>
                    </Tooltip>
                </CurrencyWrapper>
            </Balance>
            <WithdrawButton onClick={onUserWithdraw}>Claim your Winnings</WithdrawButton>
        </BalanceWrapper>
    );
}

const BalanceWrapper = styled.div`
    font-size: 1.0rem;
	padding: 15px 25px;
	margin: 2px -15px 0 -15px;
	color: #fff;
	
	align-items: center;
	flex-direction: column;
	background: rgba(0, 0, 0, .2);
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
	cursor: default;
    display: flex;
`;

const Balance = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    h4 {
        font-size: .9rem;
        text-align: center;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const CurrencyWrapper = styled.div`
    align-items: center;
    font-weight: 600;
    font-size: .9rem;
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const WithdrawButton = styled.button`
    color: #fff;
    outline: none;
    border: none;
    text-decoration: none;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    justify-content: center;
    align-items: center;
    line-height: 160%;

    background: linear-gradient(180deg, rgba(42,109,255,1) 0%, rgba(32,83,195,1) 100%);
    padding: 6px 15px;
    border-radius: 10px;
    font-size: .8rem;
    width: 100%;
    margin: 12px 0 0 0;

    display: flex;    
`

const TotalsBreakdown = styled.div`
    display: flex;
    padding: 10px;
    flex-direction: column;
    & * {
        display: flex;
    }
    ul:nth-child(3) {
        padding: 10px 0 0 0;
    }
    ul, ol, li {
        list-style: none;
    }
    li.title {
        font-weight: 600;
        margin: 0 10px 0 0;
    }
    ul.explanation li {
        font-size: .7rem;
        opacity: .7;
    }
`
const YoloCurrency = styled.div`
    display: flex;
    opacity: .5;
    padding: 0 0 0 5px;
`
const CurrencyType = styled.span`
    display: flex;
    margin-left: 0;
    opacity: .5;
    font-size: .8rem;
    padding: 2px 0 0 2px;
    line-height: 150%;
`