import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setBrokerAccounts } from '../../services/dictionary/BrokerAccountSlice'
import DictionaryAccountService from '../../services/dictionary/DictionaryAccountService'
import { brokerAccountsColumns } from '../../data'
import SortedTable from '../sortedTable/SortedTable'
import DictionaryForm from './DictionaryForm'

const DictionaryAccountTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const brokerAccountData = useSelector(
    (state) => state.brokerAccounts.brokerAccounts
  )
  const [openDialog, setOpenDialog] = useState(false)
  const [editData, setEditData] = useState(null)

  const handleFormSubmit = async (data) => {
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
    toast.success(t('Added'))
    const updatedBrokerAccounts = [
      ...brokerAccountData.filter((account) => account.id !== res.result.id),
      res.result,
    ]
    dispatch(setBrokerAccounts(updatedBrokerAccounts))
    setOpenDialog(false)
  }

  const deleteAccount = async (id) => {
    const res = await DictionaryAccountService.DeleteAccount(id)
    if (res.isError) {
      toast.error(t('ErrorDelete'))
      return
    }
    toast.success(t('Deleted'))
    setOpenDialog(false)

    const response = await DictionaryAccountService.GetAccounts()
    if (!response.isError) {
      dispatch(setBrokerAccounts(response.result))
    }
  }

  return (
    <>
      <DictionaryForm
        title={'Accounts'}
        dataInputs={brokerAccountsColumns}
        openDialog={openDialog}
        setOpenDialog={(bool) => setOpenDialog(bool)}
        onSubmit={handleFormSubmit}
        editData={editData}
      />
      <SortedTable
        columns={brokerAccountsColumns}
        onDelete={deleteAccount}
        storedData={brokerAccountData}
        editDataTable={(data) => setEditData(data)}
        setEditDataTable={(bool) => setEditData(bool)}
        setOpenDialog={(bool) => setOpenDialog(bool)}
      />
    </>
  )
}

export default DictionaryAccountTable
