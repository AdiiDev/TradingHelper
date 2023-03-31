import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import DictionaryService from '../../services/DictionaryService'
import { confirmationsColumns } from '../../data'
import SortedTable from '../basic/SortedTable'
import DictionaryForm from './DictionaryForm'

const DictionaryConfirmationTable = () => {
  const { t } = useTranslation()
  const openDialog = useSelector((state) => state.dict.openDialog)

  const handleFormSubmit = async (data) => {
    const confirmationData = JSON.stringify({
      id: data.id,
      tradeId: data.tradeID,
      confirmationId: data.confirmationID,
    })
    const res = await DictionaryService.AddConfirmation(confirmationData)
    if (res.isError) {
      toast.error(t('ErrorUpdate'))
    }
    toast.success(t('ConfirmationAdded'))
  }

  return (
    <>
      <DictionaryForm
        title={'Confirmations'}
        dataInputs={confirmationsColumns}
        openDialog={openDialog}
        onSubmit={handleFormSubmit}
      />
      <SortedTable columns={confirmationsColumns} />
    </>
  )
}
export default DictionaryConfirmationTable
