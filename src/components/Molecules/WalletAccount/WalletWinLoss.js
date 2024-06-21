import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Tooltip } from 'components/Atoms/Tooltip';
import { LONGDASH } from 'utils/constants';

export const WalletWinLoss = () => {    //@TODO: Calculate WinLoss information from backend
    const [totalWinnings, setTotalWinnings] = useState({ fiatAmount: 0, cryptoAmount: 0});
    const [totalLosses, setTotalLosses] = useState({ fiatAmount: 0, cryptoAmount: 0});
    
    const onHistory = () => {

    }

    return (
        <WinLossWrapper>
            <h4>Winnings & Losses</h4>
            <WinLossDetail>
                <WinLossItem>
                    <StatusWrapper>
                        <Status>
                            <strong>Total winnings</strong>
                        </Status>
                    </StatusWrapper>
                    <InfoWrapper>
                        <Tooltip container={<ValueInfo>{totalWinnings.fiatAmount}</ValueInfo>}>
                            {totalWinnings.cryptoAmount ?? LONGDASH}
                        </Tooltip>
                    </InfoWrapper>
                </WinLossItem>
                <WinLossItem>
                    <StatusWrapper>
                        <Status>
                            <strong>Total losses</strong>
                        </Status>
                    </StatusWrapper>
                    <InfoWrapper>
                        <Tooltip container={<ValueInfo>{totalLosses.fiatAmount}</ValueInfo>}>
                            {totalLosses.cryptoAmount ?? LONGDASH}
                        </Tooltip>
                    </InfoWrapper>
                </WinLossItem>
                <HistoryButtonWrap>
                    <HistoryButton onClick={onHistory}>History</HistoryButton>
                </HistoryButtonWrap>
            </WinLossDetail>
        </WinLossWrapper>
    );
}

const WinLossWrapper = styled.div`
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

const WinLossDetail = styled.div`
    display: flex;
    max-height: 1950px;
    overflow-y: hidden;
    margin-top: 5px;
    flex-direction: column;
`;

const WinLossItem = styled.div`
    text-align: left;
    margin: 0;
    padding: 3px 25px 0 25px;
    cursor: default;
    flex-direction: row;
    justify-content: space-between;
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
    cursor: default;
    text-align: left;
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
    max-width: 85%;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: auto;
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
    display: flex;
`;

const HistoryButtonWrap = styled.div`
    display: flex;
`

const HistoryButton = styled.button`
    justify-content: center;
    align-items: center;
    -webkit-transition: all 0.3s;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    border: none;
    font-size: .7rem;
    background: rgba(0,0,0,.15);
    border-radius: 8px;
    padding: 5px 10px;
    line-height: 100%;
    display: block;
    margin: 10px 20px;
    color: #fff;
`