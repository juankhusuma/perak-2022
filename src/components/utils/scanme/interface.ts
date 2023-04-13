import { AxiosProgressEvent } from 'axios'

export interface scanmeProps {
  file: File | undefined
  userId: String
  challengeId: String
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}
