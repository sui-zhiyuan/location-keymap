function getValue(): number | number[] {
    return [1, 2, 3];
}

const value = getValue();
if (typeof value === "number") {
    console.log(value - 1);
}

if (value instanceof Array) {
    console.log(value.length);
}

if (Array.isArray(value)) {
    console.log(value.length);
}

interface Base{}

interface InterfaceA extends Base {
    a: number;
    b?: string;

    update(step:number):void;
    update: (step:number) => void;
    readonly [index:number]:string;
    readonly value:string;
}

interface InterfaceB {
    ():string;
    new (a:number, b:string):A;
}

function getValueB(): InterfaceB {
    throw new Error("Not implemented");
}

function processValueB() {
    const valueB = getValueB();
    const b = new valueB(1, "a");
    const c = valueB();
    console.log(b);
    console.log(c);
}

if (("").length === 20) {
    processValueB();
}


class ClassA implements InterfaceA {
    constructor(public a: number, private _b: string) {
        this.value = "Hello World";
        console.log(this.#forcePrivate);
    }

    get b(): string {
        return this._b;
    }
    set b(value: string) {
        this._b = value;
    }

    [index: number]: string;
    value!: string; // overload null checker
    #forcePrivate: string = "Can not access from outside";

    update(step: number): void {
        this.a += step;
    }
}



class A {
    constructor(private a: string, private b: number) {
    }
}


