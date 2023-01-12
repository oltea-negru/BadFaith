/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'waiting_lobby': "url('/src/assets/svg/waitingLobbyBackground.svg')",
        'waiting_list': "url('/src/assets/svg/WaitingBoardComponent.svg')",
        'login_room': "url('/src/assets/svg/EmptyEntryPage (1).svg')",
        'settings': "url('/src/assets/svg/SettingsExpanded.svg')",
        'fake_pattern': "url('/src/assets/svg/pattern.svg')",
        'event_room': "url('/src/assets/svg/EventPlayerActiveEmpty.svg')",
        'event_waiting': "url('/src/assets/svg/EventPlayerNonActiveEmpty.svg')",
        'lobby': "url('/src/assets/svg/MainLobbyEmpty.svg')",
        'register': "url('/src/assets/svg/EmptyRegisterPage (1).svg')",
        "login": "url('/src/assets/svg/EmptyLogin.svg')",
        'voting': "url('/src/assets/svg/VotingPageEmpty.svg')",
        'rope': "url('/src/assets/svg/RopeComponent.svg')",
        "endgame": "url('/src/assets/svg/RevealWinnerPageEmpty2.svg')",
        "evidence": "url('/src/assets/svg/EvidenceBoard.svg')",
      },
      fontFamily: {
        'another': ['Another', 'sans-serif'],
      },
      rotate: {
        '9': '9deg',
        '10': '10deg'
      }
    },
    plugins: [],
  }
}