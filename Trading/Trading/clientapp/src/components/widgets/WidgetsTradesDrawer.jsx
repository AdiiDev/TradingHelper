import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Drawer from '@mui/material/Drawer'
import WidgetsTradesDrawerTab from './WidgetsTradesDrawerTab'
import TradesService from '../../services/TradesService'
import TradesForm from '../trades/TradesForm'

const WidgetsTradesDrawer = ({ setDrawerOpen }) => {
  const { t } = useTranslation()
  const [openTrades, setOpenTrades] = useState([])
  const [tradeData, setTradeData] = useState(null)
  const [openTradeForm, setOpenTradeForm] = useState(null)
  const [closedTrades, setClosedTrades] = useState(null)
  const brokerSelectedAccount = useSelector(
    (state) => state.brokerAccounts.selectedBroker
  )

  useEffect(() => {
    const fetchData = async () => {
      const res = await TradesService.GetTrades({
        brokerId: brokerSelectedAccount.id,
        tradingPairs: [],
        dateFrom: moment().utc().startOf('day'),
        dateTo: moment().utc().endOf('day'),
        tradeConsistentStrategy: null,
        numberOfConfirmations: null,
        confirmations: [],
        profit: null,
        loss: null,
        onlyProfit: null,
        onlyLoss: null,
        page: null,
        pageSize: null,
      })

      if (res.isError) {
        toast.error(t('LoadingError'))
        return
      }

      const trades = res.result.trades
      const closeTrades = trades.filter((trade) => trade.endTrade !== null)
      const openTrades = trades.filter((trade) => trade.endTrade === null)
      setClosedTrades(closeTrades)
      setOpenTrades(openTrades)
      toast.success(t('Updated'))
    }

    fetchData()
  }, [])

  return (
    <Drawer anchor={'bottom'} open={true} onClose={() => setDrawerOpen(false)}>
      <WidgetsTradesDrawerTab
        openTrades={openTrades}
        closedTrades={closedTrades}
        setOpenTradeForm={setOpenTradeForm}
        setTradeData={setTradeData}
      />
      {openTradeForm && (
        <TradesForm setOpenDialog={setOpenTradeForm} editData={tradeData} />
      )}
    </Drawer>
  )
}

export default WidgetsTradesDrawer
