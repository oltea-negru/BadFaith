/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'waiting_lobby': "url('/src/assets/svg/waitingLobbyBackground.svg')",
        'waiting_list': "url('/src/assets/svg/WaitingBoardComponent.svg')",
        'settings': "url('/src/assets/svg/SettingsExpanded.svg')",
        'event_room': "url('/src/assets/svg/EventRoom.svg')",
        'lobby': "url('/src/assets/svg/ChooseCreateLobbyEmpty.svg')",
      },
      fontFamily: {
        'another': ['Another', 'sans-serif'],
      }
    },
    plugins: [],
  }
}