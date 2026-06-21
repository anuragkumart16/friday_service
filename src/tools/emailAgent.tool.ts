import { tool } from "@langchain/core/tools";
import { emailAgent } from "../agents/emailAgent/graph";
import { runEmailAgentToolDef } from "./definitions/emailAgentTool.definition";
import { HumanMessage } from "@langchain/core/messages";

export async function runEmailAgent({ request }: { request: string }): Promise<string> {
  try {
    const result = await emailAgent.invoke({
      messages: [new HumanMessage(request)],
    });

    const lastMessage = [...result.messages]
      .reverse()
      .find((m) => m._getType() === "ai" && typeof m.content === "string" && m.content.trim() !== "");

    return (lastMessage?.content as string) || "Email agent executed successfully.";
  } catch (error: any) {
    console.error("Error executing Email Agent:", error);
    return `Error executing Email Agent: ${error.message}`;
  }
}

export const runEmailAgentTool = tool(
  runEmailAgent,
  runEmailAgentToolDef
);
