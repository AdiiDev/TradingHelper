import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setTradingPairs } from '../../services/dictionary/TradingPairsSlice'
import { tradingPairsColumns } from '../../data'
import DictionaryTradingPairsService from '../../services/dictionary/DictionaryTradingPairsService'
import SortedTable from '../sortedTable/SortedTable'
import DictionaryForm from './DictionaryForm'

const DictionaryTradingPairTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const pairsData = useSelector((state) => state.tradingPairs.tradingPairs)
  const [editData, setEditData] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleFormSubmit = async (data) => {
    const tradingPairsData = JSON.stringify({
      id: data.id,
      symbol: data.symbol,
      favourite: JSON.parse(data.favourite),
    })
    const res = await DictionaryTradingPairsService.AddTradingPair(
      tradingPairsData
    )
    if (res.isError) {
      toast.error(t('ErrorUpdate'))
      return
    }
    toast.success(t('Added'))
    const updatedTradingPairs = [
      ...pairsData.filter((pair) => pair.id !== res.result.id),
      res.result,
    ]
    dispatch(setTradingPairs(updatedTradingPairs))
    setOpenDialog(false)
  }

  const DeleteTradingPair = async (id) => {
    const res = await DictionaryTradingPairsService.DeleteTradingPair(id)
    if (res.isError) {
      toast.error(t('ErrorDelete'))
      return
    }
    toast.success(t('Deleted'))
    setOpenDialog(false)

    const response = await DictionaryTradingPairsService.GetTradingPairs()
    if (!response.isError) {
      dispatch(setTradingPairs(response.result))
    }
  }

  return (
    <>
      <DictionaryForm
        title={'TradingPairs'}
        dataInputs={tradingPairsColumns}
        openDialog={openDialog}
        setOpenDialog={(bool) => setOpenDialog(bool)}
        onSubmit={handleFormSubmit}
        editData={editData}
      />
      <SortedTable
        columns={tradingPairsColumns}
        onDelete={DeleteTradingPair}
        storedData={pairsData}
        editDataTable={(data) => setEditData(data)}
        setOpenDialog={(bool) => setOpenDialog(bool)}
      />
    </>
  )
}

export default DictionaryTradingPairTable
