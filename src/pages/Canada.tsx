import React from 'react';
import CountryLanding from './CountryLanding';

export default function CanadaPage() {
  return (
    <CountryLanding 
      countryName="Canada"
      countryCode="CA"
      adjective="Canadian"
      institutions={[
        "University of Toronto",
        "UBC Vancouver",
        "McGill University",
        "University of Alberta",
        "McMaster University",
        "University of Waterloo",
        "Western University",
        "Queen's University"
      ]}
      stats={{
        experts: "1,200+",
        score: "9.8/10"
      }}
      seoContent1="As a student in Canada—at institutions such as the University of Toronto or McGill—navigating one of the world's most rigorous academic landscapes requires a high level of research depth and critical analysis."
      seoContent2="Mastering the complexities of university life in Canada can be challenging. Our professional 'Assignment Support Service' is designed to be a supportive bridge, providing you with high-quality model papers that help you master your specific course requirements and formatting expectations, whether in APA, MLA, or Chicago style."
    />
  );
}
