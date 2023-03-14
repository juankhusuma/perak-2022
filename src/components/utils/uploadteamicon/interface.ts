import { AxiosProgressEvent } from 'axios'

export interface UploadTeamIconProps {
  file: File | undefined
  userId: String
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}
