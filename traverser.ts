import { ChildNode, NodeTypes, RootNode, CallExpressionNode } from "./ast";

type ParentNode = RootNode | ChildNode | undefined;
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;
interface VisitorOption {
	enter: MethodFn;
	exit: MethodFn;
}
export interface Visitor {
	Program?: VisitorOption;
	NumberLiteral?: VisitorOption;
	CallExpression?: VisitorOption;
	StringLiteral?: VisitorOption;
}
export function traverser(rootNode: RootNode, visitor: Visitor) {
	// 1. 深度优先搜索
	// 2. visitor

	function traverseArray(array: ChildNode[], parent: RootNode | ChildNode | undefined) {
		array.forEach(node => {
			traverserNode(node, parent);
		});
	}

	function traverserNode(node: ChildNode | RootNode, parent?: RootNode | ChildNode) {
		// enter
		const visitorObj = visitor[node.type];
		if (visitorObj) {
			visitorObj.enter(node, parent);
		}

		console.log("node", node);
		switch (node.type) {
			case NodeTypes.NumberLiteral:
				// console.log("number", node);
				break;
			case NodeTypes.CallExpression:
				traverseArray(node.params, node);
				break;
			case NodeTypes.Program:
				traverseArray(node.body, node);
				break;
		}

		// exit
		if (visitorObj) {
			visitorObj.exit(node, parent);
		}
	}
	traverserNode(rootNode);
}
export function Visitor() {}
