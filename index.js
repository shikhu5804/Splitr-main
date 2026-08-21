const fs = require("fs");
const path = require("path");

const parser = require("@babel/parser");

const { getSimilarity }= require("./lib.js");

const DATABASE = [];

function addEntry(code, name, type, filePath, node) {
    DATABASE.push({
        name: name,
        nameTokens: splitCamelCase(name),
        normalizedNameTokens: [...new Set(splitCamelCase(name).map(normalizeWord))],
        type,
        filePath,
        fileTokens: filePath.toLowerCase().split(/\W+/),
        code: code.slice(node.start, node.end)
    })
}

function normalizeWord(word) {
  if (word.endsWith("ing")) return word.slice(0, -3);
  if (word.endsWith("ed")) return word.slice(0, -2);
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
}

function correctToken(word) {
    let bestMatch = word;
    let bestScore = 0;

    ACTION_WORDS.forEach(action => {
        const sim = getSimilarity(word, action);
        if (sim > bestScore) {
            bestScore = sim;
            bestMatch = action;
        }
    })

    if (bestScore > 0.5) return bestMatch;
    return word;
}

function correctEntity(word) {
    let bestMatch = word;
    let bestScore = 0;

    VOCAB.forEach(v => {
        const sim = getSimilarity(word, v);
        if (sim > bestScore) {
            bestScore = sim;
            bestMatch = v;
        }
    })

    if (bestScore > 0.65) return bestMatch;
    return word;
}

function splitCamelCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")   // split camelCase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // handle PascalCase like "HTMLParser"
    .toLowerCase()
    .split(/\s+/);
}

function expandTokens(tokens) {
  const expanded = [...tokens];

  tokens.forEach(tokenObj => {
    SYNONYM_GROUPS.forEach(group => {
      if (group.includes(tokenObj.word)) {
        group.forEach(word => {
          // avoid duplicates
          if (!expanded.some(t => t.word === word)) {
            expanded.push({
              word,
              type: "expanded"
            });
          }
        });
      }
    });
  });

  return expanded;
}

const IGNORE_DIRS = ["node_modules", ".git", ".next", "dist", "build"];

function getAllFiles(dirPath) {
  let files = [];

  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
        if (IGNORE_DIRS.includes(item)) return;
        files = files.concat(getAllFiles(fullPath)); // recursively calling subfolders
    } else {
      files.push(fullPath);
    }
  });

  return files;
}

const DIRPATH = "./app";

const allFiles = getAllFiles(DIRPATH);

// const code = fs.readFileSync(filePath, "utf-8");
const files = allFiles.filter(file => file.endsWith(".js") || file.endsWith(".ts") || file.endsWith(".jsx") || file.endsWith(".tsx"));


files.forEach(file => {
    const filePath = `${file}`;
    console.log("Processing file: ", filePath);

    const code = fs.readFileSync(filePath, "utf-8");

    let ast;
    try {
        ast = parser.parse(code, {
            sourceType: "module",
            plugins: [
                "typescript",
                "jsx"
            ]
        });
    } catch (error) {
        console.log("error parsing", filePath);
    }

    if (!ast) {
        console.log("Skipping file due to parse error:", filePath);
        return;
    }

    const data = ast.program.body;

    data.forEach(element => {
        if (element.type === "FunctionDeclaration") {
            addEntry(code, element.id.name, "function", filePath, element);
        }

        if (element.type === "ClassDeclaration") {
            addEntry(code, element.id.name, "class", filePath, element);
        }

        if (element.type === "VariableDeclaration") {
            element.declarations.forEach(dec => {
                if (dec.init?.type === "ArrowFunctionExpression") {
                    DATABASE.push({
                        name: dec.id.name,
                        nameTokens: splitCamelCase(dec.id.name),
                        normalizedNameTokens: [...new Set(splitCamelCase(dec.id.name).map(normalizeWord))],
                        type: "function",
                        file: filePath,
                        fileTokens: filePath.toLowerCase().split(/\W+/),
                        code: code.slice(dec.init.start, dec.init.end)
                        // code: code.slice(element.start, element.end) ==> Here, we didn't d this because we need to think ki what exactly is the content? I mean in cases of typical function/class decalration, the element itself holds the content, but in variable-declaration, the function itself don't hold the content instead the init part stores it, i.e, the node inside it stores it.
                    });
                }

                else if (dec.init?.type === "FunctionExpression") {
                    addEntry(code, dec.id.name, "function", filePath, dec.init)
                }

                else {
                    addEntry(code, dec.id.name, "variable", filePath, dec.init);
                }
            })
        }

        if (element.type === "ExportNamedDeclaration" || element.type === "ExportDefaultDeclaration") {
            let node = element.declaration;

            if (!node) {
            // handle re-export
                if (element.source) {
                    const names = element.specifiers.map(s => s.exported.name);

                    DATABASE.push({
                        type: "re-export",
                        names,
                        source: element.source.value,
                        filePath
                    });
                }
                return;
            }

            if (node.type === "FunctionDeclaration") {
                addEntry(code, node.id.name, "function", filePath, node);
            }

            else if (node.type === "ClassDeclaration") {
                addEntry(code, node.id.name, "class", filePath, node);
            }

            else if (node.type === "ArrowFunctionExpression") {
                addEntry(code, "Export Default Arrow Expression", "class", filePath, node);
            }

            else if (node.type === "VariableDeclaration") {
                node.declarations.forEach(dec => {
                    // console.log(dec);
                    if (dec.init?.type === "ArrowFunctionExpression") {
                        addEntry(code, dec.id.name, "function", filePath, dec.init)
                    }

                    else if (dec.init?.type === "FunctionExpression") {
                        addEntry(code, dec.id.name, "function", filePath, dec.init)
                    }

                    else if (dec.init?.type === "ClassExpression") {
                        addEntry(code, dec.id.name, "class", filePath, dec.init)
                    }

                    else {
                    addEntry(code, dec.id.name, "variable", filePath, dec.init);
                }
                })
            }
        }
    });
})

