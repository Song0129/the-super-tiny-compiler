import { test, expect } from "vitest";
import { parser, NodeTypes } from "./parse";
import { TokenTypes } from "./tokenizer";

test("parser", () => {
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
				type: NodeTypes.CallExpression,
				name: "add",
				params: [
					{
						type: NodeTypes.Number,
						value: "2",
					},
					{
						type: NodeTypes.CallExpression,
						name: "subtract",
						params: [
							{
								type: NodeTypes.Number,
								value: "4",
							},
							{
								type: NodeTypes.Number,
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

test("Two CallExpression", () => {
	// 语法分析
	const tokens = [
		{ type: TokenTypes.Paren, value: "(" },
		{ type: TokenTypes.Name, value: "add" },
		{ type: TokenTypes.Number, value: "2" },
		{ type: TokenTypes.Number, value: "4" },
		{ type: TokenTypes.Paren, value: ")" },
		{ type: TokenTypes.Paren, value: "(" },
		{ type: TokenTypes.Name, value: "add" },
		{ type: TokenTypes.Number, value: "3" },
		{ type: TokenTypes.Number, value: "5" },
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
			{
				type: NodeTypes.CallExpression,
				name: "add",
				params: [
					{
						type: NodeTypes.Number,
						value: "3",
					},
					{
						type: NodeTypes.Number,
						value: "5",
					},
				],
			},
		],
	};

	expect(parser(tokens)).toEqual(ast);
});
