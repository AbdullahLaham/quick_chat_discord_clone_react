import "@uploadthing/react/styles.css";
 
import { UploadDropzone } from "../lib/uploadthing"
import React, { useCallback } from 'react'
import { FileIcon, X } from "lucide-react";
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from "react-redux";
import { FcPhotoReel } from "react-icons/fc";
import { deleteImage, uploadImage } from "../features/upload/uploadSlice";

// interface FileUploadProps {
//     onChange: (url?: string) => void,
//     value: string,
//     endpoint: "messageFile" | "serverImage",
// }

const FileUpload = ({ onChange, value, endpoint }) => {

  const dispatch = useDispatch();

  // listing images 
  const {images} = useSelector((state) => state?.uploads);


  const handleUpload = useCallback(() => {
    if (images[0]['url']) {
      console.log(images?.[0]['url'], 'tttttttttttt')
      onChange(images?.[0]['url']);
    }
}, [onChange]);

const handleRemoveImage = useCallback(() => {
  if (images?.[0]['url']) {


    
    onChange("");
  }
}, [onChange]);



    const fileType = images?.[0]?.['url']?.split(".")?.pop();

    if (images?.[0]?.['url'] && fileType !== 'pdf') {
        return (
        <div className="flex items-center justify-center w-full">
            <div className="h-[10rem] w-[10rem] relative ">
                <img className="w-full h-full rounded-full object-cover"  src={images?.[0]?.['url']} alt={'Upload'} />
                <button type="button" onClick={() => dispatch(deleteImage())} className="bg-rose-500 text-white p-1 rounded-full flex items-center justify-center absolute top-0 right-0 shadow-sm"><X className="h-4 w-4" /></button>
            </div>
        </div>
        )
    }

    if (value && fileType === 'pdf') {
      return (
        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 ">
          <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
          <a href={value} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">{value}</a>
          <button type="button" onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full flex items-center justify-center absolute -top-2 -right-2 shadow-sm"><X className="h-4 w-4" /></button>
        </div>
      )
    }

  return (
    <div className="">

      {/* <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          onChange(res?.[0]?.url);
        }}
        onUploadError={(error) => {
          // Do something with the error.
          console.log(`ERROR! ${error.message}`);
        }}
      />  */}

      
      <Dropzone onDrop={(acceptedFiles) => {dispatch(uploadImage(acceptedFiles)); handleUpload(); onChange(images[0]['url'])}}>
{({getRootProps, getInputProps}) => (
  <section>
    
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 '>  

        <FcPhotoReel size={50}  />
        <div className='font-semibold text-lg'>
            Click to upload

        </div>
        {/* {images?.length && images[0]['url'] && (
            <div className='absolute inset-0 w-full h-full '>
                <img alt='upload' src={images[0]['url']} style={{objectFit: 'cover'}} className='w-[100%] h-[100%]' />
            </div>
        )} */}
    </div>
      <p className='font-semibold text-gray-500 mt-3'>Drag 'n' drop some files here, or click to select files</p>
    </div>

    
  </section>
)}
</Dropzone>

    </div>
  )
}

export default FileUpload