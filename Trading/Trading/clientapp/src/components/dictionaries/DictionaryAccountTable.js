import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { LoadBrokerAccount } from '../../services/dictionary/BrokerAccountSlice'
import { setOpenDialog } from '../../services/dictionary/DictionarySlice'
import DictionaryAccountService from '../../services/dictionary/DictionaryAccountService'
import SortedTable from '../basic/SortedTable'
import { brokerAccountsColumns } from '../../data'
import DictionaryForm from './DictionaryForm'

const DictionaryAccountTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const openDialog = useSelector((state) => state.dict.openDialog)
  const brokerAccountData = useSelector(
    (state) => state.brokerAccounts.loadBrokerAccount
  )
  const [editData, setEditData] = useState(undefined)

  const handleFormSubmit = async (data) => {
    console.log(data)
    const accountData = JSON.stringify({
      id: data.id,
      brokerName: data.brokerName,
      accountNumber: data.accountNumber,
      name: data.name,
      favourite: JSON.parse(data.favourite),
    })
    const res = await DictionaryAccountService.AddAccount(accountData)
    console.log(res)
    if (res.isError) {
      toast.error(t('ErrorUpdate'))
      return
    }
    toast.success(t('AccountAdded'))
    const updatedBrokerAccounts = [
      ...brokerAccountData.filter((account) => account.id !== res.result.id),
      res.result,
    ]
    dispatch(LoadBrokerAccount(updatedBrokerAccounts))
    dispatch(setOpenDialog(false))
  }

  const DeleteAccount = async (id) => {
    const res = await DictionaryAccountService.DeleteAccount(id)
    if (res.isError) {
      toast.error(t('ErrorDelete'))
      return
    }
    toast.success(t('Deleted'))
    dispatch(setOpenDialog(false))

    const response = await DictionaryAccountService.GetAccounts()
    if (!response.isError) {
      dispatch(LoadBrokerAccount(response.result))
    }
  }

  return (
    <>
      <DictionaryForm
        title={'Accounts'}
        dataInputs={brokerAccountsColumns}
        openDialog={openDialog}
        onSubmit={handleFormSubmit}
        editData={editData}
      />
      <SortedTable
        columns={brokerAccountsColumns}
        onDelete={DeleteAccount}
        storedData={brokerAccountData}
        editDataTable={(data) => setEditData(data)}
      />
    </>
  )
}

export default DictionaryAccountTable
