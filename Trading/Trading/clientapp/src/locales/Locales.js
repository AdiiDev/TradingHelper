import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const InitLocales = () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources: {
        en: {
          translation: {
            Cancel: 'Cancel',
            Environment: 'Environment',
            Confirm: 'Confirm',
            Filter: 'Filter',
            Run: 'Run',
            Stop: 'Stop',
            Received: 'Received',
            Modified: 'Modified',
            Status: 'Status',
            Warning: 'Warning',
            Error: 'Error',
            Action: 'Action',
            Records: 'Records',
            Options: 'Options',
            Errors: 'Errors',
            DateFrom: 'Date From',
            DateTo: 'Date To',
            Close: 'Close',
            Apply: 'Apply',
            ChangeTheme: 'Change theme',
            Username: 'Username',
            Language: 'Language',
            Theme: 'Theme',
            Dark: 'Dark',
            Light: 'Light',
            Configuration: 'Configuration',
            Save: 'Save',
            Polish: 'Polish',
            English: 'English',
            ConnectionString: 'ConnectionString',
            Clients: 'Clients',
            Client: 'Client',
            Search: 'Search...',
            Name: 'Name',
            Lastname: 'Lastname',
            Phone: 'Phone',
            Notes: 'Notes',
            Actions: 'Actions',
            Edit: 'Edit',
            LoadingError: 'Loading error',
            Dictionary: 'Dictionary',
            Dictionaries: 'Dictionaries',
            Value: 'Value',
            Clear: 'Clear',
            AreYouSureYouWantToDeleteIt: 'Are you sure you want to delete it?',
            True: 'True',
            False: 'False',
            Delete: 'Delete',
            Start: 'Start',
            Edition: 'Edition',
            Base: 'Base',
            Print: 'Print',
            Challanges: 'Challanges',
            Sum: 'Sum',
            Calendar: 'Calendar',
            Dashboard: 'Dashboard',
            ChangeLanguage: 'Change language',
            OpenInNewWindow: 'Open in new window',
            RowsPerPage: 'Rows per page',
            Of: 'of',
            PreviousPage: 'Previous page',
            NextPage: 'Next page',
            Welcome: 'Welcome',
            YourQuoteForToday: 'Your quote for today:',
            WhatYouWantToDo: 'What you want to do?',
            TradingPairs: 'Trading pairs',
            Accounts: 'Accounts',
            Confirmations: 'Confirmations',
            Add: 'Add',
            ErrorUpdate: 'Error update',
            BrokerName: 'Broker name',
            Favourite: 'Favourite',
            AccountNumber: 'Account number',
            Yes: 'Yes',
            No: 'No',
            Advanced: 'Advanced',
            Profile: 'Profile',
            Settings: 'Settings',
            ErrorDelete: 'Error delete',
            Added: 'Added',
            Deleted: 'Deleted',
            NumberOfColumns: 'Number of columns',
            NumberOfRows: 'Number of rows',
            HeightOfElements: 'Height of elements',
            View: 'View',
            ChangeHeight: 'Change height',
            Height: 'Height',
            ColumnNumberMustBeGreaterThanOrEqualTo1:
              'Column number must be greater than or equal to 1',
            ColumnNumberMustBeLessThanOrEqualTo12:
              'Column number must be less than or equal to 12',
            RowNumberMustBeGreaterThanOrEqualTo1:
              'Row number must be greater than or equal to 1',
            RowNumberMustBeLessThanOrEqualTo12:
              'Row number must be less than or equal to 12',
            EnterYourBrokerAccount: 'Enter your broker account',
            SetView: 'Set view',
            OpenDrawer: 'Open sidebar',
            AddChart: 'Add chart',
            AddCharts: 'Add charts',
            Symbol: 'Symbol',
            Interval: 'Interval',
            Intervals: 'Intervals',
            Hiden: 'Ukryte',
            GenName: "Name",
          },
        },
        pl: {
          translation: {
            Cancel: 'Anuluj',
            Environment: 'Środowisko',
            Confirm: 'Potwierdź',
            Filter: 'Filtruj',
            Run: 'Uruchom',
            Stop: 'Stop',
            Received: 'Otrzymano',
            Modified: 'Zmodyfikowano',
            Status: 'Status',
            Warning: 'Ostrzeźenie',
            Error: 'Błąd',
            Action: 'Akcje',
            Records: 'Rekord',
            Options: 'Opcje',
            Errors: 'Błędy',
            DateFrom: 'Data z',
            DateTo: 'Data do',
            Close: 'Zamknij',
            Apply: 'Zastosuj',
            ChangeTheme: 'Zmień motyw',
            Username: 'Użytkownik',
            Language: 'Język',
            Theme: 'Motyw',
            Dark: 'Ciemny',
            Light: 'Jasny',
            Configuration: 'Konfiguracja',
            Save: 'Zapisz',
            Polish: 'Polski',
            English: 'Angielski',
            ConnectionString: 'Połączenie do bazy danych',
            Clients: 'Klienci',
            Client: 'Klient',
            Search: 'Wyszukaj...',
            Names: 'Imiona',
            Lastname: 'Nazwisko',
            Phone: 'Telefon',
            Notes: 'Notatki',
            Actions: 'Akcje',
            Edit: 'Edytuj',
            LoadingError: 'Błąd ładowania',
            Dictionary: 'Słownik',
            Dictionaries: 'Słowniki',
            Value: 'Wartość',
            Clear: 'Resetuj',
            AreYouSureYouWantToDeleteIt:
              'Czy jesteś pewny, ze chcesz to usunąć?',
            True: 'Tak',
            False: 'Nie',
            Name: 'Imię',
            Delete: 'Usuń',
            Start: 'Rozpocznij',
            Edition: 'Edycja',
            Base: 'Baza',
            Print: 'Drukuj',
            Sum: 'Suma',
            Calendar: 'Kalendarz',
            Dashboard: 'Panel główny',
            ChangeLanguage: 'Zmień język',
            OpenInNewWindow: 'Otwórz w nowym oknie',
            RowsPerPage: 'Ilość na stronie',
            Of: 'z',
            PreviousPage: 'Poprzednia strona',
            NextPage: 'Następna strona',
            Welcome: 'Witaj',
            YourQuoteForToday: 'Twoje hasło na dziś:',
            WhatYouWantToDo: 'Co chcesz zrobić?',
            TradingPairs: 'Pary tradingowe',
            Accounts: 'Konta',
            Confirmations: 'Potwierdzenia',
            Add: 'Dodaj',
            ErrorUpdate: 'Błąd dodania',
            BrokerName: 'Nazwa brokera',
            Favourite: 'Ulubione',
            AccountNumber: 'Numer konta',
            Yes: 'Tak',
            No: 'Nie',
            Advanced: 'Zaawansowane',
            Profile: 'Profil',
            Settings: 'Ustawienia',
            ErrorDelete: 'Błąd usuwania',
            Added: 'Dodano',
            Deleted: 'Usunieto',
            NumberOfColumns: 'Ilość kolumn',
            NumberOfRows: 'Ilość wersów',
            HeightOfElements: 'Wysokość elementów',
            View: 'Widok',
            ChangeHeight: 'Zmień wysokość',
            Height: 'Wysokość',
            ColumnNumberMustBeGreaterThanOrEqualTo1:
              'Liczba kolumn musi być większa lub równa 1',
            ColumnNumberMustBeLessThanOrEqualTo12:
              'Liczba kolumn musi być mniejsza lub równa 12',
            RowNumberMustBeGreaterThanOrEqualTo1:
              'Liczba wierszów musi być większa lub równa 1',
            RowNumberMustBeLessThanOrEqualTo12:
              'Liczba wierszów musi być mniejsza lub równa 12',
            EnterYourBrokerAccount: 'Wprowadź konto brokera',
            SetView: 'Ustaw widok',
            OpenDrawer: 'Otwórz pasek boczny',
            AddChart: 'Dodaj wykres',
            AddCharts: 'Dodaj wykresy',
            Symbol: 'Symbol',
            Interval: 'Interval',
            Intervals: 'Intervals',
            Hiden: 'Ukryte',
            GenName: "Nazwa",
          },
        },
      },
      lng: 'pl', // if you're using a language detector, do not define the lng option
      fallbackLng: 'pl',

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    })
}
