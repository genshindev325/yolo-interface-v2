const EthereumIcon = ({ color = 'black', width = 100, height = 100 }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' width={width} height={height}>
      <path
        d='M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z'
        fill={color}
      />
    </svg>
  )
}

export default EthereumIcon
