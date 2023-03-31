import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import DictionaryService from '../../services/DictionaryService'
import SortedTable from '../basic/SortedTable'
import { brokerAccountsColumns } from '../../data'
import DictionaryForm from './DictionaryForm'

const DictionaryAccountTable = () => {
  const { t } = useTranslation()
  const openDialog = useSelector((state) => state.dict.openDialog)

  const handleFormSubmit = async (data) => {
    const accountData = JSON.stringify({
      id: data.id,
      brokerName: data.brokerName,
      accountNumber: data.accountNumber,
      name: data.name,
      favourite: data.favourite,
    })

    const res = await DictionaryService.AddAccount(accountData)
    if (res.isError) {
      toast.error(t('ErrorUpdate'))
    }
    toast.success(t('AccountAdded'))
  }

  return (
    <>
      <DictionaryForm
        title={'Accounts'}
        dataInputs={brokerAccountsColumns}
        openDialog={openDialog}
        onSubmit={handleFormSubmit}
      />
      <SortedTable columns={brokerAccountsColumns} />
    </>
  )
}

export default DictionaryAccountTable
