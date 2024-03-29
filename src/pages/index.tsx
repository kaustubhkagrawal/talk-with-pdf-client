import { Button } from '@/components/ui/Button'
import FileUpload from '@/components/ui/FileUpload'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { FileText, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/router'

import { indexDocument, uploadDocument } from '@/apis'
import { cn } from '@/lib/utils/utils'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const { control, watch, setValue, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('file', data.file)
    setIsLoading(true)
    try {
      const response = await uploadDocument(formData)
      console.log('File uploaded successfully: ', response.data)

      const document = response.data

      if (document.url)
        try {
          await indexDocument(document)
          setIsLoading(false)
          router.push(`/document/${document.id}`)
        } catch (error) {
          console.error('Error in indexing the file', error)
          setIsLoading(false)
        }
      // Handle the response as needed
    } catch (error) {
      console.error('Error uploading file: ', error)
      setIsLoading(false)
      // Handle the error as needed
    }
  }

  const file = watch('file')

  return (
    <>
      <div
        className={cn(
          'flex flex-wrap flex-col items-center justify-center min-h-screen text-center',
          inter.className,
        )}
      >
        <h1 className="text-center w-full text-4xl font-bold pb-5">
          Talk with any PDF
        </h1>
        <p className="max-w-96 text-center pb-4 text-slate-600">
          Join millions of students, researchers and professionals to instantly
          answer questions and understand research with AI
        </p>

        <form className="max-w-96 w-full" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="file"
            control={control}
            render={({ field }) => <FileUpload {...field} />}
          />

          {file ? (
            <div className="flex gap-2 mb-4">
              <FileText />
              <span>{file.name}</span>

              <button
                className="ml-auto"
                onClick={() => setValue('file', null)}
              >
                <X />
              </button>
            </div>
          ) : null}
          <Button variant={'default'} disabled={isLoading} type="submit">
            {isLoading ? <Loader2 className="animate-spin mr-2 -ml-2" /> : null}
            Upload
          </Button>
        </form>
      </div>
    </>
  )
}
