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
            WelcometoReact: 'Welcome to React and react-i18next',
            ChangeEnvDialog: 'Change connected environment',
            Cancel: 'Cancel',
            Environment: 'Environment',
            Confirm: 'Confirm',
            Filter: 'Filter',
            Run: 'Run',
            Stop: 'Stop',
            EmailSubject: 'Email subject',
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
            SearchClient: 'Search client',
            Search: 'Search...',
            AddClient: 'Add client',
            Names: 'Names',
            Name: 'Name',
            DateOfBirth: 'Date of birth',
            Lastname: 'Lastname',
            Phone: 'Phone',
            Notes: 'Notes',
            Actions: 'Actions',
            Edit: 'Edit',
            Portrait: 'Portrait',
            LoadingError: 'Loading error',
            ClientListUpdated: 'Client list updated',
            ErrorUpdatingClient: 'Error updating client',
            ClientAdded: 'Client updated',
            ErrorDeletingClient: 'Error deleting client',
            ClientDeleted: 'Client deleted',
            Dictionary: 'Dictionary',
            Dictionaries: 'Dictionaries',
            AddLetter: 'Add letter',
            SearchLetter: 'Search letter',
            Letter: 'Letter',
            Value: 'Value',
            IsItAVovel: 'Is it a vovel?',
            Active: 'Active?',
            Clear: 'Clear',
            DeleteClient: 'Delete client',
            AreYouSureYouWantToDeleteIt: 'Are you sure you want to delete it?',
            Confirm: 'Confirm',
            ErrorUpdatingLetter: 'Error updating letter',
            LetterAdded: 'Letter updated',
            ErrorDeletingLetter: 'Error deleting letter',
            LetterDeleted: 'Letter deleted',
            DeleteLetter: 'Delete letter',
            True: 'True',
            False: 'False',
            AddNames: 'Add name',
            SearchName: 'Search name',
            LettersDictionary: 'Letters dictionary',
            NamesDictionary: 'Names dictionary',
            Letters: 'Letters',
            DeleteName: 'Delete name',
            ErrorDeletingName: 'Error deleting name',
            NameDeleted: 'Name deleted',
            NameAdded: 'Name updated',
            ErrorUpdatingName: 'Error updating name',
            DictionaryUpdated: 'Dictionary updated',
            Delete: 'Delete',
            Start: 'Start',
            Edition: 'Edition',
            Base: 'Base',
            Print: 'Print',
            Portraits: 'Portraits',
            AddedNames: 'Added names',
            PotentialsTurningPointsAndChallanges:
              'Potentials, turning points and challanges',
            Potentials: 'Potentials',
            TurningPoints: 'Turning points',
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
            AddANewPortraitToTheClient: 'Add a new portrait to the client',
            PortraitsUpdated: 'Portraits updated',
            ErrorDeletingPortrait: 'Error deleting portrait',
            PortraitDeleted: 'Portrait deleted',
            LoadClientDetails: 'Load client details',
            AddedNames: 'Added names',
            SaveTime: 'Save time',
            NameAndSurname: 'Name and surname',
            ThereAreNoPortraitsInTheDatabaseForThisClient:
              'There are no portraits in the database for this client',
            PortraitAdded: 'Portrait updated',
            NumerologicalDateOfBirth: 'Numerological date of birth',
            BreakthroughYears: 'Breakthrough years',
            SelectClientWhen:
              'Select the client for you want to create a portrait',
            Welcome: 'Welcome',
            YourQuoteForToday: 'Your quote for today:',
            WhatYouWantToDo: 'What you want to do?',
            AddAClient: 'Add a client',
            AddAPortrait: 'Add a portrait',
            AddALetterOrName: 'Add a letter or name',
            CompleteTheCalendar: 'Complete the calendar',
            ErrorPrintingPortrait: 'Error printing portrait',
            PortraitPrinted: 'Portrait printed',
            ChangeClient: 'Change client',
            TradingPairs: 'Trading pairs',
            Accounts: 'Accounts',
            Confirmations: 'Confirmations',
            Add: 'Add',
            ErrorUpdate: 'Error update',
            AccountAdded: 'Account added',
            ConfirmationAdded: 'Confirmation added',
            PairAdded: 'Pair added',
            BrokerName: 'Broker name',
            Favourite: 'Favourite',
            AccountNumber: 'Account number',
            Yes: 'Yes',
            No: 'No',
            Advanced: 'Advanced',
            Profile: 'Profile',
            Settings: 'Settings',
            ErrorDelete: 'Error delete',
          },
        },
        pl: {
          translation: {
            WelcometoReact: 'Witaj w react',
            ChangeEnvDialog: 'Przełącz podłączone środowisko',
            Cancel: 'Anuluj',
            Environment: 'Środowisko',
            Confirm: 'Potwierdź',
            Filter: 'Filtruj',
            Run: 'Uruchom',
            Stop: 'Stop',
            EmailSubject: 'Email subject',
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
            SearchClient: 'Szukaj klienta',
            AddClient: 'Dodaj klienta',
            Names: 'Imiona',
            DateOfBirth: 'Data urodzenia',
            Lastname: 'Nazwisko',
            Phone: 'Telefon',
            Notes: 'Notatki',
            Actions: 'Akcje',
            Edit: 'Edytuj',
            Portrait: 'Portret',
            LoadingError: 'Błąd ładowania',
            ClientListUpdated: 'Lista klientów zaktualizowana',
            ErrorUpdatingClient: 'Błąd aktualizacji klienta',
            ClientAdded: 'Klient zaktualizowany',
            ErrorDeletingClient: 'Błąd usunięcia klienta',
            ClientDeleted: 'Klient usunięty',
            Dictionary: 'Słownik',
            Dictionaries: 'Słowniki',
            AddLetter: 'Dodaj literę',
            SearchLetter: 'Szukaj literę',
            Letter: 'Litera',
            Value: 'Wartość',
            IsItAVovel: 'Czy samogłoska?',
            Active: 'Aktywny?',
            Clear: 'Resetuj',
            DeleteClient: 'Usuń klienta',
            AreYouSureYouWantToDeleteIt:
              'Czy jesteś pewny, ze chcesz to usunąć?',
            Confirm: 'Potwierdź',
            ErrorUpdatingLetter: 'Błąd aktualizacji litery',
            LetterAdded: 'Litera zaktualizowana',
            ErrorDeletingLetter: 'Błąd usunięcia litery',
            LetterDeleted: 'Litera usunięta',
            DeleteLetter: 'Usuń literę',
            True: 'Tak',
            False: 'Nie',
            AddNames: 'Dodaj imię',
            SearchName: 'Szukaj imienia',
            LettersDictionary: 'Słownik liter',
            NamesDictionary: 'Słownik imion',
            Letters: 'Litery',
            DeleteName: 'Usuń imię',
            Name: 'Imię',
            ErrorDeletingName: 'Błąd usunięcia imienia',
            NameDeleted: 'Imię usunięte',
            NameAdded: 'Imię zaktualizowane',
            ErrorUpdatingName: 'Błąd aktualizacji imienia',
            DictionaryUpdated: 'Słownik zaktualizowany',
            Delete: 'Usuń',
            Start: 'Rozpocznij',
            Edition: 'Edycja',
            Base: 'Baza',
            Print: 'Drukuj',
            Portraits: 'Portrety',
            AddedNames: 'Dodane imiona',
            PotentialsTurningPointsAndChallanges:
              'Potencjały, punkty zwrotne i wyzwania',
            Potentials: 'Potencjały',
            TurningPoints: 'Punkty zwrotne',
            Challanges: 'Wyzwania',
            Sum: 'Suma',
            Calendar: 'Kalendarz',
            Dashboard: 'Panel główny',
            ChangeLanguage: 'Zmień język',
            OpenInNewWindow: 'Otwórz w nowym oknie',
            RowsPerPage: 'Ilość na stronie',
            Of: 'z',
            PreviousPage: 'Poprzednia strona',
            NextPage: 'Następna strona',
            AddANewPortraitToTheClient: 'Dodaj nowy portret do klienta',
            PortraitsUpdated: 'Portrety zaktualizowane',
            ErrorDeletingPortrait: 'Błąd usunięcia portretu',
            PortraitDeleted: 'Portret usunięty',
            LoadClientDetails: 'Wczytaj dane klienta',
            AddedNames: 'Dodane imiona',
            SaveTime: 'Utworzono',
            NameAndSurname: 'Imię i nazwisko',
            ThereAreNoPortraitsInTheDatabaseForThisClient:
              'Brak portretów w bazie danych dla tego klienta',
            PortraitAdded: 'Portret zaktualizowany',
            NumerologicalDateOfBirth: 'Numerologiczna data urodzenia',
            BreakthroughYears: 'Przełomowe lata',
            SelectClientWhen:
              'Wybierz klienta, dla którego chcesz stworzyć portret',
            Welcome: 'Witaj',
            YourQuoteForToday: 'Twoje hasło na dziś:',
            WhatYouWantToDo: 'Co chcesz zrobić?',
            AddAClient: 'Dodać klienta',
            AddAPortrait: 'Dodać portret',
            AddALetterOrName: 'Dodać literę lub imię',
            CompleteTheCalendar: 'Uzupełnić kalendarz',
            ErrorPrintingPortrait: 'Błąd wydruku portretu',
            PortraitPrinted: 'Portret wydrukowany',
            ChangeClient: 'Zmień klienta',
            TradingPairs: 'Pary tradingowe',
            Accounts: 'Konta',
            Confirmations: 'Potwierdzenia',
            Add: 'Dodaj',
            ErrorUpdate: 'Błąd dodania',
            AccountAdded: 'Konto dodane',
            ConfirmationAdded: 'Potwierdzenie dodane',
            PairAdded: 'Para dodana',
            BrokerName: 'Nazwa brokera',
            Favourite: 'Ulubione',
            AccountNumber: 'Numer konta',
            Yes: 'Tak',
            No: 'Nie',
            Advanced: 'Zaawansowane',
            Profile: 'Profil',
            Settings: 'Ustawienia',
            ErrorDelete: 'Błąd usuwania',
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
