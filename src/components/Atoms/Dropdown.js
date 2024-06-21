import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'

export const Dropdown = ({ label, value, options, onChange, className }) => {
  const dropdownOnChange = (e) => {
    const fieldId = e.target.value
    onChange({ fieldId, isSortUp: value.isSortUp })
  }
  const sortArrowClick = () => {
    onChange({ fieldId: value.fieldId, isSortUp: !value.isSortUp })
  }
  return (
    <DropdownWrapper className={className}>
      <Label htmlFor='select_form' className='sort_by'>
        {label}
      </Label>
      <DropdownSelectWrapper>
        <Select name='selected_stats' value={value.fieldId} onChange={dropdownOnChange}>
          {options.map((option, idx) => (
            <SelectOption key={idx} value={option.id}>
              {option.caption}
            </SelectOption>
          ))}
        </Select>
      </DropdownSelectWrapper>
      <SelectArrowWrapper>
        <SelectArrow isUp={value.isSortUp} onClick={sortArrowClick} />
      </SelectArrowWrapper>
    </DropdownWrapper>
  )
}

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 15px 0;
`
const DropdownSelectWrapper = styled.div`
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  position: relative;
  border-radius: 10px;
  font-size: 0.8rem;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  margin: 0 0 0 5px;
  justify-content: flex-start;
`
const Label = styled.label`
  font-size: 0.8rem;
`
const Select = styled.select`
  appearance: none;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  z-index: 1;
  outline: none;
  color: #fff;
  position: relative;
  padding: 6px 30px 6px 15px;
  border-radius: 10px;
`
const SelectOption = styled.option``
const SelectArrowWrapper = styled.div`
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  margin: 0 0 0 5px;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`
const SelectArrow = styled(IconLib).attrs(({ isUp }) => ({
  id: 'arrow',
  collection: 'general',
  name: 'arrow',
  dimension: '12px',
  rotate: isUp ? 'up' : 'down'
}))``
