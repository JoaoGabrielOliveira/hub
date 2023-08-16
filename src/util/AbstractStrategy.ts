export default abstract class AbstractStrategy<K, V> {
    private strategies : Map<K,V>;

    constructor(){
        this.strategies = new Map<K,V>();
    }

    getStrategy(key : K) : V {
        return this.strategies.get(key);
    }

    addStrategy(key : K, item : V){
        this.strategies.set(key, item);
    }

    removeStrategy(key : K){
        this.strategies.delete(key)
    }
}