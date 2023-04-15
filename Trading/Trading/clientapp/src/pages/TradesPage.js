import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import moment from 'moment'
import TradesService from '../services/TradesService'
import WrapperBasicPage from '../components/common/WrapperBasicPage'
import TradesForm from '../components/trades/TradesForm'
import TradesTable from '../components/trades/TradesTable'
import TradesDrawer from '../components/trades/TradesDrawer'

const TradesPage = () => {
  const { t } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [filter, setFilter] = useState({
    brokerAccountId: 0,
    tradingPairs: [],
    dateFrom: moment(),
    dateTime: moment(),
    tradeConsistentStrategy: true,
    numberOfConfirmations: 0,
    confirmations: [],
    profit: 0,
    loos: 0,
    onlyProfit: true,
    onlyLoos: true,
  })
  const brokerSelectedAccount = useSelector(
    (state) => state.brokerAccounts.selectedBroker
  )

  const handleFormSubmitFilterData = async (data) => {
    console.log(data)
    setDrawerOpen(false)
    setFilter({
      brokerAccountId: brokerSelectedAccount.id,
      tradingPairs: data.tradingPairs,
      dateFrom: data.dateFrom,
      dateTime: data.dateTime,
      tradeConsistentStrategy: data.tradeConsistentStrategy,
      numberOfConfirmations: data.numberOfConfirmations,
      confirmations: data.confirmations,
      profit: data.profit,
      loos: data.loos > 0 ? -data.loos : data.loos,
      onlyProfit: data.onlyProfit,
      onlyLoos: data.onlyLoos,
    })
    setDrawerOpen(false)
  }

  const handleFormSubmit = async (data) => {
    console.log(data)

    const tradesData = JSON.stringify({
      id: data.id,
      brokerAccountId: brokerSelectedAccount.id,
      brokerAccount: {},
      tradingPairId: data.tradingPairs.id,
      tradingPair: null,
      tradeConsistentStrategy: data.tradeConsistentStrategy,
      startTrade: data.startTrade === 'undefined' ? null : data.startTrade,
      endTrade: data.endTrade === 'undefined' ? null : data.endTrade,
      profitLoos: data.profitLoos,
      notes: '',
      confirmations: data.confirmations,
    })
    console.log(tradesData)
    {
      /*const res = await TradesService.AddTrades(tradesData)
    console.log(res)
    if (res.isError) {
      toast.error(t('ErrorUpdate'))
      return
    }
  toast.success(t('Added'))*/
    }
    setOpenDialog(false)
  }

  const deleteTrades = async (id) => {
    const res = await TradesService.DeleteTrades(id)
    if (res.isError) {
      toast.error(t('ErrorDelete'))
      return
    }
    toast.success(t('Deleted'))
    setOpenDialog(false)
  }

  return (
    <WrapperBasicPage>
      <TradesForm
        openDialog={openDialog}
        setOpenDialog={(bool) => setOpenDialog(bool)}
        editData={editData}
        onSubmit={handleFormSubmit}
      />
      <TradesTable
        editDataTable={(data) => setEditData(data)}
        onDelete={deleteTrades}
        setOpenDialog={(bool) => setOpenDialog(bool)}
        filter={filter}
        toggleDrawer={() => {
          setDrawerOpen(!drawerOpen)
        }}
      />
      <TradesDrawer
        editData={editData}
        onSubmit={handleFormSubmitFilterData}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        toggleDrawer={() => {
          setDrawerOpen(!drawerOpen)
        }}
      />
    </WrapperBasicPage>
  )
}

export default TradesPage
