/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'waiting_lobby': "url('/src/assets/svg/waitingLobbyBackground.svg')",
        'waiting_list': "url('/src/assets/svg/WaitingBoardComponent.svg')",
        'login_room': "url('/src/assets/svg/EmptyEntryPage (1).svg')",
      },
      fontFamily: {
        'another': ['Another', 'sans-serif'],
      }
    },
    plugins: [],
  }
}