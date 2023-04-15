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
  { id: 'id', label: 'ID', minWidth: 200, align: 'left', type: 'none' },
  {
    id: 'brokerName',
    label: 'BrokerName',
    minWidth: 250,
    align: 'center',
    type: 'text',
  },
  {
    id: 'accountNumber',
    label: 'AccountNumber',
    minWidth: 250,
    align: 'center',
    type: 'text',
  },
  { id: 'name', label: 'Name', minWidth: 250, align: 'center', type: 'text' },
  {
    id: 'favourite',
    label: 'Favourite',
    minWidth: 250,
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
    type: 'none',
  },
]

const tradingPairsColumns = [
  { id: 'id', label: 'ID', minWidth: 250, align: 'left', type: 'none' },
  {
    id: 'symbol',
    label: 'Symbol',
    minWidth: 300,
    align: 'center',
    type: 'text',
  },
  {
    id: 'favourite',
    label: 'Favourite',
    minWidth: 300,
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 300,
    align: 'right',
    type: 'none',
  },
]

const confirmationsColumns = [
  { id: 'id', label: 'ID', minWidth: 100, align: 'left', type: 'none' },
  { id: 'name', label: 'Name', minWidth: 200, align: 'center', type: 'text' },
  {
    id: 'favourite',
    label: 'Favourite',
    minWidth: 200,
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
    type: 'none',
  },
]

const tradesColumns = [
  {
    id: 'tradingPairs',
    label: 'TradingPairs',
    minWidth: 100,
    align: 'left',
    type: 'select',
  },
  {
    id: 'tradeConsistentStrategy',
    label: 'TradeConsistentStrategy',
    minWidth: 100,
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'startTrade',
    label: 'StartTrade',
    minWidth: 100,
    align: 'center',
    type: 'time',
  },
  {
    id: 'endTrade',
    label: 'EndTrade',
    minWidth: 100,
    align: 'center',
    type: 'time',
  },
  {
    id: 'profitLoos',
    label: 'ProfitLoos',
    minWidth: 100,
    align: 'center',
    type: 'number',
  },
  {
    id: 'confirmations',
    label: 'Confirmations',
    minWidth: 100,
    align: 'center',
    type: 'multi-select',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
    type: 'none',
  },
]
const tradesDrawerColumns = [
  {
    id: 'tradingPairs',
    label: 'TradingPairs',
    minWidth: 100,
    align: 'left',
    type: 'multi-select',
  },
  {
    id: 'dateFrom',
    label: 'Datefrom',
    minWidth: 100,
    align: 'center',
    type: 'time',
  },
  {
    id: 'dateTo',
    label: 'DateTo',
    minWidth: 100,
    align: 'center',
    type: 'time',
  },
  {
    id: 'tradeConsistentStrategy',
    label: 'TradeConsistentStrategy',
    minWidth: 100,
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'numberOfConfirmations',
    label: 'NumberOfConfirmations',
    minWidth: 100,
    align: 'center',
    type: 'number',
  },
  {
    id: 'confirmations',
    label: 'Confirmations',
    minWidth: 100,
    align: 'center',
    type: 'multi-select',
  },
  {
    id: 'profit',
    label: 'Profit',
    minWidth: 100,
    align: 'center',
    type: 'number',
  },
  {
    id: 'loos',
    label: 'Loos',
    minWidth: 100,
    align: 'center',
    type: 'number',
  },
  {
    id: 'onlyProfit',
    label: 'OnlyProfit',
    minWidth: 100,
    align: 'center',
    type: 'checkbox',
  },
  {
    id: 'onlyLoos',
    label: 'OnlyLoos',
    minWidth: 100,
    align: 'center',
    type: 'checkbox',
  },
]

export {
  menuOptions,
  brokerAccountsColumns,
  tradingPairsColumns,
  confirmationsColumns,
  tradesColumns,
  tradesDrawerColumns,
}
