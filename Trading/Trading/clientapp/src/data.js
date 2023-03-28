import PeopleIcon from '@mui/icons-material/People'
import PortraitIcon from '@mui/icons-material/Portrait'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DashboardIcon from '@mui/icons-material/Dashboard'

const columnsClients = [
  { id: 'name', label: 'Names', minWidth: 170, align: 'right' },
  { id: 'surname', label: 'Lastname', minWidth: 100, align: 'right' },
  {
    id: 'birthDate',
    label: 'DateOfBirth',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'telephone',
    label: 'Phone',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'skype',
    label: 'Skype',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'note',
    label: 'Notes',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
  },
]

const columnsLetters = [
  { id: 'id', label: 'ID', minWidth: 100, align: 'left' },
  { id: 'letter', label: 'Letter', minWidth: 200, align: 'center' },
  {
    id: 'value',
    label: 'Value',
    minWidth: 200,
    align: 'center',
  },
  {
    id: 'vowel',
    label: 'IsItAVovel',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center',
  },
]

const columnsNames = [
  { id: 'id', label: 'ID', minWidth: 100, align: 'left' },
  { id: 'name', label: 'Name', minWidth: 250, align: 'center' },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 200,
    align: 'center',
  },
]

const columnsPortrait = [
  { id: 'baseNames', label: 'Names', minWidth: 250, align: 'center' },
  {
    id: 'addedNames',
    label: 'AddedNames',
    minWidth: 200,
    align: 'center',
  },
  {
    id: 'birthDay',
    label: 'DateOfBirth',
    minWidth: 100,
    align: 'center',
  },

  {
    id: 'saveTime',
    label: 'SaveTime',
    minWidth: 150,
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
  },
]

const menuOptions = [
  { id: 0, name: 'Dashboard', path: 'DashboardPage', icon: <DashboardIcon /> },
  { id: 1, name: 'Clients', path: 'clientPage', icon: <PeopleIcon /> },
  {
    id: 2,
    name: 'Portraits',
    path: 'PortraitPage',
    icon: <PortraitIcon />,
  },
  { id: 3, name: 'Dictionary', path: 'DictionaryPage', icon: <MenuBookIcon /> },
  {
    id: 4,
    name: 'Calendar',
    path: 'CalendarPage',
    icon: <CalendarMonthIcon />,
  },
]

export {
  menuOptions,
  columnsClients,
  columnsLetters,
  columnsNames,
  columnsPortrait,
}
