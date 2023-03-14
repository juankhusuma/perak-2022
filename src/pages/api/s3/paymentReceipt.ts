import { NextApiRequest, NextApiResponse } from 'next'
import aws from 'aws-sdk'

const uploadPaymentReceipt = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed')
  }

  const {
    query: { file },
    body: { userId },
  } = req

  if (!file) {
    return res.status(404).send({
      error: 'Please provide a file',
    })
  }

  aws.config.update({
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
  })

  const s3 = new aws.S3()

  const Key = `paymentReceipt/${userId}/${file}`

  const minSizeFile = 0
  const maxSizeFile = 30 * 1024 * 1024

  const post = s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET_NAME,
    Fields: {
      Key,
    },
    Expires: 60,
    Conditions: [['content-length-range', minSizeFile, maxSizeFile]],
  })

  return res.send(post)
}

export default uploadPaymentReceipt
