import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import DictionaryService from '../../services/DictionaryService'
import SortedTable from '../basic/SortedTable'
import { tradingPairsColumns } from '../../data'
import DictionaryForm from './DictionaryForm'

const DictionaryTradingPairTable = () => {
  const { t } = useTranslation()
  const openDialog = useSelector((state) => state.dict.openDialog)

  const handleFormSubmit = async (data) => {
    const tradingPairsData = JSON.stringify({
      id: data.id,
      symbol: data.symbol,
      favourite: data.favourite,
    })
    const res = await DictionaryService.AddTradingPair(tradingPairsData)
    if (res.isError) {
      toast.error(t('ErrorUpdate'))
    }
    toast.success(t('PairAdded'))
  }

  return (
    <>
      <DictionaryForm
        title={'TradingPairs'}
        dataInputs={tradingPairsColumns}
        openDialog={openDialog}
        onSubmit={handleFormSubmit}
      />
      <SortedTable columns={tradingPairsColumns} />
    </>
  )
}

export default DictionaryTradingPairTable
