import * as React from 'react'

import { renderTopicalEvent } from './renderers/topical-event.js';
import { CaseStudySchema} from './schemas/compiled/case-study'
import { TopicalEventSchema } from './schemas/compiled/topical-event';
import { renderPage } from "./renderers/renderPage.js"



export const renderNotFound = (schemaName: String) => {
    return renderPage(
        <div>
          <p>Schema {schemaName} not found</p>
        </div>
    )
}

export const renderCaseStudy = (contentItem: CaseStudySchema) => {
    return renderPage(
        <div>
          <h1>{contentItem.title}</h1>
          <p>Updated at: {contentItem.public_updated_at}</p>
        </div>
    )
}

export const renderIndex = () => {
  return renderPage(
      <div>
        <h1>Have a look at some example rendered schemas:</h1>
        <p><a href='/government/topical-events/budget-2021'>Topical event</a></p>
        <p><a href='/government/case-studies/smartsurvey-working-with-department-for-education'>Case study</a></p>
      </div>
  )
}

export const renderBasedOnSchema = async (path: String) => {
  const json = await fetch(`https://www.gov.uk/api/content/${path}`).then(resp => resp.json());
  const schemaName = json["schema_name"]
  const schemaNamesToRenderFunctions = {
      "topical_event": renderTopicalEvent(json as TopicalEventSchema),
      "case_study": renderCaseStudy(json as CaseStudySchema)
  };  
  if (schemaName in schemaNamesToRenderFunctions) { return schemaNamesToRenderFunctions[schemaName] } else { return renderNotFound(schemaName) }
}