// console.log(DATABASE.length);

const VOCAB = new Set();

DATABASE.forEach(dataset => {
    dataset.nameTokens.forEach(t => VOCAB.add(t));
})

// console.log(VOCAB)

// ---------------------------------->> FILTERING AND MATCHING

const STOP_WORDS = new Set([
  "a","an","the",
  "is","are","was","were","be","been","being",
  
  "what","which","who","whom","whose","when","where","why","how",
  
  "do","does","did","done","doing",
  "have","has","had","having", "how",
  
  "in","on","at","by","for","with","about","against","between","into",
  "through","during","before","after","above","below","to","from",
  "up","down","out","over","under","again","further",
  
  "and","or","but","if","while","although","because","as","until","of",
  
  "this","that","these","those",
  "it","its","he","she","they","them","his","her","their",
  "we","us","you","your","yours",
  
  "can","could","should","would","may","might","must","shall",
  
  "find","give","show","tell","explain","describe",
]);

const ACTION_WORDS = new Set([
  "get", "fetch", "create", "update", "delete", "book"
]);

const SYNONYM_GROUPS = [
  ["get", "fetch", "retrieve", "load"],
  ["create", "add", "insert"],
  ["update", "edit"],
  ["delete", "remove"]
];

// console.log(STOP_WORDS.size)

const query = "how are groups formed?";

const baseTokens = query
        .split(/\W+/)
        .map(word => word.toLowerCase())
        .filter(word => word.length > 0 && !STOP_WORDS.has(word))
        .map(word => correctToken(word))
        .map(word => ACTION_WORDS.has(word) ? word : correctEntity(word))
        .map(normalizeWord);


let structuredTokens = baseTokens.map(word => ({
  word,
  type: "original"
}));

const tokens = expandTokens(structuredTokens);

const NON_ACTION_TOKENS = tokens.filter(
  t => !ACTION_WORDS.has(t.word)
);

const hasAction = tokens.some(t => ACTION_WORDS.has(t.word));

// console.log(tokens);

const result = []

DATABASE.forEach(dataset => {
    let matchScore = 0;
    // console.log(dataset.nameTokens)

    // MAIN matching and check if action words matched or not
    let matchedAction = false;
    tokens.forEach(token => {
        let word = token.word;

        if (dataset.nameTokens.includes(word)) {
            if (ACTION_WORDS.has(word)) {
                matchScore += token.type === "original" ? 7 : 4;
                matchedAction = true;
            } else {
                matchScore += token.type === "original" ? 5 : 3;
            }
        }

        else if (dataset.normalizedNameTokens.includes(word)) {
            if (ACTION_WORDS.has(word)) {
                matchScore += token.type === "original" ? 3 : 2;
                matchedAction = true;
            } else {
                matchScore += token.type === "original" ? 2 : 1;
            }
        }

        else {
            // Fuzzy match
            let bestSimilarity = 0;

            dataset.nameTokens.forEach(nameToken => {
                const sim = getSimilarity(nameToken, word);
                if (sim > bestSimilarity) bestSimilarity = sim;
            });
            
            if (bestSimilarity > 0.8) matchScore += 0.9;
            else if (bestSimilarity > 0.6) matchScore += 0.4;
        }

        if (dataset.fileTokens.includes(word)) matchScore+=1;
        if (dataset.code.toLowerCase().includes(word)) matchScore+=0.1;
    })
    if (hasAction && !matchedAction) matchScore *= 0.6;

    // Non-action words and penalty
    let entityMatchCount = 0;
    NON_ACTION_TOKENS.forEach(token => {
    if (
        dataset.nameTokens.includes(token.word) ||
        dataset.normalizedNameTokens.includes(token.word)
    ) {
        entityMatchCount++;
    }
    });
    if (NON_ACTION_TOKENS.length > 0 && entityMatchCount === 0) {
        matchScore *= 0.5;
    }

    // Adding penalty if the namedTokens have extra token which are not in query
    const queryTokenSet = new Set(tokens.map(t => t.word));
    let extraTokenCount = 0;

    dataset.nameTokens.forEach(token => {
        if (!queryTokenSet.has(token)) {
            extraTokenCount++;
        }
    });
    matchScore -= extraTokenCount * 0.5;

    // COVERING MORE TOKENS GIVE MORE POINTS, and Action-words weigh more than the normal words
    let weightedMatch = 0;
    let totalWeight = 0;

    tokens.forEach(token => {
        const weight = ACTION_WORDS.has(token.word) ? 2 : 1;

        totalWeight += weight;

        if (
            dataset.nameTokens.includes(token.word) ||
            dataset.normalizedNameTokens.includes(token.word)
        ) {
            weightedMatch += weight;
        }
    });
    const coverage = weightedMatch / totalWeight;

    // Finally puting match score
    if (matchScore > 0) {
        result.push({dataset: dataset, score: matchScore + coverage * 2});
    }
    // console.log(matchScore)
})

const maxScore = Math.max(...result.map(r => r.score));

const filteredResults = result.filter(r => r.score > maxScore * 0.4).sort((a, b) => b.score - a.score);

const finalResults = filteredResults.slice(0, 5);

console.log(finalResults);