const ArrowIcon = ({ color = 'black', width = 100, height = 100 }) => {
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 40.000000 20.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <g transform='translate(0.000000,20.000000) scale(0.100000,-0.100000)' fill={color} stroke='none'>
        <path
          d='M101 98 c-53 -52 -88 -94 -81 -96 7 -3 50 33 96 79 l84 84 83 -83
   c73 -73 107 -97 107 -75 0 8 -182 182 -191 183 -3 0 -47 -41 -98 -92z'
        />
      </g>
    </svg>
  )
}

export default ArrowIcon
