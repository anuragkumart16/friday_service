### Tool Definition 
This folder contains definitions of each tool which is used as 

```typescript
const toolDefinition : ToolDef = {
    name : string,
    description : string,
    schema : z.ZodType<any>
}

// where tool is to be defined
export const Tool = tool(functionName,toolDefinition)

```