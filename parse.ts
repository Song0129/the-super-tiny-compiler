import { S } from "vitest/dist/global-fe52f84b";
import { Token, TokenTypes } from "./tokenizer";

export enum NodeTypes {
	Root,
	Number,
	CallExpression,
}

interface Node {
	type: NodeTypes;
}

type ChildNode = NumberNode | CallExpression;

interface RootNode extends Node {
	body: ChildNode[];
}

interface NumberNode extends Node {
	value: string;
}

interface CallExpression extends Node {
	name: string;
	params: ChildNode[];
}

function createRootNode(): RootNode {
	return {
		type: NodeTypes.Root,
		body: [],
	};
}

function createNumberNode(value): NumberNode {
	return {
		type: NodeTypes.Number,
		value,
	};
}
function createCallExpressionNode(name: string): CallExpression {
	return {
		type: NodeTypes.CallExpression,
		name,
		params: [],
	};
}

export function parser(tokens: Token[]) {
	let current = 0;
	const rootNode = createRootNode();

	function walk() {
		let token = tokens[current];
		if (token.type === TokenTypes.Number) {
			current++;
			return createNumberNode(token.value);
		}

		if (token.type === TokenTypes.Paren && token.value === "(") {
			token = tokens[++current];
			const node = createCallExpressionNode(token.value);

			token = tokens[++current];
			while (!(token.type === TokenTypes.Paren && token.value === ")")) {
				node.params.push(walk());
				token = tokens[current];
			}

			current++;
			return node;
		}
		throw new Error(`不认识的 token：${token}`);
	}
	rootNode.body.push(walk());
	return rootNode;
}
