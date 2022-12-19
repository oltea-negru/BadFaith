class Player
{

    constructor(id, username, password, friends, events, wins, loses,)
    {
        this.id = id;
        this.username = username;
        this.password = password;
        this.friends = friends;
        this.events = events;
        this.wins = wins;
        this.loses = loses;
    }

    getId()
    {
        return this.id;
    }

    getUsername()
    {
        return this.username;
    }

    getPassword()
    {
        return this.password;
    }

    getFriends()
    {
        return this.friends;
    }

    getEvents()
    {
        return this.events;
    }

    getWins()
    {
        return this.wins;
    }

    getLoses()
    {
        return this.loses;
    }

    setId(id)
    {
        this.id = id;
    }

    setUsername(username)
    {
        this.username = username;
    }

    setPassword(password)
    {
        this.password = password;
    }

    setFriends(friends)
    {
        this.friends = friends;
    }

    setEvents(events)
    {
        this.events = events;
    }

    setWins(wins)
    {
        this.wins = wins;
    }

    setLoses(loses)
    {
        this.loses = loses;
    }

}