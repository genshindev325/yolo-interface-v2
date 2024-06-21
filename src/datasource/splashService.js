import axios from 'axios'

const YOLO_API = {
  preSignup: 'https://luo4fq0r1j.execute-api.us-west-2.amazonaws.com/presignup'
}

export const checkIfAddressExists = async (account) => {
  const res = await axios.post(YOLO_API.preSignup, { message: { account } })
  const accountExists = res.data.accountExists
  return accountExists
}

export const insertAccount = async (formData) => {
  const res = await axios.post(YOLO_API.preSignup, {
    message: { account: formData.address, email: formData.email }
  })
  return res
}
