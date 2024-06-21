import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import styled from 'styled-components'
import { selectYoloEarning } from 'redux/selectors'
import { Tooltip } from 'components/Atoms/Tooltip'
import { YOLO } from 'utils/constants'
import { useWeiConvert } from 'utils/hooks'

export const WalletEarnings = () => {   //@TODO: Need to get yoloEarnings information from backend
    const { toCryptoAmount, toFiatAmount } = useWeiConvert();
    const yoloEarnings = useSelector(selectYoloEarning())

    const earnings = useMemo(() => {
        const earningsTotal = yoloEarnings
        return {
          issuance: {
            description: 'Tokens from YOLO issuance',
            cryptoAmount: toCryptoAmount(yoloEarnings, YOLO),
            fiatAmount: toFiatAmount(yoloEarnings, YOLO)
          },
          participation: {
            description: 'YOLO from beta participation',
            cryptoAmount: toCryptoAmount(yoloEarnings, YOLO),
            fiatAmount: toFiatAmount(yoloEarnings, YOLO)
          },
          total: {
            description: 'Total YOLO Earnings',
            cryptoAmount: toCryptoAmount(earningsTotal, YOLO),
            fiatAmount: toFiatAmount(earningsTotal, YOLO)
          }
        }
    }, [yoloEarnings])

    return (
        <EarningsWrapper>
            <h4>Earnings</h4>
            <TxListContent>
                <TxRow>
                    <StatusWrapper>
                        <Status>
                            {earnings.issuance.description}
                        </Status>
                        <InfoWrapper>
                            <Tooltip container={<ValueInfo>{earnings.issuance.cryptoAmount}</ValueInfo>}>
                                {earnings.issuance.fiatAmount}
                            </Tooltip>
                        </InfoWrapper>
                    </StatusWrapper>
                </TxRow>
                <TxRow>
                    <StatusWrapper>
                        <Status>
                            {earnings.participation.description}
                        </Status>
                        <InfoWrapper>
                            <Tooltip container={<ValueInfo>{earnings.participation.cryptoAmount}</ValueInfo>}>
                                {earnings.participation.fiatAmount}
                            </Tooltip>
                        </InfoWrapper>
                    </StatusWrapper>
                </TxRow>
                <EarningsTotal>
                    <StatusWrapper>
                        <Status>
                            {earnings.total.description}
                        </Status>
                        <InfoWrapper>
                            <Tooltip container={<ValueInfo>{earnings.total.cryptoAmount}</ValueInfo>}>
                                {earnings.total.fiatAmount}
                            </Tooltip>
                        </InfoWrapper>
                    </StatusWrapper>
                </EarningsTotal>
            </TxListContent>
        </EarningsWrapper>
    );
}

const EarningsWrapper = styled.div`
    padding: 10px 0 0 0;
	border-bottom: 0;
	margin: 0 -15px;
    display: flex;
	flex-direction: column;
    * {
        display: flex;
        font-size: 13px;
    }

    h4 {
        margin: 0;
	    padding-left: 25px;	
        text-align: center;
        font-size: 1.1rem;
        font-weight: 600;
    }
`;

const TxListContent = styled.div`
    flex-direction: column;
    max-height: 195px;
	overflow-y: visible;
    font-weight: 400;
	margin-top: 5px;
`;

const TxRow = styled.div`
    text-align: left;
    margin: 0;
    padding: 3px 25px 0 25px;
    cursor: default;
    flex-direction: column;
    display: flex;

    &:first-child {
        margin: 0;
        padding: 7px 25px 0px 25px;
    }
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
const Status = styled.div`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    font-size: .8rem;
    color: #fff;
    opacity: 1;
    display: flex;
`;

const InfoWrapper = styled.div`
    display: flex;
`;

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

const EarningsTotal = styled.div`
    display: flex;
    text-align: left;
    justify-content: space-between;
    cursor: default;
    margin: 0;
    padding: 3px 25px 3px 25px;
    border-top: 1px solid rgba(255,255,255,.1);
    margin-top: 5px;
    padding-top: 5px;
    padding-bottom: 15px;
`;
