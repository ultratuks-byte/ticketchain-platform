// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title TicketSystem
 * @dev Blockchain-based event ticketing system
 */
contract TicketSystem {
    
    // State variables
    uint256 public eventCounter;
    uint256 public ticketCounter;
    
    // Data structures
    struct Event {
        uint256 eventId;
        string name;
        string venue;
        uint256 date;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 ticketsSold;
        address organizer;
        bool isActive;
    }
    
    struct Ticket {
        uint256 ticketId;
        uint256 eventId;
        address owner;
        bool isUsed;
        uint256 purchaseTime;
    }
    
    // Storage
    mapping(uint256 => Event) public events;
    mapping(uint256 => Ticket) public tickets;
    mapping(address => uint256[]) private userTickets;
    
    // Events
    event EventCreated(uint256 indexed eventId, string name, address indexed organizer);
    event EventCancelled(uint256 indexed eventId);
    event TicketPurchased(uint256 indexed ticketId, uint256 indexed eventId, address indexed buyer);
    event TicketValidated(uint256 indexed ticketId);
    event TicketTransferred(uint256 indexed ticketId, address indexed from, address indexed to);
    
    // Functions
    function createEvent(
        string calldata _name,
        string calldata _venue,
        uint256 _date,
        uint256 _ticketPrice,
        uint256 _totalTickets
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Name empty");
        require(_date > block.timestamp, "Date must be future");
        require(_ticketPrice > 0, "Price must be > 0");
        require(_totalTickets > 0, "Tickets must be > 0");
        
        uint256 eventId = eventCounter;
        
        events[eventId] = Event({
            eventId: eventId,
            name: _name,
            venue: _venue,
            date: _date,
            ticketPrice: _ticketPrice,
            totalTickets: _totalTickets,
            ticketsSold: 0,
            organizer: msg.sender,
            isActive: true
        });
        
        eventCounter++;
        emit EventCreated(eventId, _name, msg.sender);
        return eventId;
    }

    function cancelEvent(uint256 _eventId) public {
        require(_eventId < eventCounter, "Event doesn't exist");
        Event storage evt = events[_eventId];
        require(msg.sender == evt.organizer, "Only organizer can cancel");
        require(evt.isActive, "Event already cancelled");
        evt.isActive = false;
        emit EventCancelled(_eventId);
    }
    
    function buyTicket(uint256 _eventId) public payable returns (uint256) {
        Event storage evt = events[_eventId];
        
        require(evt.isActive, "Event not active");
        require(evt.ticketsSold < evt.totalTickets, "Sold out");
        require(msg.value == evt.ticketPrice, "Wrong price");
        
        uint256 ticketId = ticketCounter;
        
        tickets[ticketId] = Ticket({
            ticketId: ticketId,
            eventId: _eventId,
            owner: msg.sender,
            isUsed: false,
            purchaseTime: block.timestamp
        });
        
        evt.ticketsSold++;
        ticketCounter++;
        userTickets[msg.sender].push(ticketId);
        
        emit TicketPurchased(ticketId, _eventId, msg.sender);
        
        (bool sent, ) = evt.organizer.call{value: msg.value}("");
        require(sent, "Payment failed");
        
        return ticketId;
    }
    
    function validateTicket(uint256 _ticketId) public returns (bool) {
        require(_ticketId < ticketCounter, "Ticket doesn't exist");
        Ticket storage ticket = tickets[_ticketId];
        Event storage evt = events[ticket.eventId];
        require(msg.sender == evt.organizer, "Only organizer can validate");
        require(!ticket.isUsed, "Already used");
        
        ticket.isUsed = true;
        emit TicketValidated(_ticketId);
        return true;
    }
    
    function transferTicket(uint256 _ticketId, address _to) public {
        require(_ticketId < ticketCounter, "Ticket doesn't exist");
        require(_to != address(0), "Invalid address");
        
        Ticket storage ticket = tickets[_ticketId];
        require(ticket.owner == msg.sender, "Not owner");
        require(!ticket.isUsed, "Ticket used");
        
        address previousOwner = ticket.owner;
        ticket.owner = _to;
        userTickets[_to].push(_ticketId);
        
        emit TicketTransferred(_ticketId, previousOwner, _to);
    }
    
    // Getter functions
    function getEvent(uint256 _eventId) public view returns (Event memory) {
        require(_eventId < eventCounter, "Event doesn't exist");
        return events[_eventId];
    }
    
    function getTicket(uint256 _ticketId) public view returns (Ticket memory) {
        require(_ticketId < ticketCounter, "Ticket doesn't exist");
        return tickets[_ticketId];
    }
    
    function getMyTickets(address _user) public view returns (uint256[] memory) {
        return userTickets[_user];
    }
}
