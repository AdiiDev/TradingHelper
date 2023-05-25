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
  const [openFormDialog, setOpenFormDialog] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [reload, setReload] = useState(0)

  const brokerSelectedAccount = useSelector(
    (state) => state.brokerAccounts.selectedBroker
  )

  const [filter, setFilter] = useState({
    brokerId: brokerSelectedAccount.id,
    tradingPairId: null,
    dateFrom: moment().utc().startOf('month'),
    dateTo: moment().utc(),
    tradeConsistentStrategy: null,
    numberOfConfirmations: null,
    confirmations: [],
    profit: null,
    loss: null,
    onlyProfit: null,
    onlyLoss: null,
  })

  console.log(filter)

  useEffect(() => {
    setFilter({ ...filter, brokerId: brokerSelectedAccount.id })
  }, [brokerSelectedAccount])

  const handleFormSubmitFilterData = (data) => {
    console.log(data.tradingPairId)
    let tradingsIdArray = []
    if (data.tradingPairId) {
      data.tradingPairId.forEach((tradingPair) => {
        tradingsIdArray.push(tradingPair.id)
      })
    }
    setFilter({
      brokerId: brokerSelectedAccount.id,
      tradingPairId: tradingsIdArray,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      tradeConsistentStrategy: data.tradeConsistentStrategy,
      numberOfConfirmations: data.numberOfConfirmations,
      confirmations: data.confirmations,
      profit: data.profit,
      loss: data.loss > 0 ? -data.loss : data.loss,
      onlyProfit: data.onlyProfit,
      onlyLoss: data.onlyLoss,
    })
    setDrawerOpen(false)
  }

  const deleteTrades = async (id) => {
    const res = await TradesService.DeleteTrades(id)
    if (res.isError) {
      toast.error(t('ErrorDelete'))
      return
    }
    toast.success(t('Deleted'))
    setReload(reload + 1)
    setOpenFormDialog(false)
  }

  return (
    <WrapperBasicPage>
      {brokerSelectedAccount !== 0 && openFormDialog ? (
        <TradesForm
          setOpenDialog={setOpenFormDialog}
          editData={editData}
          onReload={() => setReload(reload + 1)}
        />
      ) : null}
      <TradesTable
        editDataTable={setEditData}
        onDelete={deleteTrades}
        setOpenDialog={setOpenFormDialog}
        filter={filter}
        toggleDrawer={setDrawerOpen}
        reload={reload}
      />
      {drawerOpen && (
        <TradesDrawer
          filter={filter}
          onSubmit={handleFormSubmitFilterData}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          toggleDrawer={setDrawerOpen}
        />
      )}
    </WrapperBasicPage>
  )
}

export default TradesPage
