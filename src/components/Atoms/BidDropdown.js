import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'

export const BidDropdown = ({ label, value = 'default', options, onChange, className }) => {
  const dropdownOnChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <BidDropdownWrapper className={className}>
      <Label htmlFor='select_form' className='sort_by'>
        {label}
      </Label>
      <BidDropdownSelectWrapper>
        <Select name='selected_stats' value={value ? value : 'default'} onChange={dropdownOnChange}>
          <SelectOption value='default' disabled>
            {options?.length} bids
          </SelectOption>
          {options?.map((option, idx) => (
            <SelectOption key={idx} value={option.id}>
              {option.direction === 'up' ? '\u2191' : '\u2193'} {option.caption}
            </SelectOption>
          ))}
        </Select>
        <SelectArrow masking />
      </BidDropdownSelectWrapper>
    </BidDropdownWrapper>
  )
}

const BidDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const BidDropdownSelectWrapper = styled.div`
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  position: relative;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  justify-content: flex-start;
  min-width: 80px;
  margin-left: -5px;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: .8rem;
  }
`
const Label = styled.label`
  font-size: 0.8rem;
  margin: 0 0 2px 0;
  font-size: 0.8rem;
  white-space: nowrap;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: .75rem;
  }
`
const Select = styled.select`
  -webkit-appearance: none;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  font-family: inherit;
  font-size: 0.9rem;
  cursor: inherit;
  line-height: 100%;
  z-index: 1;
  outline: none;
  color: #fff;
  position: relative;
  padding: 6px 10px;
  border-radius: 10px;
  min-width: 80px;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: .75rem;
  }
`
const SelectOption = styled.option``

const SelectArrow = styled(IconLib).attrs({
  id: 'arrow',
  collection: 'general',
  name: 'arrow',
  dimension: '6px',
  rotate: 'down'
})`
  width: 10px;
  height: 6px;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
`
