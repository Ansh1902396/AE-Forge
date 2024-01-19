// SophiaConfig.ts

interface SophiaConfig {
    keyword: RegExp[];
    builtin: RegExp[];
    property: {
        pattern: RegExp;
        lookbehind: boolean;
        greedy: boolean;
    };
    comment: {
        pattern: RegExp;
        greedy: boolean;
    };
    boolean: RegExp[];
    number: RegExp;
    punctuation: RegExp;
    operator: RegExp;
    string: {
        pattern: RegExp;
        lookbehind: boolean;
        greedy: boolean;
    };
    identifier: RegExp;
    constructor: RegExp;
    qualifiedIdentifier: RegExp;
    qualifiedConstructor: RegExp;
    typeVariable: RegExp;
    integerLiteral: RegExp;
    byteArrayLiteral: RegExp;
    stringLiteral: RegExp;
    charLiteral: RegExp;
    accountAddress: RegExp;
    contractAddress: RegExp;
    oracleAddress: RegExp;
    oracleQueryId: RegExp;
    record: RegExp;
    stringType: RegExp;
    letKeyword: RegExp;
    switchKeyword: RegExp;
    caseKeyword: RegExp;
    functionKeyword: RegExp;
    entrypointKeyword: RegExp;
    ifKeyword: RegExp;
    elseKeyword: RegExp;
    whileKeyword: RegExp;
    forKeyword: RegExp;
    matchKeyword: RegExp;
    withKeyword: RegExp;
}

interface SophiaTokens {
    identifier: JSX.Element;
    constructor: JSX.Element;
    qualifiedIdentifier: JSX.Element;
    qualifiedConstructor: JSX.Element;
    typeVariable: JSX.Element;
    integerLiteral: JSX.Element;
    byteArrayLiteral: JSX.Element;
    stringLiteral: JSX.Element;
    charLiteral: JSX.Element;
    accountAddress: JSX.Element;
    contractAddress: JSX.Element;
    oracleAddress: JSX.Element;
    oracleQueryId: JSX.Element;
    record: JSX.Element;
    stringType: JSX.Element;
    letKeyword: JSX.Element;
    switchKeyword: JSX.Element;
    caseKeyword: JSX.Element;
    functionKeyword: JSX.Element;
    entrypointKeyword: JSX.Element;
    ifKeyword: JSX.Element;
    elseKeyword: JSX.Element;
    whileKeyword: JSX.Element;
    forKeyword: JSX.Element;
    matchKeyword: JSX.Element;
    withKeyword: JSX.Element;
}

const sophiaConfig = {
    keyword: [
        /contract/,
        /stateful/,
        /entrypoint/,
        /function/,
        /type/,
        /list/,
        /tuple/,
        /map/,
        /true/,
        /false/,
        /if/,
        /else/,
        /while/,
        /for/,
        /match/,
        /with/,
        /record/,
        /string/,
        /let/,
        /switch/,
        /case/,
        /state/,
        /include/,
    ],
    builtin: [
        /sha3/,
        /ak_/,
        /caller/,
        /split/,
        /concat/,
        /length/,
        /amount/,
        /require/,
        /put/,
        /@compiler/,
    ],
    property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: true,
        greedy: true,
    },
    comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: true,
    },
    boolean: [/true/, /false/],
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],|]/,
    operator:
        /!|\^|\*|\/|mod|\^|\|\||&&|==|!=|<|>|=<|>=|::|\+\+|\+|-|\*|\/|::|\+\+|\|\>/,
    string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: true,
        greedy: true,
    },
    // New Sophia language tokens
    identifier: /[a-z_][A-Za-z0-9_']*/,
    constructor: /[A-Z][A-Za-z0-9_']*/,
    qualifiedIdentifier: /(?:[A-Z][A-Za-z0-9_']*\.)*[a-z_][A-Za-z0-9_']*/,
    qualifiedConstructor: /(?:[A-Z][A-Za-z0-9_']*\.)*[A-Z][A-Za-z0-9_']*/,
    typeVariable: /'([a-z_][A-Za-z0-9_']*)/,
    integerLiteral: /-?\b\d+(?:_\d+)*|0x[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*/,
    byteArrayLiteral: /#[0-9A-Fa-f]+(?:_[0-9A-Fa-f]+)*/,
    stringLiteral: /"(?:\\.|[^\\"\r\n])*"/,
    charLiteral: /'(?:\\.|[^\\'])'/,
    accountAddress: /ak_[0-9A-Za-z]+/,
    contractAddress: /ct_[0-9A-Za-z]+/,
    oracleAddress: /ok_[0-9A-Za-z]+/,
    oracleQueryId: /oq_[0-9A-Za-z]+/,
    record: /record/,
    stringType: /string/,
    letKeyword: /let/,
    switchKeyword: /switch/,
    caseKeyword: /case/,
    functionKeyword: /function/,
    entrypointKeyword: /entrypoint/,
    ifKeyword: /if/,
    elseKeyword: /else/,
    whileKeyword: /while/,
    forKeyword: /for/,
    matchKeyword: /match/,
    withKeyword: /with/,
};

const sophiaTokens: SophiaTokens = {
    identifier: (
        <p>Represents an identifier starting with a lowercase letter.</p>
    ),
    constructor: (
        <p>Represents a constructor starting with an uppercase letter.</p>
    ),
    qualifiedIdentifier: (
        <p>Represents a qualified identifier, e.g., Map.member.</p>
    ),
    qualifiedConstructor: (
        <p>Represents a qualified constructor, e.g., List.Cons.</p>
    ),
    typeVariable: <p>Represents a type variable, e.g., 'a, 'b.</p>,
    integerLiteral: (
        <p>
            Represents an integer literal with optional underscore separators.
        </p>
    ),
    byteArrayLiteral: (
        <p>
            Represents a byte array literal with optional underscore separators.
        </p>
    ),
    stringLiteral: (
        <p>Represents a string literal enclosed in double quotes.</p>
    ),
    charLiteral: (
        <p>Represents a character literal enclosed in single quotes.</p>
    ),
    accountAddress: (
        <p>
            Represents a base58-encoded 32-byte account pubkey with ak_ prefix.
        </p>
    ),
    contractAddress: (
        <p>
            Represents a base58-encoded 32-byte contract address with ct_
            prefix.
        </p>
    ),
    oracleAddress: (
        <p>
            Represents a base58-encoded 32-byte oracle address with ok_ prefix.
        </p>
    ),
    oracleQueryId: (
        <p>
            Represents a base58-encoded 32-byte oracle query id with oq_ prefix.
        </p>
    ),
    record: <p>Represents the record keyword in Sophia.</p>,
    stringType: <p>Represents the string data type in Sophia.</p>,
    letKeyword: <p>Introduces a variable binding in Sophia.</p>,
    switchKeyword: <p>Starts a switch statement in Sophia.</p>,
    caseKeyword: <p>Represents a case in a switch statement.</p>,
    functionKeyword: <p>Indicates the definition of a function in Sophia.</p>,
    entrypointKeyword: <p>Marks a function as an entrypoint in Sophia.</p>,
    ifKeyword: <p>Starts an if statement in Sophia.</p>,
    elseKeyword: <p>Represents the else part of an if statement.</p>,
    whileKeyword: <p>Starts a while loop in Sophia.</p>,
    forKeyword: <p>Starts a for loop in Sophia.</p>,
    matchKeyword: <p>Starts a match expression in Sophia.</p>,
    withKeyword: <p>Represents the with part of a match expression.</p>,
};

export default sophiaConfig;
