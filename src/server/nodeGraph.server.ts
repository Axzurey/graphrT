import { reverse } from "./modules/tableUtils";
import node from "./node";

//FIND A WAY TO DO THIS THAT'S NOT RECURSION. RECURSION EXCEEDS LIMITS FOR LARGE NUMBERS
//use the stack approach i guess

//wow the stack approach still hits a limit for large enough nodes(in the worst case).

export default class nodeGraph<T> {
    nodes: node<T>[] = [];
    constructor() {}
    searchDepthFirst(find: (node: node<T>) => boolean, start: node<T> = this.nodes[0]): node<T> | undefined {
        let visited: Map<node<T>, boolean> = new Map();
        let stack: node<T>[] = [start];

        while (stack.size() > 0) {
            let n = stack.pop()!;
            if (visited.has(n)) continue;

            visited.set(n, true);

            if (find(n)) return n;

            for (let [_, v] of pairs(n.neighbours)) {
                stack.push(v);
            }
        }
    }
    shortestPath(target: node<T>, start: node<T> = this.nodes[0]): node<T>[] | undefined {
        let result = this.searchBreadthFirst(n => n === target);
        if (!result) return undefined;

        let route: node<T>[] = [];
        while (result) {
            route.push(result);
            result = result.lastNodeTaken;
        }

        return reverse(route);
    }
    searchBreadthFirst(find: (node: node<T>) => boolean, start: node<T> = this.nodes[0]): node<T> | undefined {
        let visited: Map<node<T>, boolean> = new Map();
        let stack: node<T>[] = [start];

        while (stack.size() > 0) {
            let n = stack.shift()!;

            if (!visited.has(n)) {
                if (find(n)) {return n};
                visited.set(n, true)
            }

            for (let [_, v] of pairs(n.neighbours)) {
                if (visited.has(v)) continue;
                v.lastNodeTaken = n;
                stack.push(v);
            }
        }
    }
}

let z: nodeGraph<number> = new nodeGraph();

let nodes: node<number>[] = [new node(3), new node(7), new node(9), 
    new node(15), new node(1.5), new node(199.3), new node(0)];

nodes[0].neighbours = [nodes[1], nodes[2]]
nodes[1].neighbours = [nodes[3], nodes[4]]
nodes[2].neighbours = [nodes[5], nodes[6]]

z.nodes = nodes;

print(z.shortestPath(nodes[6]))