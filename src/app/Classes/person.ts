export class Person {
    constructor(
        public id: number,
        public name: string,
        public lastname: string,
        public date: Date,
        public gender?: string,
    ) {}
}