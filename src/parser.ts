type MarkdownElement =
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6 } // e.g., # H1, ## H2, ### H3, etc.
  | "paragraph"
  | "blockquote"
  | "list"
  | "orderedList"
  | "listItem"
  | "code"
  | "codeBlock"
  | "inlineCode"
  | "link"
  | "image"
  | "emphasis"
  | "strong"
  | "horizontalRule"
  | "table"
  | "tableRow"
  | "tableCell"
  | "html"
  | "lineBreak"
  | "strikethrough"
  | "taskList"
  | "taskListItem";

type MarkdownLeadingCharacter = "#" | "-" | "*" | ">" | "`" | "+";

class MarkdownObject {
  private type: MarkdownElement;
  private token: string;
  private html: string;

  constructor(type: MarkdownElement, token: string = "", html: string = "") {
    this.type = type;
    this.token = token;
    this.html = html;
  }
}

export class ParseDown {
  private tokens: string[] = [];

  private tokenize(input: string) {
    this.tokens = input.split("\n");
  }

  private getLeadingCharacter(input: string): MarkdownLeadingCharacter | null {
    const trimmedInput = input.trim();
    const markdownLeadingCharacters: MarkdownLeadingCharacter[] = [
      "#",
      "-",
      "*",
      ">",
      "`",
      "+",
    ];

    if (trimmedInput.length > 0) {
      const firstChar = trimmedInput[0] as MarkdownLeadingCharacter;

      // Check if the first character is a valid markdown leading character
      if (markdownLeadingCharacters.includes(firstChar)) {
        return firstChar;
      }

      // Special case for headers with multiple '#'
      //   if (trimmedInput.startsWith("#")) {
      //     const headerMatch = trimmedInput.match(/^#+/);
      //     return headerMatch ? "#" : null; // Return `#` to indicate header
      //   }
    }

    return null; // No markdown leading character found
  }

  private createObjFromToken(token: string) {
    console.log(this.getLeadingCharacter(token));
  }

  public parse(input: string) {
    this.tokenize(input);
    this.tokens.forEach((token: string) => {
      console.log("Token: ", token);
      console.log("LeadingCharacter: ", this.createObjFromToken(token));
    });
  }
}

const parser = new ParseDown();
const testInput = `## And I Run
I Run So Far Away`;

parser.parse(testInput);
