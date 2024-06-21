import styled from 'styled-components'

export const TokenInfoSection = () => {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Params</th>
            <th>Percentage</th>
            <th>Numbers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fee</td>
            <td>
              <span>3%</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Rewards, Total</td>
            <td>
              <span>34% over 3 years, 32% stakers, 2% players</span>
            </td>
            <td>320M stakers, 20M players</td>
          </tr>
          <tr>
            <td>Rewards, LP Schedule</td>
            <td>
              <span>2% first two months, 30% over 3 years</span>
            </td>
            <td>20M/1st mo, 100M/yr (8.33M/mo)</td>
          </tr>
          <tr>
            <td>Rewards, Player Incentives</td>
            <td>
              <span>More than 500 rounds participate in first month get 0.5%, max of 0.1% per winner, earn an NFT</span>
            </td>
            <td>500</td>
          </tr>
          <tr>
            <td>Minimum bid amount</td>
            <td></td>
            <td>
              <span>$5 per bid</span>
            </td>
          </tr>
        </tbody>
      </Table>
      <ol>
        <li>Token breakdown</li>
        <li>5.0% Token Issuance</li>
        <li>35.89% Investors (1 year vest)</li>
        <li>20.0% founders + advisors</li>
        <li>34.0% Liquidity Rewards</li>
        <li>10.10% Treasury</li>
      </ol>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: center;
  padding: 30px 0 0 0;
  ol {
    list-style: none;
    ${({ theme }) => theme.breakPoints['lg']} {
      width: 100%;
      margin: 30px 0 0 0;
    }
  }
  li {
    &:first-child {
      font-weight: 600;
      margin: 0 0 5px 0;
      font-size: 1.3rem;
    }
    text-align: left;
    white-space: nowrap;
    font-size: 1rem;
    line-height: 160%;
    ${({ theme }) => theme.breakPoints['lg']} {
      text-align: center;
      font-size: 1.2rem;
    }
    ${({ theme }) => theme.breakPoints['lg']} {
      font-size: 1.1rem;
    }
  }
  ${({ theme }) => theme.breakPoints['xl']} {
    justify-content: space-between;
  }
  ${({ theme }) => theme.breakPoints['lg']} {
    flex-direction: column;
  }
  ${({ theme }) => theme.breakPoints['lg']} {
    padding: 15px 0 0 0;
  }
`
const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 60%;
  margin: 0 50px 0 0;
  td {
    border-color: rgba(255, 255, 255, 0.1);
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    padding: 10px 15px;
    word-break: normal;
    text-align: left;
    font-size: 13px;
    vertical-align: top;
    &:nth-child(1) {
      font-weight: 700;
    }
  }
  th {
    border-color: rgba(255, 255, 255, 0.1);
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    padding: 10px 15px;
    word-break: normal;
    font-weight: 300;
    font-size: 13px;
    text-align: left;
    vertical-align: top;
  }
  ${({ theme }) => theme.breakPoints['xl']} {
    width: 65%;
    margin: 0 25px 0 0;
  }
  ${({ theme }) => theme.breakPoints['lg']} {
    width: 100%;
  }
`
