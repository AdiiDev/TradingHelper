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

export {
  menuOptions,
  brokerAccountsColumns,
  tradingPairsColumns,
  confirmationsColumns,
}
