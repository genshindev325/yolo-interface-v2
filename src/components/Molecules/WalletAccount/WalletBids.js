import { useState, useEffect, useMemo } from 'react';
import { IconLib } from 'components/Atoms/IconLib';
import { Tooltip } from 'components/Atoms/Tooltip';
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { selectChainInfo, selectWalletTxs } from 'redux/selectors'
import { useWeiConvert } from 'utils/hooks'
import { getThreeDotHashEnd, formatTimeFromNow } from 'utils'
import { Link } from 'components/Atoms/Link';

import { doCopy } from 'utils'
import { TX_TYPE } from 'utils/constants';

const TxItem = ({status, roundNumber, timestamp, hashValue, usdAmount, yoloAmount}) => {
    const [hasCopied, setHasCopied] = useState(false)
    const { scannerTemplate } = useSelector(selectChainInfo()) || {}
    const hashLink = useMemo(() => scannerTemplate? scannerTemplate.replace('[hashAddress]', hashValue) : '', [scannerTemplate]);

    useEffect(() => {
      if (hasCopied) {
        const timer = setTimeout(() => {
          setHasCopied(false)
        }, 2000)
        return () => clearTimeout(timer)
      }
    }, [hasCopied])
  
    const onCopy = async (event) => {
      event.stopPropagation()
      event.preventDefault()
      const copied = await doCopy(hashValue)
      
      if (copied) setHasCopied(true)
    }

    return (
        <TxItemWrapper>
            <StatusWrapper>
                <StatusInfo status={status}>
                    {status==="pending" && <><PendingIcon />Pending</>}
                    {status==="confirmed" && <ConfirmedIcon />}
                    {status==="failed" && <><FailedIcon />Failed</>}
                    <strong>Round {roundNumber}</strong>
                </StatusInfo>
                <StatusTimestamp>
                    {timestamp}
                </StatusTimestamp>
            </StatusWrapper>
            <InfoWrapper>
                <HashInfo>
                    <TxLink href={hashLink}>{getThreeDotHashEnd(hashValue)}</TxLink>
                    <CopyIcon name={hasCopied ? 'tick' : 'copy'} onClick={onCopy}/>  
                </HashInfo>
                <Tooltip container={<ValueInfo>{usdAmount}</ValueInfo>}>
                    <span className="currency_type">{yoloAmount}</span>
                </Tooltip>
            </InfoWrapper>
            {status === "pending" && <WalletBidsButtonWrapper>
                <TxSpeedButtonWrap>
                    <TxSpeedLabel>Tx Speed</TxSpeedLabel>
                    <LowButton>Low</LowButton>
                    <MedButton>Med</MedButton>
                    <HighButton>High</HighButton>
                </TxSpeedButtonWrap>
                <CancelButton>Cancel bid</CancelButton>
            </WalletBidsButtonWrapper>}
        </TxItemWrapper>
    );
}

export const WalletBids = () => {
    const txList = useSelector(selectWalletTxs())
    const { toCryptoAmount, toFiatAmount } = useWeiConvert();
    const bidTxList = txList.filter((tx) => {
        return tx.txType === TX_TYPE.BID;
    })
    return (
        <BidsWrapper>
            <h4>Bids</h4>
            <TxListWrapper>
                {bidTxList.map((tx, index) => (
                    <TxItem status={tx.status} key={index} roundNumber={tx.txParams.bidRoundIndex} timestamp={formatTimeFromNow(tx.timestamp)}
                        hashValue={tx.hash} usdAmount={toFiatAmount(tx.txParams.amount, tx.txParams.currency)} yoloAmount={toCryptoAmount(tx.txParams.amount, tx.txParams.currency)}/>
                ))}
            </TxListWrapper>
        </BidsWrapper>
    );
}

const BidsWrapper = styled.div`
    padding: 15px 0 0 0;
	border-bottom: 1px solid rgba(255, 255, 255, .2);
	margin: 0 -15px;
	flex-direction: column;
    * {
        font-size: 13px;
    }
    h4 {
        display: flex;
        margin: 0;
	    padding-left: 25px;
        text-align: center;
        font-size: 1.1rem;
        font-weight: 600;	
    }
`;

const TxListWrapper = styled.div`
    display: flex;
    max-height: 195px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 5px;
    flex-direction: column;
`;

const TxItemWrapper = styled.div`
    margin: 0 0 5px 0;
	padding: 6px 25px;
	text-align: left;
	flex-direction: column;
    display: flex;
`;

const StatusWrapper = styled.div`
    justify-content: space-between;
    margin: 0;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: row;
`;

const StatusInfo = styled.div`
    display: flex;
    opacity: 1;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    font-size: .8rem;
    max-width: 85%;
    color: ${({ status }) => status === 'pending' ? '#e5c247' : (status === 'confirmed' ? '#2a6dff' : '#ff0000')};

    strong {
        padding: 0 0 0 5px;
        font-weight: 600;
        color: #fff;
    }
`;

const PendingIcon = styled(IconLib).attrs({
    collection: 'general',
    dimension: '16px',
    name: 'pendingYellow'
})`
    margin: 0 5px 0 0;
`
const ConfirmedIcon = styled(IconLib).attrs({
    collection: 'general',
    dimension: '16px',
    name: 'checkBlue'
})`
    margin: 0 5px 0 0;
`
const FailedIcon = styled(IconLib).attrs({
    collection: 'general',
    dimension: '16px',
    name: 'alertRed'
})`
    margin: 0 5px 0 0;
`
const StatusTimestamp = styled.div`
    font-size: .65rem;
    font-weight: 200;
    display: flex;
`;
const InfoWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .value {
        
    }
`;
const WalletBidsButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0 0 0;
`
const TxSpeedButtonWrap = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.1);
    padding: 2px 2px 2px 8px;
    border-radius: 10px;
`
const TxSpeedLabel = styled.div`
    display: flex;
    font-size: .7rem;
    margin: 0 4px 0 0;
`
const LowButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-transition: all 0.3s;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
    font-size: .7rem;
    margin: 0 0 0 4px;
    background: rgba(0,194,19,.2);
    color: #fff;
`
const MedButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-transition: all 0.3s;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
    font-size: .7rem;
    margin: 0 0 0 4px;
    background: rgba(0,194,19,.4);
    color: #fff;
`
const HighButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-transition: all 0.3s;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
    font-size: .7rem;
    margin: 0 0 0 4px;
    background: rgba(0,194,19,.6);
    color: #fff;
`
const CancelButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-transition: all 0.3s;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
    font-size: .7rem;
    background: rgba(0,0,0,.15);
    font-weight: 300;
    color: #fff;
`
const HashInfo = styled.div`
    display: flex;
    text-align: left;
    position: relative;
    font-weight: 300;
    left: 0;
    span {
        width: 220px;
        text-overflow: ellipsis;
        font-weight: 200;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        opacity: .8;
    }
`;

const TxLink = styled(Link)`
    width: 220px;
    text-overflow: ellipsis;
    font-weight: 200;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    opacity: .8;
    text-decoration: none;

    &:hover {
        color: #fff;
    }
`

const CopyIcon = styled(IconLib).attrs({
    collection: 'general',
    dimension: '12px',
    masking: true
})`
    margin: 0 0 0 10px;
    cursor: pointer;
`

const ValueInfo = styled.div`
    justify-content: space-between;
    margin: 0 0 0 5px;
    font-weight: 500;
    font-size: .8rem;
    white-space: nowrap;
    letter-spacing: -.01em;
    flex-direction: column;
    text-align: right;
    align-items: flex-end;
    line-height: 100%;
`;