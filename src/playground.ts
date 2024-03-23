class A {
    readonly x: number;

    constructor(x: number) {
        this.x = x;
    }

    callback(){
        console.log(this.x);
    }
}

const a = new A(20);
const b = a.callback;

b();