import React, { useEffect, useState } from 'react'
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
  const brokerSelectedAccount = useSelector(
    (state) => state.brokerAccounts.selectedBroker
  )

  const [filter, setFilter] = useState({
    brokerId: brokerSelectedAccount.id,
    tradingPairs: [],
    dateFrom: moment().startOf('day'),
    dateTime: moment(),
    tradeConsistentStrategy: null,
    numberOfConfirmations: null,
    confirmations: [],
    profit: null,
    loos: null,
    onlyProfit: null,
    onlyLoos: null,
  })

  useEffect(() => {
    setFilter({ ...filter, brokerId: brokerSelectedAccount.id })
  }, [brokerSelectedAccount])

  const handleFormSubmitFilterData = (data) => {
    console.log(data)
    let tradingsIdArray = []
    if (data.tradingPairs) {
      data.tradingPairs.forEach((tradingPair) => {
        tradingsIdArray.push(tradingPair.id)
      })
    }
    debugger
    setFilter({
      brokerId: brokerSelectedAccount.id,
      tradingPairs: tradingsIdArray,
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
    let confirmationsIdArray = []
    if (data.confirmations) {
      data.confirmations.forEach((confirmations) => {
        confirmationsIdArray.push(confirmations.id)
      })
    }

    const tradesData = JSON.stringify({
      id: data.id,
      brokerAccountId: brokerSelectedAccount.id,
      tradingPairId:
        data.tradingPairs && data.tradingPairs.id ? data.tradingPairs.id : null,
      tradeConsistentStrategy: data.tradeConsistentStrategy,
      startTrade: data.startTrade,
      endTrade: data.endTrade,
      profitLoos: data.profitLoos,
      note: data.note,
      confirmations: confirmationsIdArray,
    })
    console.log(tradesData)
    const res = await TradesService.AddTrades(tradesData)
    if (res.isError) {
      toast.error(t('ErrorUpdate'))
      return
    }
    toast.success(t('Added'))
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
      {brokerSelectedAccount !== 0 ? (
        <TradesForm
          openDialog={openDialog}
          setOpenDialog={(bool) => setOpenDialog(bool)}
          editData={editData}
          onSubmit={handleFormSubmit}
        />
      ) : null}
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
        filter={filter}
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
