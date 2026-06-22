import { tool } from "@langchain/core/tools";
import {
  getPersonByName,
  createPerson,
  updatePerson,
  deletePerson,
} from "../services/person.service";

import {
  getPersonByNameToolDef,
  createPersonToolDef,
  updatePersonToolDef,
  deletePersonToolDef,
} from "./definitions/personTool.definitions";

export const getPersonByNameTool = tool(
  getPersonByName,
  getPersonByNameToolDef
);

export const createPersonTool = tool(
  createPerson,
  createPersonToolDef
);

export const updatePersonTool = tool(
  updatePerson,
  updatePersonToolDef
);

export const deletePersonTool = tool(
  deletePerson,
  deletePersonToolDef
);
