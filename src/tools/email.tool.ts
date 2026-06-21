import { tool } from "@langchain/core/tools";
import {
  listMessages,
  getMessage,
  createDraft,
  sendMessage,
  replyToMessage,
} from "../services/gmail.service";

import {
  listEmailsToolDef,
  readEmailToolDef,
  draftEmailToolDef,
  sendEmailToolDef,
  replyEmailToolDef,
} from "./definitions/emailTool.definitions";

export const listEmailsTool = tool(
  listMessages,
  listEmailsToolDef
);

export const readEmailTool = tool(
  getMessage,
  readEmailToolDef
);

export const draftEmailTool = tool(
  createDraft,
  draftEmailToolDef
);

export const sendEmailTool = tool(
  sendMessage,
  sendEmailToolDef
);

export const replyEmailTool = tool(
  replyToMessage,
  replyEmailToolDef
);
