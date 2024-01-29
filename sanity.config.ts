import { defineConfig } from "sanity"

import { structureTool } from "sanity/structure"
import schemas from "./sanity/schemas"

const config = defineConfig({
  projectId: 'hamhgy2t',
  dataset: 'production',
  basePath: '/admin',
  plugins: [
    structureTool()
  ],
  schema: {
    types: schemas
  }
})

export default config