import { useState, useRef, useCallback } from 'react'
import { Box, Button, Typography } from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useStepContext } from '~/context/step-context'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'
import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'

const AddPhotoStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()
  const { isLaptopAndAbove } = useBreakpoints()
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef(null)

  const photoLabel = tutorStepLabels[3]
  const selectedValue = stepData[photoLabel] || []

  const validateFile = useCallback(
    (selectedFile) => {
      if (!validationData.filesTypes.includes(selectedFile.type)) {
        return t(validationData.typeError)
      }
      if (selectedFile.size > validationData.maxFileSize) {
        return t(validationData.fileSizeError)
      }
      return null
    },
    [t]
  )

  const handleFile = useCallback(
    (selectedFile) => {
      const validationError = validateFile(selectedFile)
      if (validationError) {
        setError(validationError)
        setFile(null)
        handleStepData(photoLabel, [])
        return
      }
      setError('')
      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      handleStepData(photoLabel, [url])
    },
    [validateFile, handleStepData, photoLabel]
  )

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragOver(false)
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      handleFile(droppedFile)
    }
  }

  const handleButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        {selectedValue ? (
          <Box
            alt={t('becomeTutor.photo.imageAlt')}
            component='img'
            src={selectedValue}
            sx={style.img}
          />
        ) : (
          <Box
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              ...style.uploadBox,
              ...(isDragOver && style.activeDrag)
            }}
          >
            <Typography sx={style.previewText}>
              {t('becomeTutor.photo.placeholder')}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={style.rigthBox}>
        <Typography sx={style.description}>
          {t('becomeTutor.photo.description')}
        </Typography>
        <Box sx={style.fileUploader.root}>
          <Button
            fullWidth
            onClick={handleButtonClick}
            startIcon={<CloudUploadOutlinedIcon />}
            sx={style.fileUploader.button}
            variant='outlined'
          >
            {file ? file.name : t('becomeTutor.photo.button')}
          </Button>
          <input
            accept='image/png, image/jpeg'
            onChange={handleFileChange}
            ref={inputRef}
            style={{ display: 'none' }}
            type='file'
          />
        </Box>
        <Typography sx={style.fileSizeNote}>
          {t('becomeTutor.photo.fileSizeError')}
        </Typography>
        {error && (
          <Typography color='error' sx={style.errorText}>
            {error}
          </Typography>
        )}
        {isLaptopAndAbove && <Box sx={style.btnsBox}>{btnsBox}</Box>}
      </Box>
      {!isLaptopAndAbove && <Box sx={style.btnsBox}>{btnsBox}</Box>}
    </Box>
  )
}

export default AddPhotoStep
