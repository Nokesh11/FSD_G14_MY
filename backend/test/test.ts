// let j = null;
interface TicketInterface //InterfaceTicket
{
    userID : number
}
let j: TicketInterface | null = null;

function someFunc (): null | number {
    const k = j?.userID ?? null;
    // const k = j?.userID;
    return k;
}

j = null;

console.log(someFunc());