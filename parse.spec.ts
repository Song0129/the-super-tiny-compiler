import { test, expect } from "vitest";
import { parser, NodeTypes } from "./parse";
import { TokenTypes } from "./tokenizer";

test.skip("parser", () => {
	// 语法分析
	const tokens = [
		{ type: TokenTypes.Paren, value: "(" },
		{ type: TokenTypes.Name, value: "add" },
		{ type: TokenTypes.Number, value: "2" },
		{ type: TokenTypes.Paren, value: "(" },
		{ type: TokenTypes.Name, value: "subtract" },
		{ type: TokenTypes.Number, value: "4" },
		{ type: TokenTypes.Number, value: "2" },
		{ type: TokenTypes.Paren, value: ")" },
		{ type: TokenTypes.Paren, value: ")" },
	];

	const ast = {
		type: NodeTypes.Root,
		body: [
			{
				type: "CallExpression",
				name: "add",
				params: [
					{
						type: "NumberLiteral",
						value: "2",
					},
					{
						type: "CallExpression",
						name: "subtract",
						params: [
							{
								type: "NumberLiteral",
								value: "4",
							},
							{
								type: "NumberLiteral",
								value: "2",
							},
						],
					},
				],
			},
		],
	};

	expect(parser(tokens)).toEqual(ast);
});

test("number", () => {
	const tokens = [
		{
			type: TokenTypes.Number,
			value: "2",
		},
	];

	const ast = {
		type: NodeTypes.Root,
		body: [{ type: NodeTypes.Number, value: "2" }],
	};

	expect(parser(tokens)).toEqual(ast);
});

test("CallExpression", () => {
	// 语法分析
	const tokens = [
		{ type: TokenTypes.Paren, value: "(" },
		{ type: TokenTypes.Name, value: "add" },
		{ type: TokenTypes.Number, value: "2" },
		{ type: TokenTypes.Number, value: "4" },
		{ type: TokenTypes.Paren, value: ")" },
	];

	const ast = {
		type: NodeTypes.Root,
		body: [
			{
				type: NodeTypes.CallExpression,
				name: "add",
				params: [
					{
						type: NodeTypes.Number,
						value: "2",
					},
					{
						type: NodeTypes.Number,
						value: "4",
					},
				],
			},
		],
	};

	expect(parser(tokens)).toEqual(ast);
});
