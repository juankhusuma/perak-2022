import { useRouter } from 'next/router'
import { api } from 'src/utils/api'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const AddChallengePage = () => {
  const router = useRouter()

  const addSubmission = api.scanMe.addSubmission.useMutation({
    onSuccess: () => {
      toast.success('Berhasil menambahkan challenge')
      void router.replace('/scan-me')
    },
    onError: () => {
      toast.error('Terjadi error dalam menambahkan challenge')
      void router.replace('/scan-me')
    },
  })

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query
      id && addSubmission.mutate({ challengeId: (id as string) ?? '' })
    }
  }, [router.isReady])

  return <main className="h-[calc(100vh-81px)]"></main>
}

export default AddChallengePage
