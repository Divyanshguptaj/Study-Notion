import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"
import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  // Function to handle dropped files
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      handleFileChange(file)
    }
  }

  // Configure react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video
      ? { "video/*": [".mp4"] }
      : { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  })

  // Function to preview selected file
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  // Handle file selection via click
  const handleFileChange = (file) => {
    if (file) {
      previewFile(file)
      setSelectedFile(file)
      setValue(name, file)
    }
  }

  // Register the input field
  useEffect(() => {
    register(name, { required: true })
  }, [register])

  return (
    <div className="max-w-2xl mx-auto p-6 bg-richblack-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">{label}</h2>

      {/* Hidden File Input for Click Support */}
      <input
        type="file"
        accept={video ? "video/mp4" : "image/*"}
        ref={inputRef}
        onChange={(e) => handleFileChange(e.target.files[0])}
        className="hidden"
      />

      {/* Upload Container */}
      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 p-4`}
        onClick={() => inputRef.current.click()} // Open file dialog on click
      >
        {/* Show preview if file is selected */}
        {previewSource ? (
          <div className="flex w-full flex-col p-4">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {/* Remove File Button */}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-red-400 underline hover:text-red-500"
              >
                Remove File
              </button>
            )}
          </div>
        ) : (
          // Default Upload UI
          <div className="flex w-full flex-col items-center p-4">
            <div className="grid aspect-square w-16 place-items-center rounded-full bg-gray-900">
              <FiUploadCloud className="text-3xl text-yellow-300" />
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Drag & Drop an {!video ? "image" : "video"}, or{" "}
              <span className="font-semibold text-yellow-300">Click to Browse</span>
            </p>
            <ul className="mt-3 flex list-disc space-x-8 text-xs text-gray-500">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size: 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errors[name] && (
        <span className="text-xs text-red-400 mt-2 block">
          {label} is required
        </span>
      )}
    </div>
  )
}
