import { uploadToBlog } from "@/utils/UploadToBlog";
import { Input } from "./ui/input";
import { UploadCloud } from "lucide-react";

 

export default  function ImageUploadComponent({value , returnUrl}){
    const handleImageUpload = async (e)=>{
        const file = e.target.files[0]
        const {url} = await uploadToBlog(file)
        returnUrl(url)
        
    }
    return(
 <div className="w-full max-w-xl mx-auto mt-6 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 transition hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-zinc-800">
        <UploadCloud className="w-12 h-12 text-blue-500 mb-3" />
        <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Drag & drop your images here</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to select</p>

        <Input
          onChange={handleImageUpload}
          type="file"
          accept="image/*"
          multiple
          className="cursor-pointer opacity-0 absolute inset-0"
        />
        <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer z-10 relative">
          Select Images
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
      </div>
      

      {value && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <img src={value} alt="Uploaded" className="rounded-xl w-full h-40 object-cover" />
        </div>
      )}
    </div>
    )
}