<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'

import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import { useSonner } from '@/composables/useSonner'

const props = withDefaults(defineProps<Props>(), {
  quality: 0.9,
})

const emit = defineEmits<Emits>()

interface Props {
  cropWidth?: number
  cropHeight?: number
  quality?: number
}

interface Emits {
  (e: 'uploaded', name: string): void
}

const { sonner } = useSonner()

let s3Client: S3Client

try {
  s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_S3_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_S3_ID,
      secretAccessKey: import.meta.env.VITE_AWS_S3_KEY,
    },
  })
}
catch (err) {
  console.error('Missing some of the AWS S3 credentials')
  console.error(err)
}

let cropper: Cropper | null = null

const openDialog = ref(false)
const file = ref<File | null>(null)

const inputRef = useTemplateRef('inputRef')
const imageRef = useTemplateRef('imageRef')

const croppedPreview = ref('')
const aspectRatio = ref(1)

const widthOriginal = ref()
const widthResized = ref()

const isPending = ref(false)

const aspectRatios = [
  {
    value: 1,
    label: '1:1',
  },
  {
    value: 4 / 3,
    label: '4:3',
  },
  {
    value: 2 / 3,
    label: '2:3',
  },
  {
    value: 16 / 9,
    label: '16:9',
  },
  {
    value: Number.NaN,
    label: 'Free',
  },
]

const isUploadAvailable = computed(() => {
  return (
    !!import.meta.env.VITE_AWS_S3_URL
    && !!import.meta.env.VITE_AWS_S3_BASKET
    && !!import.meta.env.VITE_AWS_S3_ID
    && !!import.meta.env.VITE_AWS_S3_KEY
    && !!import.meta.env.VITE_AWS_S3_REGION
  )
})

const cropPreview = computed(() => {
  if (!file.value)
    return ''
  return URL.createObjectURL(file.value)
})

const buttonText = computed(() => {
  return isPending.value ? 'Uploading...' : 'Upload'
})

function onClick() {
  inputRef.value?.click()
}

function onChangeInput(e: Event) {
  const _file = (e.target as HTMLInputElement).files?.[0]

  if (_file) {
    openDialog.value = true
    file.value = _file

    nextTick(() => {
      initCropper()
    })
  }
}

function initCropper() {
  if (cropper) {
    cropper.replace(cropPreview.value!)
  }

  cropper = new Cropper(imageRef.value!, {
    aspectRatio: aspectRatio.value,
    viewMode: 1,
    autoCropArea: 1,
    zoomable: false,
    crop: () => {
      croppedPreview.value = cropper?.getCroppedCanvas().toDataURL() || ''
    },
  })
}

function setAspectRatio(ratio: AcceptableValue) {
  cropper?.setAspectRatio(ratio as number)
}

function getCroppedImage() {
  return new Promise<Blob>((resolve) => {
    cropper
      ?.getCroppedCanvas({
        width: widthResized.value || props.cropWidth,
        imageSmoothingQuality: 'medium',
      })
      .toBlob(blob => resolve(blob!), file.value?.type, props.quality)
  })
}

async function uploadImage() {
  if (!file.value)
    return

  isPending.value = true

  const blob = await getCroppedImage()

  try {
    const key = `signature/upload/${Date.now()}-${file.value.name}`

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: import.meta.env.VITE_AWS_S3_BASKET,
        Key: key,
        Body: blob,
        ContentType: file.value.type,
        ACL: 'public-read',
      },
    })

    await upload.done()

    const cdnUrl = import.meta.env.VITE_AWS_S3_URL
    emit('uploaded', `${cdnUrl}/${key}`)

    openDialog.value = false
    sonner({
      title: 'Success',
      type: 'success',
      description: 'Image uploaded successfully',
    })
  }
  catch (err) {
    console.error(err)
    sonner({
      title: 'Error',
      type: 'error',
      description: 'Failed to upload image',
    })
  }
  finally {
    isPending.value = false
  }
}

watch(croppedPreview, () => {
  const img = new Image()

  img.src = cropPreview.value
  img.onload = () => {
    widthOriginal.value = img.width
  }
})
</script>

<template>
  <UiButton
    variant="secondary"
    :disabled="!isUploadAvailable"
    @click="onClick"
  >
    Upload <UilImage />
  </UiButton>
  <UiDialog v-model:open="openDialog">
    <UiDialogContent class="min-w-2xl">
      <UiDialogHeader>
        <UiDialogTitle>Upload Image</UiDialogTitle>
        <UiDialogDescription> Crop image to the desired size. </UiDialogDescription>
      </UiDialogHeader>
      <div>
        <div class="grid grid-cols-[3fr_1fr] gap-4 overflow-hidden">
          <div class="relative max-h-[250px] min-h-[200px]">
            <img
              ref="imageRef"
              :src="cropPreview"
              alt="crop-preview"
            >
          </div>
          <div class="flex flex-col items-center gap-2">
            <img
              :src="croppedPreview"
              alt="cropped-image-preview"
              class="object-contain size-36 border rounded-md"
            >
            <p class="text-sm text-muted-foreground">
              Preview
            </p>
          </div>
        </div>
        <div class="mt-4">
          <UiFieldForm>
            <UiFieldFormItem label="Aspect Ratio">
              <UiToggleGroup
                v-model="aspectRatio"
                variant="outline"
                @update:model-value="setAspectRatio"
              >
                <UiToggleGroupItem
                  v-for="ratio in aspectRatios"
                  :key="ratio.label"
                  :value="ratio.value"
                >
                  {{ ratio.label }}
                </UiToggleGroupItem>
              </UiToggleGroup>
            </UiFieldFormItem>
            <UiFieldFormItem
              label="Resize to"
              :description="`Original width: ${widthOriginal}px`"
            >
              <UiInput
                v-model="widthResized"
                type="number"
                size="sm"
                class="w-24"
              />
            </UiFieldFormItem>
            <UiButton
              :disabled="isPending"
              @click="uploadImage"
            >
              {{ buttonText }}
            </UiButton>
          </UiFieldForm>
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
  <input
    ref="inputRef"
    type="file"
    accept="image/jpeg, image/png, image/gif"
    class="hidden"
    @change="onChangeInput"
  >
</template>
