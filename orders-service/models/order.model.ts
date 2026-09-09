export default class Order {
    public id: number
    public item: string
    public quantity: number
    public price: number

    constructor(id: number, item: string, quantity: number, price: number) {
        this.id = id
        this.item = item
        this.quantity = quantity
        this.price = price
    }
}