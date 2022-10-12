import { NodeTypes, RootNode } from "./ast";
import { traverser } from "./traverser";

export function transformer(ast: RootNode) {
	const newAst = {
		type: NodeTypes.Program,
		body: [],
	};

	ast.context = newAst.body;

	traverser(ast, {
		CallExpression: {
			enter(node, parent) {
				if (node.type === NodeTypes.CallExpression) {
					let expression: any = {
						type: "CallExpression",
						callee: {
							type: "Identifier",
							name: node.name,
						},
						arguments: [],
					};

					if (parent?.type === NodeTypes.CallExpression) {
						expression = {
							type: "ExpressionStatement",
							expression,
						};
					}

					parent?.context?.push(expression);
				}
			},
		},
	});
}
