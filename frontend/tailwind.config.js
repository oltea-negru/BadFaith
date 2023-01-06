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
        'event_room': "url('/src/assets/svg/EventRoom.svg')",
        'lobby': "url('/src/assets/svg/MainLobbyEmpty.svg')",
        'register': "url('/src/assets/svg/EmptyRegisterPage.svg')",
        "login": "url('/src/assets/svg/EmptyLoginPage.svg')",
        'voting': "url('/src/assets/svg/VotingPageEmpty.svg')",
        'rope': "url('/src/assets/svg/RopeComponent.svg')",
      },
      fontFamily: {
        'another': ['Another', 'sans-serif'],
      }
    },
    plugins: [],
  }
}