import { Signal, Upload } from "lucide-react"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { enableMapSet} from "immer"
import { uploadFileToStorage } from "../http/upload-file-to-storage"

export type Upload = {
    name: string,
    file: File,
    status: 'progress' | 'success' | 'cancelled' | 'error',
    abortController: AbortController
}

type UploadState = {
    uploads: Map<string, Upload>
    addUploads: (files: File[]) => void,
    cancelUpload: (uploadId: string) => void,
}

enableMapSet()

export const useUploads = create<UploadState, [["zustand/immer", never]]>(immer((set, get) => {

    function cancelUpload(uploadId: string) {
        const upload = get().uploads.get(uploadId);

        if(!upload) {
            return
        }

        upload.abortController.abort()

        set((state) => {
            state.uploads.set(uploadId, {
                ...upload,
                status: "cancelled"
            })
        })
    }

    async function processUpload(uploadId:string) {
        const upload = get().uploads.get(uploadId);

        if(!upload) {
            return
        }

        try {
            await uploadFileToStorage(
                { file: upload.file },
                { signal: upload.abortController.signal }
            );

            set((state) => {
                state.uploads.set(uploadId, {
                    ...upload,
                    status: 'success',
                })
            })

        } catch {
            set((state) => {
                state.uploads.set(uploadId, {
                    ...upload,
                    status: 'error'
                })
            })

        }
    } 

    function addUploads(files: File[]) {
        for(const file of files) {
            const uploadId = crypto.randomUUID();
            const abortController = new AbortController();

            const upload: Upload = {
                name: file.name,
                file,
                abortController,
                status: 'progress'
            }

            set((state) => {
                state.uploads.set(uploadId, upload)
            })

            processUpload(uploadId)
        }
    }

    return {
        uploads: new Map(),
        addUploads,
        cancelUpload,
    }
}))
