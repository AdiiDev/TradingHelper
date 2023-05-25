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
  const [openFormDialog, setOpenFormDialog] = useState(false)

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
    setOpenFormDialog(false)
  }

  const deleteTradingPair = async (id) => {
    const res = await DictionaryTradingPairsService.DeleteTradingPair(id)
    if (res.isError) {
      toast.error(t('ErrorDelete'))
      return
    }
    toast.success(t('Deleted'))
    setOpenFormDialog(false)

    const response = await DictionaryTradingPairsService.GetTradingPairs()
    if (!response.isError) {
      dispatch(setTradingPairs(response.result))
    }
  }

  return (
    <>
      {openFormDialog && (
        <DictionaryForm
          title={'TradingPairs'}
          dataInputs={tradingPairsColumns}
          setOpenDialog={setOpenFormDialog}
          onSubmit={handleFormSubmit}
          editData={editData}
        />
      )}
      <SortedTable
        columns={tradingPairsColumns}
        onDelete={deleteTradingPair}
        storedData={pairsData}
        setEditDataTable={setEditData}
        setOpenDialog={setOpenFormDialog}
      />
    </>
  )
}

export default DictionaryTradingPairTable
