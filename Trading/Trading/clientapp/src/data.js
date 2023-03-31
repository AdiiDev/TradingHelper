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
  { id: 'id', label: 'ID', minWidth: 100, align: 'left' },
  {
    id: 'brokerName',
    label: 'BrokerName',
    minWidth: 250,
    align: 'center',
  },
  {
    id: 'accountNumber',
    label: 'AccountNumber',
    minWidth: 250,
    align: 'center',
  },
  { id: 'name', label: 'Name', minWidth: 250, align: 'center' },
  {
    id: 'favourite',
    label: 'Favourite',
    minWidth: 250,
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
  },
]

const tradingPairsColumns = [
  { id: 'id', label: 'ID', minWidth: 100, align: 'left' },
  { id: 'symbol', label: 'Symbol', minWidth: 200, align: 'center' },
  { id: 'favourite', label: 'Favourite', minWidth: 200, align: 'right' },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
  },
]

const confirmationsColumns = [
  { id: 'id', label: 'ID', minWidth: 100, align: 'left' },
  { id: 'tradeID', label: 'TradeID', minWidth: 200, align: 'center' },
  {
    id: 'confirmationID',
    label: 'ConfirmationID',
    minWidth: 200,
    align: 'right',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
  },
]

export {
  menuOptions,
  brokerAccountsColumns,
  tradingPairsColumns,
  confirmationsColumns,
}
