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
        'event_room': "url('/src/assets/svg/EventRoom.svg')",
        'event_waiting': "url('/src/assets/svg/EventPlayerNonActive1.svg')",
        'lobby': "url('/src/assets/svg/MainLobbyEmpty.svg')",
        'register': "url('/src/assets/svg/EmptyRegisterPage.svg')",
        "login": "url('/src/assets/svg/EmptyLoginPage.svg')",
      },
      fontFamily: {
        'another': ['Another', 'sans-serif'],
      }
    },
    plugins: [],
  }
}