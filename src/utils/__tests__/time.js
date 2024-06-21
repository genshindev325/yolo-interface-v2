import { formatTimeStamp } from '../time'

describe('Time utils', () => {
  describe('formatTimeStamp', () => {
    const doubleDigitMinutes = 1633009170727
    const singleDigitMinutes = 1633010909090

    it('should display hours correctly', () => {
      const test1 = formatTimeStamp(doubleDigitMinutes, 'hh:mm:ss')
      expect(test1).toEqual('06:39:30')
      const test2 = formatTimeStamp(singleDigitMinutes, 'hh:mm:ss')
      expect(test2).toEqual('07:08:29')
    })

    it('should display double digit minutes correctly', () => {
      const formatted = formatTimeStamp(doubleDigitMinutes, 'mm:ss')
      expect(formatted).toEqual('39:30')
    })

    it('should display double digit minutes', () => {
      const formatted = formatTimeStamp(singleDigitMinutes, 'mm:ss')
      expect(formatted).toEqual('08:29')
    })

    it('should display single digit minutes correctly', () => {
      // is this what we want?  39 displayed as 9
      const formatted = formatTimeStamp(doubleDigitMinutes, 'm:ss')
      expect(formatted).toEqual('39:30')
    })

    it('should display single digit minutes', () => {
      const formatted = formatTimeStamp(doubleDigitMinutes, 'm:ss')
      expect(formatted).toEqual('39:30')
    })

    it('should display single digit minutes with single digit minutes', () => {
      const formatted = formatTimeStamp(singleDigitMinutes, 'm:ss')
      expect(formatted).toEqual('8:29')
    })
  })
})
