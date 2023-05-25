import MenuBookIcon from '@mui/icons-material/MenuBook'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import BarChartIcon from '@mui/icons-material/BarChart'

const menuOptions = [
  { id: 0, name: 'Dashboard', path: 'DashboardPage', icon: <DashboardIcon /> },
  {
    id: 1,
    name: 'Trades',
    path: 'TradesPage',
    icon: <AnalyticsIcon />,
  },
  {
    id: 2,
    name: 'Dictionaries',
    path: 'DictionaryPage',
    icon: <MenuBookIcon />,
  },
  { id: 3, name: 'Widgets', path: 'WidgetsPage', icon: <BarChartIcon /> },
]

const brokerAccountsColumns = [
  { id: 'id', label: 'ID', align: 'left', type: 'none' },
  {
    id: 'brokerName',
    label: 'BrokerName',
    align: 'center',
    type: 'text',
  },
  {
    id: 'accountNumber',
    label: 'AccountNumber',
    align: 'center',
    type: 'text',
  },
  { id: 'name', label: 'Name', align: 'center', type: 'text' },
  {
    id: 'favourite',
    label: 'Favourite',
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'right',
    type: 'none',
  },
]

const tradingPairsColumns = [
  { id: 'id', label: 'ID', align: 'left', type: 'none' },
  {
    id: 'symbol',
    label: 'Symbol',
    align: 'center',
    type: 'text',
  },
  {
    id: 'favourite',
    label: 'Favourite',
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'right',
    type: 'none',
  },
]

const confirmationsColumns = [
  { id: 'id', label: 'ID', align: 'left', type: 'none' },
  { id: 'name', label: 'Name', align: 'center', type: 'text' },
  {
    id: 'favourite',
    label: 'Favourite',
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'right',
    type: 'none',
  },
]

const tradesColumns = [
  {
    id: 'tradingPairs',
    label: 'TradingPairs',
    align: 'center',
    type: 'select',
  },
  {
    id: 'tradeConsistentStrategy',
    label: 'TradeConsistentStrategy',
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'startTrade',
    label: 'StartTrade',
    align: 'center',
    type: 'time1',
  },
  {
    id: 'endTrade',
    label: 'EndTrade',
    align: 'center',
    type: 'time2',
  },
  {
    id: 'profitLoss',
    label: 'ProfitLoss',
    align: 'center',
    type: 'number',
  },
  {
    id: 'confirmations',
    label: 'Confirmations',
    align: 'center',
    type: 'multi-select',
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'right',
    type: 'none',
  },
]
const tradesDrawerColumns = [
  {
    id: 'tradingPairId',
    label: 'TradingPairs',
    align: 'left',
    type: 'multi-select1',
  },
  {
    id: 'dateFrom',
    label: 'Datefrom',
    align: 'center',
    type: 'time',
  },
  {
    id: 'dateTo',
    label: 'DateTo',
    align: 'center',
    type: 'time',
  },
  {
    id: 'tradeConsistentStrategy',
    label: 'TradeConsistentStrategy',
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'numberOfConfirmations',
    label: 'NumberOfConfirmations',
    align: 'center',
    type: 'number',
  },
  {
    id: 'confirmations',
    label: 'Confirmations',
    align: 'center',
    type: 'multi-select2',
  },
  {
    id: 'profit',
    label: 'Profit',
    align: 'center',
    type: 'number',
  },
  {
    id: 'loss',
    label: 'Loss',
    align: 'center',
    type: 'number',
  },
  {
    id: 'onlyProfit',
    label: 'OnlyProfit',
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'onlyLoss',
    label: 'OnlyLoss',
    align: 'center',
    type: 'checkbox',
  },
]
const intervalsColumns = [
  { id: 'id', label: 'ID', align: 'left', type: 'none' },
  { id: 'label', label: 'Name', align: 'center', type: 'text' },
  {
    id: 'interval',
    label: 'Interval',
    align: 'center',
    type: 'text',
  },
  {
    id: 'hiden',
    label: 'Hiden',
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'right',
    type: 'none',
  },
]

export {
  menuOptions,
  brokerAccountsColumns,
  tradingPairsColumns,
  confirmationsColumns,
  tradesColumns,
  tradesDrawerColumns,
  intervalsColumns,
}
