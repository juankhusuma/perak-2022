import axios from 'axios'
import { UploadPaymentReceiptProps } from './interface'

export const uploadPaymentReciept = async ({
  file,
  userId,
  onUploadProgress,
}: UploadPaymentReceiptProps) => {
  const minSize = 0
  const maxSize = 1 * 1024 * 1024 // 1MB

  if (file?.size! > maxSize) throw new Error('File size is too large')

  if (file?.size! < minSize) throw new Error('File size is too small')

  const filename = file?.name

  const csrf = await axios.get('/api/auth/csrf')

  const res = await axios.post(
    `/api/s3/paymentReceipt?file=` + filename,
    { userId },
    {
      headers: {
        'anti-csrf': csrf.data.csrfToken,
      },
    }
  )

  const { url, fields, error } = res.data

  if (error) throw new Error(error)

  if (!url || !fields) {
    throw new Error('Invalid response from server')
  }

  const formData = new FormData()
  Object.entries({ ...fields, file }).forEach(([key, value]: any[]) => {
    formData.append(key, value)
  })

  const upload = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  })

  const baseURL = process.env.AWS_BASE_OBJECT_URL

  const awsUrl = `https://perak2023.s3.ap-northeast-1.amazonaws.com/paymentReceipt/${userId}/${file?.name}`

  if (upload?.status == 204) {
    return awsUrl
  } else {
    throw new Error('Upload failed')
  }
}
