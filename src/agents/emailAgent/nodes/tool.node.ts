import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
  listEmailsTool,
  readEmailTool,
  draftEmailTool,
  sendEmailTool,
  replyEmailTool,
} from "../../../tools/email.tool";

const tools = [
  listEmailsTool,
  readEmailTool,
  draftEmailTool,
  sendEmailTool,
  replyEmailTool,
];

export const toolNode = new ToolNode(tools);
