export class Person {
    constructor(
        
        public name: string,
        public lastname: string,
        public birthdate: Date,
        public gender?: string,
    ) {}
}