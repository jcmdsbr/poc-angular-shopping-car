export class Product {
    constructor(
        public id: string,
        public title: string,
        public amount: number,
        public description: string,
        public quantity: number,
        public categoryId: number
    ) { }
}