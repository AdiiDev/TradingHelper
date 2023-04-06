import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setOpenDialog } from '../../services/dictionary/DictionarySlice'
import { LoadTradingPairs } from '../../services/dictionary/TradingPairsSlice'
import { tradingPairsColumns } from '../../data'
import DictionaryTradingPairsService from '../../services/dictionary/DictionaryTradingPairsService'
import SortedTable from '../basic/SortedTable'
import DictionaryForm from './DictionaryForm'

const DictionaryTradingPairTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const openDialog = useSelector((state) => state.dict.openDialog)
  const pairsData = useSelector((state) => state.tradingPairs.loadTradingPairs)
  const [editData, setEditData] = useState(undefined)

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
    toast.success(t('PairAdded'))
    const updatedTradingPairs = [
      ...pairsData.filter((pair) => pair.id !== res.result.id),
      res.result,
    ]
    dispatch(LoadTradingPairs(updatedTradingPairs))
    dispatch(setOpenDialog(false))
  }

  const DeleteTradingPair = async (id) => {
    const res = await DictionaryTradingPairsService.DeleteTradingPair(id)
    if (res.isError) {
      toast.error(t('ErrorDelete'))
      return
    }
    toast.success(t('Deleted'))
    dispatch(setOpenDialog(false))

    const response = await DictionaryTradingPairsService.GetTradingPairs()
    if (!response.isError) {
      dispatch(LoadTradingPairs(response.result))
    }
  }

  return (
    <>
      <DictionaryForm
        title={'TradingPairs'}
        dataInputs={tradingPairsColumns}
        openDialog={openDialog}
        onSubmit={handleFormSubmit}
        editData={editData}
      />
      <SortedTable
        columns={tradingPairsColumns}
        onDelete={DeleteTradingPair}
        storedData={pairsData}
        editDataTable={(data) => setEditData(data)}
      />
    </>
  )
}

export default DictionaryTradingPairTable
