const TicketSystem = artifacts.require("TicketSystem");

contract("TicketSystem", (accounts) => {
    let ticketSystem;
    const owner = accounts[0];
    const buyer1 = accounts[1];
    const buyer2 = accounts[2];

    const eventName = "Blockchain Summit Lusaka 2026";
    const eventVenue = "Mulungushi Conference Centre";
    const eventDate = Math.floor(Date.now() / 1000) + 86400;
    const ticketPrice = web3.utils.toWei("0.1", "ether");
    const totalTickets = 100;

    beforeEach(async () => {
        ticketSystem = await TicketSystem.new();
    });

    describe("Deployment", () => {
        it("should deploy successfully", async () => {
            const address = ticketSystem.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, "");
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it("should have correct initial values", async () => {
            const eventCounter = await ticketSystem.eventCounter();
            const ticketCounter = await ticketSystem.ticketCounter();
            assert.equal(Number(eventCounter), 0, "Event counter should start at 0");
            assert.equal(Number(ticketCounter), 0, "Ticket counter should start at 0");
        });
    });

    describe("Event Creation", () => {
        it("should create an event successfully", async () => {
            const result = await ticketSystem.createEvent(
                eventName,
                eventVenue,
                eventDate,
                ticketPrice,
                totalTickets,
                { from: owner }
            );

            assert.equal(result.logs.length, 1, "Should trigger one event");
            assert.equal(result.logs[0].event, "EventCreated", "Should be EventCreated event");
            assert.equal(Number(result.logs[0].args.eventId), 0, "Event ID should be 0");
            assert.equal(result.logs[0].args.organizer, owner, "Organizer should be owner");
        });

        it("should store event details correctly", async () => {
            await ticketSystem.createEvent(
                eventName,
                eventVenue,
                eventDate,
                ticketPrice,
                totalTickets,
                { from: owner }
            );

            const event = await ticketSystem.getEvent(0);
            assert.equal(event.eventId.toString(), "0", "Event ID should be 0");
            assert.equal(event.name, eventName, "Event name should match");
            assert.equal(event.venue, eventVenue, "Venue should match");
            assert.equal(Number(event.date), eventDate, "Date should match");
            assert.equal(event.ticketPrice.toString(), ticketPrice, "Price should match");
            assert.equal(Number(event.totalTickets), totalTickets, "Total tickets should match");
            assert.equal(Number(event.ticketsSold), 0, "Tickets sold should be 0");
            assert.equal(event.organizer, owner, "Organizer should be owner");
            assert.equal(event.isActive, true, "Event should be active");
        });

        it("should increment event counter", async () => {
            await ticketSystem.createEvent(eventName, eventVenue, eventDate, ticketPrice, totalTickets, { from: owner });
            const eventCounter = await ticketSystem.eventCounter();
            assert.equal(Number(eventCounter), 1, "Event counter should be 1");

            await ticketSystem.createEvent("Event 2", "Venue 2", eventDate, ticketPrice, 50, { from: owner });
            const eventCounter2 = await ticketSystem.eventCounter();
            assert.equal(Number(eventCounter2), 2, "Event counter should be 2");
        });

        it("should reject event with zero tickets", async () => {
            try {
                await ticketSystem.createEvent(
                    eventName,
                    eventVenue,
                    eventDate,
                    ticketPrice,
                    0,
                    { from: owner }
                );
                assert.fail("Should have thrown error");
            } catch (error) {
                assert(error.message.includes("revert"), "Error should contain revert");
            }
        });

        it("should reject event with zero price", async () => {
            try {
                await ticketSystem.createEvent(
                    eventName,
                    eventVenue,
                    eventDate,
                    0,
                    totalTickets,
                    { from: owner }
                );
                assert.fail("Should have thrown error");
            } catch (error) {
                assert(error.message.includes("revert"), "Error should contain revert");
            }
        });
    });

    describe("Ticket Purchase", () => {
        beforeEach(async () => {
            await ticketSystem.createEvent(
                eventName,
                eventVenue,
                eventDate,
                ticketPrice,
                totalTickets,
                { from: owner }
            );
        });

        it("should allow buying a ticket", async () => {
            const result = await ticketSystem.buyTicket(0, {
                from: buyer1,
                value: ticketPrice
            });

            assert.equal(result.logs.length, 1, "Should trigger one event");
            assert.equal(result.logs[0].event, "TicketPurchased", "Should be TicketPurchased event");
            assert.equal(Number(result.logs[0].args.ticketId), 0, "Ticket ID should be 0");
            assert.equal(Number(result.logs[0].args.eventId), 0, "Event ID should be 0");
            assert.equal(result.logs[0].args.buyer, buyer1, "Buyer should match");
        });

        it("should update tickets sold counter", async () => {
            await ticketSystem.buyTicket(0, { from: buyer1, value: ticketPrice });

            const event = await ticketSystem.getEvent(0);
            assert.equal(Number(event.ticketsSold), 1, "Tickets sold should be 1");

            await ticketSystem.buyTicket(0, { from: buyer2, value: ticketPrice });
            const event2 = await ticketSystem.getEvent(0);
            assert.equal(Number(event2.ticketsSold), 2, "Tickets sold should be 2");
        });

        it("should transfer payment to organizer", async () => {
            const balanceBefore = await web3.eth.getBalance(owner);

            await ticketSystem.buyTicket(0, { from: buyer1, value: ticketPrice });

            const balanceAfter = await web3.eth.getBalance(owner);
            const difference = BigInt(balanceAfter) - BigInt(balanceBefore);

            assert.equal(difference.toString(), ticketPrice, "Organizer should receive payment");
        });

        it("should reject purchase with insufficient payment", async () => {
            const insufficientPayment = web3.utils.toWei("0.05", "ether");

            try {
                await ticketSystem.buyTicket(0, {
                    from: buyer1,
                    value: insufficientPayment
                });
                assert.fail("Should have thrown error");
            } catch (error) {
                assert(error.message.includes("revert"), "Error should contain revert");
            }
        });

        it("should reject purchase when sold out", async () => {
            await ticketSystem.createEvent(
                "Limited Event",
                "Venue",
                eventDate,
                ticketPrice,
                1,
                { from: owner }
            );

            await ticketSystem.buyTicket(1, { from: buyer1, value: ticketPrice });

            try {
                await ticketSystem.buyTicket(1, { from: buyer2, value: ticketPrice });
                assert.fail("Should have thrown error");
            } catch (error) {
                assert(error.message.includes("revert"), "Error should contain revert");
            }
        });
    });

    describe("Ticket Validation", () => {
        beforeEach(async () => {
            await ticketSystem.createEvent(
                eventName,
                eventVenue,
                eventDate,
                ticketPrice,
                totalTickets,
                { from: owner }
            );
            await ticketSystem.buyTicket(0, { from: buyer1, value: ticketPrice });
        });

        it("should validate a ticket successfully", async () => {
            const result = await ticketSystem.validateTicket(0, { from: owner });

            assert.equal(result.logs.length, 1, "Should trigger one event");
            assert.equal(result.logs[0].event, "TicketValidated", "Should be TicketValidated event");
            assert.equal(Number(result.logs[0].args.ticketId), 0, "Ticket ID should be 0");
        });

        it("should mark ticket as used after validation", async () => {
            await ticketSystem.validateTicket(0, { from: owner });

            const ticket = await ticketSystem.getTicket(0);
            assert.equal(ticket.isUsed, true, "Ticket should be marked as used");
        });

        it("should only allow organizer to validate", async () => {
            try {
                await ticketSystem.validateTicket(0, { from: buyer1 });
                assert.fail("Should have thrown error");
            } catch (error) {
                assert(error.message.includes("revert") || error.message.includes("Only organizer"), "Error should contain revert or organizer message");
            }
        });

        it("should reject validating already used ticket", async () => {
            await ticketSystem.validateTicket(0, { from: owner });

            try {
                await ticketSystem.validateTicket(0, { from: owner });
                assert.fail("Should have thrown error");
            } catch (error) {
                assert(error.message.includes("revert"), "Error should contain revert");
            }
        });
    });

    describe("Ticket Transfer", () => {
        beforeEach(async () => {
            await ticketSystem.createEvent(
                eventName,
                eventVenue,
                eventDate,
                ticketPrice,
                totalTickets,
                { from: owner }
            );
            await ticketSystem.buyTicket(0, { from: buyer1, value: ticketPrice });
        });

        it("should transfer ticket successfully", async () => {
            const result = await ticketSystem.transferTicket(0, buyer2, { from: buyer1 });

            assert.equal(result.logs.length, 1, "Should trigger one event");
            assert.equal(result.logs[0].event, "TicketTransferred", "Should be TicketTransferred event");
            assert.equal(Number(result.logs[0].args.ticketId), 0, "Ticket ID should be 0");
            assert.equal(result.logs[0].args.from, buyer1, "From should be buyer1");
            assert.equal(result.logs[0].args.to, buyer2, "To should be buyer2");
        });

        it("should update ticket owner after transfer", async () => {
            await ticketSystem.transferTicket(0, buyer2, { from: buyer1 });

            const ticket = await ticketSystem.getTicket(0);
            assert.equal(ticket.owner, buyer2, "New owner should be buyer2");
        });

        it("should only allow owner to transfer", async () => {
            try {
                await ticketSystem.transferTicket(0, buyer2, { from: buyer2 });
                assert.fail("Should have thrown error");
            } catch (error) {
                assert(error.message.includes("revert"), "Error should contain revert");
            }
        });

        it("should reject transfer of used ticket", async () => {
            await ticketSystem.validateTicket(0, { from: owner });

            try {
                await ticketSystem.transferTicket(0, buyer2, { from: buyer1 });
                assert.fail("Should have thrown error");
            } catch (error) {
                assert(error.message.includes("revert"), "Error should contain revert");
            }
        });
    });

    describe("Getter Functions", () => {
        beforeEach(async () => {
            await ticketSystem.createEvent(eventName, eventVenue, eventDate, ticketPrice, totalTickets, { from: owner });
            await ticketSystem.buyTicket(0, { from: buyer1, value: ticketPrice });
            await ticketSystem.buyTicket(0, { from: buyer2, value: ticketPrice });
        });

        it("should get user tickets correctly", async () => {
            const buyer1Tickets = await ticketSystem.getMyTickets(buyer1);
            const buyer2Tickets = await ticketSystem.getMyTickets(buyer2);

            assert.equal(buyer1Tickets.length, 1, "Buyer1 should have 1 ticket");
            assert.equal(buyer2Tickets.length, 1, "Buyer2 should have 1 ticket");
            assert.equal(Number(buyer1Tickets[0]), 0, "Buyer1 ticket ID should be 0");
            assert.equal(Number(buyer2Tickets[0]), 1, "Buyer2 ticket ID should be 1");
        });

        it("should return empty array for user with no tickets", async () => {
            const noTickets = await ticketSystem.getMyTickets(accounts[5]);
            assert.equal(noTickets.length, 0, "Should have no tickets");
        });
    });
});