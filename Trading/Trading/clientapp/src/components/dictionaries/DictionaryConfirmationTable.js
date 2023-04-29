import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setConfirmations } from '../../services/dictionary/ConfirmationSlice'
import DictionaryConfirmationService from '../../services/dictionary/DictionaryConfirmationsService'
import { confirmationsColumns } from '../../data'
import SortedTable from '../sortedTable/SortedTable'
import DictionaryForm from './DictionaryForm'

const DictionaryConfirmationTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const confirmData = useSelector((state) => state.confirmations.confirmations)
  const [editData, setEditData] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleFormSubmit = async (data) => {
    const confirmationData = JSON.stringify({
      id: data.id,
      name: data.name,
      favourite: JSON.parse(data.favourite),
    })
    console.log(confirmationData)
    const res = await DictionaryConfirmationService.AddConfirmation(
      confirmationData
    )
    if (res.isError) {
      toast.error(t('ErrorUpdate'))
      return
    }
    toast.success(t('Added'))
    const updatedConfirmations = [
      ...confirmData.filter((confirm) => confirm.id !== res.result.id),
      res.result,
    ]
    setEditData(undefined)
    dispatch(setConfirmations(updatedConfirmations))
    setOpenDialog(false)
  }

  const deleteConfirmation = async (id) => {
    const res = await DictionaryConfirmationService.DeleteConfirmation(id)
    if (res.isError) {
      toast.error(t('ErrorDelete'))
      return
    }
    toast.success(t('Deleted'))
    setOpenDialog(false)

    const response = await DictionaryConfirmationService.GetConfirmations()
    if (!response.isError) {
      dispatch(setConfirmations(response.result))
    }
  }

  return (
    <>
      <DictionaryForm
        title={'Confirmations'}
        dataInputs={confirmationsColumns}
        openDialog={openDialog}
        setOpenDialog={(bool) => setOpenDialog(bool)}
        onSubmit={handleFormSubmit}
        editData={editData}
      />
      <SortedTable
        columns={confirmationsColumns}
        onDelete={deleteConfirmation}
        storedData={confirmData}
        editDataTable={(data) => setEditData(data)}
        setOpenDialog={(bool) => setOpenDialog(bool)}
      />
    </>
  )
}
export default DictionaryConfirmationTable
