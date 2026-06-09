export class Builder<T> {
    private readonly object:Partial<T> = {};

    private constructor(){}

    static create<T>():Builder<T>{
        return new Builder<T>();
    }

    public set<V extends keyof T>(key: V, value: T[V]):Builder<T>{
        this.object[key] = value;
        return this;
    }

    build(): T{
        return this.object as T;
    }
}