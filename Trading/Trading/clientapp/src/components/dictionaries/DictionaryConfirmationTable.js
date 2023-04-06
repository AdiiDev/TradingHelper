import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setOpenDialog } from '../../services/dictionary/DictionarySlice'
import { LoadConfirmations } from '../../services/dictionary/ConfirmationSlice'
import DictionaryConfirmationService from '../../services/dictionary/DictionaryConfirmationsService'
import { confirmationsColumns } from '../../data'
import SortedTable from '../basic/SortedTable'
import DictionaryForm from './DictionaryForm'

const DictionaryConfirmationTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const openDialog = useSelector((state) => state.dict.openDialog)
  const confirmData = useSelector(
    (state) => state.confirmations.loadConfirmations
  )
  const [editData, setEditData] = useState(undefined)

  console.log(confirmData)

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
    toast.success(t('ConfirmationAdded'))
    const updatedConfirmations = [
      ...confirmData.filter((confirm) => confirm.id !== res.result.id),
      res.result,
    ]
    setEditData(undefined)
    dispatch(LoadConfirmations(updatedConfirmations))
    dispatch(setOpenDialog(false))
  }

  const DeleteConfirmation = async (id) => {
    const res = await DictionaryConfirmationService.DeleteConfirmation(id)
    if (res.isError) {
      toast.error(t('ErrorDelete'))
      return
    }
    toast.success(t('Deleted'))
    dispatch(setOpenDialog(false))

    const response = await DictionaryConfirmationService.GetConfirmations()
    if (!response.isError) {
      dispatch(LoadConfirmations(response.result))
    }
  }

  return (
    <>
      <DictionaryForm
        title={'Confirmations'}
        dataInputs={confirmationsColumns}
        openDialog={openDialog}
        onSubmit={handleFormSubmit}
        editData={editData}
      />
      <SortedTable
        columns={confirmationsColumns}
        onDelete={DeleteConfirmation}
        storedData={confirmData}
        editDataTable={(data) => setEditData(data)}
      />
    </>
  )
}
export default DictionaryConfirmationTable
